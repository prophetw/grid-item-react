import { defineConfig } from 'umi'
console.log(' mode ', process.env.NODE_ENV)
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // base: '/dashboard',
  publicPath: process.env.NODE_ENV === 'production' ? '/dashboard/' : '/',
  hash: true,
  // history: { type: 'hash' },
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
        { path: '/custom', component: '@/pages/Custom' },
        { exact: true, path: '/users/:id?', component: '@/pages/users/[id$]' },
        { component: '@/pages/404' },
      ],
    },
  ],
})
