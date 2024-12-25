type Coordinate = [number, number];

const directions = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
} as const;
type DirectionsMap = typeof directions;
type Direction = keyof DirectionsMap;

export const isDirection = (value: string): value is Direction => value in directions;

export const isObstruction = (value: string): value is '#' => value === '#';

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

export const getStartPosition = (map: string[]): [Coordinate, Direction] => {
  let coordinate: Coordinate = [0, 0];
  let direction: Direction | undefined;

  const rows = map.length;
  for (let y = 0; y < rows; y++) {
    const cols = map[y].length;
    for (let x = 0; x < cols; x++) {
      const value = map[y][x];
      if (isDirection(value)) {
        direction = value;
        coordinate = [x, y];
        break;
      }
    }
  }

  if (direction === undefined) {
    throw new Error('Start position not found');
  }

  return [coordinate, direction];
};

const LOOP_ERROR_MESSAGE = 'Loop detected';
export const isLoopError = (error: unknown): error is Error =>
  (error as Error).message === LOOP_ERROR_MESSAGE;

const isOutOfBounds = (map: string[], [x, y]: Coordinate): boolean => {
  return y < 0 || y >= map.length || x < 0 || x >= map[y].length;
};

const isSameCoordinates = (
  a: Coordinate,
  b: Coordinate,
) => a[0] === b[0] && a[1] === b[1];

const isAdditionalObstruction = (
  coordToCheck: Coordinate,
  obstructionCoord?: Coordinate,
) => obstructionCoord !== undefined && isSameCoordinates(coordToCheck, obstructionCoord);

const getRouteKey = (coord: Coordinate, dir: Direction) => `${coord.join(',')},${dir}`;
export const getCoordinateStringFromRouteKey = (routeKey: string) =>
  routeKey.split(',').slice(0, 2).join(',');

export const createRoute = (
  startCoordinate: Coordinate,
  startDirection: Direction,
  map: string[],
  additionalObstruction?: Coordinate,
) => {
  let currentCoordinate = startCoordinate;
  let currentDirection = startDirection;

  const route = new Set<string>();

  while (true) {
    const routeKey = getRouteKey(currentCoordinate, currentDirection);
    if (route.has(routeKey)) {
      throw new Error(LOOP_ERROR_MESSAGE);
    }
    route.add(routeKey);

    const nextCoordinate = go(currentCoordinate, currentDirection);
    if (isOutOfBounds(map, nextCoordinate)) break;

    if (
      isObstruction(map[nextCoordinate[1]][nextCoordinate[0]]) ||
      isAdditionalObstruction(nextCoordinate, additionalObstruction)
    ) {
      currentDirection = getNextDirection(currentDirection);
    } else {
      currentCoordinate = nextCoordinate;
    }
  }

  return route;
};
