const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/cadastrar',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/CreateUser') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/avaliacoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/rating/ListRatings') },
      { path: 'realizar', component: () => import('pages/rating/CreateRatings') },
    ],
  },
  {
    path: '/perfil',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/profile/EditProfile') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
