import { createRouter, createWebHistory } from '@ionic/vue-router';
import NotFound  from '@/components/404.vue';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import {useSearchStore} from "@/stores/main";


const routes: Array<RouteRecordRaw> = [
  { path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound },
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        name: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tab2',
        name: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tab3',
        name: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const searchStore = useSearchStore();

  // Проверка, требует ли маршрут аутентификации
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Проверка, аутентифицирован ли пользователь
  const isAuthenticated = await searchStore.getToken();

  if (requiresAuth && !isAuthenticated) {
    // Перенаправление на страницу входа, только если пользователь не на ней
    if (to.path !== '/login') {
      next('/login');
    } else {
      // Если уже на странице входа, просто продолжить
      next();
    }
  } else {
    // Если аутентификация не требуется, или пользователь аутентифицирован, продолжить навигацию
    next();
  }
});

export default router
