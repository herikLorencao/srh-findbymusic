<template>
  <q-page class="flex column items-center dark-page list-ratings">
    <h1>Avaliações</h1>
    <q-table class="table" :columns="columns" :data="ratings" row-key="id" flat dark
             hide-pagination/>
    <q-pagination
      @input="loadItemRatings"
      v-model="pagination.page"
      color="grey-3"
      text-color="grey-10"
      :max="pagination.pageNumber"
      :max-pages="5"
      :direction-links="true"
      :boundary-links="true"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      size="md"
      class="pagination"
      dark
    />
  </q-page>
</template>

<script>
import ItemRatingService from 'src/service/ItemRatingService';
import ItemService from 'src/service/ItemService';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Item',
    align: 'center',
    sortable: false,
  },
  {
    name: 'score',
    field: 'score',
    label: 'Nota',
    align: 'center',
    sortable: false,
  },
];

export default {
  name: 'ListItemRatings',
  data() {
    return {
      columns,
      ratings: [],
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadItemRatings(page = 1) {
      const apiPage = page - 1;
      const itemRatingService = new ItemRatingService();
      const resp = await itemRatingService.listByEvaluator(this.$store.getters['user/getUserId'], apiPage);
      if (resp && resp.totalPages) this.pagination.pageNumber = resp.totalPages;

      if (resp.content) {
        const promises = resp.content.map(async (itemRating) => {
          const itemService = new ItemService();

          const item = await itemService.find(itemRating.itemId);

          itemRating.itemId = item.id;
          itemRating.name = item.name;
          itemRating.id = `${itemRating.itemId}/${itemRating.evaluatorId}`;
        });

        await Promise.all(promises);
      }

      // eslint-disable-next-line dot-notation
      if (resp && resp.content) this.ratings = resp.content;
    },
  },
  async mounted() {
    await this.loadItemRatings();
  },
};
</script>

<style scoped>

</style>
