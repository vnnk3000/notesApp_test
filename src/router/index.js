import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesPage from '../pages/Notes.vue'
import EditPage from '../pages/CreateNote.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesPage
    },
    {
      path: '/edit-note/:id',
      name: 'editNote',
      component: EditPage
    },
    {
      path: '/create-note',
      name: 'createNote',
      component: EditPage
    },
  ],
  scrollBehavior() {
      document.getElementById('app').scrollIntoView();
  }
})

export default router
