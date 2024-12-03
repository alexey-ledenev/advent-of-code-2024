let [day] = Deno.args;
if (!day) {
  day = prompt('Please enter day number:') ?? '1';
}

const dayNumber = Number.parseInt(day);
if (Number.isNaN(dayNumber)) {
  console.error('Invalid day number');
  Deno.exit(1);
}

const folderPath = `${Deno.cwd()}/src/day-${dayNumber}`;
const scriptPath = `${folderPath}/index.ts`;

try {
  await Deno.lstat(scriptPath);
} catch {
  console.error(`Day ${dayNumber} not found`);
  Deno.exit(1);
}

const command = new Deno.Command(Deno.execPath(), {
  args: [`--allow-read=${folderPath}`, scriptPath],
});

try {
  console.log(`Starting day ${dayNumber}...`);

  const child = command.spawn();
  child.ref();
} catch (error) {
  console.error(`Error while running the day ${dayNumber}: `, error);
  Deno.exit(4);
}
