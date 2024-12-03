import { parseLine } from './utils.ts';

export const part2 = (input: string[]) => {
  const lists = input.map(parseLine);

  const appearancesMap = lists.reduce((map, [_, right]) => {
    const count = map.get(right) ?? 0;
    map.set(right, count + 1);
    return map;
  }, new Map<number, number>());

  return lists.reduce((sum, [num]) => sum + (num * (appearancesMap.get(num) ?? 0)), 0);
};
