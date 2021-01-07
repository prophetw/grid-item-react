import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import GridLayout from '../../components/GridLayout/ReactGridLayout'
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
import LayoutItem from '@/components/ReactGridItem/index'
const Index = (): JSX.Element => {
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const layout1 = [
    { w: 12, h: 3, x: 0, y: 0, i: 'a', moved: false, static: false },
    { w: 4, h: 4, x: 0, y: 3, i: '1', moved: false, static: false },
    { w: 4, h: 5, x: 0, y: 7, i: '50', moved: false, static: false },
    { w: 8, h: 9, x: 4, y: 3, i: '46', moved: false, static: false },
  ]
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
    <div className={styles['demo1-container']}>
      <div className={styles.index_page} ref={Container}>
        {gridContainerHeight && gridContainerWidth && (
          <GridLayout
            style={{ height: '100%' }}
            className="layout"
            layout={layout1}
            margin={[4, 4]}
            cols={12}
            rowHeight={1}
            isDraggable={false}
            isResizable={false}
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
              <LayoutItem key={item.i} id={item.i}></LayoutItem>
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  )
}
export default Index
