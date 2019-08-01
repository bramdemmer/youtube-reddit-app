
// TODO:
// Add the if array.length === 0 error (no youtube videos found) test with the r/tabs
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


/*
TRY:

fetch('https://www.reddit.com/r/listentothis.json')
.then(res=>res.json())
.then(res=>res)
.then(res=>res.data.children)
.then(res=>res.map( post => {
    return {
      author: post.data.author,
      link: post.data.url,
      img: post.data.thumbnail,
      title: post.data.title
    }
}))
.then(res=>res.filter( post => post.link.includes('yout')))
// .then(res=>res.map(render))
.then(res=>console.log(res))

// AND TRY more requests with "https://www.reddit.com/r/listentothis.json?after=t3_a59y31"
see: https://www.reddit.com/r/redditdev/comments/5m93pl/before_and_after/
see: https://www.reddit.com/r/redditdev/comments/1jg9yw/understanding_the_beforeafter_parameters_in_get/
*/


/**
 FOR DESIGN:

https://9elements.github.io/fancy-border-radius/#23.0.33.75--489.250
https://www.gradient-animator.com/
http://colormind.io/

 FOR PORTFOLIO:
 https://carbon.now.sh/?bg=rgba(120%2C128%2C128%2C1)&t=twilight&wt=none&l=auto&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=48px&ph=32px&ln=false&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false

 */
