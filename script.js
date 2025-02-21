function checkOutOfBounds(point) {
  for (let coordinate of point) {
    if (coordinate < 0 || coordinate > 7) return false;
  }
  return true;
}

function generateMoves(point) {
  const [x, y] = point;
  const moves = [];
  moves.push(
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x + 1, y - 2],
    [x + 1, y + 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y - 2],
    [x - 1, y + 2]
  );
  return moves.filter(checkOutOfBounds);
}
