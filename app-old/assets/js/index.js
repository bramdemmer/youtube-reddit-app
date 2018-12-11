
import './assets';
import '../scss/master.scss';
// import Vue from 'vue';
import getVideoId from 'get-video-id';
import jsonData from '../data/subreddits.json';
import '../vueApp';


/* eslint-disable */
  // new Vue({
  //   el: '#filters',
  //   data: {
  //     jsonData,
  //   },
  // });
/* eslint-disable */


/* eslint-enable */

// TODO:
// BETTER USE FETCH the jsonData to avoid cluttering the JS file
// create select all function
// create remove all or reset button
// remove the time options when NEW is selected
// filter posts on youtube videos only
// Add the reddit discussion link of the video.
// for a list of subreddits: https://www.reddit.com/r/Music/wiki/musicsubreddits en
// https://www.reddit.com/r/Music/comments/1c9shq/largest_music_subreddits_by_subscribers/
// make a better youtubePosts filter. (less checks)
// when error loading refresh or retry
// save this.redditURL in localstorage or the filters + subreddits

class YoutubeRedditApp {
  constructor() {
    // this.jsonData = fetch('../data/subreddits.json');
    this.filter = {
      sort: 'hot',
      time: 'day',
      limit: '50',
    };
    this.subreddits = [
      // 'deepintoyoutube',
      '2010smusic',
      '2000smusic',
      '90smusic',
      '80sremixes',
      '80smusic',
      '70smusic',
      '60smusic',
      '50smusic',
    ];
    this.jsonData = jsonData;
    this.messages = {
      failedRequest: 'Error: failed to load videos from reddit.',
      invalidVideo: 'The requested video is invalid. Loading next...',
      videoRemoved: 'The current video is private or was removed by the author. Loading next...',
    };
  }

  init() {
    this.getRedditData().then((data) => {
      this.initYoutubePlayer(this.getYoutubeVideos(data));
    }).catch((error) => {
      console.warn(error);
      YoutubeRedditApp.loadMessage(this.messages.failedRequest);
    });

    this.initFilters();


    // NEED TO CLEAN UP THIS
    this.allsubreddits = document.querySelectorAll('.subreddits__checkbox');
    this.isChecked = [];
    Array.from(this.allsubreddits).forEach((subreddit) => {
      subreddit.addEventListener('change', () => {
        console.log('logged!');
        this.isChecked = Array.from(this.allsubreddits).filter(checkbox => checkbox.checked);

        this.subreddits = [];
        this.isChecked.forEach((isChecked) => {
          this.subreddits.push(isChecked.getAttribute('value'));
        });

        this.getRedditData().then((data) => {
          const newIDs = this.getYoutubeVideos(data);
          this.player.cuePlaylist(newIDs);
        }).catch((error) => {
          console.warn(error);
          YoutubeRedditApp.loadMessage(this.messages.failedRequest);
        });
      });
    });

    document.querySelectorAll('.subreddits__select-all').forEach((selectAll) => {
      selectAll.addEventListener('change', () => {
        const checkboxes = selectAll.parentElement.querySelectorAll('.subreddits__checkbox');
        console.log(selectAll.checked);
        checkboxes.forEach((checkbox) => {
          /*eslint-disable*/
          checkbox.checked = selectAll.checked;
          /* eslint-enable */
        });

        // tigger isCheked function
      });
    });
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
        YoutubeRedditApp.loadMessage(this.messages.failedRequest);
      });
  }

  initYoutubePlayer(ids) {
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
      this.player.cuePlaylist(ids);
    };

    this.onPlayerError = (event) => {
      console.log(event);
      if (event.data === 2 || event.data === 5) {
        YoutubeRedditApp.loadMessage(this.messages.invalidVideo);
      } else {
        YoutubeRedditApp.loadMessage(this.messages.videoRemoved);
      }
      this.player.nextVideo();
    };
  }

  initFilters() {
    const filterLinks = document.querySelectorAll('.filter__link');

    Array.from(filterLinks).forEach((link) => {
      link.addEventListener('click', () => {
        this.filter[link.getAttribute('data-filter')] = link.getAttribute('filter-value');

        Array.from(link.parentElement.children).forEach(sibbling => sibbling.classList.remove('is-selected'));
        link.classList.add('is-selected');

        this.getRedditData().then((data) => {
          const newIDs = this.getYoutubeVideos(data);
          this.player.cuePlaylist(newIDs);
        }).catch((error) => {
          console.warn(error);
          YoutubeRedditApp.loadMessage(this.messages.failedRequest);
        });
      });
    });
  }

  // selectSubreddits() {

  // }


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
