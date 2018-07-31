$("#add-new-food").on("click", function (event) {

    event.preventDefault();

    var newFood = $("#new-food").val().trim();

    console.log(newFood);

    var newFoodButton = $("<a>");
    newFoodButton.attr("data-food", newFood);
    newFoodButton.addClass("btn btn-primary my-2");
    newFoodButton.text(newFood);
    $("#button-div").append(newFoodButton);

    console.log(newFoodButton);

    $("#new-food").val("");
});


$("body").on("click", "button", function () {
    var food = $(this).attr("data-food");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=VbnEjdDs5zuY1dZs6KIShnVoR6Av9mj5&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var foodDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var foodImage = $("<img>");
                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodImage.attr("data-animate", results[i].images.fixed_height.url);
                foodImage.attr("data-state", "still");
                foodImage.addClass("gif");


                foodDiv.append(p);
                foodDiv.append(foodImage);

                $("#gifs-appear-here").prepend(foodDiv);
            }
        });
});


// Pause/Play script

$("body").on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});






