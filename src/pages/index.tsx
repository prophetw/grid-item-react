import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import GridLayout from '../components/GridLayout/ReactGridLayout'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
const Index = (): JSX.Element => {
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const layout1 = [{ i: 'a', x: 0, y: 0, w: 12, h: 6 }]
  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)
  useEffect(() => {
    if (Container.current && Container.current.offsetHeight) {
      setHeight(Container.current.offsetHeight)
    }
    if (windowSize.width) {
      setWidth(windowSize.width)
    }
  }, [windowSize])
  return (
    <div className={styles.index_page} ref={Container}>
      <GridLayout
        style={{ height: '100%' }}
        className="layout"
        layout={layout1}
        margin={[4, 4]}
        cols={12}
        rows={12}
        rowHeight={1}
        isResizable={false}
        isDraggable={false}
        width={gridContainerWidth}
        height={gridContainerHeight}
      >
        <div key="a">a</div>
      </GridLayout>
    </div>
  )
}
export default Index
