<template>
  <q-page class="flex column flex-center dark-page">
    <MusicScore v-if="!evaluationIsFinish" @evaluationFinish="evaluationFinish"/>

    <div v-else class="evaluation-success flex column items-center">
      <h1>Avaliação concluída com sucesso!</h1>
      <p>Esses dados serão de extrema importância para meu estudo de Sistemas de Recomendação</p>
      <p>Obrigado pela ajuda, agora você pode sair do sistema ou refazer a avaliação</p>
      <q-icon class="success-icon" name="fas fa-check-circle"></q-icon>
    </div>
  </q-page>
</template>

<script>
import MusicScore from 'components/MusicScore';

export default {
  name: 'CreateRatings',
  components: {
    MusicScore,
  },
  data() {
    return {
      evaluationIsFinish: false,
    };
  },
  methods: {
    evaluationFinish() {
      this.evaluationIsFinish = true;
    },
  },
};
</script>

<style scoped>

</style>
