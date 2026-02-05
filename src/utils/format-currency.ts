export function Currency(value: number | string | null | undefined): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  if (num === null || num === undefined || isNaN(num)) {
    return 'R$ 0,00';
  }

  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
