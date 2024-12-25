import { assertEquals } from 'jsr:@std/assert';
import { part2 } from './part-2.ts';

const testInput = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...',
];

Deno.test('Day 6 Part 2', () => {
  assertEquals(part2(testInput), 6);
});
