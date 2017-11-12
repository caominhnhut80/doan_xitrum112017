// Numeric only control handler
jQuery.fn.ForceNumericOnly =
function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};
jQuery.fn.chichoso =
function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.keyCode;

            return (
                key == 8 ||   //backspace
                key == 46 ||  //delete
                key == 37 ||//left
                key == 39 ||//right
                (key >= 96 && key <= 105) ||   //0-9 bên bàn phím số nhỏ
                (key >= 48 && key <= 57));  //0..9

        });
    });
};
function anStatus() {
    $('#thanhcong').addClass('hidden');
    $('#loi').addClass('hidden');
}
function hienthongbao(loai, msg) {
    if (loai == 1) {  //thành công
        $('#ThongbaoModal').modal("show");
        $('#ThongbaoModal_Dialog').removeClass('thongbaomodal_Dialog_loi').addClass('thongbaomodal_Dialog');
        $('#noidungthongbao').html(msg);
        
    } else {
        $('#ThongbaoModal').modal("show");
        $('#ThongbaoModal_Dialog').removeClass('thongbaomodal_Dialog').addClass('thongbaomodal_Dialog_loi');
        $('#noidungthongbao').html(msg);
    }
}

function hienthongbao_tutat(loai, msg) {
    if (loai == 1) {  //thành công
        $('#thanhcong').removeClass('hidden');
        $('#thanhcong').html(msg);
        $('#thanhcong').fadeIn();
        $('#thanhcong').fadeOut(10000);
        $('#loi').addClass('hidden');
    } else {
        $('#loi').removeClass('hidden');
        $('#loi').html(msg);
        $('#loi').fadeIn();
        $('#loi').fadeOut(10000);
        $('#thanhcong').addClass('hidden');

    }

}
function hienthongbao_modal(msg) {
    $('#modal_loi').removeClass('hidden');
    $('#modal_loi').html(msg);
}
function resetTextbox() {
    $('#mahang').val('');
    $('#tenhang').val('');
    $('#tenhang').focus('');
}
$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1."));
    })
}
function hienthidate(jsonDate) {
    var date = new Date(parseInt(jsonDate.substr(6)));
    var month = date.getMonth() + 1;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
/* Vietnamese localization for the jQuery UI date picker plugin. */
/* Written by Tien Do (tiendq@gmail.com) */

jQuery(function ($) {
    $.datepicker.regional["vi-VN"] =
      {
          closeText: "Đóng",
          prevText: "Trước",
          nextText: "Sau",
          currentText: "Hôm nay",
          monthNames: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
          monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
          dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
          dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
          dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
          weekHeader: "Tuần",
          dateFormat: "dd/mm/yy",
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: ""
      };

    $.datepicker.setDefaults($.datepicker.regional["vi-VN"]);
});
function tinhtongtien(data) {
    var tong = 0;
    $.each(data, function (i, item) {
        tong += item.tongtien;
        ;
    })
    return tong;
}




