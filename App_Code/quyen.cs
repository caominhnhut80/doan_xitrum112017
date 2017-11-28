using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for quyen
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class quyen : System.Web.Services.WebService
{
    nhut_tool nt = new nhut_tool();
    public quyen()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string quyen_get()
    {
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {

            SqlCommand cmd = new SqlCommand("quyen_get", con);
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

}
