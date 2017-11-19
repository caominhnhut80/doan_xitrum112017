<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="frmnhanvien.aspx.cs" Inherits="frmnhanvien" %>

<%@ Register Assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    <div class="container">
        <div class="center">
            <h3>QUẢN LÝ NHÂN VIÊN</h3>
        </div>
    </div>
    <form runat="server">
<dx:ASPxGridView ID="gv1" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSource1" KeyFieldName="id">
    <SettingsBehavior ConfirmDelete="True" />
    <Columns>
        <dx:GridViewCommandColumn ShowCancelButton="True" ShowDeleteButton="True" ShowEditButton="True" ShowNewButtonInHeader="True" ShowUpdateButton="True" VisibleIndex="0">
        </dx:GridViewCommandColumn>
        <dx:GridViewDataTextColumn FieldName="STT" ReadOnly="True" VisibleIndex="1">
        </dx:GridViewDataTextColumn>
        <dx:GridViewDataTextColumn FieldName="id" ReadOnly="True" VisibleIndex="2">
            <EditFormSettings Visible="False" />
        </dx:GridViewDataTextColumn>
        <dx:GridViewDataTextColumn FieldName="username" VisibleIndex="3">
        </dx:GridViewDataTextColumn>
        <dx:GridViewDataTextColumn FieldName="password" VisibleIndex="4">
        </dx:GridViewDataTextColumn>
        <dx:GridViewDataTextColumn FieldName="hoten" VisibleIndex="5">
        </dx:GridViewDataTextColumn>
        <dx:GridViewDataTextColumn FieldName="quyen" VisibleIndex="6">
        </dx:GridViewDataTextColumn>
        <dx:GridViewDataTextColumn FieldName="tenquyen" VisibleIndex="7">
        </dx:GridViewDataTextColumn>
    </Columns>
        </dx:ASPxGridView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:toyshopConnectionString %>" InsertCommand="nhanvien_them" InsertCommandType="StoredProcedure" SelectCommand="nhanvien_get" SelectCommandType="StoredProcedure">
            <InsertParameters>
                <asp:Parameter Name="username" Type="String" />
                <asp:Parameter Name="password" Type="String" />
                <asp:Parameter Name="hoten" Type="String" />
                <asp:Parameter Name="quyen" Type="Int32" />
            </InsertParameters>
        </asp:SqlDataSource>
    </form>
    
</asp:Content>

