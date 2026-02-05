import router from '@/router';
import * as Sentry from '@sentry/vue';
import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from './plugins';

const app = createApp(App);
registerPlugins(app);

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

const IS_PRODUCTION = NODE_ENV === 'production';

if (SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    sendDefaultPii: true,
    tracesSampleRate: IS_PRODUCTION ? 0.5 : 1.0,
    enableLogs: true,
  });

  router.afterEach((to) => {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Rota navegada: ${to.fullPath}`,
      level: 'info',
    });
  });
}

app.mount('#app');
