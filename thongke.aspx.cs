using DevExpress.Data.Filtering;
using System;
using System.Globalization;
using System.Web.UI;

public partial class thongke : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            tbTungay.Value = DateTime.Now;
            tbDenngay.Value = DateTime.Now;

        }
    }

    protected void btnOK_Click(object sender, EventArgs e)
    {

        if (int.Parse(cbLoaiphieu.Value.ToString()) == 0 && int.Parse(cbLoaibaocao.Value.ToString()) == 0) //nhập tổng hợp
            showGrid(true, false, false, false);
        if (int.Parse(cbLoaiphieu.Value.ToString()) == 1 && int.Parse(cbLoaibaocao.Value.ToString()) == 0)//bán tổng hợp
            showGrid(false, true, false, false);


        if (RadioButtonList1.SelectedIndex!=0&& tbTungay.Text != "" && tbDenngay.Text != "")
        {
            DateTime tungay = DateTime.ParseExact(DateTime.ParseExact(tbTungay.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
            DateTime denngay = DateTime.ParseExact(DateTime.ParseExact(tbDenngay.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
            string filter = new BetweenOperator("ngaylapphieu", tungay, denngay).ToString();
            if (gvNhaptonghop.Visible)
            gvNhaptonghop.FilterExpression = filter;
            else
            gvBantonghop.FilterExpression = filter;
        }


    }
    private void showGrid(bool g1, bool g2, bool g3, bool g4)
    {

        gvNhaptonghop.Visible = g1;
        gvBantonghop.Visible = g2;
        panelButton.Visible = true;
    }

    protected void gvNhaptonghop_FocusedRowChanged(object sender, EventArgs e)
    {
        if (gvNhaptonghop.FocusedRowIndex != -1)
            Session["maphieu"] = int.Parse(gvNhaptonghop.GetRowValues(gvNhaptonghop.FocusedRowIndex, "phieu").ToString());
        //lbMaphieuNhap.Text = gvNhaptonghop.GetDataRow(gvNhaptonghop.FocusedRowIndex)["phieu"].ToString();
    }



    protected void gvBantonghop_FocusedRowChanged(object sender, EventArgs e)
    {
        if (gvBantonghop.FocusedRowIndex != -1)
            Session["maphieu"] = int.Parse(gvBantonghop.GetRowValues(gvBantonghop.FocusedRowIndex, "phieu").ToString());
    }

    protected void btnChitiet_Click(object sender, EventArgs e)
    {
        if ((int)Session["maphieu"] == -1) return;
        if (gvNhaptonghop.Visible)
        {
            Session["loai_report"] = 1;
        }
        else
        {
            Session["loai_report"] = 2;
        }

        Page.ClientScript.RegisterStartupScript(this.GetType(), "openWindow", "window.open(\"" + "frmReport.aspx" + "\");", true);
    }

    protected void gvNhaptonghop_PreRender(object sender, EventArgs e)
    {
        if (RadioButtonList1.SelectedIndex != 0 && tbTungay.Text != "" && tbDenngay.Text != "")
        {
            DateTime tungay = DateTime.ParseExact(DateTime.ParseExact(tbTungay.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
            DateTime denngay = DateTime.ParseExact(DateTime.ParseExact(tbDenngay.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
            string filter = new BetweenOperator("ngaylapphieu", tungay, denngay).ToString();
            gvNhaptonghop.FilterExpression = filter;
        }
    }



    protected void RadioButtonList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (RadioButtonList1.SelectedIndex == 0)
        {
            tbTungay.Enabled = false;
            tbDenngay.Enabled = false;
        }
        else
        {
            tbTungay.Enabled = true;
            tbDenngay.Enabled = true;
        }
    }

    protected void gvBantonghop_PreRender(object sender, EventArgs e)
    {
        if (RadioButtonList1.SelectedIndex != 0 && tbTungay.Text != "" && tbDenngay.Text != "")
        {
            DateTime tungay = DateTime.ParseExact(DateTime.ParseExact(tbTungay.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
            DateTime denngay = DateTime.ParseExact(DateTime.ParseExact(tbDenngay.Text, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
            string filter = new BetweenOperator("ngaylapphieu", tungay, denngay).ToString();
            gvBantonghop.FilterExpression = filter;
        }
        
    }
}