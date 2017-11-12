<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="banhang.aspx.cs" Inherits="banhang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/banhang.js"></script>


    <div class="row">
        <div class=" col-xs-8">
            <div>
                <div class="h4 text-center text-info">PHIẾU BÁN HÀNG</div>
                <table id="datatable" style="width: 100%" class="cell-border">
                </table>
                <div>
                    <div class="pull-left">
                        <button class="btn btn-primary btn-default text-center hidden" onclick="show_percentModal();">Bán giá sỉ</button>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary btn-default text-center" onclick="ketthucphieu();">Hoàn thành phiếu bán</button>
                    </div>
                    <div class="pull-right">
                        <label>Tổng tiền</label>
                        <input type="text" value="0" class="numericCol form-control right" disabled id="tongtien" />
                    </div>

                </div>

            </div>
        </div>
        <div class=" col-xs-4 ">

            <div class="well">

                <div class="form-group">
                    <div class="h4  text-center">HÀNG HÓA</div>
                    <div class="hidden">
                        <input type="text" id="mahang" disabled />
                    </div>

                </div>
                <div class="panel noibat">
                    <div class="form-group ">
                        <label for="tenhang">Tên hàng</label><br />
                        <select id="tenhang" class="form-control  chosen-select-no-results"></select>
                    </div>
                </div>


                <div class="form-group ">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <label for="soluong">Số lượng</label>
                        </div>
                        <div class="input-group btn btn-primary giantrai">
                            <div class="input-group-addon">
                                <label for="kho">Còn tồn:</label>
                            </div>
                            <input type="text" class="form-control center" id="kho" disabled />


                        </div>

                    </div>

                    <input onfocus="this.select();" type="text" id="soluong" class="form-control" value="1" />

                </div>
                <div class="form-group ">

                    <label for="giaban">Giá bán</label>
                    <div class="text-center">
                        <input id="radioLe" checked name="R1" type="radio" value="le">Lẻ
                    <input id="radioSi" name="R1" type="radio" value="si" />Sỉ
                    </div>

                    <input onfocus="this.select();" type="text" id="giaban_show" class="form-control" value="0" disabled />
                </div>
                <div class="form-group ">
                    <label for="thanhtien">Thành tiền</label>

                    <input onfocus="this.select();" type="text" id="thanhtien_show" class="form-control" value="0" disabled />
                </div>
                <div class="form-group">
                    <div id="thanhcong" class="alert alert-success hidden">
                    </div>
                    <div id="loi" class="alert loi hidden">
                    </div>
                </div>
                <div class="form-group ">
                    <div class="form-group text-center">
                        <button id="btSub" onclick="luuphieubantam();" class="btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>



        </div>
        <input onfocus="this.select();" type="hidden" id="giaban" class="form-control" value="0" disabled />
        <input onfocus="this.select();" type="hidden" id="thanhtien" class="form-control" value="0" disabled />

        <div class="modal" tabindex="-1" id="EditModal" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Thông tin sản phẩm</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div id="modal_loi" class="alert loi hidden">
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="modal_mahang">Mã hàng</label>
                                <input onfocus="this.select();" type="text" id="modal_mahang" class="form-control" disabled />
                            </div>
                            <div class="form-group">
                                <label for="modal_tenhang">Tên hàng</label>
                                <input onfocus="this.select();" type="text" id="modal_tenhang" class="form-control" disabled />
                            </div>
                            <div class="form-group ">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <label for="modal_soluong">Số lượng</label>
                                    </div>
                                    <div class="input-group btn btn-info giantrai">
                                        <div class="input-group-addon">
                                            <label for="modal_kho">SL còn</label>
                                        </div>
                                        <input type="text" class="form-control" id="modal_kho" disabled />
                                        <div class="input-group-addon">
                                            <label for="modal_kho">trong kho</label>
                                        </div>

                                    </div>

                                </div>

                                <input onfocus="this.select();" type="text" id="modal_soluong" class="form-control" />

                            </div>
                            <div class="form-group">
                                <label for="modal_giagoc">Giá bán</label>
                                <input onfocus="this.select();" type="text" id="modal_giaban" class="form-control" value="0" />
                            </div>
                            <div class="form-group">
                                <label for="modal_thanhtien">Thành tiền</label>
                                <input onfocus="this.select();" type="text" id="modal_thanhtien" class="form-control" value="0" disabled />
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="UpdateSP();">Lưu</button>
                        <button class="btn btn-primary" data-dismiss="modal">Thoát</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="ghichuModal" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Thông tin phiếu bán hàng</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="modal_ghichu">Thông tin (người mua, ghi chú...)</label>
                                <input onfocus="this.select();" type="text" id="modal_ghichu" class="form-control" />
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="luughichu();">Lưu</button>
                        <button class="btn btn-primary" data-dismiss="modal">Thoát</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="percentModal" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Tỉ lệ giá bán sỉ</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="modal_percent">Nhập tỉ lệ giá bán ra (% so với giá nhập,nhập -9999 để bán giá bình thường)</label>
                                <input onfocus="this.select();" type="text" id="modal_percent" class="form-control" />
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="setPercent();">Xác nhận</button>
                        <button class="btn btn-primary" data-dismiss="modal">Thoát</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="ThongbaoModal" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content ThongbaoModal_Dialog" id="ThongbaoModal_Dialog">
                    <div class="modal-header">
                    </div>
                    <div class="modal-body">
                        <div id="noidungthongbao" class="center"></div>
                    </div>
                    <div class="modal-footer center">
                        <button class="btn btn-primary" id="okThongbao">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

