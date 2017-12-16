using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for banhang
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class banhang : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public banhang()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public string gettenhangcogia()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("sanpham_get", " where (giabanle>0 and giabansi>0) and soluong>0 ");
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string getAllbanhang()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("banhang_get", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string getgiaOnesanpham(string mahang)
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("sanpham_get", " where sanpham.mahang='" + mahang + "'");
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string getOnesanpham(string mahang)
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("banhang_get", " where chitietphieu.mahang='" + mahang + "'");
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public int tongtien_phieutam()
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("banhang_tongtientam", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                con.Open();
                return (int)cmd.ExecuteScalar();
            }
            catch (Exception )
            {
                return -1;
                //throw ex;

            }
        }
    }
    [WebMethod]
    public int tongtien_phieuban(int phieu)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("banhang_tongtienphieu", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@phieu", phieu);
            try
            {
                con.Open();
                return (int)cmd.ExecuteScalar();
            }
            catch (Exception)
            {
                return -1;
                //throw ex;

            }
        }
    }
    [WebMethod]
    public bool themvaophieubantam(string mahang, int soluong, int giaban, int thanhtien)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("banhang_luutam", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@soluong", soluong);
            cmd.Parameters.AddWithValue("@giaban", giaban);
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
    public bool updateHangphieuban(string mahang, int soluong, long giaban, long thanhtien)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("banhang_sua", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@soluong", soluong);
            cmd.Parameters.AddWithValue("@giaban", giaban);
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
    public bool xoaHangphieuban(string mahang)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("banhang_xoa", con);
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
    public bool hoanthanhphieuban(int nhanvien, string ghichu)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("banhang_chottoa", con);
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
