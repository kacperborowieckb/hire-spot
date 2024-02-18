export function calculatePercentage(x: number, y: number): number {
  return parseInt(((x / y) * 100).toFixed(2)) || 0;
}
