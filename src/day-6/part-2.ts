import { createRoute, getStartPosition, isDirection, isLoopError, isObstruction } from './utils.ts';

export const part2 = (input: string[]) => {
  const [startCoordinate, startDirection] = getStartPosition(input);

  const hasLoop = (x: number, y: number) => {
    try {
      createRoute(startCoordinate, startDirection, input, [x, y]);
      return false;
    } catch (error) {
      if (isLoopError(error)) return true;
      throw error;
    }
  };

  let obstructionsForLoopCount = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const value = input[y][x];
      if (isObstruction(value) || isDirection(value)) continue;
      if (hasLoop(x, y)) obstructionsForLoopCount++;
    }
  }

  return obstructionsForLoopCount;
};
