<template>
  <q-page class="flex flex-center login-page">
    <q-card flat bordered class="signup-card flex column items-center">
      <q-card-section class="title">
        Cadastro
      </q-card-section>
      <q-card-section class="create-user-form">
        <q-form @submit="submitCreateUser" class="flex column items-center">
          <q-input class="user-create-input" color="teal-12" v-model="userForm.name"
                   placeholder="Nome" dark required/>
          <q-input class="user-create-input" color="teal-12" v-model="userForm.login"
                   placeholder="Login" dark required/>
          <q-input class="user-create-input" color="teal-12" v-model="userForm.email"
                   placeholder="Email" type="email" dark required/>
          <q-input class="user-create-input" color="teal-12" v-model="userForm.password" dark
                   placeholder="Senha" type="password" required/>
          <q-input class="user-create-input" color="teal-12" v-model="verifyPassword" dark
                   placeholder="Repetir Senha" type="password" required/>
          <q-btn class="btn" text-color="white" label="Cadastrar" type="submit"/>
          <router-link class="link" to="/login">Voltar</router-link>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import notify from 'src/helper/notify';
import UserService from 'src/service/UserService';
import ProjectService from 'src/service/ProjectService';

export default {
  name: 'CreateUser',
  data() {
    return {
      userForm: {},
      verifyPassword: '',
    };
  },
  methods: {
    async submitCreateUser() {
      if (this.userForm.password !== this.verifyPassword) {
        notify('negative', 'As senhas informadas não conferem');
        return;
      }

      const userService = new UserService();
      const resp = await userService.create(this.userForm);

      if (resp) {
        notify('positive', 'Usuário criado com sucesso');

        await this.syncUserToProject(resp.id);
        await this.$store.commit('user/saveUserId', resp.id);
        await this.$router.push('/');
      } else {
        notify('Não foi possível criar o usuário');
      }
    },
    async syncUserToProject(userId) {
      const projectService = new ProjectService();
      const projectId = process.env.PROJECT_ID;
      await projectService.addUser(projectId, userId);
    },
  },
};
</script>

<style scoped>

</style>
