<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frmReport.aspx.cs" Inherits="frmReport" %>

<%@ Register assembly="DevExpress.XtraReports.v17.1.Web, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraReports.Web" tagprefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-3.2.1.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <dx:ASPxDocumentViewer ID="ASPxDocumentViewer1" runat="server" Height="1100px" ReportTypeName="XtraReport1" Width="100%">
            </dx:ASPxDocumentViewer>
        </div>
    </form>
</body>
</html>
