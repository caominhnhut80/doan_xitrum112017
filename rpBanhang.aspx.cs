using System;
using DevExpress.XtraReports.ReportGeneration;
using DevExpress.XtraReports.UI;

public partial class rpBanhang : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
   
    protected void btnXuatReport_Click(object sender, EventArgs e)
    {
       
        Session["maphieu"] = int.Parse(hiddenPhieu.Value);
        Response.Redirect("frmReport.aspx");
        //PrintableComponentContainer pr = new PrintableComponentContainer();
        //pr.PrintableComponent=
    }
}