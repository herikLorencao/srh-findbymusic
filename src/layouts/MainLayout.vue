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
<!--          <q-fab-action @click="editProfile" square class="user-info-action" color="blue-grey-10"-->
<!--                        icon="fas fa-user-edit" label="Perfil"/>-->
          <q-fab-action @click="logout" square class="user-info-action" color="blue-grey-10"
                        icon="fas fa-sign-out-alt" label="Sair"/>
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="left-menu"
    >
      <div class="flex justify-center logo-image-painel">
        <q-img class="logo-main-image" src="../assets/secundaryLogo.png"/>
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
    link: '/',
    icon: 'fas fa-edit',
    label: 'Inicio',
  },
  {
    link: '/avaliacoes',
    icon: 'fas fa-edit',
    label: 'Avaliações',
  },
  {
    link: '/logout',
    icon: 'fas fa-edit',
    label: 'Sair',
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
      const evaluatorId = this.$store.getters['user/getUserId'];
      this.$router.push(`/perfil/${evaluatorId}`);
    },
  },
  async mounted() {
    const adminId = this.$store.getters['user/getUserId'];
    await this.$store.dispatch('user/persistUserInfo', adminId);
  },
};
</script>
