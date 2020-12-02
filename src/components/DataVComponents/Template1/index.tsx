import * as React from 'react'

import { FullScreenContainer } from '@jiaminghi/data-view-react'

import TopHeader from './TopHeader'
import DigitalFlop, { DataVDigitalFlopArrProps } from './DigitalFlop'
import RankingBoard, { RankingBoardProps } from './RankingBoard'
import RoseChart, { RoseChartProps } from './RoseChart'
import WaterLevelChart from './WaterLevelChart'
import ScrollBoard from './ScrollBoard'
import Cards from './Cards'

import './index.less'

export interface Template1OptionsProps {
  title: string // page title
  digitalFlopProps: DataVDigitalFlopArrProps
  leftRankOptions: RankingBoardProps
  roseChartOptions: RoseChartProps
}
export default (props: Template1OptionsProps) => {
  console.log(' 123333 ')
  return (
    <div id="data-view">
      <FullScreenContainer>
        <TopHeader title={props.title} />

        <div className="main-content">
          <DigitalFlop {...props.digitalFlopProps} />

          <div className="block-left-right-content">
            <RankingBoard {...props.leftRankOptions} />

            <div className="block-top-bottom-content">
              <div className="block-top-content">
                <RoseChart {...props.roseChartOptions} />

                <WaterLevelChart />

                <ScrollBoard />
              </div>

              <Cards />
            </div>
          </div>
        </div>
      </FullScreenContainer>
    </div>
  )
}
