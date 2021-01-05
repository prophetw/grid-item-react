import { Position } from './utils'

export type PositionParams = {
  margin: [number, number]
  containerPadding: [number, number]
  containerWidth: number
  rows?: number
  containerHeight?: number
  cols: number
  rowHeight: number
  maxRows: number
}

// Helper for generating column width
export function calcGridColWidth(positionParams: PositionParams): number {
  const { margin, containerPadding, containerWidth, cols } = positionParams
  return (
    (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols
  )
}

// Helper for generating column width
export function calcGridRowHeight(positionParams: PositionParams): number {
  const {
    rows,
    margin,
    containerPadding,
    containerHeight,
    cols,
  } = positionParams
  // console.log(' calcGridRowHeight positionparams ', positionParams);
  return (
    (containerHeight - margin[1] * (rows - 1) - containerPadding[1] * 2) / rows
  )
}

// This can either be called:
// calcGridItemWHPx(w, colWidth, margin[0])
// or
// calcGridItemWHPx(h, rowHeight, margin[1])
export function calcGridItemWHPx(
  gridUnits: number,
  colOrRowSize: number,
  marginPx: number,
) {
  // 0 * Infinity === NaN, which causes problems with resize contraints
  if (!Number.isFinite(gridUnits)) return gridUnits
  return Math.round(
    colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx,
  )
}

/**
 * Return position on the page given an x, y, w, h.
 * left, top, width, height are all in pixels.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
 * @param  {Number}  x                      X coordinate in grid units.
 * @param  {Number}  y                      Y coordinate in grid units.
 * @param  {Number}  w                      W coordinate in grid units.
 * @param  {Number}  h                      H coordinate in grid units.
 * @return {Position}                       Object containing coords.
 */
export function calcGridItemPosition(
  positionParams: PositionParams,
  x: number,
  y: number,
  w: number,
  h: number,
  state?: any,
): Position {
  const { margin, containerPadding, rows, containerHeight } = positionParams
  let rowHeight = positionParams.rowHeight
  const colWidth = calcGridColWidth(positionParams)
  if (rows && containerHeight) {
    rowHeight = calcGridRowHeight(positionParams)
  }
  // console.log('row height', rowHeight)
  let width = 0,
    height = 0,
    left = 0,
    top = 0
  // If resizing, use the exact width and height as returned from resizing callbacks.
  if (state && state.resizing) {
    width = Math.round(state.resizing.width)
    height = Math.round(state.resizing.height)
  }
  // Otherwise, calculate from grid units.
  else {
    width = calcGridItemWHPx(w, colWidth, margin[0])
    height = calcGridItemWHPx(h, rowHeight, margin[1])
  }

  // If dragging, use the exact width and height as returned from dragging callbacks.
  if (state && state.dragging) {
    top = Math.round(state.dragging.top)
    left = Math.round(state.dragging.left)
  }
  // Otherwise, calculate from grid units.
  else {
    top = Math.round((rowHeight + margin[1]) * y + containerPadding[1])
    left = Math.round((colWidth + margin[0]) * x + containerPadding[0])
  }

  return {
    width,
    height,
    top,
    left,
  }
}

/**
 * Translate x and y coordinates from pixels to grid units.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calculations.
 * @param  {Number} top                     Top position (relative to parent) in pixels.
 * @param  {Number} left                    Left position (relative to parent) in pixels.
 * @param  {Number} w                       W coordinate in grid units.
 * @param  {Number} h                       H coordinate in grid units.
 * @return {Object}                         x and y in grid units.
 */
export function calcXY(
  positionParams: PositionParams,
  top: number,
  left: number,
  w: number,
  h: number,
): { x: number; y: number } {
  const { margin, cols, maxRows, rows, containerHeight } = positionParams
  let rowHeight = positionParams.rowHeight
  const colWidth = calcGridColWidth(positionParams)
  if (rows && containerHeight) {
    rowHeight = calcGridRowHeight(positionParams)
  }
  // console.log('row height', rowHeight)
  // left = colWidth * x + margin * (x + 1)
  // l = cx + m(x+1)
  // l = cx + mx + m
  // l - m = cx + mx
  // l - m = x(c + m)
  // (l - m) / (c + m) = x
  // x = (left - margin) / (coldWidth + margin)
  let x = Math.round((left - margin[0]) / (colWidth + margin[0]))
  let y = Math.round((top - margin[1]) / (rowHeight + margin[1]))

  // Capping
  x = clamp(x, 0, cols - w)
  y = clamp(y, 0, maxRows - h)
  return { x, y }
}

/**
 * Given a height and width in pixel values, calculate grid units.
 * @param  {PositionParams} positionParams  Parameters of grid needed for coordinates calcluations.
 * @param  {Number} height                  Height in pixels.
 * @param  {Number} width                   Width in pixels.
 * @param  {Number} x                       X coordinate in grid units.
 * @param  {Number} y                       Y coordinate in grid units.
 * @return {Object}                         w, h as grid units.
 */
export function calcWH(
  positionParams: PositionParams,
  width: number,
  height: number,
  x: number,
  y: number,
): { w: number; h: number } {
  const { margin, maxRows, cols, rows, containerHeight } = positionParams
  const colWidth = calcGridColWidth(positionParams)
  let rowHeight = positionParams.rowHeight
  if (rows && containerHeight) {
    rowHeight = calcGridRowHeight(positionParams)
  }
  // width = colWidth * w - (margin * (w - 1))
  // ...
  // w = (width + margin) / (colWidth + margin)
  let w = Math.round((width + margin[0]) / (colWidth + margin[0]))
  let h = Math.round((height + margin[1]) / (rowHeight + margin[1]))

  // Capping
  w = clamp(w, 0, cols - x)
  h = clamp(h, 0, maxRows - y)
  return { w, h }
}

// Similar to _.clamp
export function clamp(num: number, lowerBound: number, upperBound: number) {
  return Math.max(Math.min(num, upperBound), lowerBound)
}
