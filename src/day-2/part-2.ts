import { checkLevelsSafety, parseLine } from './utils.ts';

export const part2 = (input: string[]) =>
  input.reduce((safeCount, line) => {
    const levels = parseLine(line);
    const isSafe = checkLevelsSafety(levels);
    if (isSafe) return safeCount + 1;

    const isTolerated = levels.some((_, idx) => checkLevelsSafety(levels.toSpliced(idx, 1)));
    if (isTolerated) return safeCount + 1;

    return safeCount;
  }, 0);
