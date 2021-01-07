import React, { useEffect, useRef, useState } from 'react'
import styles from './index.less'
import { Tabs, Input } from 'antd'
import BasicConfig from './BasicConfig'
import DataConfig from './DataConfig'
import { useModel, Service } from 'umi'
import { EditorModalType } from '@/models/useEditorModel'
const { TabPane } = Tabs

const Index = (): JSX.Element => {
  const { onFormValueChange, activeKey, customComponentName } = useModel(
    'useEditorModel',
    (model: EditorModalType) => model,
  )
  const onTabChange = (tabKey: string) => {
    onFormValueChange('activeKey', tabKey)
    console.log('sssss ', Service)
  }

  return (
    <div className={styles.right_aside}>
      <Tabs defaultActiveKey={activeKey} onChange={onTabChange}>
        <TabPane tab="配置" key="1">
          <BasicConfig></BasicConfig>
        </TabPane>
        <TabPane tab="数据" key="2">
          <DataConfig />
        </TabPane>
        <TabPane tab="自定义组件" key="3">
          自定义组件名称 src/components/CustomComponents
          <Input
            value={customComponentName}
            onChange={(e) => {
              onFormValueChange('customComponentName', e.target.value)
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default Index
