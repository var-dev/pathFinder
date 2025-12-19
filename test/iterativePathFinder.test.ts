import { describe, it } from "node:test";
import * as assert from 'node:assert/strict';

import { singlePath, type Coordinate } from "../src/exampleSolutionSinglePath.js";
import type { CoordinateStatus } from "../src/exampleReferenceMultiplePaths.js";


import { findColumnIndex, cloneColumn, growStash, iterativePathFinder } from "../src/solutionIterativePathFinder.js";

import { multiplePaths } from "../src/exampleReferenceMultiplePaths.js";
import { allPaths } from "../src/exampleSolutionAllPaths.js";

describe("Verifying findColumnIndex to find column index in stash", ()=>{
  const stash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ], //column 0
      [{ x: 2, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ], // 1
      [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ],
      [{ x: 3, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ],
      [{ x: 1, y: 3, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ],
      [{ x: 3, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ],
      [{ x: 1, y: 3, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 11, y: 3, status: "N" }, ],
    ]
  it("should be single number",()=>{
    const actual = findColumnIndex(3,1, stash)
    const expectedColumn = 3
  
    assert.strictEqual(actual, expectedColumn) 
  })
  it("should return undefined on no match",()=>{
    const actual = findColumnIndex(3,7, stash)
    const expected = undefined
  
    assert.strictEqual(actual, expected) 
  })
})


describe("Verifying duplicateColumn to add new column to stash", ()=>{
    const stash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ], //column 0
      [{ x: 2, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ], // 1
      [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ], // column to be duplicated
      [{ x: 3, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 1, y: 3, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 3, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 1, y: 3, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
    ]
  const expectedNewStash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ], 
      [{ x: 2, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ], 
      [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 3, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 1, y: 3, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 3, y: 1, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 1, y: 3, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ],
      [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" }, { x: 1, y: 3, status: "N" }, ], // new column
    ]


  // const stash: CoordinateStatus[][] = [
  //     [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" },],
  //     [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
  //   ]
  // const expectedNewStash: CoordinateStatus[][] = [
  //     [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" },],
  //     [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
  //     [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },], // new column
  //   ]
  it("should duplicate column 2 in array stash and add as the last",()=>{
    cloneColumn(1,2, stash)
  
    assert.deepStrictEqual(structuredClone(stash), structuredClone(expectedNewStash)) 
  })
  // it("should ",()=>{
  //   const actual = ''
  //   const expected = '
  
  //   assert.strictEqual(actual, expected) 
  // })
})

describe('Here is how stash should be growing', ()=>{
  const stash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" },],
      [{ x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
    ]
  

  it("should add one point to column 2",()=>{
    const expectedNewStash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" },],
      [{ x: 1, y: 3, status: "N" }, { x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
    ]
    const point = { x: 1, y: 3, status: "N" };
    growStash(point, stash)

    assert.deepStrictEqual(structuredClone(stash), structuredClone(expectedNewStash))
  })
  it("should create new column if stash is empty",()=>{
    const stash: CoordinateStatus[][] = [[]]
    const expectedNewStash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, ],
    ]
    const point = { x: 1, y: 1, status: "N" };
    growStash(point, stash)

    assert.deepStrictEqual(structuredClone(stash), structuredClone(expectedNewStash))
  })
  it("should create new column if fork",()=>{
    const expectedNewStash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" },],
      [{ x: 1, y: 4, status: "F" }, { x: 1, y: 3, status: "N" }, { x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
      [{ x: 1, y: 4, status: "F" }, { x: 1, y: 3, status: "N" }, { x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
    ]
    const point = { x: 1, y: 4, status: "F" };
    growStash(point, stash)

    assert.deepStrictEqual(structuredClone(stash), structuredClone(expectedNewStash))
  })
    it("should alternate between 2 columns after fork",()=>{
    const expectedNewStash: CoordinateStatus[][] = [
      [{ x: 1, y: 1, status: "N" }, { x: 10, y: 2, status: "N" },],
      [{ x: 1, y: 3, status: "N" }, { x: 1, y: 4, status: "F" }, { x: 1, y: 3, status: "N" }, { x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
      [{ x: 1, y: 5, status: "N" }, { x: 1, y: 4, status: "F" }, { x: 1, y: 3, status: "N" }, { x: 1, y: 2, status: "N" }, { x: 10, y: 2, status: "N" },],
    ]
    growStash({ x: 1, y: 4, status: "F" }, stash)
    growStash({ x: 1, y: 3, status: "N" }, stash)
    growStash({ x: 1, y: 5, status: "N" }, stash)

    assert.deepStrictEqual(structuredClone(stash), structuredClone(expectedNewStash))
  })
})

describe('Confirming iterativePathFinder can split paths', ()=>{
  it("should find all paths",()=>{
    const actual = iterativePathFinder(multiplePaths)
    const expected = allPaths

    assert.deepStrictEqual(structuredClone(actual), structuredClone(expected))
  })
    it("should match the reference path to Exit",()=>{
    const allPaths = iterativePathFinder(multiplePaths)
    const extractedExitPath  = structuredClone(allPaths[(findColumnIndex(-1,-1, allPaths) as number)])
    extractedExitPath!.pop() // remove bogus point {x: -1, y: -1, status: ""}
    extractedExitPath?.reverse() // reverse to match reference path
    extractedExitPath!.pop() // remove 1,1 point
    const actualExitPath = extractedExitPath?.map((point)=>({x: point.x,y: point.y})) //normalize to {x,y} form
    const expected = singlePath

    assert.strictEqual(extractedExitPath?.length, expected.length)
    assert.strictEqual(JSON.stringify(actualExitPath), JSON.stringify(expected))
  })
})


//findColumnIndex(3,1, stash)
