import React, { useEffect, useState } from 'react'
import { ScrollRankingBoard } from '@jiaminghi/data-view-react'
import './RankingBoard.less'
import { boolean } from '../../../node_modules/mobx-state-tree/dist/internal'

type Carousel = 'single' | 'page'

export interface DataVScrollRankingBoardProps {
  //default
  data: ScrollRankingBoardItem[] // 表数据                 []
  rowNum?: number // 表行数 default 5
  waitTime?: number //	轮播时间间隔(ms)	Number	default	2000
  carousel?: Carousel // default single
  unit?: string // default ''
  sort?: boolean // default true
}
interface ScrollRankingBoardItem {
  name: string
  value: number
}

export interface RankingBoardProps {
  title: string
  config: DataVScrollRankingBoardProps
  getData: () => Promise<number>
}

const config = {
  data: [
    {
      name: '日常养护',
      value: 55,
    },
    {
      name: '交通事故',
      value: 120,
    },
    {
      name: '路面',
      value: 78,
    },
    {
      name: '桥通',
      value: 66,
    },
    {
      name: '计日工',
      value: 80,
    },
    {
      name: '路基',
      value: 45,
    },
    {
      name: '交安设施',
      value: 29,
    },
    {
      name: '除雪',
      value: 29,
    },
    {
      name: '绿化',
      value: 29,
    },
  ],
  rowNum: 9,
}

export default (props: RankingBoardProps) => {
  const { title, config, getData } = props
  const [configs, setConfigs] = useState()
  useEffect(() => {
    const fetchData = async () => {
      let result = await getData()
    }
    fetchData()
  }, [])
  return (
    <div id="ranking-board">
      {title && <div className="ranking-board-title">{title}</div>}
      {!title && (
        <div className="ranking-board-title">
          请在 leftRankOptions.title 配置标题
        </div>
      )}
      <ScrollRankingBoard config={config} />
    </div>
  )
}
