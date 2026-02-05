declare const gtag: (...args: any[]) => void;

export function useGoogleTags() {
  function trackGoogleConversion(conversionId: string, data: Record<string, any> = {}): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: conversionId,
        ...data,
      });
    } else {
      console.warn(`[Google Ads] gtag não disponível. Conversão não foi disparada.`);
    }
  }

  function trackGoogleTags(eventName: string, data: Record<string, any> = {}): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    } else {
      console.warn(`[Google Ads] gtag não disponível. Evento "${eventName}" não foi disparado.`);
    }
  }

  return { trackGoogleConversion, trackGoogleTags };
}
