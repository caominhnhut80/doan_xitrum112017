$(function () {
    if (parseInt(sessionStorage.getItem('quyen')) != 1) {  //1: chủ, chủ mới đc nhập giá bán
        alert('Bạn chưa được cấp quyền chức năng này');
        window.location.replace('WaitingPage.aspx');
    }
    getallGia();
    $("#modal_gia").chichoso();
    var gg;  //giá gốc
    var sile;//loại giá bán 0:lẻ, 1:sỉ
    $('#okThongbao').click(function () {
        $('#ThongbaoModal').modal('hide');
        

    });
});
function getallGia() {
    $.ajax({
        type: "POST",
        url: 'gia.asmx/getAllgia',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            var table = $('#datatable').DataTable({
                data: objdata,
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1,  3] },//canh giưa all body và header
                    { className: "dt-right", "targets": [2,4, 5, 7] },  // canh phải những cột tiền
                    { "sClass": "numericCol", "aTargets": [2,4, 5, 7] }
                ],
                columns: [
                    { 'title': 'Mã hàng', 'data': 'mahang' },
                    { 'title': 'Tên hàng', 'data': 'tenhang' },
                    { 'title': 'SL trong kho', 'data': 'soluong' },
                    { 'title': 'Đơn vị tính', 'data': 'donvitinh' },
                    {
                        'title': 'Giá nhập vào', 'data': 'gianhap',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')  // 0: o chữ số thập phân
                    },
                    {
                        'title': 'Giá bán lẻ', 'data': 'giabanle',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')  // 0: o chữ số thập phân
                    },
                    {
                        'title': 'Sửa giá bán lẻ', 'data': 'mahang',
                        'render': function (mahang) {
                            return '<a href="#" hidden  class="btn btn-success" onclick="suagiaban(\'' + mahang + '\',0);" style="margin-right:0px" >Sửa</a>'
                        },
                    },
                    {
                        'title': 'Giá bán sỉ', 'data': 'giabansi',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')  // 0: o chữ số thập phân
                    },
                    {
                        'title': 'Sửa giá bán sỉ', 'data': 'mahang',
                        'render': function (mahang) {
                            return '<a href="#" hidden  class="btn btn-success" onclick="suagiaban(\'' + mahang + '\',1);" style="margin-right:0px" >Sửa</a>'
                        },
                    },
                ],
                "order": [[4, "asc"]],  //sort cột giá bán
                destroy: true,
                "oLanguage": {
                    "sZeroRecords": "Không tìm thấy",
                    "sSearch": "Tìm kiếm:",
                    "sLengthMenu": "Hiển thị _MENU_ dòng",
                    "sInfoEmpty": "Không có dữ liệu",
                    "sInfo": "Đang hiển thị _START_ tới _END_ của _TOTAL_ dòng",
                    "oPaginate": {
                        "sPrevious": "   Trước   ",
                        "sNext": "   Sau   "
                    }
                },
                "language": {
                    "decimal": ",",
                    "thousands": "."
                }
            });
        }
    });
}
function suagiaban(mahang,loai) {  // 0: lẻ, 1 :sỉ
    //$('#modal_loi').addClass('hidden');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "gia.asmx/getGiaban1sp",
        data: "{ mahang: '" + mahang + "'}",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $.each(objdata, function (i, item) {
                $('#modal_mahang').val(item.mahang);
                $('#modal_tenhang').val(item.tenhang);
                if (loai == 0) {
                    $("#modal_gia").val(item.giabanle);
                    $('#lbGia').html('Giá bán lẻ');
                    sile = 0;
                }
                    
                else if (loai == 1) {
                    $("#modal_gia").val(item.giabansi);
                    $('#lbGia').html('Giá bán sỉ');
                    sile = 1;
                }
                   
                $("#modal_gianhap").val(item.gianhap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                );
                gg = item.gianhap;
                
            })
            $('#EditModal').modal('show');
            $('#modal_gia').focus();

        }
    })
   

}
function UpdateGia() {
    var gia = parseInt($('#modal_gia').val());
    var mahang = $('#modal_mahang').val();
    var tenhang = $('#modal_tenhang').val();
    //console.log(gg);

    if (gia <= gg) {
        hienthongbao(0, 'LỖI: Giá bán nhỏ hơn giá gốc');
        
        return 0;
    } else {
        
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: "gia.asmx/updateGiaban",
                data: "{mahang:'" + mahang + "',giaban:" + gia + ",sile:"+sile +"}",
                dataType: "json",
                success: function (data) {
                    if (!data.d) {  //ko thành công
                        hienthongbao(0,'Sửa giá không thành công')
                    } else {
                        hienthongbao(1, "Cập nhật sản phẩm " + tenhang + " thành công");
                        $('#EditModal').modal('hide');
                        getallGia();
                        
                    }
                }
            })
       
       
    }

}