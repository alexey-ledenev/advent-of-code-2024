type X = number;
type Y = number;

export const part1 = (input: string[]) => {
  const query = 'XMAS';
  const queryLength = query.length;
  const queryFirstChar = query[0];

  const directions: [X, Y][] = [
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
    [0, -1], // up
    [1, 1], // right-down
    [-1, -1], // left-up
    [1, -1], // right-up
    [-1, 1], // left-down
  ];

  let count = 0;

  const rows = input.length;
  for (let y = 0; y < rows; y++) {
    const cols = input[y].length;
    for (let x = 0; x < cols; x++) {
      const char = input[y][x];
      if (char !== queryFirstChar) continue;

      for (let d = 0; d < directions.length; d++) {
        for (let i = 1; i < queryLength; i++) {
          const [dx, dy] = directions[d];
          const nextX = x + dx * i;
          const nextY = y + dy * i;

          if (input[nextY]?.[nextX] !== query[i]) {
            break;
          }

          if (i === queryLength - 1) {
            count++;
          }
        }
      }
    }
  }

  return count;
};
