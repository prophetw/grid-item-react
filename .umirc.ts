import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/login', component: '@/pages/Login' },
        { path: '/demo', component: '@/pages/Demo' },
        { path: '/users', component: '@/pages/users' },
        { exact: true, path: '/users/:id?', component: '@/pages/users/[id$]' },
        { component: '@/pages/404' },
      ],
    },
  ],
})
