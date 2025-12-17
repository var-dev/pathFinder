import { describe, it } from "node:test";
import * as assert from 'node:assert/strict';

import type { Coordinate } from "../src/exampleSolutionSinglePath.js";


import { multiplePaths } from "../src/exampleReferenceMultiplePaths.js";
import { singlePath } from "../src/exampleSolutionSinglePath.js";
import { outputTestResults } from "../src/solutionRecursivePathFinder.js";


describe("Verifying calculated single start-to-end path through the maze", ()=>{
  let calculatedSinglePath: Coordinate[] = []
  it("should be that the calculated array is of same size as the sample",()=>{
    
    calculatedSinglePath = outputTestResults(multiplePaths)
    assert.strictEqual(calculatedSinglePath.length, singlePath.length) // length=280

  })
  it("should calculate single path from multiple paths",()=>{
    assert.deepStrictEqual(singlePath, calculatedSinglePath)

  })
})

