import { parseArguments } from './utils.ts';

/** `mul(x,y)` or `do()` or `don't()` */
const regexp = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gm;

export const part2 = (input: string) => {
  const instructions = input.matchAll(regexp);

  let sum = 0;
  let isEnabled = true;

  for (const instruction of instructions) {
    if (instruction[0] === 'do()') {
      isEnabled = true;
      continue;
    }
    if (instruction[0] === "don't()") {
      isEnabled = false;
      continue;
    }
    if (!isEnabled) continue;

    const [x, y] = parseArguments(instruction);
    sum += x * y;
  }

  return sum;
};
