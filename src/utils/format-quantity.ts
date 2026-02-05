export function Quantity(value: number | string | null | undefined): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  if (num === null || num === undefined || isNaN(num)) {
    return 'Valor Inválido';
  }

  return num.toLocaleString('pt-BR');
}
