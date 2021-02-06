<template>
  <q-page class="flex flex-center login-page">
    <q-card v-if="!loading" flat bordered class="login-card flex column items-center">
      <q-card-section class="flex justify-center">
        <img src="~assets/secundaryLogo.png" alt="Logo"/>
      </q-card-section>
      <q-card-section class="login-form-section">
        <q-form @submit="submitLogin" class="flex column items-center">
          <q-input class="login-input" color="teal-12" v-model="loginForm.login" placeholder="login"
                   dark required>
            <template v-slot:prepend>
              <q-icon class="login-input-icon" name="fas fa-user"/>
            </template>
          </q-input>
          <q-input class="login-input" color="teal-12" v-model="loginForm.password" dark
                   placeholder="senha" type="password" required>
            <template v-slot:prepend>
              <q-icon class="login-input-icon" name="fas fa-key"/>
            </template>
          </q-input>
          <q-btn class="login-btn" text-color="white" label="Entrar" type="submit" />
          <router-link class="singup" to="/cadastrar">Cadastre-se</router-link>
        </q-form>
      </q-card-section>
    </q-card>
    <q-circular-progress
      v-else
      indeterminate
      size="150px"
      color="secondary"
      class="q-ma-md"
    />
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
      loading: false,
    };
  },
  methods: {
    async submitLogin() {
      this.loading = true;
      const loginService = new LoginService();
      const userInfo = await loginService.login(this.loginForm);

      if (userInfo && userInfo.userId) {
        notify('positive', 'Login realizado com sucesso');
        await this.$store.commit('user/saveUserId', userInfo.userId);
        await this.$router.push('/');
      }
      this.loading = false;
    },
  },
  mounted() {
    notify('custom-warning', 'Clique no link de Cadastro caso não possua uma conta');
  },
};
</script>

<style scoped>

</style>
