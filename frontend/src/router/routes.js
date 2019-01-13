
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: 'projects/new',
            component: () => import('components/NewProject.vue')
          },
          {
            path: 'projects/id=:projectId',
            name: 'api-list',
            component: () => import('pages/Project.vue'),
            children: [
              {
                path: 'api=:api/method=:method',
                name: 'info',
                components: {
                  api: () => import('components/Api.vue')
                }
              },
              {
                path: 'new',
                name: 'new',
                components: {
                  api: () => import('components/Api.vue')
                }
              }
            ]
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
