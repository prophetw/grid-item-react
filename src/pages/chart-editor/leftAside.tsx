import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import { Select } from 'antd'
import { useModel } from 'umi'
import { EditorModalType } from '@/models/useEditorModel'
const { Option } = Select

const Index = (): JSX.Element => {
  const {
    onFormValueChange,
    activeKey,
    customComponentName,
    selectedChartName,
  } = useModel('useEditorModel', (model: EditorModalType) => model)
  // console.log(props)
  return (
    <div className={styles.left_aside}>
      <Select
        defaultValue={selectedChartName}
        style={{ width: '100%' }}
        onChange={(v) => {
          console.log(v)
          onFormValueChange('selectedChartName', v)
        }}
      >
        <Option value="">图表类型</Option>
        <Option value="Area">Area</Option>
        <Option value="Bar">Bar</Option>
        <Option value="Line">Line</Option>
        <Option value="Pie">Pie</Option>
      </Select>
    </div>
  )
}
export default Index
