$(function () {
    if ( parseInt(sessionStorage.getItem('quyen')) == 2) {  //nhân viên
        alert('Bạn chưa được cấp quyền chức năng này');
        window.location.replace('default.aspx');
    }
    loadtenhang();
    loadHangdangnhapkho();
    $('#tenhang').focus();

    $('#tenhang').change(function () {
        $('#mahang').val($('#tenhang').val());
    });
    $("#soluong").chichoso();  //chỉ cho nhập số
    $("#giagoc").chichoso();
    $("#soluong,#giagoc").on('input', function () {    //cột thành tiền tự tính
        $('#thanhtien').val(
            parseInt($("#soluong").val()) * parseInt($("#giagoc").val())
        );

    });
    $("#modal_soluong").chichoso();  //chỉ cho nhập số
    $("#modal_giagoc").chichoso();
    $("#modal_soluong,#modal_giagoc").on('input', function () {    //cột thành tiền tự tính
        $('#modal_thanhtien').val(
            parseInt($("#modal_soluong").val()) * parseInt($("#modal_giagoc").val())
        );

    });
    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
    });
});
function loadHangdangnhapkho() {
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "nhaphang.asmx/getAllnhaphang",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $('#datatable').DataTable({
                data: objdata,

                columns: [
                    { 'title': 'ID', 'data': 'id' },
                    {
                        'title': 'Mã hàng',
                        'data': 'mahang'
                    },
                    {
                        'title': 'Tên hàng',
                        'data': 'tenhang'
                    },
                    {
                        'title': 'Đơn vị tính',
                        'data': 'donvitinh'
                    },
                    {
                        'title': 'Số lượng',
                        'data': 'soluong'
                    },
                    {
                        'title': 'Giá gốc',
                        'data': 'gianhap',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': 'Thành tiền',
                        'data': 'thanhtien',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': 'Loại phiếu',
                        'data': 'phieu'
                    },
                    {
                        'title': '',
                        'data': 'mahang',
                        'render': function (mahang) {
                            return '<a href="#" class="btn btn-success btn-sm" onclick="hienModal(\'' + mahang + '\');">Sửa</a>' +
                                '<a href="#"  class="btn btn-danger btn-sm" style="margin-left:10px;" onclick="xoahang(\'' + mahang + '\');">Xóa</a>';
                        }
                    }
                ],

                "order": [[0, "desc"]],
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

                },
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1, 2, 3, 7] },//canh giưa all body và header
                    { className: "dt-right", "targets": [4, 5, 6] },  // canh phải những cột tiền
                    { className: "dt-nowrap", "targets": [8] },
                    { "sClass": "numericCol", "aTargets": [4, 5, 6] }
                ]
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
                url: "nhaphang.asmx/tongtien_phieutam",
                dataType: "json",
                success: function (data) {
                    var tongtien = parseInt(data.d);
                    $('#tongtien').val(tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                }
            });
        }
    });
}
function loadtenhang() {
    $('#tenhang').find('option').remove();  //chỉ load 1 danh sách
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'sanpham.asmx/getAllsanpham',
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
        }
    });
}
function luukho() {
    anStatus();
    var mahang = $('#mahang').val();
    var tenhang = $('#tenhang option:selected').text();
    var soluong = parseInt($('#soluong').val());
    if (soluong <= 0 || $('#soluong').val()==='') {
        hienthongbao(0, 'Số lượng không được để trống hoặc bằng 0');
        return;
    }
    var gianhap = parseInt($('#giagoc').val());
    if (gianhap <= 0 || $('#giagoc').val() === '') {
        hienthongbao(0, 'Giá nhập không được để trống hoặc bằng 0');
        return;
    }
    var thanhtien = parseInt($('#thanhtien').val());
   
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'nhaphang.asmx/themvaophieunhaptam',
        data: "{mahang:'" + mahang + "',soluong:" + soluong + ",gianhap:" + gianhap + ",thanhtien:" + thanhtien + "}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Nhập :' + tenhang + ' số lượng: ' + soluong + ' thành công');
                $('#soluong').val('1');
                $('#giagoc').val('0');
                loadHangdangnhapkho();
            } else {
                hienthongbao(0, 'Hàng đang nằm trên phiếu nhập');
            }
        }
    });
	
}
function hienModal(mahang) {
    getOnehanglenModal(mahang);
    $('#EditModal').modal('show');

}
function getOnehanglenModal(mahang) {
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'nhaphang.asmx/getOnesanpham',
        data: "{mahang:'" + mahang + "'}",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_mahang').val(item.mahang);
                $('#modal_tenhang').val(item.tenhang);
                $("#modal_soluong").val(item.soluong);
                $("#modal_giagoc").val(item.gianhap);
                $("#modal_thanhtien").val(item.thanhtien);
                $('#modal_soluong').focus();
            });
        }
    });
}
function UpdateSP() {
    var mahang = $('#modal_mahang').val();
    var soluong = parseInt($('#modal_soluong').val());
    if (soluong <= 0 || $('#modal_soluong').val() === '') {
        hienthongbao(0, 'Số lượng không được để trống hoặc bằng 0');
        return;
    }
    var gianhap = parseInt($('#modal_giagoc').val());
    if (gianhap <= 0 || $('#modal_giagoc').val() === '') {
        hienthongbao(0, 'Giá nhập không được để trống hoặc bằng 0');
        return;
    }
    var thanhtien = parseInt($('#modal_thanhtien').val());
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'nhaphang.asmx/updateHangphieunhap',
        data: "{mahang:'" + mahang + "',soluong:" + soluong + ",gianhap:" + gianhap + ",thanhtien:" + thanhtien + "}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Sửa mã hàng:' + mahang + ' số lượng: ' + soluong + ' thành công');
                loadHangdangnhapkho();
                $('#EditModal').modal('hide');
            } else {
                hienthongbao(0, 'Sửa mã hàng:' + mahang + ' số lượng: ' + soluong + ' thất bại');
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
            url: 'nhaphang.asmx/xoaHangphieunhap',
            data: "{mahang:'" + mahang + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d) {   // thành công
                    hienthongbao(1, 'Xóa mã hàng:' + mahang + ' thành công');
                    loadHangdangnhapkho();
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
        hienthongbao(0, 'Vui lòng nhập ghi chú');
        return;
    }
        hoanthanhphieunhap(ghichu);
        $('#ghichuModal').modal('hide');
    
}
function hoanthanhphieunhap(ghichu) {

    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'nhaphang.asmx/hoanthanhphieunhap',
        data: "{nhanvien:" + sessionStorage.getItem('id') + ",ghichu:'" + ghichu + "'}",
        dataType: 'json',
        success: function (data) {
            if (data.d) {   // thành công
                hienthongbao(1, 'Lưu phiếu nhập thành công');
                loadHangdangnhapkho();
            } else {
                hienthongbao(0, 'Lưu phiếu nhập thất bại');
            }

        }
    });

}



