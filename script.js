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

function convertPointToIndex(point) {
  const [x, y] = point;
  return x * 8 + y;
}

function convertIndexToPoint(index) {
  const points = createPoints();
  return points[index];
}

function createPoints() {
  const points = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      points.push([x, y]);
    }
  }
  return points;
}

function createAdjacencyList() {
  const adjacencyList = [];
  const points = createPoints();

  points.forEach((point) => {
    const moves = generateMoves(point);
    adjacencyList.push(
      moves.map((move) => convertPointToIndex(move)).sort((x, y) => x - y)
    );
  });

  return adjacencyList;
}

function searchEndIndex(moves, endIndex) {
  return moves.includes(endIndex);
}

function findShortestPath(startIndex, endIndex) {
  const adjacencyList = createAdjacencyList();
  let queue = [{ parent: null, move: startIndex }];

  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    const moves = adjacencyList[current.move];

    if (searchEndIndex(moves, endIndex)) {
      return generatePath(current, endIndex, queue);
    }

    moves.forEach((move) => queue.push({ parent: current.move, move }));
    queue = filterQueue(queue);
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

function generatePath(current, endIndex, queue) {
  let parent = queue.find((element) => element.move === current.parent);
  const path = [];

  while (parent !== undefined) {
    path.unshift(parent.move);
    parent = queue.find((element) => element.move === parent.parent);
  }

  path.push(current.move, endIndex);
  return path.map(convertIndexToPoint);
}

function outputPath(path) {
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((move) => console.log(move));
}

function knightMoves(startPoint, endPoint) {
  const startIndex = convertPointToIndex(startPoint);
  const endIndex = convertPointToIndex(endPoint);
  const path = findShortestPath(startIndex, endIndex);
  outputPath(path);
}

console.log(knightMoves([0, 0], [2, 6]));
