import React from 'react'
import styles from './WidgetMenu.less'
import classnames from 'classnames'
import { Select } from 'antd'
const { Option } = Select

interface MenuItem {
  id: string
  name: string
}
interface Props {
  curSelectedMenu: string
  handleChange: (value: string, replaceKey: string) => void
  menuList: MenuItem[]
}
const WidgetMenu = (props: Props) => {
  const { curSelectedMenu, handleChange, menuList } = props
  return (
    <Select
      className={classnames(styles.select, styles.dft_select_cls)}
      defaultValue={curSelectedMenu}
      style={{ width: 120 }}
      onChange={(value: string) => handleChange(value, ':deviceid')}
    >
      {menuList &&
        menuList.map((menuItem: MenuItem) => {
          return (
            <Option key={menuItem.id} value={menuItem.id}>
              {menuItem.name}
            </Option>
          )
        })}
    </Select>
  )
}
export default WidgetMenu
