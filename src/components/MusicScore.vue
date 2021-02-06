<template>
  <div v-if="selectedItem && !loading" class="flex column items-center">
    <span v-if="pagination && pagination.totalElements" class="rating-progress">
      Itens: {{ itemIdx + 1 }} / {{ pagination.totalElements }}
    </span>
    <img v-if="selectedItem.attributes.length > 0" class="music-album"
         :src="selectedItem.attributes[0].value" alt="Capa Álbum">
    <img v-else class="music-album" src="../assets/icon.png" alt="Capa Álbum">
    <span class="music-title">{{ selectedItem.name }}</span>
    <q-rating
      v-if="selectedItem"
      v-model="score"
      size="2.5em"
      :max="5"
      icon-selected="star"
      icon="star_border"
      icon-half="star_half"
      color="secondary"
    />
    <div class="flex justify-around music-actions">
      <q-btn @click="backward" icon="fas fa-backward"/>
      <q-btn @click="toggleVisiblePlaylist" icon="fas fa-question"/>
      <q-btn @click="forward" :class="forwardClass" icon="fas fa-forward"/>
    </div>

    <q-dialog v-model="visiblePlaylist" persistent>
      <q-card class="playlist flex column dark-page">
        <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWrDntpgyzu9"
                width="300" height="380" frameborder="0" allowtransparency="true"
                allow="encrypted-media" />
        <q-btn @click="toggleVisiblePlaylist" label="Voltar para avaliações" />
      </q-card>
    </q-dialog>
  </div>
  <q-circular-progress
    v-else
    indeterminate
    size="150px"
    color="secondary"
    class="q-ma-md"
  />
</template>

<script>
import ProjectService from 'src/service/ProjectService';
import ItemRatingService from 'src/service/ItemRatingService';
import ItemService from 'src/service/ItemService';
import notify from 'src/helper/notify';

export default {
  name: 'MusicScore',
  computed: {
    selectedItem() {
      if (this.items.length >= 0) {
        return this.items[this.itemIdx];
      }
      return null;
    },
    forwardClass() {
      const itemIdxLength = this.itemIdx + 1;
      if (this.pagination.totalElements === itemIdxLength) {
        notify('custom-warning', 'Clique no botão de avançar para finalizar a avaliação');
        return 'forward-finish';
      }
      return '';
    },
  },
  data() {
    return {
      itemIdx: 0,
      items: [],
      itemsRatings: [],
      pagination: {
        perPage: 0,
        pageNumber: 0,
        totalPages: 0,
        totalElements: 0,
      },
      score: 0,
      loading: false,
      visiblePlaylist: false,
    };
  },
  methods: {
    toggleVisiblePlaylist() {
      this.visiblePlaylist = !this.visiblePlaylist;
    },
    backward() {
      this.saveItemRating();
      const newItemIdx = this.itemIdx - 1;

      if (newItemIdx >= 0) {
        this.itemIdx = newItemIdx;
      }

      if (this.selectedItem.score) {
        this.score = this.selectedItem.score;
      } else {
        this.score = 0;
      }
    },
    async forward() {
      this.saveItemRating();
      const newItemIdx = this.itemIdx + 1;

      if (newItemIdx >= this.items.length && newItemIdx < this.pagination.totalElements) {
        const nextPageNumber = this.pagination.pageNumber + 1;
        await this.loadItems(nextPageNumber);
      }

      if (newItemIdx === this.pagination.totalElements) {
        await this.$emit('evaluationFinish', this.items);
      } else {
        this.itemIdx = newItemIdx;
      }

      if (this.selectedItem.score) {
        this.score = this.selectedItem.score;
      } else {
        this.score = 0;
      }
    },
    saveItemRating() {
      const itemRatingService = new ItemRatingService();
      const item = this.selectedItem;
      const evaluatorId = this.$store.getters['user/getUserId'];

      const form = {
        score: this.score,
        itemId: item.id,
        evaluatorId,
      };

      itemRatingService.create(form);
    },
    async loadAttributes(itemId) {
      const itemService = new ItemService();
      const resp = await itemService.listAttributes(itemId);

      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].attributes) {
        // eslint-disable-next-line dot-notation
        return resp['_embedded'].attributes;
      }

      return [];
    },
    async loadItems(page = 0) {
      this.loading = true;

      const projectService = new ProjectService();
      const resp = await projectService.listItens(page);
      if (resp && resp.page) {
        this.pagination.totalPages = resp.page.totalPages;
        this.pagination.totalElements = resp.page.totalElements;
        this.pagination.perPage = resp.page.size;
      }
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].itens) this.items.push(...resp['_embedded'].itens);

      const addAttributes = this.items.map(async (item) => {
        item.attributes = await this.loadAttributes(item.id);
        return item;
      });

      this.items = await Promise.all(addAttributes);
      this.loading = false;
    },
  },
  watch: {
    score(value) {
      if (this.items.length > 0) {
        this.items[this.itemIdx].score = value;
      }
    },
  },
  async mounted() {
    await this.loadItems();
  },
};
</script>

<style scoped>

</style>
