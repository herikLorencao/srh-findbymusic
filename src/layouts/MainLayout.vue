<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex justify-between">
        <div>
          <q-btn
            flat
            dense
            round
            icon="fas fa-bars"
            aria-label="Menu"
            class="menu-button"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-btn
            flat
            dense
            round
            icon="fas fa-home"
            aria-label="Home"
            @click="goToHome"
          />
        </div>

        <q-fab flat square class="user-info" icon="fas fa-user" :label="username" direction="down"
               v-model="userMenuActive" vertical-actions-align="right">
          <q-fab-action @click="editProfile" square class="user-info-action" color="blue-grey-10"
                        icon="fas fa-user-edit" label="Perfil"/>
          <q-fab-action @click="logout" square class="user-info-action" color="blue-grey-10"
                        icon="fas fa-sign-out-alt" label="Sair"/>
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <div class="flex justify-center logo-image-painel">
        <q-img class="logo-main-image" src="../assets/primaryLogo.png"/>
      </div>

      <q-list>
        <ItemMenu v-for="(link, i) in links" :key="i" :label="link.label"
                  :icon="link.icon" :link="link.link" :parent="link.parent"
                  :activateMenuParent="activateParentItemMenu"
                  @clickItem="navigateInMenu"
        ></ItemMenu>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer :elevated="false" class="application-footer">
      <q-toolbar>
        <q-toolbar-title class="flex justify-center footer-text">
          Desenvolvido por Herik dos S. Lorenção
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import ItemMenu from 'components/ItemMenu';
import AuthService from 'src/service/AuthService';

const linksData = [
  {
    link: '/projetos',
    icon: 'fas fa-paperclip',
    label: 'Projetos',
  },
  {
    link: '/projetos/selecionar',
    icon: 'fas fa-exchange-alt',
    label: 'Selecionar Projeto',
    parent: 'Projetos',
  },
  {
    link: '/projetos/usuarios',
    icon: 'fas fa-user',
    label: 'Usuários',
    parent: 'Projetos',
  },
  {
    link: '/projetos/recomendacoes',
    icon: 'fas fa-lightbulb',
    label: 'Recomendações',
    parent: 'Projetos',
  },
  {
    link: '/projetos/avaliacoes',
    icon: 'fas fa-edit',
    label: 'Avaliações',
    parent: 'Projetos',
  },
  {
    link: '/projetos/itens',
    icon: 'fas fa-box',
    label: 'Itens',
    parent: 'Projetos',
  },
  {
    link: '/projetos/tags',
    icon: 'fas fa-tag',
    label: 'Tags',
    parent: 'Projetos',
  },
  {
    link: '/projetos/tipoitens',
    icon: 'fas fa-boxes',
    label: 'Tipos de item',
    parent: 'Projetos',
  },
  {
    link: '/admins',
    icon: 'fas fa-user',
    label: 'Administradores',
  },
  {
    link: '/tags',
    icon: 'fas fa-tags',
    label: 'Tags',
  },
  {
    link: '/tipoitens',
    icon: 'fas fa-boxes',
    label: 'Tipos de item',
  },
  {
    link: '/atributos',
    icon: 'fas fa-tasks',
    label: 'Atributos',
  },
  {
    link: '/apis',
    icon: 'fas fa-cog',
    label: 'APIs',
  },
];

export default {
  name: 'MainLayout',
  components: { ItemMenu },
  computed: {
    username() {
      const userData = this.$store.getters['user/getUserInfoData'];
      return userData && userData.name ? userData.name : 'Carregando ...';
    },
  },
  data() {
    return {
      userMenuActive: false,
      leftDrawerOpen: false,
      links: linksData,
      parentItemMenusLabels: ['Projetos'],
      activateParentItemMenu: null,
    };
  },
  methods: {
    navigateInMenu(menuInfo) {
      if (this.activateParentItemMenu === menuInfo.label) {
        this.activateParentItemMenu = null;
        return;
      }

      const findParentItemMenu = this.parentItemMenusLabels.filter(
        (item) => item === menuInfo.label,
      );

      if (findParentItemMenu.length > 0) {
        const [parentValue] = findParentItemMenu;
        this.activateParentItemMenu = parentValue;
      } else {
        this.activateParentItemMenu = menuInfo.parent;
      }

      this.$router.push(menuInfo.link);
    },
    goToHome() {
      this.$router.push('/');
    },
    logout() {
      const authService = new AuthService();
      authService.removeApiToken();
      this.$store.commit('user/removeUserId');
      this.$router.push('/login');
    },
    editProfile() {
      const adminId = this.$store.getters['user/getUserId'];
      this.$router.push(`/admins/editar/${adminId}?profile=true`);
    },
  },
  async mounted() {
    const adminId = this.$store.getters['user/getUserId'];
    await this.$store.dispatch('user/persistUserInfo', adminId);
  },
};
</script>
