$(document).ready(function () {
    //kiểm tra quyền
    nhanvien_checkquyentruycapweb(parseInt(sessionStorage.getItem('quyen')), 'quyen.aspx'); 
    loadTable();

    $('#btSub').click(function () {
    
        luuquyen();
    });
    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
        loadTable();
        $('#tenquyen').val('');
    });
});
function loadTable() {
    $.ajax({
        type: "POST",
        url: 'quyen.asmx/quyen_get',
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
                        'data': 'tenquyen'
                    },
                    {
                        'title': '',
                        'data': 'id',
                        'render': function (id) {
                            return '<a href="#" class="btn btn-success btn-sm" onclick="suaquyen(' + id + ');">Sửa</a>' +
                                '<a href="#"  class="btn btn-danger btn-sm" style="margin-left:10px;" onclick="xoaquyen(' + id + ');">Xóa</a>'
                        }
                    }

                ],

                "order": [[0, "asc"]],  //sort cột 0 
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
                    { className: "dt-center", "targets": [0, 1, 2] }
                ]
            });
        }
    });
}
function luuquyen() {

    var tenquyen = $('#tenquyen').val();
    $.ajax({
        type: "POST",
        url: "quyen.asmx/quyen_them",
        data: "{tenquyen:'" + tenquyen + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d) {
                hienthongbao(1, 'Lưu thành công');

            } else {
                hienthongbao(0, 'Lưu thất bại');
              
            }
        }

    })

}
function xoaquyen(id) {
    var result = confirm("Bạn có chắc xóa quyền co id " + id + " không?");
    if (result) {
        $.ajax({
            type: "POST",
            url: "quyen.asmx/quyen_xoa",
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
function suaquyen(id) {

    $.ajax({
        type: "POST",
        url: "quyen.asmx/quyen_get1",
        data: "{id:" + id + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#EditModal').modal('show');
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_id').val(item.id);
                $('#modal_tenquyen').val(item.donvitinh);
                $('#modal_tenquyen').select().focus();
            })


        }

    })
}
function UpdateQuyen() {
    var id = parseInt($('#modal_id').val());
    var tenquyen = $('#modal_tenquyen').val();
    if (tenquyen == '') return;
    $.ajax({
        type: "POST",
        url: "quyen.asmx/quyen_sua",
        data: "{id:" + id + ",tenquyen:'" + tenquyen + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d) {
                hienthongbao(1, 'Sửa thành công');
                $('#EditModal').modal('hide');
            } else {
                hienthongbao(0, 'Sửa thất bại');
                $('#tenquyen').focus();
            }
        }

    })
}