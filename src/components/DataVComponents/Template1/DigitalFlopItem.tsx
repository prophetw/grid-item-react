import * as React from 'react'

import { DigitalFlop, Decoration10 } from '@jiaminghi/data-view-react'

import './DigitalFlop.less'
import { StyleConfig } from '../StyleTypes'

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
interface DataVDigitalFlop {
  number: number[] //	数字数值[1]	Array<Number>	---	[]
  content: string //内容模版[1]	String	---	''
  toFixed?: number //	小数位数	Number	---	0
  textAlign?: string //	水平对齐方式	String	[2]	'center'
  rowGap?: string //	行间距	Number	[3]	0
  style?: StyleConfig //	样式配置	Object	CRender Style	[4]
  formatter?: string //	格式化数字	Function	[5]	undefined
  animationCurve?: Transition //	动效曲线	String	Transition	'easeOutCubic'
  animationFrame?: number //	动效帧数	Number	[5]	50
}
export interface DigitalFlopProps {
  config?: DataVDigitalFlop
  unit: string // 单位
  refreshInterval: number
  title: string
  getData: () => Promise<number>
}

function getData() {
  return [
    {
      title: '管养里程',
      config: {
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
      config: {
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
  ]
}

function randomExtend(minNum: number, maxNum: number) {
  if (arguments.length === 1) {
    return parseInt('' + (Math.random() * minNum + 1), 10)
  } else {
    return parseInt('' + (Math.random() * (maxNum - minNum + 1) + minNum), 10)
  }
}

export default (props: DigitalFlopProps) => {
  const { config, title, getData, unit, refreshInterval = 30000 } = props
  const [configs, setConfigs] = React.useState(props.config)
  React.useEffect(() => {
    const fetchData = async () => {
      if (getData) {
        let data = await getData()
        let config: DataVDigitalFlop = {
          number: [data],
          content: '{nt}',
        }
        setConfigs(config)
      }
    }
    let timer: NodeJS.Timeout
    if (refreshInterval !== 0) {
      timer = setInterval(fetchData, refreshInterval)
    }
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="digital-flop-item" key={title}>
      <div className="digital-flop-title">{title}</div>
      <div className="digital-flop">
        <DigitalFlop
          config={configs}
          style={{ width: '100px', height: '50px' }}
        />
        <div className="unit">{unit}</div>
      </div>
    </div>
  )
}
