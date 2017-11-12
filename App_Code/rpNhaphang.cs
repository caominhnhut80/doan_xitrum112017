using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for rpNhaphang
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class rpNhaphang : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public rpNhaphang()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public string getAllPhieunhaphang()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("report_phieunhaphang", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string chitietphieunhap(int phieu)
    {
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("report_chitietphieunhap", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@phieu", phieu);
            SqlDataAdapter sa = new SqlDataAdapter(cmd);
            try
            {
                con.Open();
                sa.Fill(ds);
            }
            catch (Exception)
            {
                return null;
                //throw ex;

            }
        }
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
}
