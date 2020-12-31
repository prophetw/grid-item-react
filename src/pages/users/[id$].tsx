import React from 'react'
import { IRouteComponentProps } from 'umi'
const User = (props: IRouteComponentProps) => {
  console.log(props)
  const { match } = props
  const { params } = match
  const userId = params.id
  return <div>userid: {userId}</div>
}
export default User
