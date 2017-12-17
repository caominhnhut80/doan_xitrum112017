using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for frmQuantri
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class frmQuantriWS : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public frmQuantriWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public bool quantri_themtrang(string tentrang)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("quantri_themtrang", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tentrang", tentrang);

            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }
        }
    }
    [WebMethod]
    public string quantri_selecttrang()
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            DataSet ds = new DataSet();
            SqlCommand cmd = new SqlCommand("quantri_selecttrang", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            SqlDataAdapter sa = new SqlDataAdapter(cmd);
            try
            {
                con.Open();
                sa.Fill(ds);
                return nt.ConvertDataTabletoString(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                return null;

            }
        }
    }
    public DataTable quantri_select_trang_theoquyen(int quyen_id)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            DataSet ds = new DataSet();
            SqlCommand cmd = new SqlCommand("quantri_select_trang_theoquyen", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@quyen_id", quyen_id);
            SqlDataAdapter sa = new SqlDataAdapter(cmd);
            try
            {
                con.Open();
                sa.Fill(ds);
                return ds.Tables[0];
            }
            catch (Exception ex)
            {
                return null;

            }
        }
    }
    public bool quantri_capnhatquyen_trangweb(int first,int quyen_id,int trang_id)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("quantri_capnhatquyen_trangweb", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@first", first);
            cmd.Parameters.AddWithValue("@quyen_id", quyen_id);
            cmd.Parameters.AddWithValue("@trang_id", trang_id);

            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }
        }
    }
    [WebMethod]
    public bool quantri_xoatrang(int trang_id)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("quantri_xoatrang", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@trang_id", trang_id);

            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }
        }
    }
}
