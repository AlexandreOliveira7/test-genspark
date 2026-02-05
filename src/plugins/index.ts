import router from '@/router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import type { App } from 'vue';
import vuetify from './vuetify';

export function registerPlugins(app: App) {
  const pinia = createPinia();
  app.use(pinia);

  app.use(VueQueryPlugin);

  app.use(vuetify);

  app.use(router);
}
