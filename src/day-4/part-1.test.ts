import { assertEquals } from 'jsr:@std/assert';
import { part1 } from './part-1.ts';

const testInput = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX',
];

Deno.test('Day 4 Part 1', () => {
  assertEquals(part1(testInput), 18);
});
