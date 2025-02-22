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

function convertPointToInteger(point) {
  const [x, y] = point;
  return x * 8 + y;
}

function createSquares() {
  const squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      squares.push([i, j]);
    }
  }
  return squares;
}

function createAdjacencyList() {
  const adjacencyList = [];
  const squares = createSquares();

  squares.forEach((square, index) => {
    const moves = generateMoves(square);
    adjacencyList[index] = moves
      .map((move) => convertPointToInteger(move))
      .sort((x, y) => x - y);
  });

  return adjacencyList;
}

function searchEndPoint(possibleMoves, end) {
  return possibleMoves.includes(end);
}
