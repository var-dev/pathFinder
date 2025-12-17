
import type { CoordinateStatus } from "./exampleReferenceMultiplePaths.js";
import type { Coordinate } from "./exampleSolutionSinglePath.js";

function isNeighbor(x: number, y: number, neighborX: number, neighborY: number) {
  return  (neighborX === x + 1 && neighborY === y) ||
          (neighborX === x - 1 && neighborY === y) ||
          (neighborX === x && neighborY === y + 1) ||
          (neighborX === x && neighborY === y - 1);
}

export let solutionSinglePath: Coordinate[] = []
export function recursivePathFinder(x: number, y: number, allPaths: CoordinateStatus[], singlePath: Coordinate[]){
  allPaths.forEach((point: CoordinateStatus, index, array) => {
    if (isNeighbor(x, y, point.x, point.y)) {
      const {x: nextX, y: nextY} = point
      x = nextX
      y = nextY
      singlePath.push({x, y});
      if (point.status === "E") {
        solutionSinglePath = [...singlePath]
        return
      }

      if (point.status === "F") {
        recursivePathFinder(x, y, [...array].slice(index + 1), [...singlePath]);
        recursivePathFinder(x, y, [...array].slice(index + 2), [...singlePath]);
        recursivePathFinder(x, y, [...array].slice(index + 3), [...singlePath]);
        recursivePathFinder(x, y, [...array].slice(index + 4), [...singlePath]);
        return
      }

    }
  });
}

export function outputTestResults(multiplePaths: CoordinateStatus[]){
  recursivePathFinder(1, 1, multiplePaths, solutionSinglePath);
  return solutionSinglePath
}