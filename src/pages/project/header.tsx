import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import styles from './header.less'
import { history } from 'umi'
const ProjectHeader = () => {
  useEffect(() => {
    console.log(' mounted ')
  }, [])
  return (
    <div className={styles.project_header}>
      <Button type="primary" onClick={() => history.push('/project/1')}>
        页面A
      </Button>
      <Button type="primary" onClick={() => history.push('/project/2')}>
        页面B
      </Button>
    </div>
  )
}
export default ProjectHeader
