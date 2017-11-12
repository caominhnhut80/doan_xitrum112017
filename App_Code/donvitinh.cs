using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for donvitinh
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class donvitinh : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public donvitinh()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string getDonvitinh()
    {
        DataSet ds = new DataSet();
        ds=nt.getDatasetfromPROC("donvitinh_get", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string get1Donvitinh(int id)
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("donvitinh_get", " where id="+id);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public bool themDonvitinh(string donvitinh)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("donvitinh_them", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@donvitinh", donvitinh);
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception )
            {
                return false;
                //throw ex;

            }
        }
    }
    [WebMethod]
    public bool xoaDonvitinh(int id)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("donvitinh_xoa", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception )
            {
                return false;
                //throw ex;

            }
        }
    }
    [WebMethod]
    public bool suaDonvitinh(int id,string tendonvitinh)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("donvitinh_sua", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@donvitinh", tendonvitinh);
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception )
            {
                return false;
                //throw ex;

            }
        }
    }
}
