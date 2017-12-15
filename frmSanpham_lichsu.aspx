<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="frmSanpham_lichsu.aspx.cs" Inherits="frmSanpham_lichsu" %>

<%@ Register Assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/sanpham_nhaphang.js"></script>
    <form id="form1" runat="server">
        <table>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <label>Sản phẩm</label>

                </td>
                <td>
                    <asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True"></asp:DropDownList>
                    
                </td>
            </tr>
             <tr>
                <td>

                </td>
                <td>
                    <asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal">
                        <asp:ListItem Selected="True">Nhập hàng</asp:ListItem>
                        <asp:ListItem>Bán hàng</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
            </tr>
             <tr>
                <td><label>Từ ngày</label></td>
                <td>  <dx:ASPxDateEdit ID="deTungay" runat="server">
        </dx:ASPxDateEdit></td>
            </tr>
              <tr>
                <td><label>Đến ngày</label></td>
                <td>  <dx:ASPxDateEdit ID="deDenngay" runat="server">
        </dx:ASPxDateEdit></td>
            </tr>
             <tr>
                <td></td>
                <td>  <dx:ASPxButton ID="ASPxButton1" runat="server" Text="Xem" Theme="Material" OnClick="ASPxButton1_Click">
            <Image Height="16px" IconID="actions_show_16x16">
            </Image>
        </dx:ASPxButton></td>
            </tr>
        </table>
        <dx:ASPxGridView ID="ASPxGridView1" runat="server">
            <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
        </dx:ASPxGridView>

    </form>

</asp:Content>

