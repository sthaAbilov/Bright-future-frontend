$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    var id = urlParams.get("id");

    var tok = localStorage.getItem('token');
    var user_id = localStorage.getItem('id');


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
        $("#user_id").val(data._id);
        $('#profpicture').append('<img src="http://localhost:8080/uploads/' + data
          .image_name + '" width="100px">');
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
        $('#image_listing').append(
          '<img class="group list-group-image img-fluid" src="http://localhost:8080/uploads/' +
          res[
            index].image_name + '" alt="Image"  />');
        $('#place_name').append(res[index].place_name);
        $('#city').append(res[index].city);
        $('#streetName').append(res[index].streetName);
        $('#price').append(res[index].price);
        $('#food_type').append(res[index].food_type);
        $('#facilities').append(res[index].facilities);
        $('#description').append(res[index].description);
        $('#no_of_persons').append(res[index].no_of_persons);
        $('#no_of_rooms').append(res[index].no_of_rooms);
        if ((res[index].booked_by) != null) {
          $('#name1').append("BOOKED BY:");
          $('#name2').append("<button class='btn btn-outline-info' id='usernamebtn' value='" + res[index]
            .booked_by + "' onclick='detailForm()' style='text-transform: uppercase;'>" + res[index]
            .booked_by + "</button>");
        }



        $('#stage').append("<a href='updateListing.html?id=" + res[index]._id +
          "'><button class='btn btn-block submitBu ' type='submit' name='Submit' >Update</button></a>" +
          "<a href=''><button class='btn btn-block submitBu' id='deletev' value='" + res[
            index]._id + "'>Delete</button></a");
      });
    });




    $('#stage').on('click','#deletev', function (e) {
e.preventDefault();
      ids = $(this).val();

      $.ajax({
        url: 'http://localhost:8080/deleteListing/' + ids,
        type: 'DELETE',
        beforeSend: function (xhr) {

          if (tok) {

            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
          }
        },
        success: function (res, textStatus, xhr) {
         
         alert(res.message);
            location.href ="hostDashboard.html";
       

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log('Error in Operation');
        }
      });
    });

    $("#name2").on('click', "#usernamebtn", function () {
      ids = $(this).val();

      $.getJSON('http://localhost:8080/fetchUser/' + ids, function (res) {
        $.each(res, function (index) {
          $('#name').append(res[index].first_name + " " + res[index].last_name);
          $('#username').append(" @" + res[index].username);
          $('#phone_no').append(" " + res[index].phone_no);
          $('#address').append(" " + res[index].permanent_address);
          $('#email').append(" " + res[index].email);
          $('#gender').append(res[index].gender);

          $('#profileImage').append('<img src="http://localhost:8080/uploads/' + res[index]
            .image_name +
            '" alt="IMG" style=" width: 250px;  border-radius: 125px; "  >');

        });
      });
    });


    $.ajax({
      url: 'http://localhost:8080/getcommentdata/' + id,
      type: 'get',
      beforeSend: function (xhr) {
        if (tok) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + tok);

        }
      },
      success: function (res, textStatus, xhr) {
      
        $.each(res.orders, function (index) {

          $('#commentsdata').append(
            '<section id="app" class="comments">' +
            '<article>' +
            '<img src="http://localhost:8080/uploads/' + res.orders[index]
            .Userid
            .image_name + '" width="100px">' +
            '<h4><a href="#">' + res.orders[index].Userid.username +
            '</a></h4>' +

            '<time>' + new Date(res.orders[index].date).toISOString().split(
              'T')[0] + '</time>' +
            ' <like>' + res.orders[index].Userid.first_name + '</like>' +
            '<p>' + res.orders[index].comment + '</p>' +
            '</article>' +
            '</section>'
          );
          if (res.orders[index].Userid._id == user_id) {
            $('#commentsdata').append(
              '<button class="submitButton " id="edit"  value=' + res
              .orders[
                index]._id + '>edit</button>' +

              '<button class="submitButton " id="delete" value=' + res
              .orders[
                index]._id + ' >delete</button>' +
              '</div>' +
              '</div>');

          }

        });
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(xhr);
      }
    });


    $('#commentsdata').on('click', '#edit', function (e) {
      e.preventDefault();
      openForm();
      ids = $(this).val();
      $.getJSON('http://localhost:8080/getSingleComment/' + ids, function (res) {

        $.each(res, function (index) {
          $('.newcommentText').val(res[index].comment);
          $('#selectedCommentid').val(res[index]._id);

        });


      });
    });


    $('#commentsdata').on('click', '#delete', function () {
      ids = $(this).val()
     
      $.ajax({
        url: 'http://localhost:8080/deletecommentdata/' + ids,
        type: 'delete',
        beforeSend: function (xhr) {
          if (tok) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
          }
        },
        success: function (res, textStatus, xhr) {
          if (res.message == "succesfull") {
            location.href = "singleView.html?id=" + id;
          }

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
        }
      });
    })


    $('.addnewCommentbtn').click(function (e) {
      e.preventDefault();
      comment = $('.addnewCommentta').val()
      data = {
        'comment': comment,
        'listingId': id
      }
      $.ajax({
        url: 'http://localhost:8080/comment',
        type: 'post',
        dataType: 'json',
        data: data,
        beforeSend: function (xhr) {
          if (tok) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
          }
        },
        success: function (res, textStatus, xhr) {
          if (res.message == "Succesfull") {
            location.href = "singleView.html?id=" + id
          }

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
        }
      });
    });

    $('.updateCommentbtn').click(function (e) {
      e.preventDefault();
      var sid = $('#selectedCommentid').val();
      var comment = $('.newcommentText').val();

      var data = {
        "comment": comment

      }

      $.ajax({
        url: 'http://localhost:8080/updatecommentdata/' + sid,
        type: 'put',
        dataType: 'json',
        data: data,
        beforeSend: function (xhr) {
          if (tok) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
          }
        },
        success: function (res, textStatus, xhr) {
          if (res.message == "succesfull") {
            location.href = "singleView.html?id=" + id;
          }

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
        }
      });
    });
  });