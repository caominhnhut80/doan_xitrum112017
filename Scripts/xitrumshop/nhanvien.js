$(document).ready(function () {
    //kiểm tra quyền
    nhanvien_checkquyentruycapweb(parseInt(sessionStorage.getItem('quyen')), 'nhanvien.aspx'); 
    loadTable();
    loadQuyen();
    $('#btSub').click(function () {
        luunv();
        
    });
    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
        loadTable();
      //  $('#username').val('');
    });
});
function loadQuyen() {
    $.ajax({
        url: "quyen.asmx/quyen_get",
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#quyen').append($("<option/>", {
                    value: item.id,
                    text: item.tenquyen
                }
                ));
            });
        }
    });
}
function loadTable() {
    $.ajax({
        type: "POST",
        url: 'nhanvien.asmx/nhanvien_get',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            var table = $('#datatable').DataTable({
                data: objdata,
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1, 2,3,4] },//canh giưa all body và header
                   // { className: "dt-right", "targets": [3, 5, 6] },  // canh phải những cột tiền
                    { className: "dt-nowrap", "targets": [5] },  // các nút ko cần wrap
                 //   { "sClass": "numericCol", "aTargets": [3, 5, 6] }
                ],
                columns: [
                    {'title': 'STT', 'data': 'STT'},
                    {'title': 'Username','data': 'username'},
                    { 'title': 'Họ tên', 'data': 'hoten' },
                    { 'title': 'Quyền', 'data': 'tenquyen' },
                   
                    {'title':'Tình trạng tài khoản','data':'tinhtrang'},
                    {
                        'title':'',
                         'data': 'id',
                        'render': function (id) {
                            return '<a href="#" class="btn btn-success btn-sm" onclick="suanv(' + id + ');">Điều chỉnh</a>'
                        }
                    }

                ],

               // "order": [[0, "desc"]],  //sort cột 0 
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
                
            });
        }
    });
}
function luunv() {

    var username = $('#username').val();
    var password = $('#password').val();
    var tennhanvien = $('#tennhanvien').val();
    var quyen = parseInt($('#quyen').val());
    if (username == '' || password == '' || tennhanvien == '') {
        alert('Vui lòng nhập Username,password và họ tên');
        return;
    }
    $.ajax({
        type: "POST",
        url: "nhanvien.asmx/nhanvien_them",
        data: "{username:'" + username + "',password:'"+ password + "',hoten:'"+ tennhanvien +"',quyen:"+quyen +" }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d) {
                hienthongbao(1, 'Lưu thành công');

            } else {
                hienthongbao(0, 'Lưu thất bại! Username trùng');
               
            }
        }

    })

}
function xoanv(id) {
    var result = confirm("Bạn có chắc xóa nhân viên co id " + id + " không?");
    if (result) {
        $.ajax({
            type: "POST",
            url: "nhanvien.asmx/nhanvien_xoa",
            data: "{id:" + id + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d) {
                    hienthongbao(1, 'Xóa thành công');

                } else {
                    hienthongbao(0, 'Xóa thất bại ! Nhân viên đã tham gia trong các phiếu nhập, phiếu bán !');
                   // $('#tendonvitinh').focus();
                }
            }

        })
    }
}
function loadQuyenModal() {
    $('#modal_quyen').find('option').remove();
    $.ajax({
        url: "quyen.asmx/quyen_get",
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_quyen').append($("<option/>", {
                    value: item.id,
                    text: item.tenquyen
                }
                ));
            });
        }
    });
}
function loadTinhtrangModal() {
    $('#modal_tinhtrang').find('option').remove();
    $.ajax({
        url: "nhanvien.asmx/tinhtrang_select",
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_tinhtrang').append($("<option/>", {
                    value: item.active_id,
                    text: item.tinhtrang
                }
                ));
            });
        }
    });
}
function suanv(id) {
    loadQuyenModal();
    loadTinhtrangModal();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "nhanvien.asmx/nhanvien_get1nv",
        data: "{ manv: " + id + "}",
        dataType: "json",
        success: function (data) {
            $('#EditModal').modal('show');
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {

                $('#modal_id').val(id);
                $('#modal_username').val(item.username);
                $('#modal_password').val('');
                $('#modal_tennhanvien').val(item.hoten);
                $("#modal_quyen").val(item.quyen).change();
                $("#modal_tinhtrang").val(item.active_id).change();
                $('#modal_username').focus();
            })

        }
    })
}
function UpdateNV() {
    var id = $('#modal_id').val();
    var username = $('#modal_username').val();
    var password = $('#modal_password').val();
    var tennhanvien = $('#modal_tennhanvien').val();
    var quyen = parseInt($('#modal_quyen').val());
    var tinhtrang = parseInt($('#modal_tinhtrang').val());
    if (username == '' ||  tennhanvien == '') {
        alert('Vui lòng nhập Username,password và họ tên');
        return;
    }
    $.ajax({
        type: "POST",
        url: "nhanvien.asmx/nhanvien_sua",
        data: "{id:" + id + ",username:'" + username + "',password:'" + password + "',hoten:'" + tennhanvien + "',quyen:" + quyen + ",active_id:"+ tinhtrang +" }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (!data.d) {   //ko thành công
                hienthongbao(0, 'Sửa nhân viên thất bại');
            } else {   // thành công
                hienthongbao(1, 'Cập nhật nhanvien: ' + tennhanvien + ' thành công');
                $('#EditModal').modal('hide');

            }
        }

    })

}
function khoataikhoan(id) {
    $('#EditModal').modal('show');
    $('#modal_soluong').focus();
}
  
