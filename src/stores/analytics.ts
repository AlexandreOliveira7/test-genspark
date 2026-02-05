import { useGoogleTags } from '@/composables/useGoogleTags';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useUserStore } from './user';

export const useAnalyticsStore = defineStore('analytics', () => {
  const { trackGoogleTags } = useGoogleTags();
  const userStore = useUserStore();
  const counters = reactive<Record<string, number>>({});
  const threshold = 1;

  const increment = (eventKey: string, description: string) => {
    counters[eventKey] = (counters[eventKey] || 0) + 1;
    if (counters[eventKey] >= threshold) {
      trackGoogleTags('Analítico da loja virtual', {
        usuario: userStore.email ?? 'Não encontrado',
        funcionality: eventKey,
        text: `Utilizou a funcionalidade de ${description} ${threshold} ${threshold > 1 ? 'vezes' : 'vez'}.`,
      });
      counters[eventKey] = 0;
    }
  };

  return { increment };
});
