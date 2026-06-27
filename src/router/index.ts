import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/audits/new',
      name: 'audit-create',
      component: () => import('@/views/AuditCreateView.vue'),
    },
    {
      path: '/audits/:id',
      name: 'audit-detail',
      component: () => import('@/views/AuditDetailView.vue'),
    },
    {
      path: '/audits/:id/summary',
      name: 'audit-summary',
      component: () => import('@/views/AuditSummaryView.vue'),
    },
    {
      path: '/audits/:id/report',
      name: 'audit-report',
      component: () => import('@/views/AuditReportView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
