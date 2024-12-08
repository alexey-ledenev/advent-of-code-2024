export const part2 = (input: string[]) => {
  const query = 'MAS';
  const queryReversed = query.split('').reverse().join('');
  const queryLength = query.length;
  const firstChar = query[0];
  const lastChar = queryReversed[0];

  let count = 0;

  const lastY = input.length - queryLength;
  for (let y = 0; y <= lastY; y++) {
    const lastX = input[y].length - queryLength;
    for (let x = 0; x <= lastX; x++) {
      const leftChar = input[y][x];
      if (leftChar !== firstChar && leftChar !== lastChar) continue;
      const rightX = x + queryLength - 1;
      const rightChar = input[y][rightX];
      if (rightChar !== firstChar && rightChar !== lastChar) continue;

      const leftToRight = leftChar === firstChar ? query : queryReversed;
      const rightToLeft = rightChar === firstChar ? query : queryReversed;

      let isValidCross = true;
      for (let i = 1; i < queryLength; i++) {
        const nextLeft = input[y + i][x + i];
        if (nextLeft !== leftToRight[i]) {
          isValidCross = false;
          break;
        }

        const nextRight = input[y + i][rightX - i];
        if (nextRight !== rightToLeft[i]) {
          isValidCross = false;
          break;
        }
      }

      if (isValidCross === true) count++;
    }
  }

  return count;
};
