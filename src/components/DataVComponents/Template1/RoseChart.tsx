import * as React from 'react'

import { Charts } from '@jiaminghi/data-view-react'

import './RoseChart.less'
import { ChartOptions } from '../ChartTypes'

interface ChartData {
  name: string
  value: number
}
export interface ShowData {
  title: string
  data: ChartData[]
}
export interface RoseChartProps {
  getData: () => Promise<{
    title: string
    data: ChartData[]
  }>
  options?: ChartOptions
  title?: string
  refreshInterval: number
}
function getData() {
  let a: ChartOptions = {
    series: [
      {
        type: 'pie',
        radius: '50%',
        roseSort: false,
        data: [
          { name: '路基', value: randomExtend(40, 70) },
          { name: '交安设施', value: randomExtend(20, 30) },
          // { name: '日常养护', value: randomExtend(10, 50) },
          // { name: '桥通', value: randomExtend(5, 20) },
          // { name: '交通事故', value: randomExtend(40, 50) },
          // { name: '路面', value: randomExtend(20, 30) },
          // { name: '绿化', value: randomExtend(5, 10) },
          // { name: '计日工', value: randomExtend(20, 35) },
          // { name: '除雪', value: randomExtend(5, 10) },
        ],
        insideLabel: {
          show: false,
        },
        outsideLabel: {
          formatter: '{name} {percent}%',
          labelLineEndLength: 20,
          style: {
            fill: '#fff',
          },
          labelLineStyle: {
            stroke: '#fff',
          },
        },
        roseType: true,
      },
    ],
    color: [
      '#da2f00',
      '#fa3600',
      '#ff4411',
      '#ff724c',
      '#541200',
      '#801b00',
      '#a02200',
      '#5d1400',
      '#b72700',
    ],
  }
  return a
}

function randomExtend(minNum: number, maxNum: number) {
  if (arguments.length === 1) {
    return parseInt('' + (Math.random() * minNum + 1), 10)
  } else {
    return parseInt('' + (Math.random() * (maxNum - minNum + 1) + minNum), 10)
  }
}

export default (props: RoseChartProps) => {
  console.log(' qqq ')
  const { title, getData } = props
  const [option, setData] = React.useState({})

  React.useEffect(() => {
    const fetchData = async () => {
      console.log(' start ', Date.now())
      let result = await getData()
      console.log(' end  ', Date.now())
    }
    fetchData()
  }, [])
  return (
    <div id="rose-chart">
      <div className="rose-chart-title">{title}</div>
      <Charts option={option} />
    </div>
  )
}
