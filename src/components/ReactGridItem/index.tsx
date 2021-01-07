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
interface PropsType extends IRouteComponentProps {
  id: string
}
const Index = (props: PropsType): JSX.Element => {
  console.log(props)
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)
  const [config, setCfg] = useState(null)
  const { id } = props
  const componentId = id
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
    const timer = setTimeout(() => {
      if (config) {
        const { chartName, customComponentName } = config
        let newConfig = Object.assign({}, config)
        if (gridContainerWidth) {
          newConfig = Object.assign({}, newConfig, {
            width: gridContainerWidth,
          })
        }
        if (gridContainerHeight) {
          newConfig = Object.assign({}, newConfig, {
            height: gridContainerHeight,
          })
        }
        const component = getChartComponent(
          chartName,
          customComponentName,
          newConfig,
        )
        setCmt(component)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [config, gridContainerWidth, gridContainerHeight])
  useEffect(() => {
    console.log(' windowsize change ')
    if (Container.current && Container.current.offsetHeight) {
      setHeight(Container.current.offsetHeight)
      setWidth(Container.current.offsetWidth)
    }
  }, [windowSize])
  return (
    <div
      ref={Container}
      {...props}
      className={props.className + ' component_bg_1'}
    >
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
