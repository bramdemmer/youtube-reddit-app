import 'svgxuse'; // needed for IE 11 SVG icons
import './assets';
import '../scss/master.scss';

import getVideoId from 'get-video-id';

// /* eslint-disable */


// TODO : remove the time options when NEW is selected
// Add the reddit discussion of the video.
// for a list of subreddits: https://www.reddit.com/r/Music/wiki/musicsubreddits en
// https://www.reddit.com/r/Music/comments/1c9shq/largest_music_subreddits_by_subscribers/
// make a better youtubePosts filter. (less checks)
// play next video when one is not available
// save this.redditURL in localstorage or the filters + subreddits
// Show message: Error playing the current video. Playing Next video...

class YoutubeRedditApp {
  constructor() {
    this.filter = {
      sort: 'hot',
      time: 'day',
      limit: '25',
    };
    this.subreddits = [
      '70s',
      'acappella',
      'acousticcovers',
      'ambientfolk',
      'animemusic',
      'bestofdisney',
      'boomswing',
      'bossanova',
      'carmusic',
      'concerts',
      'chillmusic',
      'cpop',
      'complextro',
      'dembow',
      'disco',
      'dreampop',
      'dub',
      'elephant6',
      'etimusic',
      'exotica',
      'filmmusic',
      'funksoumusic',
      'gamemusic',
      'gamesmusicmixmash',
      'gunslingermusic',
      'gypsyjazz',
      'indiefolk',
      'jambands',
      'jazz',
      'jazzfusion',
      'jazzinfluence',
      'listentoconcerts',
      'klezmer',
      'lt10k',
      'medievalmusic',
      'melancholymusic',
      'minimalism_music',
      'motown',
      'musicforconcentration',
    ];
    this.container = document.querySelector('.message');
  }

  init() {
    this.getRedditData().then((data) => {
      this.initYoutubePlayer(this.getYoutubeVideos(data));
    }).catch((error) => {
      console.warn(error);
      this.loadMessage('Error: failed to load videos from reddit.');
    });

    this.initFilters();


    // this.allsubreddits = document.querySelectorAll('.subreddits__checkbox');
    // this.isChecked = [];
    // Array.from(this.allsubreddits).forEach((subreddit) => {
    //   subreddit.addEventListener('change', () => {
    //     console.log('logged!');
    //     this.isChecked = Array.from(this.allsubreddits).filter(checkbox => checkbox.checked);

    //     console.log(this.isChecked);
    //   });
    // });
  }

  getYoutubeVideos(data) {
    this.videoIDs = [];
    const youtubePosts = data.filter(post => (post.data.media !== null && post.data.media.type && post.data.media.type.includes('youtube')));

    youtubePosts.forEach((post) => {
      if (getVideoId(post.data.url).id) {
        this.videoIDs.push(getVideoId(post.data.url).id);
      }
    });
    console.log(this);
    return this.videoIDs;
  }

  getRedditData() {
    this.redditUrl = `https://www.reddit.com/r/${this.subreddits.join('+')}/${this.filter.sort}/.json?limit=${this.filter.limit}&t=${this.filter.time}`;
    return fetch(this.redditUrl)
      .then(response => response.json())
      .then(data => data.data.children)
      .catch((error) => {
        console.warn(error);
        this.loadMessage('Error: failed to load videos from reddit.');
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
        width: '100%',
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
      this.loadMessage(`Error (Code: (${event.data})). Loading next video...`);
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
          this.loadMessage('Error: failed to load videos from reddit.');
        });
      });
    });
  }

  // selectSubreddits() {

  // }


  loadMessage(message, delay = 5000) {
    this.container.innerHTML = message;
    this.container.classList.add('is-visible');
    const timer = setTimeout(() => {
      this.container.classList.remove('is-visible');
      clearTimeout(timer);
    }, delay);
  }
}

const app = new YoutubeRedditApp();

app.init();
