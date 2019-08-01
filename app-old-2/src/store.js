import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import axios from 'axios';

Vue.use(Vuex);

const DATA_PATH = '/data/subreddits.json';

export default new Vuex.Store({
  state: {
    filterType: {
      time: [],
      sort: [],
      limit: [],
    },
    messages: {
      failedRequest: '',
      invalidVideo: '',
      videoRemoved: '',
      selectAsubreddit: '',
      loadPlayer: '',
      playerReady: '',
    },
    category: [],
  },
  mutations: {
    updateFilterType: (state, payload) => {
      // eslint-disable-next-line
      state.filterType = payload;
    },

  },
  actions: {
    getData: ({ commit }) => {
      axios.get(DATA_PATH)
        .then((response) => {
          // console.log(response);
          commit('updateFilterType', response.data.filterType);
        });
    },
  },
  getters: {
    filterType: state => state.filterType,
    timeFilter: state => state.filterType.time,
  },
});
