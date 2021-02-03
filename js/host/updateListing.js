$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    var id = urlParams.get("id");

    let imageFile = '';
    var tok = localStorage.getItem('token');

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

    $.getJSON('http://localhost:8080/fetchOne/' + id, function (res) {
        $.each(res, function (index) {

            $('#place_name').val(res[index].place_name);
            $('#city').val(res[index].city);
            $('#streetName').val(res[index].streetName);
            $('#price').val(res[index].price);
            $('#food_type').val(res[index].food_type);
            $('#facilities').val(res[index].facilities);
            $('#description').val(res[index].description);
            $('#no_of_persons').val(res[index].no_of_persons);
            $('#no_of_rooms').val(res[index].no_of_rooms);

            $('#image_display').append('<img src="http://localhost:8080/uploads/' + res[index].image_name + '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">');
            imageFile = res[index].image_name;

        });

    });


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



                $('#image_display').html('<img src="http://localhost:8080/uploads/' + data.filename + '" class="img-thumbnail" alt="Sample image" height="200px" width="200px">');

            },
            error: function () {
                alert("Image upload failed");
            }

        });
    });

    $("form.updateListing").on("submit", function (e) {

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
        listImage = imageFile;



        var data = {


            "place_name": place_name,
            "city": city,
            "streetName": streetName,
            "price": price,
            "no_of_rooms": no_of_rooms,
            "no_of_persons": no_of_persons,
            "food_type": food_type,
            "facilities": facilities,
            "description": description,
            "image_name": listImage
        }

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/updateListing/" + id,
            data: data,
            beforeSend: function (xhr) {

                if (tok) {

                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (result) {
                alert("Updated Successfully");
                location.href = "hostDashboard.html";
            }
        });
        return false;
    });



});