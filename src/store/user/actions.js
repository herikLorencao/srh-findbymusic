import UserService from 'src/service/UserService';

export async function persistUserInfo({ commit }, data) {
  const userService = new UserService();
  const userId = data;

  const resp = await userService.find(userId);
  commit('saveUserInfo', resp);
}
