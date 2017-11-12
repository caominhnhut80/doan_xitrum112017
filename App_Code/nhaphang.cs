using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for nhaphang
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class nhaphang : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public nhaphang()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public string getAllnhaphang()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("nhaphang_get", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string getOnesanpham(string mahang)
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("nhaphang_get", " where nhaphang.mahang='"+mahang +"'" );
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public bool themvaophieunhaptam(string mahang, int soluong, int gianhap, int thanhtien)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("nhaphang_luutam", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@soluong", soluong);
            cmd.Parameters.AddWithValue("@gianhap", gianhap);
            cmd.Parameters.AddWithValue("@thanhtien", thanhtien);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true; //đã thêm được không bị trùng trên phiếu tạm
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
    public long tongtien_phieutam()
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("nhaphang_tongtientam", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                con.Open();
                return (long)cmd.ExecuteScalar();
            }
            catch (Exception )
            {
                return -1;
                //throw ex;

            }
        }
    }
    [WebMethod]
    public bool updateHangphieunhap(string mahang, int soluong, long gianhap,long thanhtien)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("nhaphang_sua", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@soluong", soluong);
            cmd.Parameters.AddWithValue("@gianhap", gianhap);
            cmd.Parameters.AddWithValue("@thanhtien", thanhtien);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true; //đã sửa
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
    public bool xoaHangphieunhap(string mahang)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("nhaphang_xoa", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true; //đã xóa
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
    public bool hoanthanhphieunhap(int nhanvien,string ghichu)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("nhaphang_chottoa", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nhanvien", nhanvien);
            cmd.Parameters.AddWithValue("@ghichu", ghichu);
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                    return true; //đã lưu
                
            }
            catch (Exception )
            {
                return false;
                //throw ex;

            }
        }
    }
}
