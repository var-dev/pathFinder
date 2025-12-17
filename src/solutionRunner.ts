
import { recursivePathFinder, solutionSinglePath } from "./solutionRecursivePathFinder.js";
import { multiplePaths } from "./exampleReferenceMultiplePaths.js";

recursivePathFinder(1, 1, multiplePaths, solutionSinglePath);
console.log( JSON.stringify(solutionSinglePath));
console.log(solutionSinglePath.length);
