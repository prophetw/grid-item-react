import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { formatToChartData } from '../../utils/index'
import DataVTemplate1, {
  Template1OptionsProps,
} from '../../components/DataVComponents/Template1/index'

function getUser() {
  return axios.get('/api/user')
}

const options: Template1OptionsProps = {
  title: '这个地方配置标题',
  leftRankOptions: {
    title: '',
    config: {
      data: [
        { name: 'first', value: 231 },
        { name: 'second', value: 231 },
        { name: 'third', value: 231 },
        { name: 'forth', value: 231 },
        { name: 'fifth', value: 231 },
      ],
    },
    getData: async () =>
      // ajax call
      // return axios.get()
      Promise.resolve(123),
  },
  digitalFlopProps: {
    childrenPropsArr: [
      {
        refreshInterval: 0,
        config: {
          number: [20000],
          content: '{nt}',
        },
        title: '标题',
        unit: '个',
        getData: async (): Promise<number> =>
          new Promise((resolve, reject) => {
            const number = Math.random() * 10000
            setTimeout(() => {
              resolve(number)
            }, 3000)
          }),
      },
      {
        refreshInterval: 0,
        title: 'Second',
        unit: 'u',
        getData: async (): Promise<number> =>
          new Promise((resolve, reject) => {
            const number = Math.random() * 10000
            setTimeout(() => {
              resolve(number)
            }, 3000)
          }),
        config: {
          number: [10000],
          content: '{nt}',
        },
      },
    ],
  },
  roseChartOptions: {
    refreshInterval: 0,
    getData: async () =>
      axios
        .get('/api/user')
        .then((response: AxiosResponse) => {
          console.log('response', response)
          return Promise.resolve(response)
        })
        .catch((err: any) => {
          console.log(err)
          return Promise.reject()
        }),
  },
}
const Demo = (): JSX.Element => {
  console.log(' 231231', React)
  return (
    <DataVTemplate1 {...options} />
    // <DataV2></DataV2>
    // <DataV3></DataV3>
    // <div>123 </div>
  )
}
export default Demo
