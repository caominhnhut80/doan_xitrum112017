<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="nhaphang.aspx.cs" Inherits="nhaphang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
     <script src="Scripts/xitrumshop/nhaphang.js"></script>


    <div class="row">
        <div class=" col-xs-8">
            <div class="well">
                <div class="h4 text-center text-info">PHIẾU NHẬP HÀNG</div>
                <table id="datatable" style="width: 100%" class="cell-border stripe compact">
                </table>
                <div>
                    <div class="text-center">
                        <button class="btn btn-primary text-center" onclick="ketthucphieu();">Hoàn thành phiếu nhập</button>
                    </div>
                    <div class="pull-right">
                        <label>Tổng tiền</label>
                        <input type="text" value="0" style="text-align:right" class="numericCol" disabled  id="tongtien"/>
                    </div>

                </div>

            </div>
        </div>
        <div class=" col-xs-4 ">
            <div class="well">
                <div class="h4 text-center text-info">NHẬP HÀNG</div>
                
                <div class="form-group">
                    <label for="mahang">Mã hàng</label>
                    <input onfocus="this.select();" type="text" id="mahang" placeholder="Mã hàng" class="form-control" disabled />
                </div>
                <div class="form-group">
                    <label for="tenhang">Tên hàng</label><br />
                                        <select id="tenhang" class="form-control chosen-select-no-results"></select>
                </div>

                <div class="form-group">
                    <label for="soluong">Số lượng</label>
                    <input onfocus="this.select();" type="text" id="soluong" class="form-control" value="1" />

                </div>
                <div class="form-group">
                    <label for="giagoc">Giá gốc</label>
                    <input onfocus="this.select();" type="text" id="giagoc" class="form-control" value="0" />
                </div>
                <div class="form-group">
                    <label for="thanhtien">Thành tiền</label>
                    <input onfocus="this.select();" type="text" id="thanhtien" class="form-control" value="0" disabled />
                </div>
            </div>
            <div class="form-group">
                    <div id="thanhcong" class="alert thanhcong hidden">
                    </div>
                    <div id="loi" class="alert loi hidden">
                    </div>
                </div>
            <div class="form-group">
                <div class="form-group text-center">
                    <button id="btSub" onclick="luukho();" class="btn btn-primary">Lưu</button>
                </div>
            </div>
        </div>
    </div>

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
                            <div id="modal_loi" class="alert alert-danger hidden">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="modal_mahang">Mã hàng</label>
                            <input onfocus="this.select();" type="text" id="modal_mahang" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label for="modal_tenhang">Tên hàng</label>
                            <input onfocus="this.select();" type="text" id="modal_tenhang" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label for="modal_soluong">Số lượng</label>
                            <input onfocus="this.select();" type="text" id="modal_soluong" class="form-control" />

                        </div>
                        <div class="form-group">
                            <label for="modal_giagoc">Giá gốc</label>
                            <input onfocus="this.select();" type="text" id="modal_giagoc" class="form-control" value="0" />
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
                    <h4 class="modal-title">Thông tin phiếu nhập hàng</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="modal_ghichu">Thông tin (người giao, ghi chú...)</label>
                            <input onfocus="this.select();" type="text" id="modal_ghichu" class="form-control"  />
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
    <div class="modal" tabindex="-1" id="ThongbaoModal" data-backdrop="static">
        <div class="modal-dialog" >
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
</asp:Content>

