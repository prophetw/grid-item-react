import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import GridLayout from '../../components/GridLayout/ReactGridLayout'
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { useWindowSize } from '@/components/Hooks/useWindowSize'

const Index = (): JSX.Element => {
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const layout1 = [{ i: 'a', x: 0, y: 0, w: 1, h: 1 }]
  const [layout, setLayout] = useState(layout1)
  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)
  const addNew = () => {
    const newLayoutItem = {
      i: '' + Math.round(Math.random() * 100),
      x: Math.round(Math.random() * 12),
      y: Math.round(Math.random() * 12),
      w: 1,
      h: 1,
    }
    setLayout((oldLayout) => {
      return [...oldLayout, newLayoutItem]
    })
  }
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
    <div className={styles['demo-container']}>
      <div className={styles.index_page} ref={Container}>
        {gridContainerHeight && gridContainerWidth && (
          <GridLayout
            style={{ height: '100%' }}
            className="layout"
            layout={layout1}
            margin={[4, 4]}
            cols={12}
            rowHeight={1}
            width={gridContainerWidth}
            onLayoutChange={(info) => {
              setLayout(info)
              console.log('layout change ', info)
            }}
            // 新增了一下两个参数 rows 和 cols 一样的概念，把height等分成对应的等分
            height={gridContainerHeight}
            rows={12}
          >
            {layout.map((item) => (
              <div key={item.i}>{item.i}</div>
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  )
}
export default Index
