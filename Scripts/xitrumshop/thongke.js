$(function () {
    if (parseInt(sessionStorage.getItem('quyen')) == 2) {  //nhân viên
        alert('Bạn chưa được cấp quyền chức năng này');
        window.location.replace('default.aspx');
    }
    $('#wrapper').toggleClass('toggled');
});