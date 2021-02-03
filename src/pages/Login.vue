<template>
  <q-page class="flex flex-center login-page">
    <q-card flat bordered class="login-card flex column items-center">
      <q-card-section class="flex justify-center">
        <img src="~assets/loginLogo.png" alt="Logo"/>
      </q-card-section>
      <q-card-section class="login-form-section">
        <q-form @submit="submitLogin" class="flex column items-center">
          <q-input class="login-input" color="orange" v-model="loginForm.login" placeholder="login">
            <template v-slot:prepend>
              <q-icon class="login-input-icon" name="fas fa-user"/>
            </template>
          </q-input>
          <q-input class="login-input" color="orange" v-model="loginForm.password"
                   placeholder="senha" type="password">
            <template v-slot:prepend>
              <q-icon class="login-input-icon" name="fas fa-key"/>
            </template>
          </q-input>
          <q-btn class="login-btn" text-color="white" label="Entrar" type="submit" />
          <router-link class="forget-password" to="/recuperarsenha">Esqueceu a Senha?</router-link>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import LoginService from 'src/service/LoginService';
import notify from '../helper/notify';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {},
    };
  },
  methods: {
    async submitLogin() {
      const loginService = new LoginService();
      const userInfo = await loginService.login(this.loginForm);

      if (userInfo && userInfo.userId) {
        notify('positive', 'Login realizado com sucesso');
        await this.$store.commit('user/saveUserId', userInfo.userId);
        await this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>

</style>
