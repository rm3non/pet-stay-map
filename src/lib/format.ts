export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(from?: string, to?: string): string {
  if (!from || !to) return 'Select dates';
  
  const fromDate = new Date(from);
  const toDate = new Date(to);
  
  const formatter = new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
  });
  
  return `${formatter.format(fromDate)} - ${formatter.format(toDate)}`;
}
