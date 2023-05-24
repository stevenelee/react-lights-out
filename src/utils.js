/** returns random choice of true, false, or false */

function chanceLightStartsOn() {
  const chances = [true, false, false];
  return chances[Math.floor(Math.random() * chances.length)];
}

export { chanceLightStartsOn };