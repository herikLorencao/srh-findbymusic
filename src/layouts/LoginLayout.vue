<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer :elevated="false" class="text-white">
      <q-toolbar>
        <q-toolbar-title class="flex justify-center footer-text">
          Desenvolvido por Herik dos S. Lorenção
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
};
</script>

<style scoped>

</style>
