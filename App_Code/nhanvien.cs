using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for nhanvien
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class nhanvien : System.Web.Services.WebService
{

    public int id { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public string hoten { get; set; }
    public int quyen { get; set; }
    nhut_tool nt = new nhut_tool();
    public nhanvien()
    {
        id = 0;
    }
    [WebMethod]
    public string login(string username, string password)
    {
       
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("nhanvien_login", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            try
            {
                con.Open();
                SqlDataAdapter sa = new SqlDataAdapter(cmd);
                sa.Fill(ds);

            }
            catch (Exception)
            {

                //throw ex;

            }
        }
       
        return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string nhanvien_get1nv(int manv)
    {

        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("nhanvien_get1nv", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@manv", manv);
            try
            {
                con.Open();
                SqlDataAdapter sa = new SqlDataAdapter(cmd);
                sa.Fill(ds);

            }
            catch (Exception)
            {

                //throw ex;

            }
        }

        return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string nhanvien_get()
    {

        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("nhanvien_get", con);
            cmd.CommandType = CommandType.StoredProcedure;
           
            try
            {
                con.Open();
                SqlDataAdapter sa = new SqlDataAdapter(cmd);
                sa.Fill(ds);

            }
            catch (Exception)
            {

                //throw ex;

            }
        }

        return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public bool nhanvien_them(string username,string password,string hoten,int quyen)
    {
        bool kq=false;
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("nhanvien_them", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@hoten", hoten);
            cmd.Parameters.AddWithValue("@quyen", quyen);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true;
                else
                    return false;
              

            }
            catch (Exception)
            {

                //throw ex;

            }
        }

        return kq;
    }
    [WebMethod]
    public bool nhanvien_xoa(int id)
    {
        bool kq = false;
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("nhanvien_xoa", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true;
                else
                    return false;


            }
            catch (Exception)
            {

                //throw ex;

            }
        }

        return kq;
    }
    [WebMethod]
    public bool nhanvien_sua(int id,string username, string password, string hoten, int quyen)
    {
        bool kq = false;
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("nhanvien_sua", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@hoten", hoten);
            cmd.Parameters.AddWithValue("@quyen", quyen);
            try
            {
                con.Open();
                if ((int)cmd.ExecuteScalar() > 0)
                    return true;
                else
                    return false;


            }
            catch (Exception)
            {

                //throw ex;

            }
        }

        return kq;
    }
}