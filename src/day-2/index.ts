import { getInputFilePath, readLinesFromFile } from '../utils/input.ts';
import { part1 } from './part-1.ts';
import { part2 } from './part-2.ts';

const inputData = await readLinesFromFile(getInputFilePath(import.meta.url));

console.log(`Part 1: ${part1(inputData)}`);
console.log(`Part 2: ${part2(inputData)}`);
