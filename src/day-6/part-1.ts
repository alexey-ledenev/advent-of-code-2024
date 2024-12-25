import { createRoute, getCoordinateStringFromRouteKey, getStartPosition } from './utils.ts';

export const part1 = (input: string[]) => {
  const route = createRoute(
    ...getStartPosition(input),
    input,
  );

  const visitedCoordinates = new Set<string>();
  const addToVisited = (routeKey: string) =>
    visitedCoordinates.add(getCoordinateStringFromRouteKey(routeKey));
  route.forEach(addToVisited);

  return visitedCoordinates.size;
};
