using DevExpress.XtraReports.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Reports_report_banhang : System.Web.UI.Page
{
    report rp = new report();
    protected void Page_Load(object sender, EventArgs e)
    {
        gvMain.DataSource = rp.ban_tonghop();
        gvMain.DataBind();
        
        XtraReport_ban_tonghop r = new XtraReport_ban_tonghop();
       
        ASPxDocumentViewer1.Report = r;

    }
}