using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmReport : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        switch ((int)Session["loai_report"])
        {
            case 0:  //in phieu ban
                XtraReport_inphieuban r = new XtraReport_inphieuban();
                ASPxDocumentViewer1.Report = r;
                
                break;
            case 1: // chi tiết phiếu nhập
                XtraReport_chitietphieunhap r1= new XtraReport_chitietphieunhap((int)Session["maphieu"]);
                ASPxDocumentViewer1.Report = r1;
                break;
            case 2: // chi tiết phiếu bán
                XtraReport_chitietphieuban r2 = new XtraReport_chitietphieuban((int)Session["maphieu"]);
                ASPxDocumentViewer1.Report = r2;
                break;
        }
    }
    
}