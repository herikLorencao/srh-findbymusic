// import AdminService from 'src/service/AdminService';

export async function persistUserInfo({ commit }, data) {
  // const adminService = new AdminService();
  const adminId = data;

  // const resp = await adminService.find(adminId);
  commit('saveUserInfo', adminId);
}
