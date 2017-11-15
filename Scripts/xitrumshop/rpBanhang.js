$(function () {
    loadallphieuban();
});

function loadallphieuban() {
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "rpBanhang.asmx/getAllPhieubanhang",
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
                            return '<a href="#" class="btn btn-success btn-sm" onclick="chitietphieu(' + phieu +  ');">Chi tiết</a>'

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
           
            });
           
        }
    });
}
function chitietphieu(phieu) {
    //xử lý tiêu đề
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "banhang.asmx/tongtien_phieuban",
        data: "{phieu:" + phieu + "}",
        dataType: "json",
        success: function (data) {
            var tongtien = parseInt(data.d);
            $('#chitietphieu').val('MÃ PHIẾU:' + phieu +'  TỔNG TIỀN: '+tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+' đ');
        }
    });
   
    $.ajax({
        type: "post",
        contentType: "application/json;charset=utf-8",
        url: "rpBanhang.asmx/chitietphieuban",
        data: "{phieu:" + phieu + "}",
        dataType: "json",
        success: function (data) {
            var objdata = $.parseJSON(data.d);
            $('#datatableRight').DataTable({
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
                        'title': 'Giá ban', 'data': 'giaban',
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
                //"columnDefs": [
                //    { className: "dt-center", "targets": [0, 1, 2, 6] },//canh giưa all body và header
                //    { className: "dt-right", "targets": [3, 4, 5] },  // canh phải những cột tiền

                //    { "sClass": "numericCol", "aTargets": [3, 4, 5] }
                //],
                //drawCallback: function () {
                //    var api = this.api();
                //    $(api.table().footer()).html(api.column([5],
                //        { page: 'current' }).data().sum());
                //},

                //"footerCallback": function (row, data, start, end, display) {
                //    var api = this.api();

                //    api.columns('.sum', {
                //        page: 'current'
                //    }).every(function () {
                //        var sum = this
                //            .data()
                //            .reduce(function (a, b) {
                //                var x = parseFloat(a) || 0;
                //                var y = parseFloat(b) || 0;
                //                return x + y;
                //            }, 0);
                //        console.log(sum); //alert(sum);
                //        $(this.footer()).html(sum);
                //    });
                //}
                //"footerCallback": function (row, data, start, end, display) {
                //    var api = this.api(), data;

                //    // Remove the formatting to get integer data for summation
                //    var intVal = function (i) {
                //        return typeof i === 'string' ?
                //            i.replace(/[\$,]/g, '') * 1 :
                //            typeof i === 'number' ?
                //                i : 0;
                //    };

                //    // Total over all pages
                //    total = api
                //        .column(4)
                //        .data()
                //        .reduce(function (a, b) {
                //            return intVal(a) + intVal(b);
                //        }, 0);

                //    // Total over this page
                //    pageTotal = api
                //        .column(4, { page: 'current' })
                //        .data()
                //        .reduce(function (a, b) {
                //            return intVal(a) + intVal(b);
                //        }, 0);

                //    // Update footer
                //    $(api.column(4).footer()).html(
                //        '$' + pageTotal + ' ( $' + total + ' total)'
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