export const parseLine = (line: string) => {
  const numbers = line.split('   ').map(Number);
  if (numbers.length !== 2 || numbers.some(Number.isNaN)) {
    throw new Error('Invalid line');
  }
  return numbers as [number, number];
};
