import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EchartCore from './EchartBase'
import store from 'store'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antLoadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

import { GirdLayoutItemConfig } from '../ReactGridItem'
import Loading from '../Loading'
// https://echarts.apache.org/next/examples/en/index.html#chart-type-line

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
  // console.log(' ------- config ', config)
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(400)
  const [chartConfig, setChartConfig] = useState(null)
  const [isRequested, setIsReq] = useState(false)
  // const
  useEffect(() => {
    if (config && config.API) {
      setIsReq(false)
    }
  }, [(config && config.API) || undefined])
  useEffect(() => {
    if (chartConfig) {
      const { width, height } = config
      const newChartConfig = Object.assign(chartConfig, { width, height })
      setChartConfig(null)
      setTimeout(() => {
        setChartConfig(newChartConfig)
      })
    }
  }, [
    (config && config.width) || undefined,
    (config && config.height) || undefined,
  ])
  useEffect(() => {
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
            headers: {
              'access-token': store.get('token') || '',
              assetid: store.get('assetid') || '',
            },
          })
          .then((res) => {
            // console.log(' res ', res)
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
  }, [config, isRequested])
  if (chartConfig) {
    return <EchartCore configs={chartConfig} />
  } else {
    return <Loading />
  }
}
export { lineEchartSampleData }
LineEchartComponent.sampleData = lineEchartSampleData
export default LineEchartComponent
