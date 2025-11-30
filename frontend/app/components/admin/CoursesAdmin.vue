<template>
  <div class="admin-section">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Gerenciar Cursos</span>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon start>mdi-plus</v-icon>
          Novo Curso
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="courses"
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
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Novo' }} Curso</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="editedItem.name"
              label="Nome do Curso"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.platform"
              label="Plataforma"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.instructor"
              label="Instrutor"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.duration"
              label="Duração (Ex: 4.5h)"
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
              label="Link do Certificado"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.year"
              label="Ano"
              :rules="[rules.required]"
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
          Tem certeza que deseja excluir este curso?
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
import type { Course } from '~/types/admin'

const config = useRuntimeConfig()

const headers = [
  { title: 'Logo', key: 'image', sortable: false },
  { title: 'Nome', key: 'name' },
  { title: 'Plataforma', key: 'platform' },
  { title: 'Instrutor', key: 'instructor' },
  { title: 'Duração', key: 'duration' },
  { title: 'Ano', key: 'year' },
  { title: 'Status', key: 'active' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const courses = ref<Course[]>([])
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
  platform: '',
  instructor: '',
  duration: '',
  image: '',
  link: '',
  year: new Date().getFullYear().toString(),
  order: 1,
  active: true
}

const editedItem = ref({ ...defaultItem })
const editedIndex = ref(-1)

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório'
}

const fetchCourses = async () => {
  loading.value = true
  try {
    const data = await $fetch<Course[]>(`${config.public.apiUrl}/courses`)
    courses.value = data
  } catch (error) {
    showSnackbar('Erro ao carregar cursos', 'error')
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  editedItem.value = { ...defaultItem }
  dialog.value = true
}

const editItem = (item: Course) => {
  isEditing.value = true
  editedIndex.value = courses.value.indexOf(item)
  editedItem.value = { ...item }
  console.log('Editing course:', { _id: (item as any)._id, name: item.name })
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
    const apiUrl = `${config.public.apiUrl}/courses`
    
    // Remover campos do MongoDB que não devem ser enviados
    const { _id, createdAt, updatedAt, __v, ...courseData } = editedItem.value as any
    
    if (isEditing.value && _id) {
      console.log('Atualizando curso:', _id)
      await $fetch(`${apiUrl}/${_id}`, {
        method: 'PUT',
        body: courseData
      })
      showSnackbar('Curso atualizado com sucesso')
    } else {
      console.log('Criando novo curso')
      await $fetch(apiUrl, {
        method: 'POST',
        body: courseData
      })
      showSnackbar('Curso criado com sucesso')
    }

    await fetchCourses()
    closeDialog()
  } catch (error: any) {
    console.error('Erro ao salvar curso:', error)
    const errorMsg = error?.data?.message || error?.message || 'Erro ao salvar curso'
    showSnackbar(errorMsg, 'error')
  } finally {
    saving.value = false
  }
}

const deleteItem = (item: Course) => {
  editedIndex.value = courses.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    await $fetch(`${config.public.apiUrl}/courses/${(editedItem.value as any)._id}`, {
      method: 'DELETE'
    })
    showSnackbar('Curso excluído com sucesso')
    await fetchCourses()
    deleteDialog.value = false
  } catch (error) {
    showSnackbar('Erro ao excluir curso', 'error')
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
  fetchCourses()
})
</script>
