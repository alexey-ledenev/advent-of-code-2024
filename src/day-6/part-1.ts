type Coordinate = [number, number];

const directions = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
} as const;
type DirectionsMap = typeof directions;
type Direction = keyof DirectionsMap;

const isDirection = (value: string): value is Direction => value in directions;

const isObstruction = (value: string): value is '#' => value === '#';

const go = ([x, y]: Coordinate, direction: Direction): Coordinate => {
  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
};

const nextDirections: Record<Direction, Direction> = {
  '^': '>',
  '>': 'v',
  'v': '<',
  '<': '^',
};
const getNextDirection = (direction: Direction): Direction => nextDirections[direction];

export const part1 = (input: string[]) => {
  let currentCoordinate: Coordinate = [0, 0];
  let direction: Direction | undefined;

  const rows = input.length;
  for (let y = 0; y < rows; y++) {
    const cols = input[y].length;
    for (let x = 0; x < cols; x++) {
      const value = input[y][x];
      if (isDirection(value)) {
        direction = value;
        currentCoordinate = [x, y];
        break;
      }
    }
  }

  if (direction === undefined) {
    throw new Error('Invalid input');
  }

  const visited = new Map<string, boolean>();
  visited.set(`${currentCoordinate[0]},${currentCoordinate[1]}`, true);

  let isInside = true;
  while (isInside) {
    const [x, y] = go(currentCoordinate, direction);

    if (y < 0 || y >= input.length || x < 0 || x >= input[y].length) {
      isInside = false;
      break;
    }

    if (isObstruction(input[y][x])) {
      direction = getNextDirection(direction);
    } else {
      currentCoordinate = [x, y];
      visited.set(`${x},${y}`, true);
    }
  }

  return visited.size;
};
