<template>
  <q-page class="flex flex-center dark-page">
    <div class="index-page column items-center">
      <h1>Bem vindo ao sistema de avaliação de músicas!</h1>
      <div class="welcome-guide">
        <p>
          Selecionamos um playlist com músicas de diversos gêneros e gostaríamos de sua colaboração
          para avaliá-las, para isso basta seguir os seguintes passos:
        </p>
        <ul class="score-steps">
          <li>Escolha a nota para música utilizando as estrelas</li>
          <li>Clique no botão avançar para continuar a avaliação</li>
          <li>Clique no botão voltar se desejar reavaliar alguma música</li>
        </ul>
        <p>
          <b>Dica:</b> Use o botão ? para escutar uma prévia da música
        </p>

        <p>Para iniciar a avaliação clique no botão abaixo:</p>

        <div class="welcome-action flex justify-center">
          <q-btn @click="startRating" class="btn-start" label="Iniciar Avaliação" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    async startRating() {
      await this.$router.push('/avaliacoes/realizar');
    },
  },
};
</script>
