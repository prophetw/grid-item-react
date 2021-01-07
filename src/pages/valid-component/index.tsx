import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
import { IRouteComponentProps } from 'umi'
import Pie from '@/components/Charts/Pie'
import Bar from '@/components/Charts/Bar'
import Area from '@/components/Charts/Area'
import Line from '@/components/Charts/Line'
import DataV from '@/components/CustomComponents/DataV'

import API from '@/service/index'
const { getComponentConfig } = API

const getChartComponent = (
  selectedChartName: string,
  customComponentName: string,
  componentConfig: any,
) => {
  if (selectedChartName) {
    switch (selectedChartName) {
      case 'Pie':
        return <Pie />
      case 'Area':
        return <Area config={componentConfig} />
      case 'Bar':
        return <Bar />
      case 'Line':
        return <Line />
      default:
        return <>没有找到对应的表格组件 {selectedChartName}</>
    }
  }
  if (customComponentName) {
    switch (customComponentName) {
      case 'DataV':
        return <DataV />
      default:
        return <>没有到该自定义组件 {customComponentName} </>
    }
  }
  return <>请选择图标类型或自定义组件名</>
}
type PropsType = IRouteComponentProps
const Index = (props: PropsType): JSX.Element => {
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)
  const [config, setCfg] = useState(null)
  const { location } = props
  const { query } = location
  const componentId = query.id
  const [component, setCmt] = useState(<></>)
  useEffect(() => {
    const getConfig = () => {
      getComponentConfig({ id: componentId }).then((res) => {
        if (res.success) {
          setCfg(res.data)
        }
      })
    }
    getConfig()
  }, [componentId])
  useEffect(() => {
    console.log('config change ', config)
    if (config) {
      const { chartName, customComponentName } = config
      const component = getChartComponent(
        chartName,
        customComponentName,
        config,
      )
      setCmt(component)
    }
  }, [config])
  useEffect(() => {
    console.log(' windowsize change ')
    if (Container.current && Container.current.offsetHeight) {
      setHeight(Container.current.offsetHeight)
    }
  }, [windowSize])
  return (
    <div className={styles.valid_component} ref={Container}>
      {config && (
        <>
          <p>{config.title}</p>
          {component}
        </>
      )}
    </div>
  )
}
export default Index
