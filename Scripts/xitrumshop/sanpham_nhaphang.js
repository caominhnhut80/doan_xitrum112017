$(function () {
    //alert(parseInt(sessionStorage.getItem('quyen')));
    if (parseInt(sessionStorage.getItem('quyen')) != 1 && parseInt(sessionStorage.getItem('quyen')) != 0) {  //1: admin,chủ mới đc nhập
        alert('Bạn chưa được cấp quyền chức năng này');

        window.location.replace('WaitingPage.aspx');
    }
})