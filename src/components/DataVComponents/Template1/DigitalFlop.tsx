import * as React from 'react'

import { DigitalFlop, Decoration10 } from '@jiaminghi/data-view-react'

import './DigitalFlop.less'
import { StyleConfig } from '../StyleTypes'
import DigitalFlopItem, { DigitalFlopProps } from './DigitalFlopItem'

type Transition =
  | 'linear'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'

export interface DataVDigitalFlopArrProps {
  childrenPropsArr: DigitalFlopProps[]
}

function getData() {
  return [
    {
      title: '管养里程',
      number: {
        number: [randomExtend(20000, 30000)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#4d99fc',
          fontWeight: 'bold',
        },
      },
      unit: '公里',
    },
    {
      title: '桥梁',
      number: {
        number: [randomExtend(20, 30)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#f46827',
          fontWeight: 'bold',
        },
      },
      unit: '座',
    },
    {
      title: '涵洞隧道',
      number: {
        number: [randomExtend(20, 30)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#40faee',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '匝道',
      number: {
        number: [randomExtend(10, 20)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#4d99fc',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '隧道',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#f46827',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '服务区',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#40faee',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '收费站',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#4d99fc',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '超限站',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#f46827',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
    {
      title: '停车区',
      number: {
        number: [randomExtend(5, 10)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#40faee',
          fontWeight: 'bold',
        },
      },
      unit: '个',
    },
  ]
}

function randomExtend(minNum: number, maxNum: number) {
  if (arguments.length === 1) {
    return parseInt('' + (Math.random() * minNum + 1), 10)
  } else {
    return parseInt('' + (Math.random() * (maxNum - minNum + 1) + minNum), 10)
  }
}

export default (props: DataVDigitalFlopArrProps) => {
  const { childrenPropsArr } = props
  const [digitalFlopData, setData] = React.useState([])

  React.useEffect(() => {
    createData()

    const timer = setInterval(createData, 30000)

    return () => clearInterval(timer)
  }, [])

  function createData() {
    setData(getData())
  }

  return (
    <div id="digital-flop">
      {childrenPropsArr.map((childProps: DigitalFlopProps, index) => (
        <DigitalFlopItem key={index} {...childProps} />
      ))}
      <Decoration10 />
    </div>
  )
}
