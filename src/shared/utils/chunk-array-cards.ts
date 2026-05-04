export function chunkArrayCards<T>(arr: T[], count: number): T[][] {
  const size = Math.ceil(arr.length / count);
  return Array.from({ length: count }, (_, index) =>
    arr.slice(index * size, index * size + size)
  );
}
