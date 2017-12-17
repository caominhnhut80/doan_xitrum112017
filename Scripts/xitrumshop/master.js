$(function () {

    if (sessionStorage.getItem('id') == null || parseInt(sessionStorage.getItem('id')) == 0) {
        alert('Bạn cần phải đăng nhập');
        window.location.replace('default.aspx');
    }
    $('#tbUser').append('<h6><label><i>Đang đăng nhập:</i> ' + sessionStorage.getItem('hoten') + '</label><button id="btnLogout" onclick="logout();"><i><u>Đăng xuất</u></i></button></h6>');
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $('#quantri').click(function (e) {
        var check = $('#check').val();
        var check = sessionStorage["quyen"];  //quyen=0 : admin
        if (check != 0) {
            alert('Bạn chưa được cấp quyền quản trị!');
            //$('#loginModal').modal('show');
            //$('#modal_password').focus();
        }
        else {
            $('#divquantri').collapse('toggle');
        }

    });

});
//function submitLogin() {
//    var username = $('#modal_username').val();
//    var password = $('#modal_password').val();
//    if ((username != '') && (password != '')) {

//        $.ajax({
//            type: 'post',
//            url: 'AdminWebService.asmx/allowView',
//            contentType: 'application/json;charset=utf-8',
//            data: "{username:'" + username + "',password:'" + password + "'}",
//            dataType: "JSON",
//            success: function (data) {
//                if (data.d) {
//                    $('#loginModal').modal('hide');
//                    $('#divquantri').collapse('toggle');
//                    sessionStorage["logged"] = 1;

//                }
//                else {
//                    hienthongbao_modal('Sai tài khoản hoặc mật khẩu');
//                    $('#modal_password').focus();
//                }
//            }
//        })
//    }
//    else {
//        hienthongbao_modal('Tài khoản hoặc mật khẩu không được để trống');
//        $('#modal_password').focus();
//    }
//};
function logout() {
    var result = confirm("Bạn có chắc đăng xuất không?");
    if (result) {
        sessionStorage.removeItem('logged');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('hoten');
        sessionStorage.removeItem('quyen');
        window.location.replace('default.aspx');
    }
}
function nhanvien_checkquyentruycapweb(quyen_id, tentrang) {
    $.ajax({
        type: 'post',
        url: 'nhanvien.asmx/nhanvien_checkquyentruycapweb',
        contentType: 'application/json;charset=utf-8',
        data: "{quyen_id:" + parseInt(quyen_id) + ",tentrang:'" + tentrang + "'}",
        dataType: "JSON",
        success: function (data) {
            if (!data.d) {
                alert('Bạn chưa được cấp quyền chức năng này');
                window.location.replace('WaitingPage.aspx');
            }
        }


    })

}
