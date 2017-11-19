using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class banhang : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnReport_Click(object sender, EventArgs e)
    {
        Session["loai_report"] = 0;

        openWindow("../frmReport.aspx");

    }
    public void openWindow(string url)
    {
        Page.ClientScript.RegisterStartupScript(this.GetType(), "openWindow", "window.open(\""+url+"\");", true);
        
    }
}