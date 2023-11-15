// This block of code runs when the document is ready
$(document).ready(function () {
  // Log a message to the console to indicate that the script is running
  console.log('Script is running!');

  // Select the textarea element within the form in the .new-tweet section
  let $tweetTextarea = $('.new-tweet form textarea');

  // Select the counter element within the form in the .new-tweet section
  let $charCounter = $('.new-tweet form .counter');

  // Attach an event handler to the 'input' event of the textarea
  $tweetTextarea.on('input', function () {
    // Get the current length of the text in the textarea
    let charCount = $(this).val().length;

    // Calculate the remaining characters by subtracting the current length from 140
    let remainingChars = 140 - charCount;

    // Log the current length and remaining characters to the console for debugging
    console.log('Current value length:', charCount);
    console.log('Remaining characters:', remainingChars);

    // Update the text content of the counter element with the remaining characters
    $charCounter.text(remainingChars);

    // Add or remove the 'negative' class based on whether the remaining characters are less than 0
    if (remainingChars < 0) {
      // If remaining characters are negative, add the 'negative' class to change the color to red
      $charCounter.addClass('negative');
    } else {
      // If remaining characters are non-negative, remove the 'negative' class to revert the color
      $charCounter.removeClass('negative');
    }
  });
});

