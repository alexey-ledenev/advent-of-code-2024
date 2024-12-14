import { getMiddlePage, isValidPagesOrder, parseInput } from './utils.ts';

export const part1 = (input: string[]) => {
  const { rules, pages } = parseInput(input);
  return pages.reduce((middlePagesSum, p) => {
    if (isValidPagesOrder(p, rules)) {
      return middlePagesSum + getMiddlePage(p);
    }
    return middlePagesSum;
  }, 0);
};
