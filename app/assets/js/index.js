import '../scss/master.scss';
import getVideoId from 'get-video-id';
import jsonData from '../data/subreddits.json';

// TODO:
// BETTER USE FETCH the jsonData to avoid cluttering the JS file
// create select all function
// remove the time options when NEW is selected
// filter posts on youtube videos only
// Add the reddit discussion link of the video.
// for a list of subreddits: https://www.reddit.com/r/Music/wiki/musicsubreddits en
// https://www.reddit.com/r/Music/comments/1c9shq/largest_music_subreddits_by_subscribers/
// make a better youtubePosts filter. (less checks)
// when error loading refresh or retry
// save this.redditURL in localstorage or the filters + subreddits
// if top or controversial is selected show time

class YoutubeRedditApp {
  constructor() {
    this.defaultFilters = {
      sort: 'hot',
      time: 'day',
      limit: '100',
    };
    this.subreddits = null;
    this.jsonData = jsonData;
    this.navButtons = document.querySelectorAll('.toggle-subreddits');
    this.resetButton = document.querySelector('.reset-button');
    this.selectEverything = document.querySelector('.select-everything');
  }

  init() {
    this.createSubredditList();
    this.createFilters();
    this.filter = this.defaultFilters;
    this.subreddits = this.getRandomSubreddits(3);
    console.log(this.subreddits);

    this.getRedditData().then((data) => {
      this.initYoutubePlayer(this.getYoutubeVideos(data));
      YoutubeRedditApp.loadMessage(`Randomly selected three subreddits: <br> <strong>${this.subreddits.join(', ')}</strong>.`);
    }).catch((error) => {
      console.warn(error);
      YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
    });

    this.initFilters();

    this.resetButton.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('.subreddits__checkbox');
      Array.from(checkboxes).forEach((checkbox) => {
        // eslint-disable-next-line
        checkbox.checked = false;
      });
      this.subreddits = this.getRandomSubreddits(3);
      this.getRedditData().then((data) => {
        const newIDs = this.getYoutubeVideos(data);
        this.player.cuePlaylist(newIDs);
        YoutubeRedditApp.loadMessage(`Randomly selected three subreddits: <br> <strong>${this.subreddits.join(', ')}</strong>.`);
      }).catch((error) => {
        console.warn(error);
        YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
      });
    });

    this.selectEverything.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('.subreddits__checkbox');
      Array.from(checkboxes).forEach((checkbox) => {
        // eslint-disable-next-line
        checkbox.checked = true;
      });
      this.reloadAllSubreddits();
    });

    Array.from(this.navButtons).forEach((navButton) => {
      navButton.addEventListener('click', () => {
        document.querySelector('.subreddits-nav').classList.toggle('is-visible');
      });
    });

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
        const checkboxes = selectAll.parentElement.querySelectorAll('.subreddits__checkbox');

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

  createSubredditList() {
    jsonData.category.forEach((category, index) => {
      this.htmlcategory = `<section clas="subreddits__category">
      <h3>${category.name}</h3>
      <input id="select-all-cat-${index}" class="subreddits__select-all" type="checkbox"
      value="select-all-cat-${index}">
      <label for="select-all-cat-${index}">Toggle all ${category.name}</label>
      <ul class="subreddits__category-list-${index}">

      </ul>
      </section>`;

      document.querySelector('.subreddits').insertAdjacentHTML('beforeend', this.htmlcategory);
      // console.log(category);
      category.subreddits.forEach((sub) => {
        this.htmlcategorylist = `<li><input id="r-${sub}" class="subreddits__checkbox"
    type="checkbox" value="${sub}">
          <label for="r-${sub}">${sub}</label>
        </li>`;

        document.querySelector(`.subreddits__category-list-${index}`).insertAdjacentHTML('beforeend', this.htmlcategorylist);
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
        YoutubeRedditApp.loadMessage(jsonData.messages.playerReady);
        console.log(this.subreddits);
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
    return fetch(this.redditUrl, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => data.data.children)
      .catch((error) => {
        console.warn(error);
        YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
      });
  }

  initYoutubePlayer(ids) {
    YoutubeRedditApp.loadMessage(jsonData.messages.loadPlayer);


    // CHECK node module scriptjs
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
        YoutubeRedditApp.loadMessage(jsonData.messages.invalidVideo);
      } else {
        YoutubeRedditApp.loadMessage(jsonData.messages.videoRemoved);
      }
      this.player.nextVideo();
    };
  }

  createFilters() {
    jsonData.filterType.forEach((filterType) => {
      this.htmlfilter = `<label for="${filterType.name}-filter">${filterType.name}</label>
      <select id="${filterType.name}-filter" class="filter-select filter-select--${filterType.name}">
        <option data-filter="none" value="none" disabled selected>Select your option</option>
      </select>`;

      document.querySelector('.filter-block').insertAdjacentHTML('afterbegin', this.htmlfilter);

      filterType.values.forEach((value) => {
        this.filterTypelist = `<option class="filter__option"
          data-filter="${filterType.name}"
          value="${value.value}">${value.text}</option>`;
        document.querySelector('.filter-select').insertAdjacentHTML('beforeend', this.filterTypelist);
      });
    });
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
            console.log(this.filter);
          }).catch((error) => {
            console.warn(error);
            YoutubeRedditApp.loadMessage(jsonData.messages.failedRequest);
          });
        }
      });
    });
  }

  static loadMessage(message, delay = 8000) {
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
