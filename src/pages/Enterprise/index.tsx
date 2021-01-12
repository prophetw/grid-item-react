import React from 'react'
import styles from './index.less'
import EnterprisePage from '../../asserts/img/enterprise.png'

const Enterprise = () => {
  return (
    <div className={styles.enterprise_home}>
      <img src={EnterprisePage} width={'100%'} height={'100%'} alt="" />
    </div>
  )
}

export default Enterprise
