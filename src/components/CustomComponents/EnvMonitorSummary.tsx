import React, { useEffect, useState } from 'react'
import WidgetTitle from '../ReactGridItem/WidgetTitle'
import PM25 from '../../asserts/img/PM25.png'
import PM10 from '../../asserts/img/PM10.png'
import Noise from '../../asserts/img/Noise.png'
import Press from '../../asserts/img/Press.png'
import Temp from '../../asserts/img/Temp.png'
import TSP from '../../asserts/img/TSP.png'
import WindSpeed from '../../asserts/img/WindSpeed.png'
import Humidity from '../../asserts/img/Humidity.png'
import API from '@/service/index'
import styles from './EnvMonitorSummary.less'
import { GirdLayoutItemConfig } from '../ReactGridItem'
import WidgetMenu from '../ReactGridItem/WidgetMenu'
const { getEnvSummary } = API

interface EnvItem {
  name: string
  value: string
}
const matchIconSrc = (key: string) => {
  switch (key) {
    case 'PM2.5':
      return PM25
    case 'PM10':
      return PM10
    case 'TSP':
      return TSP
    case '温度':
      return Temp
    case '湿度':
      return Humidity
    case '噪音':
      return Noise
    case '气压':
      return Press
    case '风速':
      return WindSpeed
    default:
      return ''
  }
}
interface Props {
  config: GirdLayoutItemConfig
}
const EnvMonitorSummary = (props: Props) => {
  const { config } = props
  const [data, setData] = useState([])
  const [menuArr, setMenu] = useState([])
  const [curSelectedMenu, setCurMenu] = useState('')
  const [deviceid, setDeviceId] = useState('')
  useEffect(() => {
    const { menuList } = config
    const init = () => {
      if (menuList && menuList.length > 0) {
        // @ts-ignore
        setMenu(menuList)
        setCurMenu(menuList[0].id)
        setDeviceId(menuList[0].id)
      }
    }
    init()
  }, [config])
  useEffect(() => {
    const getSummary = () => {
      getEnvSummary({ deviceid }).then(
        (res) => {
          console.log(res)
          if (res.success) {
            setData(res.data)
          }
        },
        (err) => {
          console.log(err)
        },
      )
    }
    if (deviceid && typeof deviceid === 'string') {
      getSummary()
    }
  }, [deviceid])
  const handleChange = (value: string, replaceKey: string) => {
    console.log(value)
    setCurMenu(value)
    setDeviceId(value)
  }

  return (
    <div className={styles.container}>
      <WidgetTitle title={'设备环境汇总信息'} />
      {menuArr && menuArr.length > 0 && (
        <WidgetMenu
          curSelectedMenu={curSelectedMenu}
          menuList={menuArr}
          handleChange={handleChange}
        />
      )}
      <div className={styles.env_container}>
        {data.map((item: EnvItem, index: number) => {
          const IconSrc = matchIconSrc(item.name)
          return (
            <div key={index} className={styles.item}>
              <span className={styles.img_container}>
                <img src={IconSrc} alt="" />
              </span>
              <span className={styles.name_container}>{item.name}</span>
              <span className={styles.val_container}>{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EnvMonitorSummary
