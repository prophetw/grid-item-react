import React from 'react'
import { IRouteComponentProps } from 'umi'
import styles from './index.less'
import { Header } from '@/components/Layouts'
export enum LAYOUTS {
  NO_LAYOUT,
  TOP_BOTTOM_LAYOUT,
}
const Layout = (props: IRouteComponentProps): JSX.Element => {
  console.log(props)
  const { location } = props
  const { pathname } = location
  console.log('pathname', pathname)
  //  可以根据不同的pathname 来定制不同的页面的 layout
  if (pathname !== '/login' && pathname !== '/demo') {
    let cls = ''
    if (pathname === '/enterprise') {
      cls = styles.enterprise_home
    }
    return (
      <div className={styles.top_bottom_layout + ' ' + cls}>
        <Header></Header>
        <>{props.children}</>
      </div>
    )
  } else {
    return <>{props.children}</>
  }
}
export default Layout
