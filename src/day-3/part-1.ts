import { parseArguments } from './utils.ts';

/** `mul(x,y)` */
const regexp = /mul\((\d{1,3}),(\d{1,3})\)/gm;

export const part1 = (input: string) => {
  let sum = 0;
  const multiplyCalls = input.matchAll(regexp);

  for (const call of multiplyCalls) {
    const [x, y] = parseArguments(call);
    sum += x * y;
  }

  return sum;
};
