$(function() {
    console.log( "ready!" );

// GLOBAL VARIABLES
// -------------------------------------

var categoryButtons = ["Halo 5", "Destiny 2", "Call of Duty", "Titanfall", "Warframe", "Cuphead"]

// FUNCTIONS
// -------------------------------------

function createButtons() {
	for (var i in categoryButtons) {
		var button = $("<button class='styled-button btn btn-primary'>");
		button.attr("id", categoryButtons[i]);
		button.text(categoryButtons[i]);
		$("#buttons").append(button);
	}
};

$("#add-button").on("click", function() {
	var userInput = $("#cat-input").val();
	categoryButtons.push(userInput);
	$("#buttons").empty();
	createButtons();
});

function displayGifs() {
	$("#gif-area").empty();
    var category = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AzgzCdtBeZH2Gcj1USdNVNYDw8KyO0IO&q=" + category + "&limit=25&offset=0&rating=PG&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	for (var i = 0; i < response.data.length; i++) {
		    var gameDiv = $("<div class='styled-gif'>");
		    var imgURL = (response.data[i].images.fixed_height_still.url);
		    var gifImg = (response.data[i].images.fixed_height.url);
		    var image = $("<img class='still' id='gif-image' data-img=" + gifImg + ">").attr("src", imgURL);
		    gameDiv.append(image);
		    $("#gif-area").append(gameDiv);    		
    	}
    });
    pausePlay();
  }

function pausePlay() {
    if ($(this).hasClass('animated')) {
        var gifURL = $(this).data("img")
        var stillURL = $(this).attr("src")
        $(this).attr("src", gifURL)
        $(this).data("img", stillURL)
        $(this).removeClass('animated')
        $(this).addClass('still')
    } else if ($(this).hasClass('still')) {
        gifURL = $(this).data("img")
        stillURL = $(this).attr("src")
        $(this).attr("src", gifURL)
        $(this).data("img", stillURL)
        $(this).removeClass('still')
        $(this).addClass('animated')
    }
}

// MAIN PROCESSES
// -------------------------------------

$(document).on("click", ".styled-button", displayGifs);
$("#gif-area").on('click', '#gif-image', pausePlay);
createButtons();

});