using System;

public partial class rpBanhang : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
   
    protected void btnXuatReport_Click(object sender, EventArgs e)
    {
       
        Session["maphieu"] = int.Parse(hiddenPhieu.Value);
        Response.Redirect("frmReport.aspx");

    }
}