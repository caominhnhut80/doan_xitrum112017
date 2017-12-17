$(function () {
    //kiểm tra quyền
    nhanvien_checkquyentruycapweb(parseInt(sessionStorage.getItem('quyen')), 'frmQuantri.aspx');
    load_ds_trang();
});
function load_ds_trang() {  
    $.ajax({
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        url: 'frmQuantriWS.asmx/quantri_selecttrang',
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $('#datatable').DataTable({
                data: objdata,
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1] },//canh giưa all body và header
                ],
                columns: [
                    { 'title': 'Trang_id', 'data': 'trang_id' },
                    { 'title': 'Tên trang', 'data': 'tentrang' },
                    {
                        'title': '',
                        'data': 'trang_id',
                        'render': function (trang_id) {
                            return '<a href="#" class="btn btn-success  btn-sm" onclick="hienModal(\'' + trang_id + '\');">Sửa</a>' +
                                '<a href="#"  class="btn btn-danger btn-sm" style="margin-left:10px;" onclick="xoatrang(\'' + trang_id + '\');">Xóa</a>';
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
            });
        }
    });
}
function luutrang() {
    var tentrang = $('#tentrang').val();
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "frmQuantriWS.asmx/quantri_themtrang",
        data: "{tentrang:'" + tentrang + "'}",
        dataType: "json",
        success: function (data) {
            if (data.d) {
                location.reload();
                //load_ds_trang();
            }
          
        }
    });
}
function xoatrang(trang_id) {
    
    var result = confirm("Bạn có chắc chắn xóa trang này ko không?");
    if (result) {
        $.ajax({
            type: "post",
            contentType: "application/json;charset=utf-8",
            url: "frmQuantriWS.asmx/quantri_xoatrang",
            data: "{trang_id:" + parseInt(trang_id) + "}",
            dataType: "json",
            success: function (data) {
                if (data.d) {
                    alert('Xóa trang thành công!');
                    location.reload();
                    //load_ds_trang();
                }

            }
        });
    }
   
}