$(document).ready(function () {

    var tok = localStorage.getItem('token');
    var username = localStorage.getItem('username');
    

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
      
        location.href = "../login.html";
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

    $.getJSON('http://localhost:8080/mybookings/' + username, function (res) {

      $.each(res, function (index) {
        status = "";
        button="";
        if ((res[index].approved_status) == "false") {
          status = "<button class='btn-warning'>Pending</button>";
          button = "<button class='submitButton' value='"+res[index]._id+"' id='cancel'>Cancel</button>";
        } else if((res[index].approved_status) == "true"){
          status = "<button class='btn-success'>Approved</button>";
        }


        $('#mybooking').append('<tr>' +
          '<td>' + res[index].place_name + '</td>' +
          '<td>' + res[index].city + '</td>' +
          '<td>' + res[index].streetName + '</td>' +
          '<td>$ ' + res[index].price + '</td>' +
          '<td>' + res[index].food_type + '</td>' +
          '<td>' +  status + '</td>' +
          '<td>' +  button + '</td>' +
          '</tr>');

          

      });
     
      $("#mybooking").on('click','#cancel',function(){

var listingId = $(this).val();



var approved_status= null;
booked_by=null;


  
    var data={
      
      "approved_status":approved_status,
      "booked_by":booked_by
      
    }

    $.ajax({
    type:"PUT",
    url:"http://localhost:8080/updateListing/"+listingId,
    data:data,
    beforeSend: function(xhr) {
      
      if (tok) {
    
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },
    success:function(result){
      alert("Canceled booking");
      window.location.reload();
       
    }
    });
    return false;
});

    });



   
  });