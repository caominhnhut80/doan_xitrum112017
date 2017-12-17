$(document).ready(function () {
    //kiểm tra quyền
    nhanvien_checkquyentruycapweb(parseInt(sessionStorage.getItem('quyen')), 'sanpham.aspx'); 
    loadTable();
    loadDonvitinh();
    $('#btSub').click(function () {
        anStatus(); //ẩn 2 div lỗi và thành công
        luusp();
    });
    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
        loadTable();

    });
});
function loadTable() {
    $.ajax({
        type: "POST",
        url: 'sanpham.asmx/getAllsanpham',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            var table = $('#datatable').DataTable({
                data: objdata,
                columns: [
                    { 'title': 'Mã hàng', 'data': 'mahang' },
                    {
                        'title': 'Tên hàng',
                        'data': 'tenhang'
                    },

                    { 'title': 'Đơn vị tính', 'data': 'donvitinh' },
                    {
                        'title': 'Giá bán lẻ',
                        'data': 'giabanle',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                        // 0: o chữ số thập phân 
                    },
                    {
                        'title': 'Giá bán sỉ',
                        'data': 'giabansi',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                        // 0: o chữ số thập phân 
                    },
                    {
                        'title': 'Số lượng tồn',
                        'data': 'soluong',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': 'Chức năng',
                        'data': 'mahang',
                        'render': function (mahang) {
                            return '<a href="#"  class="btn btn-success btn-sm" onclick="suasp(\'' + mahang + '\');">Sửa</a>' + '<a href="#"  class="btn btn-danger btn-sm" style="margin-left:10px;" onclick="xoaSanpham(\'' + mahang + '\');">Xóa</a>'
                        }
                    },
                ],
                "order": [[5, "desc"]],  //sort cột 0 
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
                    { className: "dt-center", "targets": [0, 1, 2] },
                    { className: "dt-right", "targets": [3, 4, 5] },
                ]
            });
        }
    });
}
function loadDonvitinh() {
    $.ajax({
        url: "donvitinh.asmx/getDonvitinh",
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#donvitinh').append($("<option/>", {
                    value: item.id,
                    text: item.donvitinh
                }
                ));
            });
        }
    });
}
function loadDonvitinhModal() {
    $('#modal_donvitinh').find('option').remove();
    $.ajax({
        url: "donvitinh.asmx/getDonvitinh",
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_donvitinh').append($("<option/>", {
                    value: item.id,
                    text: item.donvitinh
                }
                ));
            });
        }
    });
}

function luusp() {
    var mahang = $('#mahang').val();
    var tenhang = $('#tenhang').val();
    var dvt_id = parseInt($('#donvitinh').val());
    // check mã hàng
    if (mahang != '') {
        $.ajax({
            type: "POST",
            url: "sanpham.asmx/existMahang",
            data: "{mahang:'" + mahang + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d) {  //đã có hàng
                    hienthongbao(0, 'Mã sản phẩm đã tồn tại');
                    $('#mahang').focus();
                } else {
                    if (tenhang == '') {
                        hienthongbao(0, 'Thiếu thông tin: Tên sản phẩm');
                        $('#tenhang').focus();
                    } else {  // đầy đủ thì ghi
                        $.ajax({
                            type: "POST",
                            url: "sanpham.asmx/themSanpham",
                            data: "{mahang:'" + mahang + "',tenhang:'" + tenhang + "',donvitinh:" + dvt_id + "}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (kq) {
                                if (!kq.d) {  //ko thành công
                                    hienthongbao(0, 'Lưu sản phẩm thất bại');
                                } else {
                                    hienthongbao(1, 'Lưu sản phẩm ' + tenhang + ' thành công');
                                    resetTextbox();

                                }
                            }
                        });
                    }
                }
            }
        })
    } else {
        hienthongbao(0, 'Vui lòng nhập mã hàng');
    }
}
function suasp(mahang) {
    loadDonvitinhModal();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "sanpham.asmx/getOnesanpham",
        data: "{ mahang: '" + mahang + "'}",
        dataType: "json",
        success: function (data) {
            $('#EditModal').modal('show');
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_mahang').val(item.mahang);
                $('#modal_tenhang').val(item.tenhang);
                $("#modal_donvitinh").val(item.donvitinh).change();
                $('#modal_tenhang').focus();
            })

        }
    })
   
}
function UpdateSP() {
    var mahang = $('#modal_mahang').val();
    var tenhang = $('#modal_tenhang').val();
    var donvitinh = $('#modal_donvitinh').val();
    if (tenhang == '') {
        hienthongbao_modal('Thiếu thông tin: Tên Hàng');
    }
    else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "sanpham.asmx/suaSanpham",
            data: "{ mahang: '" + mahang + "',tenhang:'" + tenhang + "',donvitinh:" + donvitinh + "}",
            dataType: "json",
            success: function (data) {
                if (!data.d) {   //ko thành công
                    hienthongbao(0, 'Sửa sản phẩm thất bại');
                } else {   // thành công
                    hienthongbao(1, 'Cập nhật sản phẩm: ' + tenhang + ' thành công');
                    $('#EditModal').modal('hide');
                    
                }
            }
        });
    }
}
function xoaSanpham(mahang) {
    var result = confirm("Bạn có chắc xóa mã hàng " + mahang + " không?");
    if (result) {
        //Logic to delete the item
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "sanpham.asmx/xoaSanpham",
            data: "{ mahang: '" + mahang + "'}",
            dataType: "json",
            success: function (data) {
                if (!data.d) {   //ko thành công
                    hienthongbao(0, 'Xóa sản phẩm thất bại ! Hàng còn trong kho');
                } else {   // thành công
                    hienthongbao(1, 'Xóa thành công');
                    

                }
            }
        });

    }
}

