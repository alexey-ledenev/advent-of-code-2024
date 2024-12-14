import { assertEquals } from 'jsr:@std/assert';
import { getInputFilePath, readLinesFromFile } from '../utils/input.ts';
import { parseInput } from './utils.ts';

Deno.test({
  name: 'Parse input',
  permissions: { read: true },
  fn: async () => {
    const input = await readLinesFromFile(getInputFilePath(import.meta.url, 'input.example.txt'));
    const parsed = parseInput(input);

    assertEquals(parsed.rules.length, 21);
    assertEquals(parsed.rules[0][0], 47);
    assertEquals(parsed.rules[0][1], 53);
    assertEquals(parsed.rules[20][0], 53);
    assertEquals(parsed.rules[20][1], 13);

    assertEquals(parsed.pages.length, 6);
    assertEquals(parsed.pages[2][0], 75);
    assertEquals(parsed.pages[2][1], 29);
    assertEquals(parsed.pages[2][2], 13);
  },
});
