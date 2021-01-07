import React, { useState } from 'react'
import { Select, Input } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import { useModel } from 'umi'
import styles from './index.less'
import { EditorModalType } from '@/models/useEditorModel'
import axios from 'axios'
import prettier from 'prettier/standalone'
const { Option } = Select

const DataConfig = () => {
  const { onFormValueChange, API, reqMethod, chartSampleData } = useModel(
    'useEditorModel',
    (model: EditorModalType) => model,
  )
  const [reqResult, setRes] = useState('')
  const startRequest = () => {
    axios
      .request({
        method: reqMethod,
        url: API,
      })
      .then((res) => {
        console.log(res)
        if (res) {
          console.log(res)
          const formatRes = prettier.format(JSON.stringify(res.data), {
            parser: 'json',
            plugins: [window.prettierPlugins.babel],
          })
          console.log(formatRes)
          setRes(formatRes)
        }
      })
  }
  return (
    <div className={styles.data_config}>
      <p>请求API地址</p>
      <Input
        placeholder="e.g https://www.baidu.com/api/user/xxx"
        value={API}
        onChange={(e) => {
          onFormValueChange('API', e.target.value)
        }}
      />
      <p>请求方式</p>
      <Select
        defaultValue={reqMethod}
        style={{ width: 120 }}
        onChange={(v) => {
          console.log(v)
          onFormValueChange('reqMethod', v)
        }}
      >
        <Option value="get">Get</Option>
        <Option value="post">Post</Option>
      </Select>
      <p style={{ lineHeight: '20px' }}>
        请求结果
        <RedoOutlined onClick={startRequest} style={{ float: 'right' }} />
      </p>
      {reqResult && (
        <div className={styles.req_result_container}>
          <pre>{reqResult}</pre>
        </div>
      )}
      <p style={{ lineHeight: '20px' }}>样本数据</p>
      {chartSampleData && (
        <div className={styles.req_result_container}>
          <pre>
            {prettier.format(JSON.stringify(chartSampleData), {
              parser: 'json',
              plugins: [window.prettierPlugins.babel],
            })}
          </pre>
        </div>
      )}
    </div>
  )
}

export default DataConfig
