<template>
  <div>
    <h3>This is the {{ name }}!</h3>
    <div class="filter-navigation">
      <nav class="filter filter--limit">
        <a
          class="filter__link"
          data-filter="limit"
          filter-value="25"
          href="#0"
        >25</a>
        <a
          class="filter__link"
          data-filter="limit"
          filter-value="50"
          href="#0"
        >50</a>
        <a
          class="filter__link"
          data-filter="limit"
          filter-value="100"
          href="#0"
        >100</a>
      </nav>

      <nav class="filter filter--sort">
        <a
          class="filter__link"
          data-filter="sort"
          filter-value="new"
          href="#0"
        >new</a>
        <a
          class="filter__link"
          data-filter="sort"
          filter-value="hot"
          href="#0"
        >hot</a>
        <a
          class="filter__link"
          data-filter="sort"
          filter-value="top"
          href="#0"
        >top</a>
        <a
          class="filter__link"
          data-filter="sort"
          filter-value="controversial"
          href="#0"
        >controversial</a>
      </nav>

      <nav class="filter filter--time">
        <a
          class="filter__link"
          data-filter="time"
          filter-value="hour"
          href="#0"
        >the past hour</a>
        <a
          class="filter__link"
          data-filter="time"
          filter-value="day"
          href="#0"
        >the past day</a>
        <a
          class="filter__link"
          data-filter="time"
          filter-value="week"
          href="#0"
        >the past week</a>
        <a
          class="filter__link"
          data-filter="time"
          filter-value="month"
          href="#0"
        >the past month</a>
        <a
          class="filter__link"
          data-filter="time"
          filter-value="year"
          href="#0"
        >the past year</a>
        <a
          class="filter__link"
          data-filter="time"
          filter-value="all"
          href="#0"
        >all time</a>
      </nav>

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
            <li
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
import jsonData from '../../../data/subreddits.json';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      jsonData,
    };
  },
};
</script>
