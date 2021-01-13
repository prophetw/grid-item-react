import React from 'react'
import title_arrow_right from '../../asserts/img/arrow_right.png'
import title_arrow_left from '../../asserts/img/arrow_left.png'
import styles from './WidgetTitle.less'
interface Props {
  title: string
}
const WidgetTitle = (props: Props) => {
  const { title } = props
  return (
    <p className={styles.title}>
      <img src={title_arrow_right} alt="" />
      <span style={{ margin: '0 20px' }}>{title}</span>
      <img src={title_arrow_left} alt="" />
    </p>
  )
}
export default WidgetTitle
