import { ref } from 'vue';

export type ToastColor = 'red_dg' | 'green_dg';

interface ToastInfo {
  text: string;
  color: ToastColor;
}

const toastInfo = ref<ToastInfo>({
  text: '',
  color: 'green_dg',
});
const showToast = ref(false);

const openToast = (text: string, color: ToastColor) => {
  toastInfo.value = { text, color };
  showToast.value = true;
};

export function useToast() {
  return {
    toastInfo,
    showToast,
    openToast,
  };
}
