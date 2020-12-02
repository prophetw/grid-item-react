const formatTimeToBirthday = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function formatNumber(n: number): string {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

// http://datav-react.jiaminghi.com/guide
export enum DataVComponentType {
  Charts,
  ActiveRingChart,
  CapsuleChart,
  WaterLevelPond,
  PercentPond,
  FlylineChart,
  FlylineChartEnhanced,
  ConicalColumnChart,
  DigitalFlop,
  ScrollBoard,
  ScrollRankingBoard,
}

function formatToChartOptions(data: any) {
  /**
 * 
options = {
  title: {
    text: '周销售额趋势'  // 表格名称
  },
  legend: {
    data: ['系列A', '系列B', '系列C']  // 表格展示的数据集合名称
  },
  xAxis: {
    name: '第一周',  // x轴名称
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] // x轴
  },
  yAxis: {
    name: '销售额', // y轴名称
    data: 'value'
  },
  series: [  // 展示几组数据
    {
      name: '系列A',  // 和 legend 关联的数据
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: 'line', // 折线图  'bar' 柱状图
      stack: 'a',  // 堆在一起 求和
      fill: {
        show: true
      }
    },
    {
      name: '系列B',
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: 'line',
      stack: 'a',
      smooth: true
    },
    {
      name: '系列C',
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: 'line',
      stack: 'a',
      lineStyle: {
        lineDash: [5, 5]
      }
    }
  ]
}
 * 
 * 
 */
}
function formatToActiveRingChartOptions(data: any) {
  // 动态环图
  /**
 *   
 * {
 * data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 78
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    }
	]
}
 * 
 */
}
function formatToCapsuleChartOptions(data: any) {
  /**
 * 
 *  
{
  data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 123
    },
    {
      name: '漯河',
      value: 98
    },
    {
      name: '郑州',
      value: 75
    },
    {
      name: '西峡',
      value: 66
    },
  ],
  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],  // color of each 
  unit: '单位' // 
}
 * 
 * 
 */
}
const formatToConicalColumnChartOptions = () => {
  /**
{
  data: [66, 45],
  shape: 'roundRect'
}
 * 
 * 
 */
}
const formatToDigitalFlopOptions = () => {
  /**
	 * {
  value: 66,
  borderWidth: 5,
  borderRadius: 10,
  borderGap: 5
}
	 * 
	 */
}
const formatToFlylineChart = () => {
  /**
	 {
  centerPoint: [0.48, 0.35],
  points: [
    {
      position: [0.52, 0.235],
      text: '新乡'
    },
    {
      position: [0.55, 0.67],
      text: '驻马店'
    },
    {
      position: [0.59, 0.18],
      text: '鹤壁'
    },
    {
      position: [0.68, 0.17],
      text: '濮阳'
    },
    {
      position: [0.59, 0.10],
      text: '安阳'
    }
  ],
  k: 0.5,
  bgImgUrl: '/img/flylineChart/map.jpg',
  centerPointImg: {
    url: '/img/flylineChart/mapCenterPoint.png'
  },
  pointsImg: {
    url: '/img/flylineChart/mapPoint.png'
  }
}
	 */
}
const formatToFlylineChartEnhanced = () => {}
const formatToPercentPond = () => {}
const formatToScrollBoard = () => {
  /**
 *  {
  header: ['列1', '列2', '列3'],
  data: [
    ['行1列1', '行1列2', '行1列3'],
    ['行2列1', '行2列2', '行2列3'],
    ['行3列1', '行3列2', '行3列3'],
    ['行4列1', '行4列2', '行4列3'],
    ['行5列1', '行5列2', '行5列3'],
    ['行6列1', '行6列2', '行6列3'],
    ['行7列1', '行7列2', '行7列3'],
    ['行8列1', '行8列2', '行8列3'],
    ['行9列1', '行9列2', '行9列3'],
    ['行10列1', '行10列2', '行10列3']
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
  carousel: 'page'
}
 */
}
const formatToScrollRankingBoard = () => {
  /**
 * 
 * {
  data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 78
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    },
    {
      name: '信阳',
      value: 45
    },
    {
      name: '漯河',
      value: 29
    }
  ],
  carousel: 'page'
}
 */
}
const formatToWaterLevelPond = () => {
  /**
   *
   */
}
const formatToChartData = (
  componentType: DataVComponentType,
  serverData: any,
) => {
  switch (componentType) {
    case DataVComponentType.Charts: {
      console.log('qqq')
      return formatToChartOptions(serverData)
    }
    case DataVComponentType.ActiveRingChart:
      break
    case DataVComponentType.CapsuleChart:
      break
    case DataVComponentType.ConicalColumnChart:
      break
    case DataVComponentType.DigitalFlop:
      break
    case DataVComponentType.FlylineChart:
      break
    case DataVComponentType.FlylineChartEnhanced:
      break
    case DataVComponentType.PercentPond:
      break
    case DataVComponentType.ScrollBoard:
      break
    case DataVComponentType.ScrollRankingBoard:
      break
    case DataVComponentType.WaterLevelPond:
      break
    default:
      break
  }
}
export { formatTimeToBirthday, formatToChartData }
