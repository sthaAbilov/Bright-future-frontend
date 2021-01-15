$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    var id = urlParams.get("username");
    

    var tok = localStorage.getItem('token');

      


      
    $.getJSON('http://localhost:8080/fetchUser/'+id, function (res) {
      $.each(res, function (index) {
        $('#user_name').append(res[index].username);
        $('#first_name').append(res[index].first_name);
        $('#last_name').append(res[index].last_name);
        $('#phone_no').append(res[index].phone_no);
        $('#permanent_address').append(res[index].permanent_address);
        $('#email').append(res[index].email);
        $('#gender').append(res[index].gender);
        
   }); 
    });

    

});