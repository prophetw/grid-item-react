import React, { useEffect, useState } from 'react'
import styles from './index.less'
import { Responsive, WidthProvider } from 'react-grid-layout'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
const ResponsiveGridLayout = WidthProvider(Responsive)
const Index = (): JSX.Element => {
  const layout = [
    {
      x: 0,
      y: 0,
      w: 1,
      h: 61,
      i: '1',
    },
    {
      x: 1,
      y: 0,
      w: 2,
      h: 61,
      i: '2',
    },
    {
      x: 0,
      y: 61,
      w: 3,
      h: 113,
      i: '3',
    },
  ]
  const newLayout = {
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xxs: layout,
  }
  const [isLayoutChange, setChanged] = useState(false)
  useEffect(() => {
    console.log(' layout is changed ')
  }, [isLayoutChange])
  return (
    <div className={styles.index_page}>
      <ResponsiveGridLayout
        className="layout"
        layouts={newLayout}
        rowHeight={1}
        margin={[4, 4]}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        onBreakpointChange={(a, b) => {
          console.log(a)
          console.log(b)
        }}
        autoSize={true}
        onLayoutChange={(info) => {
          setChanged(info)
          console.log('layout change ', info)
        }}
      >
        <div key={'1'}>
          <span className="text">{'1'}</span>
        </div>
        <div key={'2'}>
          <span className="text">{'2'}</span>
        </div>
        <div key={'3'}>
          <span className="text">{'3'}</span>
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}
export default Index
