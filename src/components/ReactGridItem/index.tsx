import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
import API from '@/service/index'
import { getChartComponent } from './getComponent'
const { getWidgetConfig } = API
import classnames from 'classnames'
import { message } from 'antd'
import Loading from '../Loading'
import WidgetTitle from './WidgetTitle'
import WidgetMenu from './WidgetMenu'

interface PropsType {
  id: string
}
interface MenuItem {
  id: string
  name: string
}
export interface GirdLayoutItemConfig {
  chartName: string
  title: string
  customComponentName: string
  API?: string
  originalApi?: string
  reqMethod?: 'get' | 'post'
  width?: number
  height?: number
  component_bg_class: string
  menuList?: MenuItem[]
  menuId?: string
  color?: string
}
const Index = (props: PropsType): JSX.Element => {
  const windowSize = useWindowSize()
  const Container = useRef(document.createElement('div'))
  const [gridContainerHeight, setHeight] = useState(0)
  const [curSelectedMenu, setSelectedMenu] = useState('')
  const [gridContainerWidth, setWidth] = useState(0)
  // @ts-ignore
  const cfg: GirdLayoutItemConfig = {}
  const [config, setCfg] = useState(cfg)
  const { id } = props
  const widgetid = id
  const [component, setCmt] = useState(<></>)
  useEffect(() => {
    const getConfig = () => {
      getWidgetConfig({ widgetid }).then((res) => {
        if (res.success) {
          const config: GirdLayoutItemConfig = res.data
          const { menuList } = config
          let { API } = config
          const { reqMethod } = config
          if (!reqMethod) {
            message.error('返回的数据格式不满足')
          }
          let newConfig = Object.assign(config)
          if (menuList && menuList.length > 0) {
            const defaultMenu = menuList[0].id
            setSelectedMenu(defaultMenu)
            const originalApi = API
            API = originalApi.replace(':deviceid', defaultMenu)
            newConfig = Object.assign(newConfig, { API, originalApi })
          }
          setCfg(newConfig)
        }
      })
    }
    getConfig()
  }, [widgetid])
  const handleChange = (value: string, replaceKey: string) => {
    setSelectedMenu(value)
    let { API, originalApi } = config
    if (!originalApi) {
      originalApi = API
    }
    if (originalApi) {
      API = originalApi?.replace(replaceKey, value)
    }
    const newConfig = Object.assign(config, { API, originalApi })
    setCfg(newConfig)
  }
  useEffect(() => {
    // console.log('config change ', config)
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
  }, [config, config.API, gridContainerWidth, gridContainerHeight])
  useEffect(() => {
    if (Container.current && Container.current.offsetHeight) {
      setHeight(Container.current.offsetHeight - 40)
      setWidth(Container.current.offsetWidth)
    }
  }, [windowSize])
  return (
    <div
      ref={Container}
      {...props}
      className={classnames(styles.component_container, 'component-dft-cls', {
        [config.component_bg_class]: !!config.component_bg_class,
      })}
    >
      {config && config.reqMethod === undefined && <Loading />}

      {/*  customComponent */}
      {config &&
        config.reqMethod !== undefined &&
        config.customComponentName && <>{component}</>}

      {/* chartComponent */}
      {config && config.reqMethod !== undefined && config.chartName && (
        <>
          {config.title && <WidgetTitle title={config.title} />}
          {config.menuId && config.menuList && (
            <WidgetMenu
              handleChange={handleChange}
              curSelectedMenu={curSelectedMenu}
              menuList={config.menuList}
            />
          )}
          {component}
        </>
      )}
    </div>
  )
}
export default Index
