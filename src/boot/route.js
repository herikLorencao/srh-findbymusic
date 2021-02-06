import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars
export default async ({
  router,
  store,
  Vue,
}) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/cadastrar') {
      next();
      return;
    }

    if (to.path === '/logout') {
      store.commit('user/removeUserId');
      next('/login');
      return;
    }

    const sessionToken = Vue.$cookies.get('sessionToken');

    try {
      jwt.verify(sessionToken, Buffer.from(process.env.JWT_SIGNATURE, 'base64'), { algorithms: ['HS256'] });
    } catch (e) {
      next('/login');
    }

    const userInfo = store.getters['user/getUserInfo'];
    if (!userInfo.id) next('/login');

    next();
  });
};
