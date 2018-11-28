$(document).ready(function() {
  const $loading = $(".loading");
  $("#select").on("change", function() {
    let select = $("#select").val();
    $loading.show();
    getStories(select);
    
  });

  function getStories(select) {
    // API from New York Times website
    $.ajax({
      method: "get",
      url: `https://api.nytimes.com/svc/topstories/v2/${select}.json?api-key=284e1a4e58644ff8b5c13eb355b79961`
    })
      .done(function(data) {
        // loading gif

        $(".results").empty();
        $(".loading").show();
        $(".container").addClass("container-height");
        $(".logo-container").addClass("styling-container");
        $(".logo").addClass("header-styling");

        let nytData = data.results
          .filter(function(item) {
            return item.multimedia.length;
          })
          .slice(0, 12);

        for (let value of nytData) {
          
          $(".results").append(
            `<div class="article-wrapper">
           <a href="${value.url}">
           <div class="article-abstract-wrapper">
           <div class="article" style="background:url(${
             value.multimedia[4].url
           });background-size:cover;background-position:center">
           <div class="please"><p class="snippet">${
             value.abstract
           }</p></div></div>
        </div>
        </div></a>`
          );
        }
      })
      .fail(function(err) {
        throw err;
      })
      .always(function() {
        
        $loading.hide();
      });
  }
});
