import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import axios from 'axios'
const sampleData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

interface AreaProps {
  config: any
}
const AreaComponent = (props: AreaProps) => {
  const { config } = props
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(400)
  const [data, setData] = useState(sampleData)
  const [isRequested, setIsReq] = useState(false)
  useEffect(() => {
    console.log('---config change', config)
    if (config) {
      const { reqMethod, API, width, height } = config
      if (width) {
        setWidth(width)
      }
      if (height) {
        setHeight(height - 50)
      }
      if (reqMethod && API && !isRequested) {
        axios
          .request({
            method: reqMethod,
            url: API,
          })
          .then((res) => {
            console.log(' res ', res)
            if (res.status === 200 && res.data) {
              const data = res.data.data
              setIsReq(true)
              setData(data)
            }
          })
      }
    }
  }, [config])
  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
      <Area type="monotone" dataKey="amt" stroke="#ffc658" fill="#ffc658" />
    </AreaChart>
  )
}

AreaComponent.sampleData = sampleData
export default AreaComponent
