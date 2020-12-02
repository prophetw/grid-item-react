import * as React from 'react'

import { Decoration5, Decoration8 } from '@jiaminghi/data-view-react'

import './TopHeader.less'

export default (props) => {
  const { title } = props
  if (title) {
    return (
      <div id="top-header">
        <Decoration8 className="header-left-decoration" />
        <Decoration5 className="header-center-decoration" />
        <Decoration8 className="header-right-decoration" reverse={true} />
        <div className="center-title">{title}</div>
      </div>
    )
  } else {
    return (
      <div id="top-header">
        <Decoration8 className="header-left-decoration" />
        <Decoration5 className="header-center-decoration" />
        <Decoration8 className="header-right-decoration" reverse={true} />
        <div className="center-title">请配置标题</div>
      </div>
    )
  }
}
