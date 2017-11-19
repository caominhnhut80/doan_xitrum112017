$(function () {
    $('#wrapper').toggleClass('toggled');
    loadallphieunhap();
});
function loadallphieunhap() {
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "rpNhaphang.asmx/getAllPhieunhaphang",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $('#datatableLeft').DataTable({
                data: objdata,
                "searching": false,
                columns: [
                    { 'title': 'Phiếu', 'data': 'phieu' },
                    {
                        'title': 'Ngày lập phiếu', 'data': 'ngaylapphieu',
                        'render': function (jsonDate) {
                            var date = new Date(parseInt(jsonDate.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                        }
                    },
                    { 'title': 'Số loại sản phẩm', 'data': 'sosp' },
                    { 'title': 'Tổng tiền', 'data': 'tong', 'render': $.fn.dataTable.render.number('.', ',', 0, '') },
                    //{ 'title': 'Nhân viên nhập', 'data': 'hoten' },
                    { 'title': 'User NV', 'data': 'username' },
                    { 'title': 'Ghi chú', 'data': 'ghichu' },
                    {
                        'title': '',
                        'data': 'phieu',
                        'render': function (phieu) {
                            return '<a href="#" class="btn btn-success btn-sm" onclick="chitietphieu(' + phieu + ');">Chi tiết</a>'

                        }
                    }
                ],

                "order": [[0, "desc"]],
                destroy: true,
                "oLanguage": {
                    "sZeroRecords": "Không tìm thấy",
                    // "sSearch": "Tìm kiếm:",
                    "sLengthMenu": "Hiển thị _MENU_ dòng",
                    "sInfoEmpty": "Không có dữ liệu",
                    "sInfo": "Tất cả: _TOTAL_ dòng. Đang hiển thị dòng _START_ tới dòng _END_ ",
                    "oPaginate": {
                        "sPrevious": "   Trước   ",
                        "sNext": "   Sau   "
                    }

                },
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1, 4,5] },//canh giưa all body và header
                    { className: "dt-right", "targets": [2, 3] },  // canh phải những cột tiền
                    { className: "dt-nowrap", "targets": [6] },
                    { "sClass": "numericCol", "aTargets": [2, 3] }
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
            //$.ajax({
            //    type: "post",
            //    contentType: "application/json;charset=utf-8",
            //    url: "nhaphang.asmx/tongtien_phieutam",
            //    dataType: "json",
            //    success: function (data) {
            //        var tongtien = parseInt(data.d);
            //        $('#tongtien').val(tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
            //    }
            //});
        }
    });
}
function chitietphieu(phieu) {
    //xử lý tiêu đề
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "nhaphang.asmx/tongtien_phieunhap",
        data: "{phieu:" + phieu + "}",
        dataType: "json",
        success: function (data) {
            var tongtien = parseInt(data.d);
            $('#chitietphieu').val('MÃ PHIẾU:' + phieu + '  TỔNG TIỀN: ' + tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ');
        }
    });

    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "rpNhaphang.asmx/chitietphieunhap",
        data: "{phieu:" + phieu + "}",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            var table = $('#datatableRight').DataTable({
                data: objdata,
                "searching": false,
                columns: [
                    { 'title': 'ID', 'data': 'id' },
                    { 'title': 'Mã hàng', 'data': 'mahang' },
                    { 'title': 'Tên hàng', 'data': 'tenhang' },
                    {
                        'title': 'Số lượng', 'data': 'soluong',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': 'Giá nhập', 'data': 'gianhap',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    {
                        'title': 'Thành tiền', 'data': 'thanhtien',
                        'render': $.fn.dataTable.render.number('.', ',', 0, '')
                    },
                    { 'title': 'User NV', 'data': 'username' }

                ],

                "order": [[0, "desc"]],
                destroy: true,
                "oLanguage": {
                    "sZeroRecords": "Không tìm thấy",
                    // "sSearch": "Tìm kiếm:",
                    "sLengthMenu": "Hiển thị _MENU_ dòng",
                    "sInfoEmpty": "Không có dữ liệu",
                    "sInfo": "Tất cả: _TOTAL_ dòng. Đang hiển thị dòng _START_ tới dòng _END_ ",
                    "oPaginate": {
                        "sPrevious": "   Trước   ",
                        "sNext": "   Sau   "
                    }

                },
                "columnDefs": [
                    { className: "dt-center", "targets": [0, 1, 2, 6] },//canh giưa all body và header
                    { className: "dt-right", "targets": [3, 4, 5] },  // canh phải những cột tiền

                    { "sClass": "numericCol", "aTargets": [3, 4, 5] }
                ],

            });
            //var column = table.column(5);
            //$(column.footer()).html(
            //    column.data().reduce(function (a, b) {
            //        return a + b;
            //    })
            //);
        }
    });
}