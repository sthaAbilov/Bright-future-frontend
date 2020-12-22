$(document).ready(function () {

    let imageFile = '';
    $("#userImage").on('change', function () {
      let formData = new FormData();
      let files = $("#userImage").get(0).files;
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

    $("form.userRegisterForm").on("submit", function (e) {
      e.preventDefault();
      first_name = $("#first_name").val();
      last_name = $("#last_name").val();
      username = $("#username").val();
      password = $("#password").val();
      phone_no = $("#phone_no").val();
      permanent_address = $("#permanent_address").val();
      email = $("#email").val();
      user_type = $("#user_type").val();
      gender = $("#gender").val();
      userProfile = imageFile;

      data = {
        "first_name": first_name,
        "last_name": last_name,
        "username": username,
        "password": password,
        "phone_no": phone_no,
        "permanent_address": permanent_address,
        "email": email,
        "user_type": user_type,
        "gender": gender,
        "image_name": userProfile

      }
      $.ajax({
        url: 'http://localhost:8080/registeruser/',
        type: 'post',
        dataType: 'json',
        data: data,

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