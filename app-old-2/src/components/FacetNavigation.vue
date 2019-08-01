<template>
  <div class="facet-navigation">
    <div
      class="subreddits"
    >
      <section
        v-for="(category, i) in jsonData.category"
        :key="i"
        class="subreddits__category"
      >
        <div class="subreddits__category-head">
          <h3 class="subreddits__category-title" @click="category.isActive = !category.isActive">
            {{ category.name }}</h3>
          <button
            :id="'select-all-' + i"
            class="subreddits__select-all"
          >Toggle All</button>
        </div>
        <ul class="subreddits__list" v-show="category.isActive">
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
</template>

<script>
import jsonData from '@/assets/data/subreddits.json';

export default {
  data() {
    return {
      jsonData,
      isActive: false,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">

.facet-navigation {
  max-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  min-width: 20rem;
}

.subreddits {
    margin: 0.5rem 0;
    padding: 1rem;
    background-color: #ccc;

  &__category {

  }

  &__category-head {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  &__category-title {
    color: #456789;
    &::before {
      content: '\25BC '
    }
  }

  &__list {
    display: flex;
    flex-flow: column wrap;
    // display: none;

  }

  &__list-item {
    display: flex;
  }

  &__checkbox {

  }
}

</style>
