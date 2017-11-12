<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="rpNhaphang.aspx.cs" Inherits="Reports_rpNhaphang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/rpNhaphang.js"></script>
    <div class="row">

        <div class="col-sm-3">
            <div class="h4 text-center text-info">LỊCH SỬ NHẬP HÀNG</div>
            <table id="datatableLeft" style="width: 100%" class="cell-border stripe compact"></table>
        </div>
        <%--  --%>
        <div class="col-sm-8 col-sm-offset-1">
            <div class="h4 text-center text-info">CHI TIẾT PHIẾU NHẬP HÀNG</div>
            <table id="datatableRight" style="width: 100%" class="cell-border stripe compact"></table>
        </div>


    </div>



</asp:Content>

