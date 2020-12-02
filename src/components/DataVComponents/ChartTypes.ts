import { StyleConfig } from './StyleTypes'

type Transition =
  | 'linear'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'
type Series = Line | Bar | Pie
interface ChartXAxisLineOptions {
  show: boolean
  style: StyleConfig
}
interface ChartXAxisTickOptions {
  show: boolean
  style: StyleConfig
}
interface ChartXAxisSplitLineOptions {
  show: boolean
  style: StyleConfig
}
interface ChartXAxisLabelOptions {
  show: boolean
  style: StyleConfig
  formatter: Formatter
}
interface ChartYAxisOptions {
  name?: string
  show?: boolean
  data?: string[] | string
  position?: string
  nameGap?: number
  nameLocation?: string
  nameTextStyle?: StyleConfig
  min?: string | number
  max?: string | number
  interval?: number
  minInterval?: number
  maxInterval?: number
  boundaryGap?: boolean
  splitNumber?: number
  axisLine?: ChartXAxisLineOptions
  axisTick?: ChartXAxisTickOptions
  axisLabel?: ChartXAxisLabelOptions
  splitLine?: ChartXAxisSplitLineOptions
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}

interface ChartXAxisOptions {
  name?: string
  show?: boolean
  data?: string[] | string
  position?: string
  nameGap?: number
  nameLocation?: string
  nameTextStyle?: StyleConfig
  min?: string | number
  max?: string | number
  interval?: number
  minInterval?: number
  maxInterval?: number
  boundaryGap?: boolean
  splitNumber?: number
  axisLine?: ChartXAxisLineOptions
  axisTick?: ChartXAxisTickOptions
  axisLabel?: ChartXAxisLabelOptions
  splitLine?: ChartXAxisSplitLineOptions
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}
interface ChartGridOptions {
  left?: string | number
  right?: string | number
  top?: string | number
  bottom?: string | number
  style?: StyleConfig
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}
interface Indicator {
  name?: string
  min?: number
  max?: number
}
interface ChartRadarAxisLabelOptions {
  show?: boolean
  labelGap?: number
  color?: string[]
  style?: StyleConfig
}
interface ChartRadarAxisLineOptions {
  show?: boolean
  color?: string[]
  style?: StyleConfig
}
interface ChartRadarSplitLineOptions {
  show?: boolean
  color?: string[]
  style?: StyleConfig
}
interface ChartRadarSplitAreaOptions {
  show?: boolean
  color?: string[]
  style?: StyleConfig
}
interface ChartRadarOptions {
  show?: boolean
  center?: any[]
  radius?: string | number
  startAngle?: number
  splitNum?: number
  polygon?: boolean
  indicator?: Indicator[]
  axisLabel?: ChartRadarAxisLabelOptions
  axisLine?: ChartRadarAxisLineOptions
  splitLine?: ChartRadarSplitLineOptions
  splitArea?: ChartRadarSplitAreaOptions
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}
export interface ChartOptions {
  title?: ChartTitleOptions
  legend?: ChartLegendOptions
  series?: Series[]
  color?: string[]
  xAxis?: ChartXAxisOptions
  yAxis?: ChartYAxisOptions // y axis property
  grid?: ChartGridOptions
  radar?: ChartRadarOptions
}

interface ChartTitleOptions {
  show?: boolean
  text?: string
  offset?: [number, number]
  style?: StyleConfig // {Class Style的配置项}
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}

type ChartLegendData = string | any
interface ChartLegendOptions {
  show?: boolean
  // "show", "orient", "left", "right", "top", "bottom", "itemGap", "iconWidth", "iconHeight", "selectAble", "data", "textStyle", "iconStyle", "textUnselectedStyle", "iconUnselectedStyle", "rLevel", "animationCurve", "animationFrame"
  orient?: string
  left?: string | number
  right?: string | number
  top?: string | number
  bottom?: string | number
  itemGap?: number
  iconWidth?: number
  iconHeight?: number
  selectAble?: boolean
  data?: ChartLegendData[]
  textStyle?: StyleConfig
  iconStyle?: StyleConfig
  textUnselectedStyle?: StyleConfig
  iconUnselectedStyle?: StyleConfig
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}

interface LinePoint {
  show: boolean
  style: StyleConfig // {Class Style的配置项}
  radius: number
}
interface LineArea {
  show: boolean
  gradient: any[]
  style: string // {Class Style的配置项}
}
type Position = 'top' | 'center' | 'bottom'
interface Label {
  show: boolean
  position: Position
  offset: [number, number]
  formatter: Formatter
  style: StyleConfig // {Class Style的配置项}
}
type ChartType = 'line' | 'bar' | 'pie' | 'radar' | 'gauge'
//charts.jiaminghi.com/config/line.html
type Line = {
  type: 'line'
  show?: boolean
  name?: string
  stack?: string
  smooth?: boolean
  xAxisIndex?: number
  yAxisIndex?: number
  data: any[]
  lineStyle?: StyleConfig //{Class Style的配置项}
  linePoint?: LinePoint
  lineArea?: LineArea
  label?: Label
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}
type BarShapeType = 'normal' | 'leftEchelon' | 'rightEchelon'
interface BackgroudBar {
  show: boolean
  width?: number
  style?: StyleConfig
}
interface Gradient {
  local: boolean
  color?: any[]
}
// http://charts.jiaminghi.com/config/bar.html
type Bar = {
  //  "", "", "rLevel", "animationCurve", "animationFrame"
  type: 'bar'
  show?: boolean
  name?: string
  stack?: string
  shapeType?: BarShapeType
  echelonOffset?: number
  barWidth?: string | number // e.g 'auto' | '10%' | 20
  barGap?: string | number // e.g '30%' | 30
  barCategoryGap?: string | number // e.g. '20%' | 20 http://charts.jiaminghi.com/config/bar.html#barcategorygap
  xAxisIndex?: number
  yAxisIndex?: number
  data: any[]
  backgroupBar?: BackgroudBar
  label?: Label
  gradient?: Gradient
  barStyle?: StyleConfig
  independentColor?: boolean
  independentColors?: any[]
  rLevel?: number
  animationCurve?: Transition
  animationFrame?: number
}
interface PieData {
  name: string
  value: number
}
interface PieInsideLabel {
  show?: boolean
  formatter?: Formatter
  style?: StyleConfig
}
type Formatter = any
interface PieOutSideLabel {
  show?: boolean
  formatter?: Formatter
  style?: StyleConfig
  labelLineBendGap?: string | number
  labelLineEndLength?: number
  labelLineStyle?: StyleConfig
}
type Pie = {
  //  "", "outsideLabel", "pieStyle", "percentToFixed", "rLevel", "animationDelayGap", "animationCurve", "startAnimationCurve", "animationFrame"
  type: 'pie'
  show?: boolean
  name?: string
  radius?: string | number
  center?: any[]
  startAngle?: number
  roseType?: boolean
  roseSort?: boolean
  roseIncrement?: string | number
  data: PieData[]
  insideLabel?: PieInsideLabel
  outsideLabel?: PieOutSideLabel
  pieStyle?: StyleConfig
  percentToFixed?: number
  rLevel?: number
  animationDelayGap?: number
  animationCurve?: Transition
  startAnimationCurve?: Transition
  animationFrame?: number
}
