using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for sanpham
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class sanpham : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public sanpham()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public string getAllsanpham()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("sanpham_get", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string getOnesanpham(string mahang)
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("sanpham_get", " where mahang='"+mahang +"'");
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public bool existMahang(string mahang)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("sanpham_check", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true; //đã có mã hàng
                else
                    return false;
            }
            catch (Exception )
            {
                return true;  //lỗi cũng trả về xem như đã trùng
                //throw ex;

            }
        }

    }
    [WebMethod]
    public bool themSanpham(string mahang,string tenhang,int donvitinh)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("sanpham_them", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@tenhang", tenhang);
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
    public bool xoaSanpham(string mahang)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("sanpham_xoa", con); //hàm SQL đã ràng buộc số lượng =0 mới cho xóa

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true; //đã xóa được
                else
                    return false; 
            }
            catch (Exception )
            {
                return false;
                //throw ex;

            }
        }
    }
    [WebMethod]
    public bool suaSanpham(string mahang, string tenhang,int donvitinh)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("sanpham_sua", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@tenhang", tenhang);
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
}
