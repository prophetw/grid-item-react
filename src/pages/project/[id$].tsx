import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import GridLayout from '../../components/GridLayout/ReactGridLayout'
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { useWindowSize } from '@/components/Hooks/useWindowSize'
import Header from './header'
import { IRouteComponentProps } from 'umi'
import API from '@/service/index'
const { getLayout } = API
const Index = (props: IRouteComponentProps): JSX.Element => {
  const windowSize = useWindowSize()
  const Container = useRef(null)
  const layout1 = [{ i: 'a', x: 0, y: 0, w: 12, h: 6 }]

  const [gridContainerHeight, setHeight] = useState(0)
  const [gridContainerWidth, setWidth] = useState(0)
  // console.log(props)
  const { match } = props
  const { params } = match
  const projectId = params.id
  useEffect(() => {
    if (Container.current && Container.current.offsetHeight) {
      setHeight(Container.current.offsetHeight)
    }
    if (windowSize.width) {
      setWidth(windowSize.width)
    }
  }, [windowSize])
  useEffect(() => {
    const getProjectLayout = async () => {
      const res = await getLayout({ projectid: projectId })
      console.log(res)
    }
    console.log(' projectId ', projectId)
    if (projectId) {
      getProjectLayout()
    }
  }, [projectId])
  return (
    <div className={styles.project_container}>
      <Header></Header>
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
    </div>
  )
}
export default Index
