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
        { path: '/', component: '@/pages/index' },
        { path: '/login', component: '@/pages/Login' },
        { path: '/demo', component: '@/pages/Demo' },
        { path: '/demo1', component: '@/pages/Demo/index1' },
        { path: '/editor', component: '@/pages/chart-editor' },
        {
          path: '/valid-component',
          component: '@/pages/valid-component',
        },
        { path: '/project', component: '@/pages/project/[id$]' },
        { path: '/project/:id?', component: '@/pages/project/[id$]' },
        { path: '/users', component: '@/pages/users' },
        { exact: true, path: '/users/:id?', component: '@/pages/users/[id$]' },
        { component: '@/pages/404' },
      ],
    },
  ],
})
