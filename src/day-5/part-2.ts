import { fixPagesOrder, getMiddlePage, isValidPagesOrder, parseInput } from './utils.ts';

export const part2 = (input: string[]) => {
  const { rules, pages } = parseInput(input);

  return pages.reduce((middlePagesSum, p) => {
    if (isValidPagesOrder(p, rules)) return middlePagesSum;
    const reorderedPages = fixPagesOrder(p, rules);
    if (reorderedPages.length === 0) return middlePagesSum;
    return middlePagesSum + getMiddlePage(reorderedPages);
  }, 0);
};
