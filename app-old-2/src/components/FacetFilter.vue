<template>
  <div class="filter-block">
    <label :for="name + '-filter'">{{label}}</label>
    <select :id="name + '-filter'" :class="'filter-select filter-select--' + name">
      <option
      data-filter="none" value="none" disabled selected>Select your option</option>
      <template v-for="(item, index) in type" >
        <option class="filter__option"
        :key="index"
        :data-filter="name"
        :value="item.value">{{item.text}}</option>
      </template>
    </select>
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
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">

.filter-block {
  display: flex;
  flex-flow: column wrap;
}
.filter-select {
  margin: 0.5rem 0;
  padding: 1rem;
  background-color: #ccc;
}

</style>
