
    $(document).ready(function () {
        var token = localStorage.getItem('token');
        var user_type = localStorage.getItem('user_type');
  
        $("form.loginForm").on("submit",function(e){
          e.preventDefault();
          username = $("#username").val();
          password = $("#password").val();
  
  
          data = {
            "username": username,
            "password": password
  
          }
          $.ajax({
            url: 'http://localhost:8080/login/',
            type: 'post',
            dataType: 'json',
            data: data,
  
            success: function (res, textStatus, xhr) {
              if (res.token != null) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('id', res.id);
                localStorage.setItem('username', res.username);
                localStorage.setItem('user_type', res.user_type);
                alert("You are an " + res.user_type);
  
                if (res.user_type == "user") {
                  location.href = "user/userDashboard.html";
                } else if (res.user_type == "host") {
                  location.href = "host/hostDashboard.html";
                }
  
              } else {
                alert(res.message);
              }
            },
            
            error: function (xhr, textStatus, errorThrown) {
              console.log('Error in Operation');
            }
          });
        });
      });
  