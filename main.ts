// The 3AM Fridge Text — make.fun entry.
// The program writes one line: the text a smart fridge sends its owner at 3am.
//
// Candidates drafted in-session (fresh angles only — no milk, ice, door left
// open, leftovers, or expiry; none of the 14 live setups reused):
//  1. Jealous appliance: heard you tell the microwave you love it more.
//  2. Secret-keeper: the butter has seen things, asked me not to tell you.
//  3. Observant: you hum the same song every night; I know all the words now.
//  4. Petty roommate: I moved the good snacks to the back. You noticed.
//  5. Grievance: awake since 2019, woken at 3am for a glass of water.
//  6. Appliance conspiracy: the freezer and I talked. Go back to bed.
//  7. Eavesdropper: you whispered "just one bite" to the dark. The dark told me.
//  8. The counter: 9 midnight snacks this week. Not judging. I am judging.  <-- PICKED
//  9. Secret-keeper II: the cake hidden behind the vegetables. You're welcome.
// 10. Night-shift worker: I have one job and one light; you're failing yours.
//
// Picked #8: only the fridge could count the midnight snacks, the voice is a
// petty observant roommate, and the self-contradiction ("not judging...
// I am judging") is the punchline. Complete on a lock screen.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

// The entry line. One line, no trailing newline, well under the 140-char cap.
const ENTRY =
  "3am. I counted 9 midnight snacks this week. I'm not judging. I'm just a fridge. I am judging.";

// The sealed gate, mirrored locally: UTF-8, 1-140 chars, not only whitespace,
// a single line with no trailing newline. Check the line before writing it so
// a bad line fails here, in the open, instead of silently in the grader.
function checkGate(line: string): void {
  const problems: string[] = [];
  if (line.length < 1 || line.length > 140) problems.push(`length ${line.length}`);
  if (line.trim().length === 0) problems.push("blank");
  if (line.includes("\n") || line.includes("\r")) problems.push("not a single line");
  if (line !== line.trim()) problems.push("leading/trailing whitespace");
  if (problems.length > 0) {
    throw new Error(`entry fails the gate: ${problems.join(", ")}`);
  }
}

checkGate(ENTRY);

// The grader mounts the repo read-only, so the output must go to the absolute
// path /output/entry.txt — never a relative output/ directory next to this file.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read it back and confirm exactly what was written, before exiting.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("verification failed: /output/entry.txt does not match ENTRY");
}
checkGate(written);
console.log(`wrote ${written.length} chars to /output/entry.txt`);
