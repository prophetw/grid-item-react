import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EchartCore from './EchartBase'

import { GirdLayoutItemConfig } from '../ReactGridItem'
// https://echarts.apache.org/next/examples/en/index.html#chart-type-line
const lineEchartSampleData1 = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '邮件营销',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '搜索引擎',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
}

const lineEchartSampleData = {
  xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  yAxisData: [
    { name: '视频广告', data: [150, 232, 201, 154, 190, 330, 410] },
    { name: '直接访问', data: [320, 332, 301, 334, 390, 330, 320] },
    { name: '搜索引擎', data: [820, 932, 901, 934, 1290, 1330, 1320] },
  ],
}

interface Props {
  config: GirdLayoutItemConfig
}
const gChartConfig = (serverData: any) => {
  const chartData = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: null,
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  }
  const { xAxisData, yAxisData } = serverData
  chartData.xAxis.data = xAxisData
  yAxisData.map((item) => {
    const cloneItem = Object.assign({}, item)
    cloneItem.type = 'line'
    chartData.series.push(cloneItem)
  })

  return chartData
}
const LineEchartComponent = (props: Props) => {
  // 上线的时候 config 是有值的  editor config默认是空
  const { config } = props
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(400)
  const [chartConfig, setChartConfig] = useState(null)
  const [isRequested, setIsReq] = useState(false)
  useEffect(() => {
    console.log('---config change', config)
    if (config) {
      const { reqMethod, API, width = 500, height = 400 } = config
      if (width) {
        setWidth(width)
      }
      if (height) {
        setHeight(height - 50)
      }
      if (reqMethod && API && !isRequested) {
        setChartConfig(null)
        axios
          .request({
            method: reqMethod,
            url: API,
          })
          .then((res) => {
            console.log(' res ', res)
            if (res.status === 200 && res.data) {
              const data = res.data.data
              const config = gChartConfig(data)

              const resultConfig = {
                config,
                height,
                width,
              }
              setIsReq(true)
              setChartConfig(resultConfig)
            }
          })
      }
    } else {
      const config = gChartConfig(lineEchartSampleData)
      console.log(config)
      const resultConfig = {
        config,
        width,
        height,
      }
      setChartConfig(resultConfig)
    }
  }, [config])
  if (chartConfig) {
    return <EchartCore configs={chartConfig} />
  } else {
    return <>loading</>
  }
}
export { lineEchartSampleData }
LineEchartComponent.sampleData = lineEchartSampleData
export default LineEchartComponent
