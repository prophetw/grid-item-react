import { DashboardType } from '@/models/useDashboard'
import React, { useEffect } from 'react'
import { IRouteComponentProps, useModel } from 'umi'
import styles from './index.less'
import classnames from 'classnames'
import ProjectBrain from '../../asserts/img/project_core.png'
import EnvMonitor from '../../asserts/img/env_monitor.png'

const Enterprise = (props: IRouteComponentProps) => {
  const model: DashboardType = useModel('useDashboard', (model) => model)
  const { curProject, curMenu } = model
  console.log(model)
  const { location } = props
  const { query } = location
  const projectId = query.id

  useEffect(() => {
    console.log(' project id changed ')
  }, [projectId])

  return (
    <div className={styles.project_home}>
      {curMenu && curMenu.id === '1' && (
        <div className={styles.project_brain}>
          <img src={ProjectBrain} width={'100%'} height={'100%'} alt="" />
        </div>
      )}
      {curMenu && curMenu.id === '2' && (
        <div className={styles.project_brain}>
          <img src={EnvMonitor} width={'100%'} height={'100%'} alt="" />
        </div>
      )}
      {curMenu && curMenu.id !== '1' && curMenu.id !== '2' && (
        <div>{curMenu.name}</div>
      )}
    </div>
  )
}

export default Enterprise
