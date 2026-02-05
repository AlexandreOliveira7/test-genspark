import { useRouter } from 'vue-router';
import { useToast } from './useToast';

export function useNavigation() {
  const router = useRouter();
  const { openToast } = useToast();

  function NavigationTo(
    name: string,
    params: Record<string, any> = {},
    query: Record<string, any> = {}
  ) {
    const exists = router.getRoutes().some((route) => route.name === name);

    if (!exists) {
      openToast('Rota não encontrada ou não configurada.', 'red_dg');
      return;
    }

    try {
      router.push({ name, params, query });
    } catch (error) {
      console.error('[Navigation Error]', error);
      openToast('Erro ao tentar navegar para a rota.', 'red_dg');
    }
  }

  return { NavigationTo };
}
