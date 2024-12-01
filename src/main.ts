let [day] = Deno.args;
if (!day) {
  day = prompt('Please enter day number:') ?? '1';
}

const dayNumber = Number.parseInt(day);
if (Number.isNaN(dayNumber)) {
  console.error('Invalid day number');
  Deno.exit(1);
}

const filePath = `${Deno.cwd()}/src/day-${dayNumber}/index.ts`;

try {
  await Deno.lstat(filePath);
} catch {
  console.error(`Day ${dayNumber} not found`);
  Deno.exit(1);
}

const command = new Deno.Command(Deno.execPath(), {
  args: [filePath],
});

try {
  console.log(`Starting day ${dayNumber}...`);

  const child = command.spawn();
  child.ref();
} catch (error) {
  console.error(`Error while running the day ${dayNumber}: `, error);
  Deno.exit(4);
}
