$(document).ready(function () {
    $("#myDiv").hide();
  
    var list = $('#myListings').DataTable({
        "columnDefs": [{
          "targets": [0],
          "visible": false,
          "searchable": false
        }]
      }
  
    );
  
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
  
  
    $('#show').click(function (e) {
      e.preventDefault();
  
  
  
      var x = document.getElementById("myDiv");
      if (x.style.display === "none") {
        x.style.display = "block";
      }
  
    });
  
    $.getJSON('http://localhost:8080/fetchlisting/' + id, function (res) {
      $.each(res, function (index) {
  
        food_type = "";
        if ((res[index].food_type) == "Non- Veg") {
          food_type = "<button class='btn-danger'>Non-Veg</button>";
        } else {
          food_type = "<button class='btn-success'>Vegiterian</button>";
        }
  
        booking_status = "";
        if ((res[index].booking_status) == false) {
          booking_status = "<button class='btn-success'>Available</button>";
        } else {
          booking_status = "<button class='btn-danger'>Booked</button>";
        }
        list.row.add([
          res[index]._id,
          res[index].place_name,
          res[index].city,
          res[index].price,
          res[index].no_of_rooms,
          res[index].no_of_persons,
          food_type,
          booking_status,
          '<a href="singleView.html?id=' + res[index]._id +
          '"><button class="btn btn-block  submitButton" type="submit" name="Submit" id="approve">View</button></a>'
        ]).draw(false);
  
      });
  
    });
    $.getJSON('http://localhost:8080/countList/' + id, function (res) {
  
      $("#countList").append(res.count);
    });
    $.getJSON('http://localhost:8080/countEnquiries/' + id, function (res) {
  
      $("#countEnq").append(res.count);
    });
  
  });