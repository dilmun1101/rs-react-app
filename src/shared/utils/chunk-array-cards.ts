const COUNT_OF_CARDS = 44;

export function chunkArrayCards<T>(arr: T[], countOfChunks: number): T[][] {
  if (arr.length === 0) return [];
  if (arr.length <= COUNT_OF_CARDS) return [arr];

  const size = Math.ceil(arr.length / countOfChunks);

  return Array.from({ length: countOfChunks }, (_, index) =>
    arr.slice(index * size, index * size + size)
  ).filter((chunk) => chunk.length > 0);
}
