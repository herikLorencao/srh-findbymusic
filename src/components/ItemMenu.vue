<template>
  <q-item v-show="showItemMenu" :class="itemMenuClasses">
    <a @click="clickItem" class="itemmenu-section flex items-center">
      <q-icon class="icon" :name="icon"/>
      <span>{{ label }}</span>
    </a>
  </q-item>
</template>

<script>
export default {
  name: 'ItemMenu',
  props: {
    label: {
      required: true,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
    link: {
      required: true,
      type: String,
    },
    parent: {
      required: false,
      type: String,
    },
    activateMenuParent: {
      required: false,
    },
  },
  computed: {
    showItemMenu() {
      if (!this.parent) return true;
      return this.activateMenuParent === this.parent;
    },
    itemMenuClasses() {
      let itemClass = '';

      if (this.activateMenuParent && this.activateMenuParent === this.parent) {
        itemClass = 'subitem';
      } else {
        itemClass = 'item';
      }

      return `itemmenu-item ${itemClass}`;
    },
  },
  methods: {
    clickItem() {
      this.$emit('clickItem', {
        label: this.label,
        link: this.link,
        parent: this.parent,
      });
    },
  },
};
</script>

<style scoped>

</style>
