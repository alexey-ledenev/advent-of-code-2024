import { assertEquals } from 'jsr:@std/assert';
import { getInputFilePath, readLinesFromFile } from '../utils/input.ts';
import { part2 } from './part-2.ts';

Deno.test({
  name: 'Day 5 Part 2',
  permissions: { read: true },
  fn: async () => {
    const input = await readLinesFromFile(getInputFilePath(import.meta.url, 'input.example.txt'));
    const result = part2(input);
    assertEquals(result, 123);
  },
});
