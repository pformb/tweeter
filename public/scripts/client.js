/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// AJAX POST request in client.js that sends the form data to the server
$(document).ready(function () {
  
  $("#tweet-form").submit(function (event) {
    // Prevent the default form submission behavior
    console.log("Form submitted");

    event.preventDefault();

    console.log("Default behavior prevented");
    
    // Serialize the form data into a query string
    let formData = $(this).serialize();

    // Use jQuery AJAX to submit a POST request
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (response) {
        // Handle the success response from the server if needed
        console.log("Data sent successfully");
      },
      error: function (error) {
        // Handle the error response from the server if needed
        console.error("Error sending data:", error);
      },
    });
  });
});

$(document).ready(function () {
  // Define the renderTweets function (assuming you already have this function)

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  }

  // Define the loadTweets function
  function loadTweets() {
    // Make an AJAX GET request to fetch tweets
    $.ajax({
      type: "GET",
      url: "http://localhost:5000/tweets",
      dataType: "json", // Specify that you expect JSON response
      success: function (tweets) {
        // Call renderTweets with the received tweets
        renderTweets(tweets);
        console.log("Tweets loaded successfully:", tweets);
      },
      error: function (xhr, status, error) {
        // Handle the error response
        console.error("Error loading tweets:", status, error);
      },
    });
  }

  // Call loadTweets function after its definition
  loadTweets();
});




function createTweetElement(tweetData) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <img class="avatar" src="${tweetData.user.avatars}" alt="User Avatar">
          <span class="user-name">${tweetData.user.name}</span>
        </div>
        <span class="user-handle">${tweetData.user.handle}</span>
      </header>
      <div class="tweet-content">
        <p>${tweetData.content.text}</p>
      </div>
      <footer>
        <span class="tweet-time">${timeago.format(tweetData.created_at)}</span>
        <div class="tweet-actions">
          <!-- Add any additional tweet actions here if needed -->
        </div>
      </footer>
    </article>
  `);

  return $tweet;
}

// // Test / driver code (temporary)
// const tweetData = {
//   user: {
//     name: "Newton",
//     avatars: "https://i.imgur.com/73hZDYK.png",
//     handle: "@SirIsaac",
//   },
//   content: {
//     text: "If I have seen further it is by standing on the shoulders of giants",
//   },
//   created_at: 1461116232227,
// };

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet);
// $("#tweets-container").append($tweet);

/* ---------------------------------------------------------- */

// Function to render an array of tweets in the tweets-container
// const renderTweets = function (tweets) {
//   for (const tweet of tweets) {
//     const $tweet = createTweetElement(tweet);
//     $("#tweets-container").append($tweet);
//   }
// };

// // Test / driver code (temporary)

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

// Render the test data
// renderTweets(data);



