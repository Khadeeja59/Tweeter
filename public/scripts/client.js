$(document).ready(function() {
  $(".error-1").hide();
  $(".error-2").hide();
  // load tweets with Ajax get request inside
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (response) {
      renderTweets(response);
      console.log('Success',response);
    });
  };
  loadTweets();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
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
    <p> ${escape(tweetObj.content.text)}</p>
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
    console.log('The form was submitted!');
    const serializedData = $(this).serialize();
    console.log(serializedData);
    let charLength = $("#tweet-text").val().length;
    console.log(charLength);
    //Checking if the character limit exceeds. 
    if ((charLength > 140)) {
      $(".error-1").html("<i class='fa-solid fa-triangle-exclamation'></i>Character limit exceeded!!!!!<i class='fa-solid fa-triangle-exclamation'></i>").slideDown();
      return;
    }
    else if ((charLength === 0)) {
      $(".error-1").html("<i class='fa-solid fa-triangle-exclamation'></i>TWEET EMPTY!!! Please write a message.<i class='fa-solid fa-triangle-exclamation'></i>").slideDown();
      return;
    }
    $(".error-1").slideUp();
    $(".error-2").slideUp();
    $.post('/tweets', serializedData, (response) => {
      console.log(response);
      loadTweets();
      $('#tweet-text').val('');
      $('.counter').text(140);
  
    })
  });
});




