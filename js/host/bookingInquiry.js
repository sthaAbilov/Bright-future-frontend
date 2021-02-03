$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    

    var tok = localStorage.getItem('token');

      


      
    $.getJSON('http://localhost:8080/mybookings/', function (res) {
      $.each(res, function (index) {
        $('#course_name').append(res[index].course_name);
        $('#type').append(res[index].type);
        $('#file_name').append(res[index].file_name);
        $('#booking_status').append(res[index].booking_status);
        $('#price').append(res[index].price);
        $('#booked_by').append(res[index].booked_by);
        $('#approved_status').append(res[index].approved_status);
        
   }); 
    });

    

});