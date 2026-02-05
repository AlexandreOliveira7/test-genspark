// Styles
import '@/styles/settings.scss';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          brown_dg: '#6a3d31',
          orange_dg: '#fd683e',
          pink_dg: '#f1388b',
          beige_dg: '#FFF3F0',
          green_dg: '#3eff85ff',
          red_dg: '#FF0000',
          gray_dg: '#b9b9b9',
        },
      },
    },
  },
});
