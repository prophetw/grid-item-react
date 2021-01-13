import React from 'react'
import { Spin } from 'antd'
import styles from './index.less'
import { LoadingOutlined } from '@ant-design/icons'

const antLoadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const Loading = () => {
  return <Spin indicator={antLoadingIcon} className={styles.loading} />
}
export default Loading
