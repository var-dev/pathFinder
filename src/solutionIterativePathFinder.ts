import type { Coordinate } from "./exampleSolutionSinglePath.js"
import type { CoordinateStatus } from "./exampleReferenceMultiplePaths.js"
import { multiplePaths } from "./exampleReferenceMultiplePaths.js"

export const stash: Array<CoordinateStatus[]> = []

export function growStash(point:CoordinateStatus, stash: Array<CoordinateStatus[]>) {
  initializeStash(point, stash) // only for empty stash
  const {x, y, status} = point
  let processedPoint: CoordinateStatus = bogusPoint()
  stash.forEach((column) => {
    
    const {x: prevX, y: prevY, status: prevStatus} = column[0]!
    if(isNeighbor(prevX, prevY, x, y)) {
      if(isPointAlreadyProcessed(point, processedPoint)) return
      processedPoint = {...point}
      if (status === "F") {
        cloneColumn(prevX, prevY, stash)
        // do the below twice for both cloned columns
        const index = findColumnIndex(prevX, prevY, stash) as number
        stash[index]?.unshift({...point})
      }
      if (status === "E") {
        const index = findColumnIndex(prevX, prevY, stash) as number
        stash[index]?.unshift({...point})
        stash[index]?.unshift(bogusPoint())
        return
      }
      const index = findColumnIndex(prevX, prevY, stash) as number
      stash[index]?.unshift({...point})
    } // skip if not neighbor
  })
}
function bogusPoint(): CoordinateStatus {
  return {x: -1, y: -1, status: ""}
}

export function cloneColumn(x: number, y: number, stash: Array<CoordinateStatus[]>) {
  const columnIndex = findColumnIndex(x, y, stash)
  if (columnIndex === undefined) throw new Error("Column index not found")
  const columnToDuplicate = stash[columnIndex]
  if (columnToDuplicate === undefined) throw new Error("Column to duplicate does not exist")
  stash.push(structuredClone(columnToDuplicate))
}

export function findColumnIndex(x: number, y: number, stash: Array<CoordinateStatus[]>): number|undefined{
  if (stash.length === 0) {return undefined}
  return stash
    .reduce((previousIndex, column, index) => {
      if (column[0]?.x === x && column[0].y === y) {
        previousIndex = previousIndex ?? index
      }
      return previousIndex
    }, undefined as number|undefined)
}

function isNeighbor(x: number, y: number, neighborX: number, neighborY: number) {
  return  (neighborX === x + 1 && neighborY === y) ||
          (neighborX === x - 1 && neighborY === y) ||
          (neighborX === x && neighborY === y + 1) ||
          (neighborX === x && neighborY === y - 1);
}

function initializeStash(point:CoordinateStatus, stash: Array<CoordinateStatus[]>) {
  if(stash[0] === undefined || stash[0][0] === undefined) { stash[0] = [{...point}]}
}

function isPointAlreadyProcessed(point: CoordinateStatus, processedPoint: CoordinateStatus) {
  return point.x === processedPoint.x && point.y === processedPoint.y
}

export function iterativePathFinder (allPaths: CoordinateStatus[]) {
  const stash: Array<CoordinateStatus[]> = []
  allPaths.forEach((point: CoordinateStatus) => {
    growStash(point, stash)
  })
  return stash
}

// console.log(JSON.stringify(iterativePathFinder(multiplePaths)))