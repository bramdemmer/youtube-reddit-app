import Vue from 'vue';
import getVideoId from 'get-video-id';
import App from './App.vue';
import router from './router';
import store from './store';
import jsonData from '@/assets/data/subreddits.json';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


class YoutubeRedditApp {
  constructor() {
    this.defaultFilters = {
      sort: 'hot',
      time: 'day',
      limit: '100',
    };
    this.subreddits = null;
    this.jsonData = jsonData;
  }

  init() {
    this.filter = this.defaultFilters;
    this.subreddits = this.getRandomSubreddits(3);

    console.log(this.subreddits);

    this.getRedditData().then((data) => {
      this.initYoutubePlayer(this.getYoutubeVideos(data));
    }).catch((error) => {
      console.warn(error);
      YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
    });

    this.initFilters();


    // NEED TO CLEAN UP
    this.allsubreddits = document.querySelectorAll('.subreddits__checkbox');
    this.isChecked = [];
    Array.from(this.allsubreddits).forEach((subreddit) => {
      subreddit.addEventListener('change', () => {
        this.reloadAllSubreddits();
      });
    });

    document.querySelectorAll('.subreddits__select-all').forEach((selectAll) => {
      selectAll.addEventListener('click', () => {
        const checkboxes = selectAll.parentElement.parentElement.querySelectorAll('.subreddits__checkbox');

        if (Array.from(checkboxes).filter(checkbox => checkbox.checked === false).length > 0) {
          checkboxes.forEach((checkbox) => {
            // eslint-disable-next-line
            checkbox.checked = true;
          });
        } else {
          checkboxes.forEach((checkbox) => {
            // eslint-disable-next-line
            checkbox.checked = false;
          });
        }
        this.reloadAllSubreddits();
      });
    });
  }

  getRandomSubreddits(n) {
    const randomSubsArray = [];

    for (let i = 0; i < n; i += 1) {
      const cat = this.jsonData.category[Math.floor(Math.random() * this.jsonData.category.length)];
      const sub = cat.subreddits[Math.floor(Math.random() * cat.subreddits.length)];
      randomSubsArray.push(sub);
    }

    return randomSubsArray;
  }


  reloadAllSubreddits() {
    this.isChecked = Array.from(this.allsubreddits).filter(checkbox => checkbox.checked);

    if (this.isChecked.length === 0) {
      YoutubeRedditApp.loadMessage(jsonData.messages.selectAsubreddit);
    } else {
      this.subreddits = [];

      this.isChecked.forEach((isChecked) => {
        this.subreddits.push(isChecked.getAttribute('value'));
      });
      this.getRedditData().then((data) => {
        const newIDs = this.getYoutubeVideos(data);
        this.player.cuePlaylist(newIDs);
      }).catch((error) => {
        console.warn(error);
        YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
      });
    }
  }

  getYoutubeVideos(data) {
    this.videoIDs = [];
    const youtubePosts = data.filter(post => (post.data.media !== null && post.data.media.type && post.data.media.type.includes('youtube')));

    youtubePosts.forEach((post) => {
      // console.log(post.data.url);
      if (getVideoId(post.data.url).id) {
        this.videoIDs.push(getVideoId(post.data.url).id.substring(0, 11));
      }
    });
    console.log(this.videoIDs);
    return this.videoIDs;
  }

  getRedditData() {
    this.redditUrl = `https://www.reddit.com/r/${this.subreddits.join('+')}/${this.filter.sort}/.json?limit=${this.filter.limit}&t=${this.filter.time}`;
    return fetch(this.redditUrl)
      .then(response => response.json())
      .then(data => data.data.children)
      .catch((error) => {
        console.warn(error);
        YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
      });
  }

  initYoutubePlayer(ids) {
    YoutubeRedditApp.loadMessage(jsonData.messages.loadPlayer);

    this.player = null;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* global YT */
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player('player', {
        height: '360',
        width: '560',
        playerVars: {
          modestbranding: 1,
        },
        events: {
          onReady: this.onPlayerReady,
          onError: this.onPlayerError,
        },
      });
    };
    this.onPlayerReady = () => {
      YoutubeRedditApp.loadMessage(jsonData.messages.playerReady);
      this.player.cuePlaylist(ids);
    };

    this.onPlayerError = (event) => {
      console.log(event);
      if (event.data === 2 || event.data === 5) {
        YoutubeRedditApp.loadMessage(jsonData.messages.invalidVideo);
      } else {
        YoutubeRedditApp.loadMessage(jsonData.messages.videoRemoved);
      }
      this.player.nextVideo();
    };
  }

  initFilters() {
    const filterSelect = document.querySelectorAll('.filter-select');

    Array.from(filterSelect).forEach((select) => {
      select.addEventListener('change', () => {
        const selectedOption = select.options[select.selectedIndex];

        if (selectedOption.value !== 'none') {
          this.filter[selectedOption.getAttribute('data-filter')] = selectedOption.value;
          this.getRedditData().then((data) => {
            const newIDs = this.getYoutubeVideos(data);
            this.player.cuePlaylist(newIDs);
          }).catch((error) => {
            console.warn(error);
            YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
          });
        }
      });
    });
  }

  static loadMessage(message, delay = 5000) {
    const container = document.querySelector('.message');
    container.innerHTML = message;
    container.classList.add('is-visible');
    const timer = setTimeout(() => {
      container.classList.remove('is-visible');
      clearTimeout(timer);
    }, delay);
  }
}

const app = new YoutubeRedditApp();

app.init();
