<%@ Page Language="C#" AutoEventWireup="true" CodeFile="report_banhang.aspx.cs" Inherits="Reports_report_banhang" %>

<%@ Register assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>
<%@ Register assembly="DevExpress.XtraReports.v17.1.Web, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraReports.Web" tagprefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>BÁO CÁO BÁN HÀNG</div>
        <div>
            <asp:GridView ID="gvMain" runat="server">
            </asp:GridView>
        </div>
        <div>
        </div>
        <dx:ASPxDocumentViewer ID="ASPxDocumentViewer1" runat="server" Height="1100px" Width="100%">
        </dx:ASPxDocumentViewer>
    </form>
</body>
</html>
