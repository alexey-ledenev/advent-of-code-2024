import { assertEquals } from 'jsr:@std/assert';
import { part1 } from './part-1.ts';

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

Deno.test('Day 6 Part 1', () => {
  assertEquals(part1(testInput), 41);
});
