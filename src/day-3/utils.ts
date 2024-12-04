export const parseArguments = (args: string[]) => {
  const x = Number.parseInt(args[1], 10);
  const y = Number.parseInt(args[2], 10);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error('Invalid input');
  }

  return [x, y] as const;
};
