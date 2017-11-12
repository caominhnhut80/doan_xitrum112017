<%@ Page Title="Đơn vị tính" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="donvitinh.aspx.cs" Inherits="donvitinh" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/donvitinh.js"></script>

    <div class="row">
        <div class=" col-xs-8">
            <div>
                <div class="h4 text-center text-info">ĐƠN VỊ TÍNH</div>
                <hr />
                <table id="datatable" style="width: 100%" class="cell-border stripe compact">
                </table>
            </div>
        </div>
        <div class=" col-xs-4 ">
            <div class="well">
                <div class="h3 text-center text-info">THÊM ĐƠN VỊ TÍNH</div>
                <div class="form-group">
                    <div id="thanhcong" class="alert alert-success hidden">
                    </div>
                    <div id="loi" class="alert alert-danger loi hidden">
                    </div>
                </div>
                <div class="form-group">
                    <label for="tendonvitinh">Tên đơn vị tính</label>
                    <input onfocus="this.select();" type="text" id="tendonvitinh" placeholder="Nhập tên đơn vị tính" class="form-control" />
                </div>
                <div class="form-group">
                    <div class="form-group text-center">
                        <button id="btSub" class="btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </div>



    </div>

    <div class="modal" tabindex="-1" id="EditModal" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">

                    <button class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Cập nhật đơn vị tính</h4>
                    
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="modal_id">ID</label>
                            <input type="text" id="modal_id" class="form-control" disabled/>
                          
                        </div>
                        <div class="form-group">
                            <label for="modal_donvitinh">Tên đơn vị tính</label>
                            <input type="text" id="modal_donvitinh" class="form-control" />
                           
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="UpdateDVT();">Lưu</button>
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



