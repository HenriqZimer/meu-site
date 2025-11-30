<template>
  <div class="admin-section">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Gerenciar Projetos</span>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon start>mdi-plus</v-icon>
          Novo Projeto
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="projects"
          :loading="loading"
          class="elevation-1"
        >
          <template #[`item.image`]="{ item }">
            <v-img :src="item.image" width="80" height="60" cover class="my-2" />
          </template>

          <template #[`item.technologies`]="{ item }">
            <v-chip-group>
              <v-chip v-for="tech in item.technologies" :key="tech" size="small">
                {{ tech }}
              </v-chip>
            </v-chip-group>
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
    <v-dialog v-model="dialog" max-width="800px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Editar' : 'Novo' }} Projeto</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="editedItem.title"
              label="Título"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-textarea
              v-model="editedItem.description"
              label="Descrição"
              :rules="[rules.required]"
              variant="outlined"
              rows="3"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.image"
              label="URL da Imagem"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-select
              v-model="editedItem.category"
              :items="categories"
              label="Categoria"
              :rules="[rules.required]"
              variant="outlined"
              class="mb-4"
            />

            <v-combobox
              v-model="editedItem.technologies"
              label="Tecnologias"
              multiple
              chips
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.demoUrl"
              label="URL Demo"
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="editedItem.githubUrl"
              label="URL GitHub"
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

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir este projeto?
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

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/admin'

const config = useRuntimeConfig()

const headers = [
  { title: 'Imagem', key: 'image', sortable: false },
  { title: 'Título', key: 'title' },
  { title: 'Categoria', key: 'category' },
  { title: 'Tecnologias', key: 'technologies', sortable: false },
  { title: 'Status', key: 'active' },
  { title: 'Ordem', key: 'order' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const categories = [
  'containerization',
  'infrastructure',
  'automation',
  'cloud',
  'frontend',
  'backend'
]

const projects = ref<Project[]>([])
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

const defaultItem: Project = {
  title: '',
  description: '',
  image: '',
  category: '',
  technologies: [],
  demoUrl: '',
  githubUrl: '',
  order: 1,
  active: true
}

const editedItem = ref<Project>({ ...defaultItem })
const editedIndex = ref(-1)

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório'
}

// Fetch projects
const fetchProjects = async () => {
  loading.value = true
  try {
    const data = await $fetch<Project[]>(`${config.public.apiUrl}/projects`)
    projects.value = data
  } catch (error) {
    showSnackbar('Erro ao carregar projetos', 'error')
  } finally {
    loading.value = false
  }
}

const openCreateDialog = () => {
  isEditing.value = false
  editedItem.value = { ...defaultItem }
  dialog.value = true
}

const editItem = (item: Project) => {
  isEditing.value = true
  editedIndex.value = projects.value.indexOf(item)
  editedItem.value = { ...item }
  console.log('Editing project:', { _id: (item as any)._id, title: item.title })
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  editedItem.value = { ...defaultItem }
  editedIndex.value = -1
}

const saveItem = async () => {
  if (!form.value) return

  saving.value = true
  try {
    const apiUrl = `${config.public.apiUrl}/projects`
    
    // Remover campos do MongoDB que não devem ser enviados
    const { _id, createdAt, updatedAt, __v, ...projectData } = editedItem.value as any
    
    if (isEditing.value && _id) {
      console.log('Atualizando projeto:', _id)
      await $fetch(`${apiUrl}/${_id}`, {
        method: 'PUT',
        body: projectData
      })
      showSnackbar('Projeto atualizado com sucesso')
    } else {
      console.log('Criando novo projeto')
      await $fetch(apiUrl, {
        method: 'POST',
        body: projectData
      })
      showSnackbar('Projeto criado com sucesso')
    }

    await fetchProjects()
    closeDialog()
  } catch (error: any) {
    console.error('Erro ao salvar projeto:', error)
    const errorMsg = error?.data?.message || error?.message || 'Erro ao salvar projeto'
    showSnackbar(errorMsg, 'error')
  } finally {
    saving.value = false
  }
}

const deleteItem = (item: Project) => {
  editedIndex.value = projects.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    await $fetch(`${config.public.apiUrl}/projects/${editedItem.value._id}`, {
      method: 'DELETE'
    })
    showSnackbar('Projeto excluído com sucesso')
    await fetchProjects()
    deleteDialog.value = false
  } catch (error) {
    showSnackbar('Erro ao excluir projeto', 'error')
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
  fetchProjects()
})
</script>

<style scoped>
.admin-section {
  padding: 0;
}
</style>
