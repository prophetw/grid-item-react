import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { useEditorState } from './EditorState'
import { useModel } from 'umi'

type SizeType = Parameters<typeof Form>[0]['size']

const FormSizeDemo = () => {
  // const { onFormValueChange, title, dispatch } = useEditorState()
  const { title, chartWidth, onFormValueChange, component_bg_class } = useModel(
    'useEditorModel',
    (model) => model,
  )
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default',
  )
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size)
  }
  return (
    <>
      <p>配置标题</p>
      <Input
        value={title}
        onChange={(e) => {
          onFormValueChange('title', e.target.value)
        }}
      />
      <p>组件背景classname</p>
      <Input
        value={component_bg_class}
        onChange={(e) => {
          onFormValueChange('component_bg_class', e.target.value)
        }}
      />
    </>
  )
}

export default FormSizeDemo
