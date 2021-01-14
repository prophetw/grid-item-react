import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.less'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import {
  IRouteComponentProps,
  Link,
  useLocation,
  useModel,
  useParams,
} from 'umi'
import leftArrow from '../../asserts/img/menu_left_arrow.png'
import rightArrow from '../../asserts/img/menu_right_arrow.png'
import { useWindowSize } from '../Hooks/useWindowSize'
import { DashboardType } from '@/models/useDashboard'
import classnames from 'classnames'
import store from 'store'
import SystemUtils from '@/utils/system'
export interface MenuItem {
  id: string
  name: string
  children?: MenuItem[]
}

const Header = () => {
  const location = useLocation()
  const { pathname, query } = location
  const isProjectPage = pathname === '/project'
  const model: DashboardType = useModel('useDashboard', (model) => model)
  const {
    onValueChange,
    curMenu,
    dropdownmenus,
    menus,
    getDropdownMenus,
    getMenus,
    setProject,
    enterprise,
    curProject,
  } = model
  const { width, height } = useWindowSize()
  const [menu, setMenu] = useState(null)
  const menuContainerRef = useRef(document.createElement('div'))
  const menu_width = (width - 562 - (30 + 88) * 2) / 2
  const [leftMenus, setLeftMenus] = useState([])
  const [rightMenus, setRightMenus] = useState([])
  const [showedMenuIndex, setShowedMenuIndex] = useState(0)
  const [menuItemWidthArr, setMenuItemWidthArr] = useState([])
  const gMenu = (menuArr: MenuItem[], isProjectMenu?: boolean) => {
    // dropdown menu or project menu
    if (!isProjectMenu) {
      return (
        <Menu>
          {menuArr &&
            menuArr.map((menu: MenuItem, index) => {
              return (
                <Menu.Item
                  key={index}
                  className={classnames({
                    [styles.dropdown_item_active]:
                      curProject && curProject.id === menu.id,
                  })}
                >
                  <Link
                    to={'/project?id=' + menu.id}
                    onClick={() => {
                      setProject(menu)
                    }}
                  >
                    {menu.name}
                  </Link>
                </Menu.Item>
              )
            })}
        </Menu>
      )
    } else {
      return (
        <Menu>
          {menuArr &&
            menuArr.map((menu: MenuItem, index) => {
              return (
                <Menu.Item
                  key={index}
                  className={classnames({
                    [styles.dropdown_item_active]:
                      curMenu && curMenu.id === menu.id,
                  })}
                >
                  <span
                    // to={'/project?id=' + menu.id}
                    onClick={() => {
                      onValueChange('curMenu', menu)
                      console.log(menu)
                    }}
                  >
                    {menu.name}
                  </span>
                </Menu.Item>
              )
            })}
        </Menu>
      )
    }
  }
  useEffect(() => {
    console.log(' init ')
    let projectId = ''
    if (isProjectPage) {
      projectId = query.id || ''
    }
    console.log(query)
    // const accessToken = SystemUtils.UrlParam('access-token')
    store.set('token', SystemUtils.UrlParam('access-token'))
    store.set('assetid', SystemUtils.UrlParam('assetid'))
    // console.log('accessToken->', accessToken)
    // if (query && query['access-token']) {
    //   const token = query['access-token']
    //   store.set('token', token)
    // }
    // if (query && query['assetid']) {
    //   const assetid = query['assetid']
    //   store.set('assetid', assetid)
    // }

    getDropdownMenus(projectId)
  }, [])
  useEffect(() => {
    if (curProject || isProjectPage) {
      const { id } = query
      getMenus(id)
    }
  }, [curProject, isProjectPage])
  useEffect(() => {
    if (dropdownmenus.length > 0) {
      const result = gMenu(dropdownmenus)
      setMenu(result)
    }
  }, [curProject])
  useEffect(() => {
    if (!menu) {
      if (dropdownmenus.length > 0) {
        const result = gMenu(dropdownmenus)
        setMenu(result)
      }
    }
    if (!isProjectPage) return
    const calcDomWidth = (menuContent: string) => {
      console.log('calc')
      const menuItemCls = styles.menu_item
      const dom = document.createElement('span')
      dom.className = menuItemCls
      dom.innerText = menuContent
      if (menuContainerRef && menuContainerRef.current) {
        const menuContainerDom = menuContainerRef.current
        menuContainerDom.append(dom)
        const domWidth = dom.offsetWidth
        menuContainerDom.removeChild(dom)
        return domWidth
      }
    }
    const menuAssignment = (showedMenuStartFromIndex = 0) => {
      const clonedMenuWidthArr = [...menuItemWidthArr].slice(
        showedMenuStartFromIndex,
      )
      let menuWithCount = 0
      const menuContainerWidth = Math.floor(menu_width)
      let leftMenuEndIndex = 0
      for (let index = 0; index < clonedMenuWidthArr.length; index++) {
        menuWithCount += clonedMenuWidthArr[index]
        if (menuWithCount > menuContainerWidth) {
          leftMenuEndIndex = index
          break
        }
      }
      const leftMenus = menus.slice(
        showedMenuStartFromIndex,
        showedMenuStartFromIndex + leftMenuEndIndex,
      )
      setLeftMenus(leftMenus)
      const restMenuWidthArr = clonedMenuWidthArr.slice(leftMenuEndIndex)
      let rightMenuCount = 0
      let rightMenuEndIndex = 0
      for (let index = 0; index < restMenuWidthArr.length; index++) {
        rightMenuCount += restMenuWidthArr[index]
        if (rightMenuCount > menuContainerWidth) {
          rightMenuEndIndex = index
          break
        }
      }
      // TODO: 特殊情况 如果最后一个 menu 已经展示出来了 点击向右 不做调整
      const rightMenus = menus.slice(
        showedMenuStartFromIndex + leftMenuEndIndex,
        showedMenuStartFromIndex + leftMenuEndIndex + rightMenuEndIndex,
      )
      setRightMenus(rightMenus)
    }
    if (menus.length > 0 && dropdownmenus.length > 0) {
      if (menuItemWidthArr && menuItemWidthArr.length > 0) {
        // console.log('--- menu width', menuItemWidthArr)
      } else {
        // TODO: 缓存 menuItemWidth
        const menuItemWidth = menus.map((item: MenuItem) => {
          const width = calcDomWidth(item.name)
          return width
        })
        setMenuItemWidthArr(menuItemWidth)
      }
      setTimeout(() => {
        menuAssignment(showedMenuIndex)
      }, 10)
    }
  }, [
    menu_width,
    showedMenuIndex,
    menus,
    dropdownmenus,
    menuItemWidthArr,
    isProjectPage,
  ])
  const clickLeftArrow = () => {
    const index = Math.max(0, showedMenuIndex - 1)
    setShowedMenuIndex(index)
  }
  const clickRightArrow = () => {
    const menuLen = menus.length
    const index = Math.min(menuLen, showedMenuIndex + 1)
    setShowedMenuIndex(index)
  }

  const generateMenuDom = (item: MenuItem, index: number) => {
    if (item.children) {
      const isProjectMenu = true
      const menus = gMenu(item.children, isProjectMenu)
      // curMenu is children
      let isChildrenActive = false
      item.children.map((childItem: MenuItem) => {
        if (childItem.name === curMenu.name) {
          isChildrenActive = true
        }
      })
      return (
        <Dropdown
          key={index}
          overlayClassName={styles.dropdown_menu_container}
          overlay={menus}
          trigger={['hover']}
        >
          <span
            className={classnames(styles.menu_item, {
              [styles.menu_item_active]:
                item.name === curMenu.name || isChildrenActive,
            })}
            onClick={() => {
              onValueChange('curMenu', item)
            }}
          >
            <span style={{ marginRight: 10 }}>{item.name}</span>
          </span>
        </Dropdown>
      )
    } else {
      return (
        <span
          key={index}
          onClick={() => {
            onValueChange('curMenu', item)
          }}
          className={classnames(styles.menu_item, {
            [styles.menu_item_active]: item.name === curMenu.name,
          })}
        >
          {item.name}
        </span>
      )
    }
  }
  // console.log(menu_width)
  return (
    <div className={'header'}>
      <div className={styles.title_container}>
        {!isProjectPage && (
          <div
            style={{
              color: '#85beef',
              fontSize: '30px',
              textAlign: 'center',
            }}
          >
            {enterprise}
          </div>
        )}
        {dropdownmenus && dropdownmenus.length > 0 && (
          <div className={styles.dropdown_container}>
            <Dropdown
              overlayClassName={styles.dropdown_menu_container}
              overlay={menu}
              trigger={['click']}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <span style={{ marginRight: 10 }}>{enterprise}</span>{' '}
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        )}
        {isProjectPage && curProject && menus.length > 0 && (
          <div className={styles.header_title}>
            <span className={styles['gradient-text']}>
              {/* BIM + 智慧工地数据决策系统 */}
              {curProject.name}
            </span>
          </div>
        )}
      </div>
      {isProjectPage && menus && menus.length > 0 && (
        <div className={styles.menu_container}>
          <img
            className={styles.left_arrow}
            src={leftArrow}
            onClick={clickLeftArrow}
            alt="left-arrow"
          />
          <div
            className={styles.left_menu_container}
            style={{ width: menu_width }}
            ref={menuContainerRef}
          >
            {leftMenus.map((item: MenuItem, index) =>
              generateMenuDom(item, index),
            )}
          </div>
          <div
            className={styles.right_menu_container}
            style={{ width: menu_width }}
          >
            {rightMenus.map((item: MenuItem, index) =>
              generateMenuDom(item, index),
            )}
          </div>
          <img
            className={styles.right_arrow}
            src={rightArrow}
            style={{ width: 88 }}
            onClick={clickRightArrow}
            alt="right-arrow"
          />
        </div>
      )}
    </div>
  )
}
export default Header
