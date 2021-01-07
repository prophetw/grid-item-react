import React from 'react'
import { IRouteComponentProps } from 'umi'
import styles from './index.less'
import { Header } from '@/components/Layouts'
export enum LAYOUTS {
  NO_LAYOUT,
  TOP_BOTTOM_LAYOUT,
}
const NO_LAYOUT_PATHS = ['/login', '/demo', '/project']
const TOP_BOTTOM_LAYOUT_PATHS = ['/users']
const Layout = (props: IRouteComponentProps): JSX.Element => {
  console.log(props)
  const { location } = props
  const { pathname } = location
  console.log('pathname', pathname)
  //  可以根据不同的pathname 来定制不同的页面的 layout
  if (TOP_BOTTOM_LAYOUT_PATHS.indexOf(pathname) > -1) {
    return (
      <div className={styles.top_bottom_layout}>
        <Header></Header>
        <React.StrictMode>{props.children}</React.StrictMode>
      </div>
    )
  } else {
    return <React.StrictMode>{props.children}</React.StrictMode>
  }
}
export default Layout
