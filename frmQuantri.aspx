<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="frmQuantri.aspx.cs" Inherits="frmQuantri" %>

<%@ Register Assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/quantri.js"></script>
    <div class="row">
        <div class=" col-xs-8">
            <div class="well">
                <form runat="server">
                    <div class="well">
                        <div class="h4 text-center text-info">PHÂN QUYỀN TRANG</div>
                        <div class="form-group">
                            <label for="ddlNhomquyen">Nhóm quyền</label>
                            <asp:DropDownList ID="ddlNhomquyen" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlNhomquyen_SelectedIndexChanged"></asp:DropDownList>
                        </div>
                        <div class="form-group">
                            <label for="cblQuyen">Danh sách quyền</label>
                            <asp:CheckBoxList ID="cblQuyen" runat="server" AutoPostBack="True"></asp:CheckBoxList>
                        </div>
                        <div class="form-group">
                            <div class="form-group text-center">
                                <dx:ASPxButton ID="btnOK" runat="server" Text="Lưu quyền" OnClick="btnOK_Click"></dx:ASPxButton>
                            </div>
                        </div>
                    </div>

                </form>
                <div class="h4 text-center text-info">DANH SACH TRANG</div>
                <table id="datatable" style="width: 100%" class="cell-border stripe compact">
                </table>
            </div>
        </div>
        <div class=" col-xs-4 ">
            <div class="well">
                <div class="h4 text-center text-info">THÊM TRANG WEB</div>
                <div class="form-group">
                    <label for="trang_id">Trang ID</label>
                    <input onfocus="this.select();" type="text" id="trang_id" placeholder="trang_id" class="form-control" disabled />
                </div>
                <div class="form-group">
                    <label for="tentrang">Tên trang full(vd:default.aspx)</label>
                    <input onfocus="this.select();" type="text" id="tentrang" class="form-control" placeholder="Nhập tên trang đầy đủ" />

                </div>

                <div class="form-group">
                    <div class="form-group text-center">
                        <button id="btSub" onclick="luutrang();" class="btn btn-primary">Lưu</button>
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

