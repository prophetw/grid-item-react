import React, { useEffect, useRef } from 'react'

import * as echarts from 'echarts'

interface Props {
  configs: any
}
const EchartCore = (props: Props) => {
  const { configs } = props
  // console.log(' --------------- EchartBase configs', configs)
  const { width, height, config } = configs
  const echartDomRef = useRef(document.createElement('div'))
  useEffect(() => {
    if (echartDomRef.current) {
      const myChart = echarts.init(echartDomRef.current)
      myChart.setOption(config)
    }
  }, [echartDomRef])
  return <div ref={echartDomRef} style={{ height, width }}></div>
}
export default EchartCore
