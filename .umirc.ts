import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', redirect: '/enterprise' },
        { path: '/login', component: '@/pages/Login' },
        { path: '/demo', component: '@/pages/Demo' },
        { path: '/sample', component: '@/pages/Sample' },
        { path: '/enterprise', component: '@/pages/Enterprise' },
        { path: '/project', component: '@/pages/Project' },
        { path: '/users', component: '@/pages/users' },
        { exact: true, path: '/users/:id?', component: '@/pages/users/[id$]' },
        { component: '@/pages/404' },
      ],
    },
  ],
})
