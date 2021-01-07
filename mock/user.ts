import mockjs from 'mockjs'
const { Random } = mockjs
export default {
  '/api/user': (req: any, res: any) => {
    const data = mockjs.mock({
      'data|1-10': [
        {
          name: '@name',
          value: () => Random.natural(0, 100),
        },
      ],
    })
    const result = JSON.stringify(data)
    setTimeout(() => {
      res.end(result)
    }, 2000)
  },
  '/api/componentconfig/:id': (req: any, res: any) => {
    let data
    if (req.params.id === 'a' || '' + req.params.id === '' + 1) {
      data = mockjs.mock({
        code: 200,
        data: {
          API: '/api/area',
          title: '你好呀',
          reqMethod: 'get',
          chartName: 'Area',
        },
      })
    } else {
      data = mockjs.mock({
        code: 200,
        data: {
          customComponentName: 'DataV',
        },
      })
    }
    const result = JSON.stringify(data)
    setTimeout(() => {
      res.end(result)
    }, 2000)
  },

  '/api/area': (req: any, res: any) => {
    const data = mockjs.mock({
      'data|1-10': [
        {
          name: '@word(3, 5)',
          uv: () => Random.natural(0, 1500),
          pv: () => Random.natural(500, 1500),
          amt: () => Random.natural(500, 1000),
        },
      ],
    })
    const result = JSON.stringify(data)
    setTimeout(() => {
      res.end(result)
    }, 2000)
  },
  '/api/layout/:projectid': (req: any, res: any) => {
    console.log(req.params.projectid)
    let data
    if (req.params.projectid === '1') {
      data = mockjs.mock({
        code: 200,
        data: [
          { w: 9, h: 12, x: 3, y: 0, i: 'a', moved: false, static: false },
          { w: 3, h: 3, x: 0, y: 0, i: '42', moved: false, static: false },
          { w: 3, h: 3, x: 0, y: 3, i: '64', moved: false, static: false },
          { w: 3, h: 3, x: 0, y: 6, i: '94', moved: false, static: false },
          { w: 3, h: 3, x: 0, y: 9, i: '12', moved: false, static: false },
        ],
      })
    } else {
      data = mockjs.mock({
        code: 200,
        data: [
          { w: 12, h: 3, x: 0, y: 0, i: 'a', moved: false, static: false },
          { w: 8, h: 9, x: 0, y: 3, i: '98', moved: false, static: false },
          { w: 4, h: 4, x: 8, y: 3, i: '17', moved: false, static: false },
          { w: 4, h: 5, x: 8, y: 7, i: '37', moved: false, static: false },
        ],
      })
    }

    const result = JSON.stringify(data)
    setTimeout(() => {
      res.end(result)
    }, 2000)
  },
}
