using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmSanpham_lichsu : System.Web.UI.Page
{
    nhut_tool nt = new nhut_tool();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
        loadcombo();
            deTungay.Date = DateTime.Now;
            deDenngay.Date = DateTime.Now;
        }

    }
    void loadcombo()
    {
        DataSet ds = new DataSet();
        using (SqlConnection con=new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("sanpham_get", con);
            cmd.CommandType = CommandType.Text;
            SqlDataAdapter sa = new SqlDataAdapter(cmd);
            con.Open();
            sa.Fill(ds);
        }
        DropDownList1.DataSource = ds.Tables[0];
        DropDownList1.DataTextField = "tenhang";
        DropDownList1.DataValueField = "mahang";
        DropDownList1.DataBind();
    }
    void load_grid(int loaibc,string mahang,string tungay,string denngay)
    {
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("sanpham_lichsu", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@loaibc", loaibc);
            cmd.Parameters.AddWithValue("@tungay", tungay);
            cmd.Parameters.AddWithValue("@denngay", denngay);
            SqlDataAdapter sa = new SqlDataAdapter(cmd);
            con.Open();
            sa.Fill(ds);
            ASPxGridView1.DataSource = ds.Tables[0];
            ASPxGridView1.DataBind();
        }
        
    }
    protected void ASPxButton1_Click(object sender, EventArgs e)
    {
        load_grid(RadioButtonList1.SelectedIndex + 1, DropDownList1.SelectedValue.ToString(), deTungay.Date.ToShortDateString(), deDenngay.Date.ToShortDateString());
    }
}