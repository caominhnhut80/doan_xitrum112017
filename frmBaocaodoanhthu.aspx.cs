using DevExpress.Data;
using DevExpress.Data.Filtering;
using DevExpress.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmBaocaodoanhthu : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            deTungay.Date = DateTime.Now;
            deDenngay.Date = DateTime.Now;
        }
    }

    protected void btSub_Click(object sender, EventArgs e)
    {
        DateTime tungay = DateTime.ParseExact(DateTime.ParseExact(deTungay.Date.ToShortDateString(), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
        DateTime denngay = DateTime.ParseExact(DateTime.ParseExact(deDenngay.Date.ToShortDateString(), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
        string filter = new BetweenOperator("ngaylapphieu", tungay, denngay).ToString();
        gvBaocao.FilterExpression = filter;
        //string tungay, denngay;
        //tungay = deTungay.Date.ToShortDateString();
        //denngay = deDenngay.Date.ToShortDateString();
        //SqlDataSource1.SelectParameters.Add("tungay", tungay);
        //SqlDataSource1.SelectParameters.Add("denngay", denngay);
        //gvBaocao.DataSource = null;
        //gvBaocao.DataSourceID = null;
        //gvBaocao.DataSource = SqlDataSource1;

        //gvBaocao.DataBind();
        //DataSet ds = new DataSet();
        //using (SqlConnection con = new SqlConnection(ketnoi.kn))
        //{

        //    SqlCommand cmd = new SqlCommand("report_doanhthu", con);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.AddWithValue("@tungay", tungay);
        //    cmd.Parameters.AddWithValue("@denngay", denngay);
        //    try
        //    {
        //        con.Open();
        //        SqlDataAdapter sa = new SqlDataAdapter(cmd);
        //        sa.Fill(ds);

        //    }
        //    catch (Exception)
        //    {

        //        //throw ex;

        //    }
        //}
        //gvBaocao.DataSource = ds.Tables[0];
        //gvBaocao.DataBind();
    }

    protected void gvBaocao_PreRender(object sender, EventArgs e)
    {

        DateTime tungay = DateTime.ParseExact(DateTime.ParseExact(deTungay.Date.ToShortDateString(), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
        DateTime denngay = DateTime.ParseExact(DateTime.ParseExact(deDenngay.Date.ToShortDateString(), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy/MM/dd"), "yyyy/MM/dd", CultureInfo.InvariantCulture);
        string filter = new BetweenOperator("ngaylapphieu", tungay, denngay).ToString();
        gvBaocao.FilterExpression = filter;
        //gvBaocao.TotalSummary.Add(SummaryItemType.Sum, "tienlai").DisplayFormat = "c";
        //gvBaocao.GroupSummary.Add(SummaryItemType.Sum, "tienlai").ShowInGroupFooterColumn = "tienlai";
        //ASPxSummaryItem summaryItem = gvBaocao.TotalSummary["tienlai"];
        //if (summaryItem != null)
        //{
        //    txtTong.Text = gvBaocao.GetTotalSummaryValue(summaryItem).ToString();
        //}
    }

   
}