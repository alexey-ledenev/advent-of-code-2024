let [day] = Deno.args;
if (!day) {
  day = prompt('Please enter day number:') ?? '1';
}

const dayNumber = Number.parseInt(day);
if (Number.isNaN(dayNumber)) {
  console.error('Invalid day number');
  Deno.exit(1);
}

console.log(`Starting day ${dayNumber}...`);
