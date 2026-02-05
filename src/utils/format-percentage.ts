export function Percentage(value: number | string | null | undefined): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  if (num === null || num === undefined || isNaN(num)) {
    return '-';
  }

  return `${num.toFixed(2).replace('.', ',')}%`;
}
