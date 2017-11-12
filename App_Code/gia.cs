using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for gia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class gia : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public gia()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string getAllgia()
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("gia_get", null);
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public string getGiaban1sp(string mahang)
    {
        DataSet ds = new DataSet();
        ds = nt.getDatasetfromPROC("gia_get", "and s.mahang='"+mahang+"'");
        if (ds == null) return "";
        else
            return nt.ConvertDataTabletoString(ds.Tables[0]);
    }
    [WebMethod]
    public bool updateGiaban(string mahang, long giaban, int sile)
    {
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("gia_sua", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@mahang", mahang);
            cmd.Parameters.AddWithValue("@gia", giaban);
            cmd.Parameters.AddWithValue("@sile", sile);
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
}
