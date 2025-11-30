<template>
  <div class="admin-section">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Gerenciar Certificações</span>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon start>mdi-plus</v-icon>
          Nova Certificação
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="certifications"
          :loading="loading"
          class="elevation-1"
        >
          <template #[`item.image`]="{ item }">
            <v-img :src="item.image" width="60" height="60" cover class="my-2" />
          </template>

          <template #[`item.active`]="{ item }">
            <v-chip :color="item.active ? 'success' : 'error'" size="small">
              {{ item.active ? 'Ativo' : 'Inativo' }}
            </v-chip>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn icon size="small" @click="editItem(item)" class="mr-2">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="deleteItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Dialog Form -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Nova' }} Certificação</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="editedItem.name"
              label="Nome"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.issuer"
              label="Emissor"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.image"
              label="URL da Imagem"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.link"
              label="Link da Certificação"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.date"
              label="Data (Ex: Nov 2025)"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model.number="editedItem.skills"
              label="Número de Skills"
              type="number"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model.number="editedItem.order"
              label="Ordem"
              type="number"
              variant="outlined"
              class="mb-4"
            />

            <v-switch
              v-model="editedItem.active"
              label="Ativo"
              color="primary"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveItem" :loading="saving">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir esta certificação?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDelete" :loading="deleting">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import type { Certification } from '~/types/admin'

const config = useRuntimeConfig()

const headers = [
  { title: 'Badge', key: 'image', sortable: false },
  { title: 'Nome', key: 'name' },
  { title: 'Emissor', key: 'issuer' },
  { title: 'Data', key: 'date' },
  { title: 'Skills', key: 'skills' },
  { title: 'Status', key: 'active' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const certifications = ref<Certification[]>([])
const loading = ref(false)
const dialog = ref(false)
const deleteDialog = ref(false)
const saving = ref(false)
const deleting = ref(false)
const isEditing = ref(false)
const form = ref(null)

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const defaultItem = {
  name: '',
  issuer: '',
  image: '',
  link: '',
  date: '',
  skills: 0,
  order: 1,
  active: true
}

const editedItem = ref({ ...defaultItem })
const editedIndex = ref(-1)

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório'
}

const fetchCertifications = async () => {
  loading.value = true
  try {
    const data = await $fetch<Certification[]>(`${config.public.apiUrl}/certifications`)
    certifications.value = data
  } catch (error) {
    showSnackbar('Erro ao carregar certificações', 'error')
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  editedItem.value = { ...defaultItem }
  dialog.value = true
}

const editItem = (item: Certification) => {
  isEditing.value = true
  editedIndex.value = certifications.value.indexOf(item)
  editedItem.value = { ...item }
  console.log('Editing certification:', { _id: (item as any)._id, name: item.name })
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  editedItem.value = { ...defaultItem }
  editedIndex.value = -1
}

const saveItem = async () => {
  saving.value = true
  try {
    const apiUrl = `${config.public.apiUrl}/certifications`
    
    // Remover campos do MongoDB que não devem ser enviados
    const { _id, createdAt, updatedAt, __v, ...certificationData } = editedItem.value as any
    
    if (isEditing.value && _id) {
      console.log('Atualizando certificação:', _id)
      await $fetch(`${apiUrl}/${_id}`, {
        method: 'PUT',
        body: certificationData
      })
      showSnackbar('Certificação atualizada com sucesso')
    } else {
      console.log('Criando nova certificação')
      await $fetch(apiUrl, {
        method: 'POST',
        body: certificationData
      })
      showSnackbar('Certificação criada com sucesso')
    }

    await fetchCertifications()
    closeDialog()
  } catch (error: any) {
    console.error('Erro ao salvar certificação:', error)
    const errorMsg = error?.data?.message || error?.message || 'Erro ao salvar certificação'
    showSnackbar(errorMsg, 'error')
  } finally {
    saving.value = false
  }
}

const deleteItem = (item: Certification) => {
  editedIndex.value = certifications.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    await $fetch(`${config.public.apiUrl}/certifications/${(editedItem.value as any)._id}`, {
      method: 'DELETE'
    })
    showSnackbar('Certificação excluída com sucesso')
    await fetchCertifications()
    deleteDialog.value = false
  } catch (error) {
    showSnackbar('Erro ao excluir certificação', 'error')
  } finally {
    deleting.value = false
  }
}

const showSnackbar = (text: string, color: string = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

onMounted(() => {
  fetchCertifications()
})
</script>
