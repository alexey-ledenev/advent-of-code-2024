import { parseLine } from './utils.ts';

const formatInput = (lines: string[]) => {
  const formatted = lines.reduce<{ left: number[]; right: number[] }>(
    (result, line) => {
      const [left, right] = parseLine(line);
      result.left.push(left);
      result.right.push(right);
      return result;
    },
    { left: [], right: [] },
  );

  if (formatted.left.length > formatted.right.length) {
    throw new Error('Invalid input');
  }

  formatted.left.sort((a, b) => a - b);
  formatted.right.sort((a, b) => a - b);

  return formatted;
};

export const part1 = (input: string[]) => {
  const { left, right } = formatInput(input);

  return left.reduce((totalDistance, leftNumber, index) => {
    const rightNumber = right[index];
    return totalDistance + Math.abs(leftNumber - rightNumber);
  }, 0);
};
