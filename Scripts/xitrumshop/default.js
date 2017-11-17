$(function () {
    sessionStorage.setItem('logged',false);
    $('#loginModal').modal('show');
    $('#tbUser').focus();

    $('#tbPass').on('keypress', function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            login();
            return false;
        }
        return true;
    });
})

function login() {
    var username = $('#tbUser').val();
    var password = $('#tbPass').val();
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'nhanvien.asmx/login',
        data: "{username:'" + username + "',password:'" + password + "'}",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                if (item.id == 0) {
                    alert('Đăng nhập thất bại! Sai username hoặc password');
                    return;
                }
                //thành công
                sessionStorage.setItem('logged', true);
                sessionStorage.setItem('id', item.id);
                sessionStorage.setItem('username', item.username);
                sessionStorage.setItem('hoten', item.hoten);
                sessionStorage.setItem('quyen', item.quyen);
               // alert('Đăng nhập thành công ! Chào mừng ' + item.username);
                window.location.replace('banhang.aspx');

            });
        }
    })
}