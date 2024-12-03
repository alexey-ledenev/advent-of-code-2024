import { checkLevelsSafety, parseLine } from './utils.ts';

export const part1 = (input: string[]) =>
  input.reduce((safeCount, line) => {
    const isSafe = checkLevelsSafety(parseLine(line));
    if (isSafe) return safeCount + 1;
    return safeCount;
  }, 0);
