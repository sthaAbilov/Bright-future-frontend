$(document).ready(function () {

    var tok = localStorage.getItem('token');
    $("#myDiv").hide();

    /// dashboard creation
    $.ajax({
      type: 'get',
      url: 'http://localhost:8080/dashboard',
      beforeSend: function (xhr) {

        if (tok) {

          xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
        }
      },

      success: function (data) {
       

        $('#navbarDropdown').append(data.username);
        $('.userthumb').append('<img src="http://localhost:8080/uploads/' +
              data.image_name + '" alt="" height="40px" width="40px" >');
      },
      error: function () {
      
        location.href = "../login.html"
      }
    });

    // for logging out

    $("#logout").click(function () {
      $.ajax({
        type: 'post',
        url: 'http://localhost:8080/users/logout',
        beforeSend: function (xhr) {
          if (tok) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
          }
        },
        success: function (data) {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('username');
          localStorage.removeItem('user_type');
          location.href = "../login.html";

        },
        error: function () {
            console.log('Error in Operation');
        }
      });
    });



    $('#mmmm').click(function (e) {
      e.preventDefault();

      $('#searchResults').empty();

      var x = document.getElementById("myDiv");
      if (x.style.display === "none") {
        x.style.display = "block";
      }

    

      city = $("#city").val();
      price = $("#price").val();
      food_type = $("#food_type").val();


      data = {
        "city": city,
        "price": price,
        "food_type": food_type

      }
      

      $.ajax({
        url: 'http://localhost:8080/search',
        type: 'post',
        dataType: 'json',
        data: data,

        success: function (res, textStatus, xhr) {
          
          $.each(res, function (index) {
            $('#searchResults').append(
              '<div class="item col-xs-4 col-md-4 ">' +
          '<div class="thumbnail card">' +
          '<div class="img-event">' +
          '<img class="group list-group-image img-fluid" src="http://localhost:8080/uploads/' + res[
            index].image_name + '" alt="Image"  />' +
          '</div>' +
          '<div class="caption card-body">' +
          '<h4 class="group card-title inner list-group-item-heading">' + res[index].place_name +
          '</h4>' +
          '<div class="row">' +
          '<div class="col-md-12">' +
          '<p class="lead">' + res[index].city + '</p>' +
          '</div>' +
          '<div class="col-xs-4 col-md-4  ">' +
          '<a class="btn btn-warning" href="">$ ' + res[index].price + '</a>' +
          '</div>' +
          '<div class="col-xs-6 col-md-6  ">' +
          '<a class="btn btn-warning" href="singleProduct.html?id=' + res[index]._id +
          '">Show Detail</a>' +
          '</div>' +

          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
            );
          });

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log('Error in Operation');

        }
      });
    });


    // getting lisings
    $.getJSON('http://localhost:8080/getListings', function (res) {

      $.each(res, function (index) {
        $('#products').append(
          '<div class="item col-xs-4 col-md-4 ">' +
          '<div class="thumbnail card">' +
          '<div class="img-event">' +
          '<img class="group list-group-image img-fluid" src="http://localhost:8080/uploads/' + res[
            index].image_name + '" alt="Image"  />' +
          '</div>' +
          '<div class="caption card-body">' +
          '<h4 class="group card-title inner list-group-item-heading">' + res[index].place_name +
          '</h4>' +
          '<div class="row">' +
          '<div class="col-md-12">' +
          '<p class="lead">' + res[index].city + '</p>' +
          '</div>' +
          '<div class="col-xs-4 col-md-4 ">' +
          '<a class="btn btn-warning" href="">$ ' + res[index].price + '</a>' +
          '</div>' +
          '<div class="col-xs-6 col-md-6 ">' +
          '<a class="btn btn-warning" href="singleProduct.html?id=' + res[index]._id +
          '">Show Detail</a>' +
          '</div>' +

          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
        );

      });
    });

  });