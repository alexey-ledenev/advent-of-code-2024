export const parseLine = (line: string) => line.split(' ').map(Number);

export const checkNumbersSafety = (current: number, next: number, isIncreasing: boolean) => {
  if (current === next || (isIncreasing ? current > next : current < next)) return false;
  const diff = Math.abs(current - next);
  return diff > 0 && diff < 4;
};

export const checkLevelsSafety = (levels: number[]) => {
  if (levels.length < 2) return false;

  const isIncreasing = levels[0] < levels[1];

  let isSafe = true;
  let levelIdx = 0;

  while (levelIdx < levels.length - 1 && isSafe) {
    isSafe = checkNumbersSafety(levels[levelIdx], levels[levelIdx + 1], isIncreasing);
    levelIdx++;
  }

  return isSafe;
};
