export function randomColor() {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256); // Random number between 0 and 255
  const g = Math.floor(Math.random() * 256); // Random number between 0 and 255
  const b = Math.floor(Math.random() * 256); // Random number between 0 and 255

  // Convert the values to hexadecimal and concatenate them
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
