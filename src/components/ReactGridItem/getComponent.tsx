import React from 'react'
import DataV from '@/components/CustomComponents/DataV'
import LineEchart from '../Charts/LineEchart'
import Test from '@/components/CustomComponents/Test'
import EnvMonitorHome from '../CustomComponents/EnvMonitorSummary'
//endimport

import { GirdLayoutItemConfig } from '.'

export const getChartComponent = (
  selectedChartName: string,
  customComponentName: string,
  componentConfig: GirdLayoutItemConfig,
) => {
  if (selectedChartName) {
    switch (selectedChartName) {
      case 'LineEchart':
        return <LineEchart config={componentConfig} />
      default:
        return <>没有找到对应的表格组件 {selectedChartName}</>
    }
    //endswitch1
  }
  if (customComponentName) {
    //startswitch2
    switch (customComponentName) {
      case 'DataV':
        return <DataV />
      case 'EnvMonitorHome':
        return <EnvMonitorHome config={componentConfig} />
      case 'Test':
        return <Test />
      default:
        return <>没有找到该自定义组件 {customComponentName} </>
    }
    //endswitch2
  }
  return <>请选择图表类型或自定义组件名</>
}
const NoUseComponent = () => <></>
export default NoUseComponent
