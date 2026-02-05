// src/router/index.ts
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import Products from '@/pages/products/views/Products.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
