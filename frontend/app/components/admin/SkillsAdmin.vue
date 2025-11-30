<template>
  <div class="admin-section">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Gerenciar Skills</span>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon start>mdi-plus</v-icon>
          Nova Skill
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="skills"
          :loading="loading"
          class="elevation-1"
        >
          <template #[`item.icon`]="{ item }">
            <v-icon :icon="item.icon" :color="item.color" size="32" />
          </template>

          <template #[`item.color`]="{ item }">
            <v-chip :style="{ backgroundColor: item.color, color: '#fff' }" size="small">
              {{ item.color }}
            </v-chip>
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
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Nova' }} Skill</span>
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
              v-model="editedItem.category"
              label="Categoria"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.icon"
              label="Ícone (mdi-)"
              hint="Ex: mdi-kubernetes, mdi-docker"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.color"
              label="Cor (hex)"
              hint="Ex: #326CE5"
              :rules="[rules.required]"
              variant="outlined"
              type="color"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.bgColor"
              label="Cor de Fundo (hex)"
              hint="Ex: #e3f2fd"
              variant="outlined"
              type="color"
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
          Tem certeza que deseja excluir esta skill?
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
import type { Skill } from '~/types/admin'

const config = useRuntimeConfig()

const headers = [
  { title: 'Ícone', key: 'icon', sortable: false },
  { title: 'Nome', key: 'name' },
  { title: 'Categoria', key: 'category' },
  { title: 'Cor', key: 'color', sortable: false },
  { title: 'Status', key: 'active' },
  { title: 'Ordem', key: 'order' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const skills = ref<Skill[]>([])
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

const defaultItem: Skill = {
  name: '',
  category: '',
  icon: 'mdi-',
  color: '#3b82f6',
  bgColor: '#e3f2fd',
  order: 1,
  active: true
}

const editedItem = ref<Skill>({ ...defaultItem })
const editedIndex = ref(-1)

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório'
}

const fetchSkills = async () => {
  loading.value = true
  try {
    const data = await $fetch<Skill[]>(`${config.public.apiUrl}/skills`)
    skills.value = data
  } catch (error) {
    showSnackbar('Erro ao carregar skills', 'error')
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  editedItem.value = { ...defaultItem }
  dialog.value = true
}

const editItem = (item: Skill) => {
  isEditing.value = true
  editedIndex.value = skills.value.indexOf(item)
  editedItem.value = { ...item }
  console.log('Editing skill:', { _id: (item as any)._id, name: item.name })
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
    const apiUrl = `${config.public.apiUrl}/skills`
    
    // Remover campos do MongoDB que não devem ser enviados
    const { _id, createdAt, updatedAt, __v, ...skillData } = editedItem.value as any
    
    if (isEditing.value && _id) {
      console.log('Atualizando skill:', _id)
      await $fetch(`${apiUrl}/${_id}`, {
        method: 'PUT',
        body: skillData
      })
      showSnackbar('Skill atualizada com sucesso')
    } else {
      console.log('Criando nova skill')
      await $fetch(apiUrl, {
        method: 'POST',
        body: skillData
      })
      showSnackbar('Skill criada com sucesso')
    }

    await fetchSkills()
    closeDialog()
  } catch (error: any) {
    console.error('Erro ao salvar skill:', error)
    const errorMsg = error?.data?.message || error?.message || 'Erro ao salvar skill'
    showSnackbar(errorMsg, 'error')
  } finally {
    saving.value = false
  }
}

const deleteItem = (item: Skill) => {
  editedIndex.value = skills.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    await $fetch(`${config.public.apiUrl}/skills/${editedItem.value._id}`, {
      method: 'DELETE'
    })
    showSnackbar('Skill excluída com sucesso')
    await fetchSkills()
    deleteDialog.value = false
  } catch (error) {
    showSnackbar('Erro ao excluir skill', 'error')
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
  fetchSkills()
})
</script>
