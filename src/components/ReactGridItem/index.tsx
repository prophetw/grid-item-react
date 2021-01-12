import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
import { IRouteComponentProps } from 'umi'
import API from '@/service/index'
import { getChartComponent } from './getComponent'
const { getComponentConfig } = API
interface PropsType {
  id: string
  className?: string
}

export interface GirdLayoutItemConfig {
  chartName?: string
  title?: string
  customComponentName?: string
  API?: string
  reqMethod?: 'get' | 'post'
  width?: number
  height?: number
  component_bg_class?: string
}
const Index = (props: PropsType): JSX.Element => {
  console.log(props)
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)
  const cfg: GirdLayoutItemConfig = {}
  const [config, setCfg] = useState(cfg)
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
        let newConfig: GirdLayoutItemConfig = Object.assign({}, config)
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
