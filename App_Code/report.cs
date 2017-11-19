using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for report
/// </summary>
public class report
{
    nhut_tool nt = new nhut_tool();
    public report()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public DataTable ban_tonghop()
    {
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand("report_ban_tonghop", con);
            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                SqlDataAdapter sa = new SqlDataAdapter(cmd);
                con.Open();
                sa.Fill(ds);
                return ds.Tables[0];
            }
            catch (Exception)
            {
                return null;
                //throw ex;

            }
        }
     
      //  if (ds == null) return null;
       // else
           
    }
}