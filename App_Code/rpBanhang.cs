using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for rpBanhang
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class rpBanhang : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public rpBanhang()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public string getAllPhieubanhang()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("report_phieubanhang", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string chitietphieuban(int phieu)
    {
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("report_chitietphieuban", con);
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
