// https://adventofcode.com/2024/day/3

import { getInputFilePath, readDataFromFile } from '../utils/input.ts';
import { part1 } from './part-1.ts';
import { part2 } from './part-2.ts';

const inputData = await readDataFromFile(getInputFilePath(import.meta.url));

console.log(`Part 1: ${part1(inputData)}`);
console.log(`Part 2: ${part2(inputData)}`);
