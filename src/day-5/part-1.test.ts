import { assertEquals } from 'jsr:@std/assert';
import { getInputFilePath, readLinesFromFile } from '../utils/input.ts';
import { part1 } from './part-1.ts';

Deno.test({
  name: 'Day 5 Part 1',
  permissions: { read: true },
  fn: async () => {
    const input = await readLinesFromFile(getInputFilePath(import.meta.url, 'input.example.txt'));
    const result = part1(input);
    assertEquals(result, 143);
  },
});
