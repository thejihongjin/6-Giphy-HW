var topics = ['bacon','banana','boba','burrito','coffee','ice cream','pickle','pizza','sushi','tea'];
renderButtons();

$(document).on("click", ".food-btn", displayFoodInfo);

$("#add-food").on("click", function(event) {
    event.preventDefault();
    
    var newFood = $("#food-input").val().trim();
    topics.push(newFood);
    
    renderButtons();
});

$(document).on("click", ".food-gif", function () {
    var state = $(this).attr("data-state");

    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    } else if (state === 'animate') {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
    }
});

function renderButtons() {
    $("#buttons-view").empty();
    
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("food-btn");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]); 
        $("#buttons-view").append(btn);
    }
}

function displayFoodInfo() {
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div>");
            foodDiv.addClass("food-div");

            var foodImg = $("<img>");
            foodImg.attr("src", results[i].images.fixed_height_still.url);
            foodImg.addClass("food-gif");
            foodImg.attr("data-state","still");
            foodImg.attr("data-still",results[i].images.fixed_height_still.url);
            foodImg.attr("data-animate",results[i].images.fixed_height.url);
            foodDiv.append(foodImg);

            var foodRating = $("<p>");
            foodRating.text("Rating: " + results[i].rating);
            foodDiv.append(foodRating);

            $("#foods-view").prepend(foodDiv);
        }
    });
}