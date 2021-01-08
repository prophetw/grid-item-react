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
}
