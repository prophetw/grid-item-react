import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import GridLayout from '@/components/GridLayout/ReactGridLayout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
import LayoutItem from '@/components/ReactGridItem/index'
import API from '@/service/index'
import Loading from '../Loading'
const { getComponentConfig } = API

interface Props {
  componentid: string
}

const Index = (props: Props): JSX.Element => {
  const { componentid } = props
  const windowSize = useWindowSize()
  const Container = useRef(document.createElement('div'))
  const [layout, setLayout] = useState(null)
  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)

  useEffect(() => {
    const getConfig = () => {
      getComponentConfig({ componentid }).then(
        (res) => {
          console.log('res', res)
          if (res.success) {
            const { data } = res
            setLayout(data)
          }
        },
        (err) => {
          console.log(err)
        },
      )
    }
    if (componentid) {
      getConfig()
    }
  }, [componentid])
  useEffect(() => {
    if (Container.current && Container.current.offsetHeight) {
      setHeight(Container.current.offsetHeight)
    }
    if (windowSize.width) {
      setWidth(windowSize.width)
    }
  }, [windowSize])
  useEffect(() => {
    console.log(layout)
  }, [layout])
  return (
    <div className={styles['demo1-container']}>
      <div className={styles.index_page} ref={Container}>
        {!layout && <Loading />}
        {gridContainerHeight && gridContainerWidth && layout && (
          <GridLayout
            style={{ height: '100%' }}
            className="layout"
            layout={layout}
            margin={[24, 24]}
            cols={12}
            rowHeight={1}
            isDraggable={false}
            isResizable={false}
            width={gridContainerWidth}
            // ??????????????????????????? rows ??? cols ?????????????????????height????????????????????????
            height={gridContainerHeight}
            rows={12}
          >
            {layout &&
              layout.map((item) => (
                <LayoutItem key={item.i} id={item.i}></LayoutItem>
              ))}
          </GridLayout>
        )}
      </div>
    </div>
  )
}
export default Index
