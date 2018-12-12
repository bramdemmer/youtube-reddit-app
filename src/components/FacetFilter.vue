<template>
  <div>
      <nav :class="'filter filter--' + name">
        <template v-for="(item, index) in type" >
          <a class="filter__link"
            :key="index"
            :data-filter="name"
            :filter-value="item.value"
            >
            {{item.text}}
         </a>
        </template>

      </nav>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">

</style>
