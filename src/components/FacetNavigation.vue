<template>
  <div class="">
    <div class="filter-navigation">
      <div
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

export default {
  data() {
    return {
      jsonData,
    };
  },
};
</script>

<style lang="scss">
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
