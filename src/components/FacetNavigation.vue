<template>
  <div class="">
    <div class="filter-navigation">
      <facet-filter name="time" :type="jsonData.filterType.time"/>
      <facet-filter name="limit" :type="jsonData.filterType.limit"/>
      <facet-filter name="sort" :type="jsonData.filterType.sort"/>

      <div
        id="filters"
        class="subreddits"
      >
        <section
          v-for="(category, i) in jsonData.category"
          :key="i"
          class="subreddits__category"
        >
          <h3>{{ category.name }}</h3>
          <input
            :id="'select-all-' + i"
            class="subreddits__select-all"
            type="checkbox"
            :value="'select-all-' + i"
          >
          <label :for="'select-all-' + i">Select all {{ category.name }}</label>
          <ul class="subreddits__list">
            <li class="subreddits__list-item"
              v-for="(subreddit, j) in category.subreddits"
              :key="j"
            >
              <input
                :id="'r-' + subreddit"
                class="subreddits__checkbox"
                type="checkbox"
                :value="subreddit"
              >
              <label :for="'r-' + subreddit">{{ subreddit }}</label>
            </li>
          </ul>
        </section>
      </div>

    </div>
  </div>
</template>

<script>
import jsonData from '@/assets/data/subreddits.json';
import FacetFilter from '@/components/FacetFilter.vue';

export default {
  components: {
    FacetFilter,
  },
  data() {
    return {
      jsonData,
    };
  },
};
</script>

<style lang="scss">
.filter {
  display: flex;
  flex-flow: row wrap;

  &__link {
    padding: 1rem;
    margin: 0.5rem;
    background-color: #ccc;

    &.is-selected {
      background: cornflowerblue;
    }
  }
}

.subreddits {
  &__category {

  }

  &__list {
    display: flex;
    flex-flow: column wrap;
  }

  &__list-item {
    display: flex;
  }

  &__checkbox {

  }
}

</style>
