$(document).ready(function () {

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

    $.getJSON('http://localhost:8080/getUser/' + id, function (res) {
        $.each(res, function (index) {
            $('#first_name').val(res[index].first_name);
            $('#last_name').val(res[index].last_name);
            $('#username').val(res[index].username);
            $('#phone_no').val(res[index].phone_no);
            $('#permanent_address').val(res[index].permanent_address);
            $('#email').val(res[index].email);
            $('#gender').val(res[index].gender);
        });
    });

    $("form.updateprofileForm").on("submit", function () {

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var username = $('#username').val();
        var phone_no = $('#phone_no').val();
        var email = $('#email').val();
        var permanent_address = $('#permanent_address').val();


        var data = {
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "phone_no": phone_no,
            "email": email,
            "permanent_address": permanent_address
        }

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/updateUser/" + id,
            data: data,
            beforeSend: function (xhr) {

                if (tok) {

                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (result) {
                alert("User Updated");
                location.href = "userDashboard.html";
            }
        });
        return false;
    });



});