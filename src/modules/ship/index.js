export default function Ship(length) {
  let hits = 0;

  function hit() {
    hits++;
  }

  function isSunk() {
    return hits >= length;
  }

  return { hit, isSunk, length };
}
