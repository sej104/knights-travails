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

function searchEndPoint(possibleMoves, endPoint) {
  return possibleMoves.includes(endPoint);
}

function levelOrder(startIndex, endIndex) {
  const adjacencyList = createAdjacencyList();
  let queue = [{ parent: null, move: startIndex }];
  let queueIndex = 0;

  while (queueIndex < queue.length) {
    const current = queue[queueIndex];
    const possibleMoves = adjacencyList[current.move];

    if (searchEndPoint(possibleMoves, endIndex)) {
      return generatePath(current, startIndex, endIndex, queue);
    }

    possibleMoves.forEach((move) => queue.push({ parent: current.move, move }));
    queue = filterQueue(queue);
    queueIndex += 1;
  }
}

function filterQueue(queue) {
  return queue.filter(
    (obj1, index, arr) =>
      arr.findIndex((obj2) =>
        ["parent", "move"].every((key) => obj2[key] === obj1[key])
      ) === index
  );
}

function generatePath(current, start, end, queue) {
  let parent = queue.find((element) => element.move === current.parent);
  const path = [parent.move, current.move, end];
  while (parent.parent) {
    parent = queue.find((element) => element.move === parent.parent);
    path.unshift(parent.move);
  }
  return path;
}

function knightMoves(start, end) {
  const startIndex = convertPointToInteger(start);
  const endIndex = convertPointToInteger(end);
  return levelOrder(startIndex, endIndex);
}

console.log(createAdjacencyList());
console.log(knightMoves([3, 3], [4, 3]));
