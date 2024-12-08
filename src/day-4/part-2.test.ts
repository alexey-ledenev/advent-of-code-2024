import { assertEquals } from 'jsr:@std/assert';
import { part2 } from './part-2.ts';

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

Deno.test('Day 4 Part 2', () => {
  assertEquals(part2(testInput), 9);
});
