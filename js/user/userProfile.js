$(document).ready(function () {  
               
    var tok = localStorage.getItem('token');
    var id = localStorage.getItem('id');
    
                          
                /// dashboard creation
                     $.ajax({
            type: 'get',
            url: 'http://localhost:8080/dashboard',
            beforeSend: function(xhr) {
              
              if (tok) {
            
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
              }
            },
    
            success: function(data) {
             
               $('#navbarDropdown').append(data.username);
               $('.userthumb').append('<img src="http://localhost:8080/uploads/' +
                    data.image_name + '" alt="" height="40px" width="40px" >');                                      
            },
            error: function() {
              
              location.href="../login.html"; 
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
  
    
    $.getJSON('http://localhost:8080/getUser/'+id, function (res) {
                     $.each(res, function (index) {
                         $('#name').append(res[index].first_name+" "+res[index].last_name);
                         $('#username').append(" @"+res[index].username);
                         $('#phone_no').append(" "+res[index].phone_no);
                         $('#address').append(" "+res[index].permanent_address);
                         $('#email').append(" "+res[index].email);
                         $('#gender').append(" "+res[index].gender);
                         
                         $('#profileImage').append('<img src="http://localhost:8080/uploads/'+res[index].image_name+'" alt="IMG" style=" width: 250px;  border-radius: 125px; " >');
                         $('#button').append('<a href="updateProfile.html"><button class=" submitButton" type="submit" name="Submit" id="">Edit Profile</button></a>' );
                    }); 
                 });
    
    
             });  
    