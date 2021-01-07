import React, { useEffect, useState } from 'react'
import styles from './index.less'
import LeftAside from './leftAside'
import RightAside from './rightAside'
import { IRouteComponentProps, useModel } from 'umi'
import { EditorModalType } from '@/models/useEditorModel'
import Pie from '@/components/Charts/Pie'
import Bar from '@/components/Charts/Bar'
import Area from '@/components/Charts/Area'
import Line from '@/components/Charts/Line'
import DataV from '@/components/CustomComponents/DataV'
import { Button } from 'antd'
const Index = (props: IRouteComponentProps): JSX.Element => {
  const { location } = props
  const { query } = location
  const { id } = query
  if (id) {
    console.log(id)
  } else {
    // console.log(' no id ')
  }
  // const { title } = useEditorState()
  const {
    title,
    customComponentName,
    selectedChartName,
    onFormValueChange,
    saveConfig,
    component_bg_class,
    componentConfig,
  } = useModel('useEditorModel', (model: EditorModalType) => model)
  const [component, setCmpnt] = useState(<></>)
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
          onFormValueChange('chartSampleData', Area.sampleData)
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

  useEffect(() => {
    const component = getChartComponent(
      selectedChartName,
      customComponentName,
      componentConfig,
    )
    setCmpnt(component)
  }, [selectedChartName, customComponentName, componentConfig])
  return (
    <div className={styles.editor_container}>
      {!id && (
        <>
          <LeftAside />
          <div>
            <div
              className={styles.component_container + ' ' + component_bg_class}
            >
              <h1>标题: {title} </h1>
              {component}
            </div>
            <div>
              <Button
                onClick={() => {
                  saveConfig()
                }}
              >
                控制台打印配置
              </Button>
              <Button>配置保存到服务端</Button>
            </div>
          </div>
          <RightAside></RightAside>
        </>
      )}
      {/* {id && (
        <>
          <LeftAside selectChart={setSelChart}></LeftAside>
          <div className={styles.content_part}>
            <h1>标题: {title} </h1>
            {getChartComponent(selectedChart)}
          </div>
          <RightAside></RightAside>
        </>
      )} */}
    </div>
  )
}
export default Index
