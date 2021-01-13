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
    }, 500)
  },
  '/things/v1/env-summary/:deviceid': (req: any, res: any) => {
    const data = mockjs.mock({
      code: 200,
      data: [
        {
          name: 'PM2.5',
          value: '64.55ug/m3',
        },
        {
          name: 'PM10',
          value: '64.55ug/m3',
        },
        {
          name: 'TSP',
          value: '64.55ug/m3',
        },
        {
          name: '温度',
          value: '13.4C',
        },
        {
          name: '湿度',
          value: '64.55%RH',
        },
        {
          name: '噪音',
          value: '63.4db',
        },
        {
          name: '气压',
          value: '99.04Kpa',
        },
        {
          name: '风速',
          value: '0.35Km/h',
        },
      ],
    })
    setTimeout(() => {
      res.end(JSON.stringify(data))
    }, 500)
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
    }, 500)
  },
  '/things/v1/component/:componentid': (req: any, res: any) => {
    // console.log(req.params)
    const { componentid } = req.params
    const data = mockjs.mock({
      code: 200,
      data: [
        { w: 4, h: 6, x: 0, y: 0, i: '1' },
        {
          w: 4,
          h: 6,
          x: 0,
          y: 6,
          i: '2',
        },
        {
          w: 8,
          h: 6,
          x: 4,
          y: 6,
          i: '3',
        },
        { w: 8, h: 6, x: 4, y: 0, i: '4' },
      ],
    })
    setTimeout(() => {
      res.end(JSON.stringify(data))
    }, 500)
  },
  '/things/v1/widget/:widgetid': (req: any, res: any) => {
    // console.log(req.params)
    const { widgetid } = req.params
    const menuList = [
      { name: '环境设备1', id: '1299249076449185792' },
      { name: '环境设备2', id: '1299249076449185793' },
      { name: '环境设备3', id: '1299249076449185794' },
    ]
    let data = {}
    if (widgetid === '1') {
      data = mockjs.mock({
        code: 200,
        data: {
          API:
            'http://192.168.2.57:9876/things/v1/tsenvironment/today/trends/:deviceid?properties=temperature',
          title: '今日温度',
          originalApi: '',
          reqMethod: 'get',
          chartName: 'LineEchart',
          customComponentName: '',
          component_bg_class: 'component_bg_3',
          menuId: 'menuId',
          menuList,
        },
      })
    }
    if (widgetid === '2') {
      data = mockjs.mock({
        code: 200,
        data: {
          API:
            'http://192.168.2.57:9876/things/v1/tsenvironment/today/trends/:deviceid?properties=noise',
          title: '今日噪声',
          originalApi: '',
          reqMethod: 'get',
          chartName: 'LineEchart',
          customComponentName: '',
          component_bg_class: 'component_bg_3',
          menuId: '1321',
          menuList,
        },
      })
    }
    if (widgetid === '3') {
      data = mockjs.mock({
        code: 200,
        data: {
          API: '',
          title: '今日key',
          originalApi: '',
          reqMethod: 'get',
          chartName: '',
          customComponentName: 'EnvMonitorHome',
          component_bg_class: 'component_bg_3',
          menuId: '',
          menuList,
        },
      })
    }
    if (widgetid === '4') {
      data = mockjs.mock({
        code: 200,
        data: {
          API:
            'http://192.168.2.57:9876/things/v1/tsenvironment/today/trends/:deviceid?properties=pm25',
          title: '今日PM2.5趋势',
          originalApi: '',
          reqMethod: 'get',
          chartName: 'LineEchart',
          customComponentName: '',
          component_bg_class: 'component_bg_3',
          menuId: 'menuId',
          menuList,
        },
      })
    }
    setTimeout(() => {
      res.end(JSON.stringify(data))
    }, 500)
  },
  '/things/v1/component/ui/data': (req: any, res: any) => {
    console.log(req.query.code)
    let data = {}
    if (req.query.code === 'DashboardDeptTest') {
      data = mockjs.mock({
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
    } else {
      data = mockjs.mock({
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
    }

    setTimeout(() => {
      res.end(JSON.stringify(data))
    }, 500)
  },
}
