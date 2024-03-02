export function calculatePercentage(x: number, y: number): number {
  return Number(((x / y) * 100).toFixed(2)) || 0;
}
