<%@ Page Title="Sản phẩm" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="Sanpham.aspx.cs" Inherits="Sanpham" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
     <script src="Scripts/xitrumshop/Sanpham.js"></script>

    <div class="row">
        <div class=" col-xs-8">
            <div >
                <div class="h5 text-center text-info">DANH MỤC SẢN PHẨM</div>
                <hr />
                <table id="datatable" style="width: 100%" class="cell-border stripe compact">
                </table>
            </div>
        </div>
        <div class=" col-xs-4 ">
            <div class="well">
                <div class="h3 text-center text-info">THÊM SẢN PHẨM</div>
                <div class="form-group">
                    <div id="thanhcong" class="alert alert-success hidden">
                    </div>
                    <div id="loi" class="alert alert-danger loi hidden">
                    </div>
                </div>
                <div class="form-group">
                    <label for="tenhang">Tên sản phẩm</label>
                    <input onfocus="this.select();" type="text" id="tenhang" placeholder="Nhập tên sản phẩm" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="mahang">Mã hàng</label>
                    <input onfocus="this.select();" type="text" id="mahang" placeholder="Nhập mã sản phẩm" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="tenhang">Đơn vị tính</label>
                    <select id="donvitinh" class="form-control">
                    </select>
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
                    <h4 class="modal-title">Thông tin sản phẩm</h4>
                    <div class="form-group">
                            <div id="modal_loi" class="alert alert-danger hidden">
                            </div>

                        </div>
                </div>
                <div class="modal-body">
                    <form>

                        <div class="form-group">
                            <label for="modal_tenhang">Tên hàng</label>
                            <input onfocus="this.select();" type="text" id="modal_tenhang" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="modal_mahang">Mã hàng</label>
                            <input onfocus="this.select();" type="text" id="modal_mahang" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label for="modal_donvitinh">Đơn vị tính</label>
                            <select  id="modal_donvitinh" class="form-control">
                            </select>
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

