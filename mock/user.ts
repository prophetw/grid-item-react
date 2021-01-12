import mockjs from 'mockjs'
const { Random } = mockjs
export default {
  '/api/user': (req: any, res: any) => {
    const data = mockjs.mock({
      'list|1-10': [
        {
          name: '@name',
          value: () => Random.natural(0, 100),
        },
      ],
    })
    setTimeout(() => {
      res.end(data)
    }, 2000)
  },
  '/things/v1/:projectid/menu': (req: any, res: any) => {
    const data = mockjs.mock({
      code: 200,
      data: {
        menuList: [
          {
            main: 0,
            sort: 0,
            children: [
              { id: '1', name: '工地大脑' },
              { id: '2', name: '环境检测' },
              { id: '3', name: '视频监控' },
              {
                id: '4',
                name: '劳务管理',
                children: [
                  { id: '18', name: '人员管理' },
                  { id: '19', name: '工资管理' },
                ],
              },
              {
                id: '5',
                name: '机械设备',
                children: [
                  { id: '21', name: '塔吊' },
                  { id: '22', name: '升降机' },
                  { id: '23', name: '卸料平台' },
                ],
              },
              { id: '6', name: '车辆管理' },
              { id: '7', name: '基坑监测' },
              { id: '8', name: '地磅监测' },
              { id: '9', name: '大体积混凝土' },
              { id: '10', name: '智能安全帽' },
              { id: '11', name: '路面监测' },
              { id: '12', name: '桩夯监测' },
              { id: '13', name: '实验室检测' },
              { id: '14', name: '拌合站监测' },
              { id: '15', name: '沥青监测' },
              { id: '16', name: '高边坡监测' },
              { id: '17', name: '无人机应用' },
            ],
          },
        ],
      },
    })
    setTimeout(() => {
      res.end(JSON.stringify(data))
    }, 2000)
  },
  '/things/v1/component/ui/data': (req: any, res: any) => {
    console.log(req)
    const data = mockjs.mock({
      code: 200,
      data: {
        id: '1',
        name: '上海鲁班软件集团有限公司',
        children: [
          { id: '1', name: '中铁十五局Y4路' },
          { id: '2', name: '上海杨浦软件园' },
          { id: '3', name: '张江高科' },
          { id: '5', name: '武汉光谷东' },
        ],
      },
    })
    setTimeout(() => {
      res.end(JSON.stringify(data))
    }, 2000)
  },
}
