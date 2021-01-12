import Axios, { AxiosRequestConfig } from 'axios'
import { createContext, useReducer, useState } from 'react'
import API from '@/service/index'
import { history } from 'umi'
import { MenuItem } from '@/components/Layouts/Header'
const { getDropdownMenu, getMenu } = API

const initialState = {
  curProject: null,
  curMenu: '',
  menus: [],
  dropdownmenus: [],
  enterprise: '',
}

function EditorActions(state: any, actions: { type: any; payload?: any }) {
  switch (actions.type) {
    case 'CHANGE_VALUE_BY_KEY':
      return { ...state, ...actions.payload }
    default:
      return { ...state }
  }
}

function useDashboard(initial?: { curProject: any; curMenu: string }) {
  if (!initial) {
    initial = initialState
  }
  const [store, dispatch] = useReducer(EditorActions, initial)
  const getDropdownMenus = (projectIdFromUrl?: string) => {
    getDropdownMenu({ code: 'DashboardDeptTest' }).then(
      (res) => {
        console.log(res)
        if (res.success) {
          const enterpriseName = res.data.name
          dispatch({
            type: 'CHANGE_VALUE_BY_KEY',
            payload: {
              enterprise: enterpriseName,
            },
          })
          dispatch({
            type: 'CHANGE_VALUE_BY_KEY',
            payload: {
              dropdownmenus: res.data.children,
            },
          })
          // window.location
          if (projectIdFromUrl) {
            res.data.children.map((item) => {
              if (item.id === projectIdFromUrl) {
                dispatch({
                  type: 'CHANGE_VALUE_BY_KEY',
                  payload: {
                    curProject: item,
                  },
                })
              }
            })
          }
        }
      },
      (err) => {
        console.log(err)
      },
    )
  }
  const getMenus = (id: string) => {
    getMenu({ code: 'DashboardMenuTest' }).then(
      (res) => {
        console.log('menu ', res)
        if (res.success) {
          const { menuList } = res.data
          const target = menuList[0]
          if (target && target.children) {
            dispatch({
              type: 'CHANGE_VALUE_BY_KEY',
              payload: {
                menus: target.children,
              },
            })
            dispatch({
              type: 'CHANGE_VALUE_BY_KEY',
              payload: {
                curMenu: target.children[0],
              },
            })
          }
        }
      },
      (err) => {
        console.log(err)
      },
    )
  }
  const onValueChange = (key: string, value: any) => {
    dispatch({
      type: 'CHANGE_VALUE_BY_KEY',
      payload: { [key]: value },
    })
  }
  const setProject = (value) => {
    dispatch({
      type: 'CHANGE_VALUE_BY_KEY',
      payload: {
        curProject: value,
      },
    })
  }
  const { curProject, curMenu, menus, dropdownmenus, enterprise } = store
  return {
    curProject,
    curMenu,
    menus,
    dropdownmenus,
    enterprise,
    onValueChange,
    getDropdownMenus,
    getMenus,
    setProject,
  }
}

export interface DashboardType {
  curProject: any
  curMenu: MenuItem
  menus: MenuItem[]
  dropdownmenus: MenuItem[]
  enterprise: string
  onValueChange: (key: string, value: any) => void
  getDropdownMenus: (projectIdFromUrl?: string) => void
  getMenus: (projectIdFromUrl: string) => void
  setProject: (value: any) => void
}
export default useDashboard
