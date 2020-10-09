export function clamp(number, lower, upper) {
  number = +number;
  lower = +lower;
  upper = +upper;
  // lower = !Number.isNaN(lower) ? lower : 0;
  // upper = !Number.isNaN(upper) ? upper : 0;
  if (!Number.isNaN(number)) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
}

export function move(array, moveIndex, toIndex) {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}
