<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="rpBanhang.aspx.cs" Inherits="rpBanhang" %>

<%@ Register Assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/rpBanhang.js"></script>
    <div class="row">

        <div class="col-sm-3">
            <div class="h4 text-center text-info">LỊCH SỬ BÁN HÀNG</div>

            <table id="datatableLeft" style="width: 100%" class="cell-border stripe compact"></table>
        </div>
        <%--  --%>
        <form runat="server">

       
        <div class="col-sm-8 col-sm-offset-1">
            <div class="h4 text-center text-info">CHI TIẾT PHIẾU BÁN HÀNG</div>
            <div>

                <asp:Button ID="btnXuatReport" runat="server" Text="Xuất Report" CssClass="btn btn-primary" OnClick="btnXuatReport_Click"/>
              </div> 
            <input type="text" class="center-block center" id="chitietphieu" disabled size="40" />
            <table id="datatableRight" style="width: 100%" class="cell-border stripe compact"></table>
        </div>
    <input type="hidden" id="hiddenPhieu" runat="server" ClientIDMode="Static" />
            </form>
        </div>
   
</asp:Content>

