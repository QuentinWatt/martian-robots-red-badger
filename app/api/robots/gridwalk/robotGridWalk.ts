type Direction = "N" | "E" | "S" | "W";

interface ScentMarker {
  x: number;
  y: number;
  direction: Direction;
}

export const handleGridWalk = (
  gridSize: string,
  robots: { startPosition: string; moves: string }[]
): string[] => {
  const gridWidth = parseInt(gridSize.split(" ")[0]);
  const gridHeight = parseInt(gridSize.split(" ")[1]);
  const scentMarkers: ScentMarker[] = [];

  const results: string[] = [];

  for (const robot of robots) {
    const startX = parseInt(robot.startPosition.split(" ")[0]);
    const startY = parseInt(robot.startPosition.split(" ")[1]);
    const startDirection = robot.startPosition.split(" ")[2] as Direction;
    const moves = robot.moves;

    const finalPosition = simulateRobotWalk(
      gridWidth,
      gridHeight,
      startX,
      startY,
      startDirection,
      moves,
      scentMarkers
    );

    results.push(finalPosition);
  }

  return results;
};

const simulateRobotWalk = (
  gridWidth: number,
  gridHeight: number,
  startX: number,
  startY: number,
  startDirection: Direction,
  moves: string,
  scentMarkers: ScentMarker[]
): string => {
  const directions: Direction[] = ["N", "E", "S", "W"];
  let x = startX;
  let y = startY;
  let direction = startDirection;
  let lost = false;

  for (const move of moves) {
    if (lost) break;

    if (move === "L") {
      const currentIndex = directions.indexOf(direction);
      direction = directions[(currentIndex - 1 + 4) % 4];
    } else if (move === "R") {
      const currentIndex = directions.indexOf(direction);
      direction = directions[(currentIndex + 1) % 4];
    } else if (move === "F") {
      let newX = x;
      let newY = y;

      switch (direction) {
        case "N":
          newY = y + 1;
          break;
        case "E":
          newX = x + 1;
          break;
        case "S":
          newY = y - 1;
          break;
        case "W":
          newX = x - 1;
          break;
      }

      if (newX < 0 || newX > gridWidth || newY < 0 || newY > gridHeight) {
        const hasScent = scentMarkers.some(
          (marker) =>
            marker.x === x && marker.y === y && marker.direction === direction
        );

        if (hasScent) {
          continue;
        } else {
          scentMarkers.push({ x, y, direction });
          lost = true;
          break;
        }
      }

      x = newX;
      y = newY;
    }
  }

  return `${x} ${y} ${direction}${lost ? " LOST" : ""}`;
};
