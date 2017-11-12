$(document).ready(function () {
    loadTable();
    
    $('#btSub').click(function () {
        anStatus(); //ẩn 2 div lỗi và thành công
        luusp();
    });
    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
        loadTable();
        $('#tendonvitinh').val('');
    });
});
function loadTable() {
    $.ajax({
        type: "POST",
        url: 'donvitinh.asmx/getDonvitinh',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            var table = $('#datatable').DataTable({
                data: objdata,
                columns: [
                    {
                        'title': 'ID',
                        'data': 'id'
                    },
                    {
                        'title': 'Tên đơn vị tính',
                        'data': 'donvitinh'
                    },
                    {
                        'title': '',
                        'data': 'id',
                        'render': function (id) {
                            return '<a href="#" class="btn btn-success btn-sm" onclick="suadvt(' + id + ');">Sửa</a>' +
                                '<a href="#"  class="btn btn-danger btn-sm" style="margin-left:10px;" onclick="xoadvt(' + id + ');">Xóa</a>'
                        }
                    }
                   
                ],

               "order": [[0, "desc"]],  //sort cột 0 
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
                    { className: "dt-center", "targets": [0,1,2] }
                ]
            });
        }
    });
}
function luusp() {
  
    var tendonvitinh = $('#tendonvitinh').val();
    $.ajax({
        type: "POST",
        url: "donvitinh.asmx/themDonvitinh",
        data: "{donvitinh:'" + tendonvitinh + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d) {  
                hienthongbao(1, 'Lưu thành công');
               
            } else {
                hienthongbao(0, 'Lưu thất bại');
                $('#tendonvitinh').focus();
                    }
                }
            
        })
   
}
function xoadvt(id) {
    var result = confirm("Bạn có chắc xóa đơn vị tính co id " + id + " không?");
    if (result) {
        $.ajax({
            type: "POST",
            url: "donvitinh.asmx/xoaDonvitinh",
            data: "{id:" + id + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d) {
                    hienthongbao(1, 'Xóa thành công');

                } else {
                    hienthongbao(0, 'Xóa thất bại');
                    $('#tendonvitinh').focus();
                }
            }

        })
    }
}
function suadvt(id) {
   
    $.ajax({
        type: "POST",
        url: "donvitinh.asmx/get1Donvitinh",
        data: "{id:" + id + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#EditModal').modal('show');
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_id').val(item.id);
                $('#modal_donvitinh').val(item.donvitinh);
                $('#modal_donvitinh').select().focus();
            })
            
            
        }

    })
}
function UpdateDVT() {
    var id =parseInt( $('#modal_id').val());
    var tendonvitinh = $('#modal_donvitinh').val();
    if (tendonvitinh == '') return;
    $.ajax({
        type: "POST",
        url: "donvitinh.asmx/suaDonvitinh",
        data: "{id:" + id + ",tendonvitinh:'" + tendonvitinh+"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d) {
                hienthongbao(1, 'Sửa thành công');
                $('#EditModal').modal('hide');
            } else {
                hienthongbao(0, 'Sửa thất bại');
                $('#tendonvitinh').focus();
            }
        }

    })
}