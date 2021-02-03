$(document).ready(function () {

    var tok = localStorage.getItem('token');

    var id = localStorage.getItem('id');

    
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
        url: 'http://localhost:8080/users/logoutAll',
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
          location.href = "../index.html";

        },
        error: function () {

          console.log('Error in Operation');
       

        }
      });
    });


    let imageFile = '';
    $("#listingImage").on('change', function () {
      let formData = new FormData();
      let files = $("#listingImage").get(0).files;
      if (files.length > 0) {
        formData.append("imageFile", files[0]);
      }
      $.ajax({
        url: 'http://localhost:8080/upload/',
        type: 'post',
        contentType: false,
        cache: false,
        processData: false,
        data: formData,

        success: function (data) {
          imageFile = data.filename;

          $('#image_display').html('<img src="http://localhost:8080/uploads/' + data.filename +
            '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">');

        },
        error: function () {
          alert("Image upload failed");
        }

      });
    });



    $('form.addListings').on('submit', function (e) {
      e.preventDefault();
      place_name = $("#place_name").val();
      city = $("#city").val();
      streetName = $("#streetName").val();
      price = $("#price").val();
      no_of_rooms = $("#no_of_rooms").val();
      no_of_persons = $("#no_of_persons").val();
      food_type = $("#food_type").val();
      facilities = $("#facilities").val();
      description = $("#description").val();
   approved_status="";
      listImage = imageFile;



      data = {
        "place_name": place_name,
        "city": city,
        "streetName": streetName,
        "price": price,
        "no_of_rooms": no_of_rooms,
        "no_of_persons": no_of_persons,
        "food_type": food_type,
        "facilities": facilities,
        "description": description,
        "userId": id,
        "approved_status":approved_status,
        "image_name": listImage

      }
      $.ajax({
        url: 'http://localhost:8080/addListings/',
        type: 'post',
        dataType: 'json',
        data: data,
        beforeSend: function (xhr) {

          if (tok) {

            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
          }
        },
        success: function (res, textStatus, xhr) {
          alert(res.message);
          window.location.reload();

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log('Error in Operation');
        }
      });
    });
  });