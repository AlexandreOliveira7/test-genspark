import { ref } from 'vue';

export function useLoading(initialValue = false) {
  const isLoading = ref<boolean>(initialValue);

  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
