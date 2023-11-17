$(document).ready(function () {
  
  // Function to render an array of tweets in the tweets-container
  function renderTweets(tweets) {
    const $tweetsContainer = $(".tweets-container"); // Select the container
  
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet); // Append to the container
    }
  }
  
  // Function to load tweets
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

  // Function to create a tweet element
  function createTweetElement(tweetData) {
    // Format the tweet's creation date using timeago
    const formattedDate = timeago.format(new Date(tweetData.created_at));
  
    // Create the tweet element
    const $tweet = $(`
      <article class="tweet-post">
        <header>
          <div class="avatar">
            <img src="${tweetData.user.avatars}" alt="Profile Image">
          </div>
          <div class="name">
            <h2>${tweetData.user.name}</h2>
          </div>
          <div class="username">
            <h2>${tweetData.user.handle}</h2>
          </div>
        </header>
        <div class="tweet-content">
          <p>${tweetData.content.text}</p>
        </div>
        <footer>
          <div class="date">${formattedDate}</div>
          <div class="icons">
            <i class="far fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
  
    return $tweet;
  }
  

  // Validation function
  function validateTweet(formData) {
    // Extract tweet text from the form data
    const tweetText = decodeURIComponent(formData.split("=")[1]);

    // Check if tweet text is empty
    if (!tweetText.trim()) {
      alert("Error: Tweet content cannot be empty.");
      return false;
    }

    // Check if tweet text exceeds the character limit (140 characters)
    if (tweetText.length > 140) {
      alert("Error: Tweet content exceeds the 140 character limit.");
      return false;
    }

    // Validation passed
    return true;
  }

  // Form submission handler
  $("#tweet-form").submit(function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Serialize the form data into a query string
    let formData = $(this).serialize();

    // Validate the tweet content
    if (!validateTweet(formData)) {
      return; // Exit the function if validation fails
    }

    // Use jQuery AJAX to submit a POST request
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (response) {
        // Check if the response contains an error message
        if (response.error) {
          // Display an alert for the error message
          alert("Error: " + response.error);
        } else {
          // Fetch and render tweets again after successful submission
          loadTweets();
          console.log("Data sent successfully");

          // Clear the textarea
        $("#tweet-text").val('');

        // Reset the character counter
        $(".counter").text('140');

        }
      },
      error: function (error) {
        // Handle the error response from the server if needed
        console.error("Error sending data:", error);
      },
    });
  });

  // Call loadTweets function after its definition
  loadTweets();
});
