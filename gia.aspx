<%@ Page Title="Giá bán" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="gia.aspx.cs" Inherits="gia" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    <script src="Scripts/xitrumshop/gia.js"></script>
    <div class="container">
        <div class="row">
            <div class=" col-xs-12">
                <div class="well">
                    <div class="h5 text-center text-info">ĐIỀU CHỈNH GIÁ</div>
                    
                   <table id="datatable" style="width: 100%" class="cell-border stripe compact">
                    </table>
                </div>
            </div>
        </div>
    </div>
        <div class="modal" tabindex="-1" id="EditModal" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Điều chỉnh giá</h4>
                </div>
                <div class="modal-body">
                    
                    <form>
                        <div class="form-group">
                            <div id="modal_loi" class="alert  hidden loi " >
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="modal_tenhang">Tên hàng</label>
                            <input onfocus="this.select();" type="text" id="modal_tenhang" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label for="modal_mahang">Mã hàng</label>
                            <input onfocus="this.select();" type="text" id="modal_mahang" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label id="lbGianhap" for="modal_gianhap">Giá gốc</label>
                            <input onfocus="this.select();" type="text" id="modal_gianhap" class="form-control"  disabled/>
                        </div>
                        <div class="form-group">
                            <label id="lbGia" for="modal_gia"></label>
                            <input onfocus="this.select();" type="text" id="modal_gia" class="form-control" />
                        </div>
                        <
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="UpdateGia();">Lưu</button>
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

