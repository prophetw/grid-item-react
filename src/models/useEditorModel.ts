import Axios, { AxiosRequestConfig } from 'axios'
import { createContext, useReducer, useState } from 'react'
import prettier from 'prettier/standalone'

type RequestMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'
  | undefined

let initialState = {
  title: '',
  API: '',
  selectedChartName: '',
  activeKey: '1',
  customComponentName: '',
  reqMethod: 'get',
  chartSampleData: '',
  chartWidth: '',
  chartHeight: '',
  componentConfig: null,
  component_bg_class: '',
}

function EditorActions(state: any, actions: { type: any; payload?: any }) {
  switch (actions.type) {
    case 'FORM_VALUE_CHANGE':
      return (initialState = { ...state, ...actions.payload })
    default:
      return (initialState = { ...state })
  }
}

function useEditorModel(initial?: { title: string; API: string }) {
  if (!initial) {
    initial = initialState
  }
  const [store, dispatch] = useReducer(EditorActions, initial)
  const onFormValueChange = (key: string, val: string | any) => {
    dispatch({
      type: 'FORM_VALUE_CHANGE',
      payload: {
        [key]: val,
      },
    })
  }
  const clearConfig = () => {
    console.log(111)
  }
  const saveConfig = () => {
    const {
      title,
      API,
      component_bg_class,
      reqMethod,
      selectedChartName,
      customComponentName,
    } = store
    const config = {
      API,
      title,
      reqMethod,
      chartName: selectedChartName,
      customComponentName,
      component_bg_class,
    }
    onFormValueChange('componentConfig', config)
    const formatRes = prettier.format(JSON.stringify(config), {
      parser: 'json',
      plugins: [window.prettierPlugins.babel],
    })
    console.log(formatRes)
  }

  const {
    title,
    API,
    activeKey,
    customComponentName,
    reqMethod,
    chartSampleData,
    selectedChartName,
    componentConfig,
    component_bg_class,
  } = store
  return {
    customComponentName,
    chartSampleData,
    selectedChartName,
    title,
    reqMethod,
    API,
    activeKey,
    componentConfig,
    component_bg_class,
    onFormValueChange,
    saveConfig,
  }
}

export interface EditorModalType {
  title: string
  API: string
  component_bg_class: string
  componentConfig: any
  chartSampleData: any
  chartWidth: number
  chartHeight: number
  selectedChartName: string
  reqMethod: RequestMethod
  customComponentName: string
  activeKey: string
  saveConfig: () => void
  onFormValueChange: (key: string, val: string | any) => void
}
export default useEditorModel
