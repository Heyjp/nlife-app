$(document).ready(function () {


  $('#search-but').click(function (e) {
    e.preventDefault();
    var query = $("#search-bar").val();

      $.ajax({
        url: "/search/?" + query,
        type: "GET",
        dataType: "json",
        success: function (info) {

          $(".data").empty()
          $.each(info.businesses, function(index, element) {

            var newDiv = $('<div/>', {
              class: "info-holder"
            }).appendTo('.data');

            var p = $('<h4/>', {
              class: "location-name",
              text: element.name
            });
            var img = $('<img/>', {
              src: element['image_url']
            });
            var rating = $('<small/>', {
              class: "rating",
              text: element.rating
            });

            var desc = $('<p/>', {
                class: "review",
                text: element.snippet_text
              });

              var guestListDiv = $('<div/>', {
                class: "guestList-holder"
              });

              var att_a = $('<a/>', {
                  class: "attendance-anchor",
                  name: element.id,
                  value: element.location.city,
                  text: "People Going = " + element.guestListLength,
                  href: "#"
              });

              var barId = $('<form/>', {
              });

              var barInput = $('<input/>', {
                type: "hidden",
                name: element.location.city,
                value: element.id
              });

              p.appendTo(newDiv);
              img.appendTo(newDiv);
              desc.appendTo(newDiv);
              rating.appendTo(newDiv);
              guestListDiv.appendTo(newDiv);
              barId.appendTo(guestListDiv);
              att_a.appendTo(barId);
              barInput.appendTo(barId);
          });


        },
        error: function (error) {
          console.log("error");
        }
      });

    });

    // END OF FIRST CLICK CALL


  $('.data').on("click", ".attendance-anchor", function (e) {
      var theElement = $(this);
      var barName = $(this).attr("name");
      var barCity = $(this).attr("value");
      e.preventDefault();

    $.ajax({
        url: '/check',
        data: { barId: barName, city: barCity },
        type: 'POST',
        success: function (result) {
            if (!result.status) {
            console.log(result);
            theElement.text("People Going = " + result.guestList);
          } else {
            alert("Please Login");
          }

        }, error: function (err) {
          console.log(err);
        }
    });

  });






  });
