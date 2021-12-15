/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (response) {
    renderTweets(response);
    console.log('Success',response);


  // $.ajax({
  //   url: '/tweets',
  //   method: 'GET',
  //   dataType: 'json',
  //   success: (tweets) => {
  //     console.log("data", tweets);
  //     renderTweets(data);
  //   },
  //   error: (err) => {
  //     console.log(`error: ${err}`)
  //   } 
  });
};

loadTweets();


const createTweetElement = function(tweetObj) {

let time = timeago.format(1473245023718); 
let $tweet = $(`
<article class="article">
<header class="tweet-header">
<div>
<img src=${tweetObj.user.avatars}/>
<span class ="user">  ${tweetObj.user.name} </span>
</div>
<span> ${tweetObj.user.handle} </span>
</header>

<p> ${tweetObj.content.text}</p>

<footer class="tweet-footer">
<span> ${timeago.format(tweetObj.created_at)}  </span>
<div>
  <i class="fa-solid fa-flag"></i>
  <i class="fa-solid fa-retweet"></i>
  <i class="fa-solid fa-heart"></i>
</div>
</footer>
</article> `);

return $tweet;
};


const renderTweets = function(tweets) {
  $(".tweets-container").empty();
for (let tweet of tweets) {
  $(".tweets-container").prepend(createTweetElement(tweet));
}
};


const $form = $('#tweet-form');

$form.submit(function(event){
  event.preventDefault();
  console.log('The form was submitted!')
  const serializedData = $(this).serialize();
  console.log(serializedData);

  
  let charLength = $("#tweet-form").val().length;
  // let charLength = $("new-tweet").val().length;

  if ((charLength > 140)) {
    alert("The tweet is too long");
  }
  else if ((charLength < 0)) {
    alert("The tweet is empty");
  }
  $.post('/tweets', serializedData, (response) => {
    console.log(response)
    loadTweets();

  })

})

});




