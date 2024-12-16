// https://adventofcode.com/2024/day/6

import { getInputFilePath, readLinesFromFile } from '../utils/input.ts';
import { part1 } from './part-1.ts';

const inputData = await readLinesFromFile(getInputFilePath(import.meta.url));

console.log(`Part 1: ${part1(inputData)}`);
