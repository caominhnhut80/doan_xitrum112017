<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="rpBanhang.aspx.cs" Inherits="rpBanhang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
     <script src="Scripts/xitrumshop/rpBanhang.js"></script>
    <div class="row">

        <div class="col-sm-3">
            <div class="h4 text-center text-info">LỊCH SỬ BÁN HÀNG</div>
            
            <table id="datatableLeft" style="width: 100%" class="cell-border stripe compact"></table>
        </div>
        <%--  --%>
        <div class="col-sm-8 col-sm-offset-1">
            <div class="h4 text-center text-info">CHI TIẾT PHIẾU BÁN HÀNG</div>
            <input type="text" class="center-block center" id="chitietphieu" disabled size="40" />
            <table id="datatableRight" style="width: 100%" class="cell-border stripe compact"></table>
        </div>
        </div>
</asp:Content>

