$(function () {
    //if (parseInt(sessionStorage.getItem('quyen')) != 1 && parseInt(sessionStorage.getItem('quyen')) != 2) {  //1: chủ và nhân viên mới đc bán
    //    alert('Bạn chưa được cấp quyền chức năng này');
    //    window.location.replace('default.aspx');
    //}
    
    var gb = 0;
    loadtenhang();
    loadHangdangban();
    $("#tenhang").on('change', function () {
        var mahang = $(this).val();
        //mã hàng nhảy theo
        $('#mahang').val(mahang);
        //giá bán nhảy theo
        laygiaban(mahang);
        $("#soluong").focus();
        $('#radioLe').click();
    }
    );
    $('#radioLe').click(function () {
        $('#giaban').val(sessionStorage["giabanle"]);
        $('#giaban_show').val(putComma(sessionStorage["giabanle"]));
       

        $('#thanhtien').val(
            parseInt($("#soluong").val()) * parseInt($("#giaban").val())
        );
        $('#thanhtien_show').val(
           putComma( parseInt($("#soluong").val()) * parseInt($("#giaban").val()))
        );
    });
    $('#radioSi').click(function () {
        $('#giaban').val(sessionStorage["giabansi"]);
        $('#giaban_show').val(putComma(sessionStorage["giabansi"]));
       
        $('#thanhtien').val(
            parseInt($("#soluong").val()) * parseInt($("#giaban").val())
        );
        $('#thanhtien_show').val(
            putComma(parseInt($("#soluong").val()) * parseInt($("#giaban").val()))
        );
    });
    $("#soluong").chichoso();  //chỉ cho nhập số
    $("#soluong").on('input', function () {    //cột thành tiền tự tính
        $('#thanhtien').val(
            parseInt($("#soluong").val()) * parseInt($("#giaban").val())
        );
        $('#thanhtien_show').val(
            putComma(parseInt($("#soluong").val()) * parseInt($("#giaban").val()))
        );
    });
    $("#modal_soluong").on('input', function () {    //cột thành tiền tự tính
        $('#modal_thanhtien').val(
            parseInt($("#modal_soluong").val()) * parseInt($("#modal_giaban").val())
        );

    });
    $("#modal_soluong").chichoso();  //chỉ cho nhập số
    $("#modal_giagoc").chichoso();

    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
    });

});
function laygiaban(mahang) {

    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "banhang.asmx/getgiaOnesanpham",
        data: "{mahang:'" + mahang + "'}",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                sessionStorage["giabanle"] = item.giabanle;
                sessionStorage["giabansi"] = item.giabansi;
                $('#giaban').val(sessionStorage["giabanle"]);//.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                $('#giaban_show').val(putComma(sessionStorage["giabanle"]));
                $('#kho').val(item.soluong);
            });

            //thanhtien nhay theo
            $('#thanhtien').val(parseInt($('#soluong').val()) * parseInt($('#giaban').val()));
            $('#thanhtien_show').val(
                putComma(parseInt($("#soluong").val()) * parseInt($("#giaban").val()))
            );
        }
    });


}

function loadtenhang() {  // chỉ load những hàng có giá bán
    $('#tenhang').find('option').remove();  //chỉ load 1 danh sách
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'banhang.asmx/gettenhangcogia',
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (index, item) {
                $('#tenhang').append($("<option/>", {
                    value: item.mahang,
                    text: item.tenhang
                }));

            });
            $("#tenhang").chosen({ no_results_text: "Không tìm thấy" });
            $('#mahang').val($('#tenhang option:first').val());
            laygiaban($('#mahang').val());
        }
    });
}
function loadHangdangban() {
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "banhang.asmx/getAllbanhang",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $('#datatable').DataTable({
                data: objdata,
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1, 2, 4] },//canh giưa all body và header
                    { className: "dt-right", "targets": [3, 5, 6] },  // canh phải những cột tiền
                    { className: "dt-nowrap", "targets": [7] },  // các nút ko cần wrap
                    { "sClass": "numericCol", "aTargets": [3, 5, 6] }
                ],
                columns: [
                    { 'title': 'ID', 'data': 'id' },
                    { 'title': 'Mã hàng', 'data': 'mahang' },
                    { 'title': 'Tên hàng', 'data': 'tenhang' },
                    { 'title': 'Số lượng', 'data': 'soluong' },
                    { 'title': 'Đơn vị tính', 'data': 'donvitinh' },
                    {
                        'title': 'Giá bán',
                        'data': 'gia',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': 'Thành tiền',
                        'data': 'thanhtien',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': '',
                        'data': 'mahang',
                        'render': function (mahang) {
                            return '<a href="#" class="btn btn-success  btn-sm" onclick="hienModal(\'' + mahang + '\');">Sửa</a>' +
                                '<a href="#"  class="btn btn-danger btn-sm" style="margin-left:10px;" onclick="xoahang(\'' + mahang + '\');">Xóa</a>';
                        }
                    }
                ],

                //"order": [[1, "desc"]],
                destroy: true,
                "oLanguage": {
                    "sZeroRecords": "Không tìm thấy",
                    "sSearch": "Tìm kiếm:",
                    "sLengthMenu": "Hiển thị _MENU_ dòng",
                    "sInfoEmpty": "Không có dữ liệu",
                    "sInfo": "Tất cả: _TOTAL_ dòng. Đang hiển thị dòng _START_ tới dòng _END_ ",
                    "oPaginate": {
                        "sPrevious": "   Trước   ",
                        "sNext": "   Sau   "
                    }

                }
                ////đưa tổng toa vào footer dùng sum.js api của datatable
                //drawCallback: function () {
                //    var api = this.api();
                //    $(api.table().footer()).html(
                //      api.column(5, { page: 'current' }).data().sum()
                //    );
                //}
            });
            //lấy giá trị tổng toa
            $.ajax({
                type: "post",
                contentType: "application/json;charset=utf-8",
                url: "banhang.asmx/tongtien_phieutam",
                dataType: "json",
                success: function (data) {
                    var tongtien = parseInt(data.d);
                    $('#tongtien').val(tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ");
                }
            });
        }
    });
}
function luuphieubantam() {

    var thanhtien = parseInt($('#thanhtien').val());
    if (!validSoluong()) {
        hienthongbao(0, "Hàng trong kho không đủ hoặc số lượng để trống!");
        return;
    }
    if (thanhtien === 0) {
        hienthongbao(0, 'Thành tiền đang bằng 0');
        return;
    }
    //ghi kho
    anStatus();
    var mahang = $('#mahang').val();
    var soluong = parseInt($('#soluong').val());
    var giaban = parseInt($('#giaban').val());

    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'banhang.asmx/themvaophieubantam',
        data: "{mahang:'" + mahang + "',soluong:" + soluong + ",giaban:" + giaban + ",thanhtien:" + thanhtien + "}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Bán mã hàng:' + mahang + ' số lượng: ' + soluong + ' thành công');
                $('#soluong').val('1');
                $('#thanhtien').val(parseInt($('#soluong').val()) * parseInt($('#giaban').val()));
                $('#thanhtien_show').val(
                    putComma(parseInt($("#soluong").val()) * parseInt($("#giaban").val()))
                );
                loadHangdangban();
            } else {
                hienthongbao(0, 'Hàng đang nằm trên phiếu bán');
            }
        }
    });

}
function validSoluong() {
    if ($('#soluong').val() === '') return false;
    var sl = parseInt($('#soluong').val());
    var kho = parseInt($('#kho').val());
    if (sl > kho) {

        return false;
    }
    return true;
}
function validSoluong_modal() {
    if ($('#modal_soluong').val() === '') return false;
    var sl = parseInt($('#modal_soluong').val());
    var kho = parseInt($('#modal_kho').val());
    if (sl > kho) {

        return false;
    }
    return true;
}
function hienModal(mahang) {
    $('#modal_loi').addClass('hidden');
    getOnehanglenModal(mahang);
    $('#EditModal').modal('show');
    $('#modal_soluong').focus();
}
function getOnehanglenModal(mahang) {
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'banhang.asmx/getOnesanpham',
        data: "{mahang:'" + mahang + "'}",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_mahang').val(item.mahang);
                $('#modal_tenhang').val(item.tenhang);
                $("#modal_soluong").val(item.soluong);
                $("#modal_giaban").val(item.gia);
                $("#modal_thanhtien").val(item.thanhtien);
                $('#modal_kho').val(item.kho);


            });
        }
    });
}
function UpdateSP() {

    var mahang = $('#modal_mahang').val();
    var soluong = parseInt($('#modal_soluong').val());
    var giaban = parseInt($('#modal_giaban').val());
    var thanhtien = parseInt($('#modal_thanhtien').val());
    if (!validSoluong_modal()) {
        hienthongbao(0, "Hàng trong kho không đủ hoặc số lượng để trống!");
        return;
    }
    if (thanhtien === 0) {
        hienthongbao(0, 'Thành tiền đang bằng 0');
        return;
    }
    //ghi kho
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'banhang.asmx/updateHangphieuban',
        data: "{mahang:'" + mahang + "',soluong:" + soluong + ",giaban:" + giaban + ",thanhtien:" + thanhtien + "}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Sửa mã hàng:' + mahang + ' số lượng: ' + soluong + ' thành công');
                loadHangdangban();
                $('#EditModal').modal('hide');
            } else {
                hienthongbao(0, 'Sửa mã hàng:' + mahang + ' thất bại');

            }

        }
    });
}
function xoahang(mahang) {
    var result = confirm("Bạn có chắc xóa mã hàng " + mahang + " không?");
    if (result) {
        $.ajax({
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            url: 'banhang.asmx/xoaHangphieuban',
            data: "{mahang:'" + mahang + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d) {   // thành công
                    hienthongbao(1, 'Xóa mã hàng:' + mahang + ' thành công');
                    loadHangdangban();
                } else {
                    hienthongbao(0, 'Xóa mã hàng:' + mahang + ' thất bại');
                }

            }
        });
    }

}
function ketthucphieu() {

    var result = confirm("Bạn có chắc hoàn thành phiếu và lưu vào kho không?");
    if (result) {
        $('#modal_ghichu').val('');
        $('#ghichuModal').modal('show');


    }
}
function luughichu() {
    var ghichu = $('#modal_ghichu').val();
    if (ghichu === '') {
        hienthongbao(0, "Ghi chú không được để trống!");
        return;
    }
    hoanthanhphieuban(ghichu);
    $('#ghichuModal').modal('hide');

}
function hoanthanhphieuban(ghichu) {

    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'banhang.asmx/hoanthanhphieuban',
        data: "{nhanvien:"+ sessionStorage.getItem('id') + ",ghichu:'" + ghichu + "'}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Lưu phiếu bán thành công');
                window.location.reload();
            } else {
                hienthongbao(0, 'Lưu phiếu bán thất bại');
            }

        }
    });

}
function show_percentModal() {
    $('#percentModal').modal('show');

}
function setPercent() {
    var percent = parseInt($('#modal_percent').val());
    if (percent < 0 && percent !== -9999) return 1;
    var result = confirm("Bạn có chắc đặt giá bán sỉ theo tỷ lệ đó không?");
    if (result) {
        $('#percentModal').modal('hide');
    }


    $('#modal_percent').val('');
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'banhang.asmx/setPercent',
        data: "{percent:'" + percent + "'}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Đặt giá bán theo tỉ lệ thành công');
                loadHangdangban();
            } else {
                hienthongbao(0, 'Đặt giá bán theo tỉ lệ thất bại');
            }

        }
    });
}






