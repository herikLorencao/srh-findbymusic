export function saveUserId(state, data) {
  state.id = data;
}

export function removeUserId(state) {
  state.id = null;
}

export function saveUserInfo(state, data) {
  state.userInfoData = data;
}
