// @flow
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import { DraggableCore, DraggableEvent } from 'react-draggable'
import { Resizable } from 'react-resizable'
import { fastPositionEqual, perc, setTopLeft, setTransform } from './utils'
import {
  calcGridItemPosition,
  calcGridItemWHPx,
  calcGridColWidth,
  calcXY,
  calcWH,
  clamp,
} from './calculateUtils'
import classNames from 'classnames'
import {
  ReactDraggableCallbackData,
  GridDragEvent,
  GridResizeEvent,
  DroppingPosition,
  Position,
} from './utils'

import { PositionParams } from './calculateUtils'
import { ResizeHandles, ResizeHandle } from './ReactGridLayoutPropTypes'
type PartialPosition = { top: number; left: number }

interface State {
  resizing?: {
    width: number
    height: number
  }
  dragging?: { top: number; left: number }
  className: string
}

type Props = {
  children: any
  cols: number
  rows: number
  containerWidth: number
  containerHeight: number
  margin: [number, number]
  containerPadding: [number, number]
  rowHeight: number
  maxRows: number
  isDraggable: boolean
  isResizable: boolean
  isBounded: boolean
  static?: boolean
  useCSSTransforms?: boolean
  usePercentages?: boolean
  transformScale: number
  droppingPosition?: DroppingPosition

  className: string
  style?: CSSProperties
  // Draggability
  cancel: string
  handle: string

  x: number
  y: number
  w: number
  h: number

  minW: number
  maxW: number
  minH: number
  maxH: number
  i: string

  resizeHandles?: ResizeHandles
  resizeHandle?: ResizeHandle

  onDrag?: (i: string, w: number, h: number, Data: GridDragEvent) => void
  onDragStart?: (i: string, w: number, h: number, Data: GridDragEvent) => void
  onDragStop?: (i: string, w: number, h: number, Data: GridDragEvent) => void
  onResize?: (i: string, w: number, h: number, Data: GridResizeEvent) => void
  onResizeStart?: (
    i: string,
    w: number,
    h: number,
    Data: GridResizeEvent,
  ) => void
  onResizeStop?: (
    i: string,
    w: number,
    h: number,
    Data: GridResizeEvent,
  ) => void
}

export default class GridItem extends React.Component<Props, State> {
  static propTypes = {
    // Children must be only a single element
  }

  static defaultProps = {
    className: '',
    cancel: '',
    handle: '',
    minH: 1,
    minW: 1,
    maxH: Infinity,
    maxW: Infinity,
    transformScale: 1,
  }

  state: State = {
    className: '',
  }

  currentNode: HTMLElement

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // We can't deeply compare children. If the developer memoizes them, we can
    // use this optimization.
    if (this.props.children !== nextProps.children) return true
    if (this.props.droppingPosition !== nextProps.droppingPosition) return true
    // TODO memoize these calculations so they don't take so long?
    const oldPosition = calcGridItemPosition(
      this.getPositionParams(this.props),
      this.props.x,
      this.props.y,
      this.props.w,
      this.props.h,
      this.state,
    )
    const newPosition = calcGridItemPosition(
      this.getPositionParams(nextProps),
      nextProps.x,
      nextProps.y,
      nextProps.w,
      nextProps.h,
      nextState,
    )
    // console.log(' old position', oldPosition)
    // console.log('new position', newPosition)
    return (
      !fastPositionEqual(oldPosition, newPosition) ||
      this.props.useCSSTransforms !== nextProps.useCSSTransforms
    )
  }

  componentDidMount() {
    // console.log(' grid item props ', this.props)
    this.moveDroppingItem({})
  }

  componentDidUpdate(prevProps: Props) {
    this.moveDroppingItem(prevProps)
  }

  // When a droppingPosition is present, this means we should fire a move event, as if we had moved
  // this element by `x, y` pixels.
  moveDroppingItem(prevProps: Props) {
    const { droppingPosition } = this.props
    if (!droppingPosition) return

    const prevDroppingPosition = prevProps.droppingPosition || {
      left: 0,
      top: 0,
    }
    const { dragging } = this.state

    if (!this.currentNode) {
      // eslint-disable-next-line react/no-find-dom-node
      this.currentNode = ReactDOM.findDOMNode(this)
    }

    const shouldDrag =
      (dragging && droppingPosition.left !== prevDroppingPosition.left) ||
      droppingPosition.top !== prevDroppingPosition.top

    if (!dragging) {
      this.onDragStart(droppingPosition.e, {
        node: this.currentNode,
        deltaX: droppingPosition.left,
        deltaY: droppingPosition.top,
      })
    } else if (shouldDrag) {
      const deltaX = droppingPosition.left - dragging.left
      const deltaY = droppingPosition.top - dragging.top

      this.onDrag(droppingPosition.e, {
        node: this.currentNode,
        deltaX,
        deltaY,
      })
    }
  }

  getPositionParams(props: Props = this.props): PositionParams {
    return {
      cols: props.cols,
      rows: props.rows,
      containerPadding: props.containerPadding,
      containerWidth: props.containerWidth,
      containerHeight: props.containerHeight,
      margin: props.margin,
      maxRows: props.maxRows,
      rowHeight: props.rowHeight,
    }
  }

  /**
   * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
   * well when server rendering, and the only way to do that properly is to use percentage width/left because
   * we don't know exactly what the browser viewport is.
   * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
   * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
   *
   * @param  {Object} pos Position object with width, height, left, top.
   * @return {Object}     Style object.
   */
  createStyle(pos: Position): CSSProperties {
    const { usePercentages, containerWidth, useCSSTransforms } = this.props

    let style: CSSProperties
    // CSS Transforms support (default)
    if (useCSSTransforms) {
      style = setTransform(pos)
    } else {
      // top,left (slow)
      style = setTopLeft(pos)

      // This is used for server rendering.
      if (usePercentages) {
        style.left = perc(pos.left / containerWidth)
        style.width = perc(pos.width / containerWidth)
      }
    }

    return style
  }

  /**
   * Mix a Draggable instance into a child.
   * @param  {Element} child    Child element.
   * @return {Element}          Child wrapped in Draggable.
   */
  mixinDraggable(child: JSX.Element, isDraggable: boolean): JSX.Element {
    return (
      <DraggableCore
        disabled={!isDraggable}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.handle}
        cancel={
          '.react-resizable-handle' +
          (this.props.cancel ? ',' + this.props.cancel : '')
        }
        scale={this.props.transformScale}
      >
        {child}
      </DraggableCore>
    )
  }

  /**
   * Mix a Resizable instance into a child.
   * @param  {Element} child    Child element.
   * @param  {Object} position  Position object (pixel values)
   * @return {Element}          Child wrapped in Resizable.
   */
  mixinResizable(
    child: JSX.Element,
    position: Position,
    isResizable: boolean,
  ): JSX.Element {
    const {
      cols,
      x,
      minW,
      minH,
      maxW,
      maxH,
      transformScale,
      resizeHandles,
      resizeHandle,
    } = this.props
    const positionParams = this.getPositionParams()

    // This is the max possible width - doesn't go to infinity because of the width of the window
    const maxWidth = calcGridItemPosition(positionParams, 0, 0, cols - x, 0)
      .width

    // Calculate min/max constraints using our min & maxes
    const mins = calcGridItemPosition(positionParams, 0, 0, minW, minH)
    const maxes = calcGridItemPosition(positionParams, 0, 0, maxW, maxH)
    const minConstraints = [mins.width, mins.height]
    const maxConstraints = [
      Math.min(maxes.width, maxWidth),
      Math.min(maxes.height, Infinity),
    ]
    return (
      <Resizable
        draggableOpts={{
          disabled: !isResizable,
        }}
        className={isResizable ? undefined : 'react-resizable-hide'}
        width={position.width}
        height={position.height}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        onResizeStop={this.onResizeStop}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        transformScale={transformScale}
        resizeHandles={resizeHandles}
        handle={resizeHandle}
      >
        {child}
      </Resizable>
    )
  }

  onDragStart = (e: DraggableEvent, { node }: ReactDraggableCallbackData) => {
    const { onDragStart } = this.props
    if (!onDragStart) return

    const newPosition: PartialPosition = { top: 0, left: 0 }

    // TODO: this wont work on nested parents
    const { offsetParent } = node
    if (!offsetParent) return
    const parentRect = offsetParent.getBoundingClientRect()
    const clientRect = node.getBoundingClientRect()
    const cLeft = clientRect.left / this.props.transformScale
    const pLeft = parentRect.left / this.props.transformScale
    const cTop = clientRect.top / this.props.transformScale
    const pTop = parentRect.top / this.props.transformScale
    newPosition.left = cLeft - pLeft + offsetParent.scrollLeft
    newPosition.top = cTop - pTop + offsetParent.scrollTop
    this.setState({ dragging: newPosition })

    // Call callback with this data
    const { x, y } = calcXY(
      this.getPositionParams(),
      newPosition.top,
      newPosition.left,
      this.props.w,
      this.props.h,
    )

    return onDragStart.call(this, this.props.i, x, y, {
      e,
      node,
      newPosition,
    })
  }

  /**
   * onDrag event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node, delta and position information
   */
  onDrag = (
    e: DraggableEvent,
    { node, deltaX, deltaY }: ReactDraggableCallbackData,
  ) => {
    const { onDrag, transformScale } = this.props
    if (!onDrag) return
    deltaX /= transformScale
    deltaY /= transformScale

    if (!this.state.dragging) {
      throw new Error('onDrag called before onDragStart.')
    }
    let top = this.state.dragging.top + deltaY
    let left = this.state.dragging.left + deltaX

    const { isBounded, i, w, h, containerWidth } = this.props
    const positionParams = this.getPositionParams()

    // Boundary calculations; keeps items within the grid
    if (isBounded) {
      const { offsetParent } = node

      if (offsetParent) {
        const { margin, rowHeight } = this.props
        const bottomBoundary =
          offsetParent.clientHeight - calcGridItemWHPx(h, rowHeight, margin[1])
        top = clamp(top, 0, bottomBoundary)

        const colWidth = calcGridColWidth(positionParams)
        const rightBoundary =
          containerWidth - calcGridItemWHPx(w, colWidth, margin[0])
        left = clamp(left, 0, rightBoundary)
      }
    }

    const newPosition: PartialPosition = { top, left }
    this.setState({ dragging: newPosition })

    // Call callback with this data
    const { x, y } = calcXY(positionParams, top, left, w, h)
    return onDrag.call(this, i, x, y, {
      e,
      node,
      newPosition,
    })
  }

  onDragStop = (e: DraggableEvent, { node }: ReactDraggableCallbackData) => {
    const { onDragStop } = this.props
    if (!onDragStop) return

    if (!this.state.dragging) {
      throw new Error('onDragEnd called before onDragStart.')
    }
    const { w, h, i } = this.props
    const { left, top } = this.state.dragging
    const newPosition: PartialPosition = { top, left }
    this.setState({ dragging: null })

    const { x, y } = calcXY(this.getPositionParams(), top, left, w, h)

    return onDragStop.call(this, i, x, y, {
      e,
      node,
      newPosition,
    })
  }

  /**
   * onResizeStop event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  onResizeStop = (
    e: Event,
    callbackData: { node: HTMLElement; size: Position },
  ) => {
    this.onResizeHandler(e, callbackData, 'onResizeStop')
  }

  /**
   * onResizeStart event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  onResizeStart = (
    e: Event,
    callbackData: { node: HTMLElement; size: Position },
  ) => {
    this.onResizeHandler(e, callbackData, 'onResizeStart')
  }

  /**
   * onResize event handler
   * @param  {Event}  e             event data
   * @param  {Object} callbackData  an object with node and size information
   */
  onResize = (
    e: Event,
    callbackData: { node: HTMLElement; size: Position },
  ) => {
    this.onResizeHandler(e, callbackData, 'onResize')
  }

  /**
   * Wrapper around drag events to provide more useful data.
   * All drag events call the function with the given handler name,
   * with the signature (index, x, y).
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  onResizeHandler(
    e: Event,
    { node, size }: { node: HTMLElement; size: Position },
    handlerName: string,
  ) {
    const handler = this.props[handlerName]
    if (!handler) return
    const { cols, x, y, i, maxH, minH } = this.props
    let { minW, maxW } = this.props

    // Get new XY
    let { w, h } = calcWH(
      this.getPositionParams(),
      size.width,
      size.height,
      x,
      y,
    )

    // minW should be at least 1 (TODO propTypes validation?)
    minW = Math.max(minW, 1)

    // maxW should be at most (cols - x)
    maxW = Math.min(maxW, cols - x)

    // Min/max capping
    w = clamp(w, minW, maxW)
    h = clamp(h, minH, maxH)

    this.setState({ resizing: handlerName === 'onResizeStop' ? null : size })

    handler.call(this, i, w, h, { e, node, size })
  }

  render() {
    const {
      x,
      y,
      w,
      h,
      isDraggable,
      isResizable,
      droppingPosition,
      useCSSTransforms,
    } = this.props

    const pos = calcGridItemPosition(
      this.getPositionParams(),
      x,
      y,
      w,
      h,
      this.state,
    )
    const child = React.Children.only(this.props.children)

    // Create the child element. We clone the existing element but modify its className and style.
    let newChild = React.cloneElement(child, {
      className: classNames(
        'react-grid-item',
        child.props.className,
        this.props.className,
        {
          static: this.props.static,
          resizing: Boolean(this.state.resizing),
          'react-draggable': isDraggable,
          'react-draggable-dragging': Boolean(this.state.dragging),
          dropping: Boolean(droppingPosition),
          cssTransforms: useCSSTransforms,
        },
      ),
      // We can set the width and height on the child, but unfortunately we can't set the position.
      style: {
        ...this.props.style,
        ...child.props.style,
        ...this.createStyle(pos),
      },
    })

    // Resizable support. This is usually on but the user can toggle it off.
    newChild = this.mixinResizable(newChild, pos, isResizable)

    // Draggable support. This is always on, except for with placeholders.
    newChild = this.mixinDraggable(newChild, isDraggable)

    return newChild
  }
}
