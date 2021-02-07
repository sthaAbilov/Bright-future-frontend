$(document).ready(function () {

    var table1 = $('#myListings').DataTable({
      "columnDefs": [{
          "targets": [0],
          "visible": false,
          "searchable": false
        }

      ]
    });



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
    $.getJSON('http://localhost:8080/fetchunapproved/' + id, function (res) {

      $.each(res, function (index) {

        table1.row.add([
          res[index]._id,
          res[index].place_name,
          res[index].city,
          res[index].streetName,
          res[index].price,
          res[index].no_of_rooms,
          res[index].no_of_persons,
          res[index].food_type,
          "<button class='btn btn-outline-info' id='usernamebtn' value='" + res[index].booked_by +
          "' onclick='openPopup()' style='text-transform: uppercase;'>" + res[index].booked_by +
          "</button>",
          "<button class='btn btn-block  submitButton' type='submit' name='Submit' id='approve'>Approve</button><button class='btn btn-block  submitButton' type='submit' name='Submit' id='cancel'>Cancel</button>"
        ]).draw(false);
      });
      

      $("#approve").on('click', function () {
        var data1 = table1.row($(this).parents('tr')).data();
        var listingId = (data1[0]);
       


        var approved_status = "true";
        var booking_status = true;


        var data = {

          "approved_status": approved_status,
          "booking_status": booking_status
        }

        $.ajax({
          type: "PUT",
          url: "http://localhost:8080/updateListing/" + listingId,
          data: data,
          beforeSend: function (xhr) {

            if (tok) {

              xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
          },
          success: function (result) {
            alert("You approved a booking");
            window.location.reload();

          }
        });
        return false;
      })

      $("#cancel").on('click', function () {
        var data1 = table1.row($(this).parents('tr')).data();
        var listingId = (data1[0]);
        alert(listingId);


        var approved_status = null;
        booked_by = null;



        var data = {

          "approved_status": approved_status,
          "booked_by": booked_by

        }

        $.ajax({
          type: "PUT",
          url: "http://localhost:8080/updateListing/" + listingId,
          data: data,
          beforeSend: function (xhr) {

            if (tok) {

              xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
          },
          success: function (result) {
            alert("Canceled booking");
            window.location.reload();

          }
        });
        return false;
      });

    });





    $("#myListings").on('click', "#usernamebtn", function () {
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


  });