using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for nhut_tool
/// </summary>
public class nhut_tool
{
    string connStr = ketnoi.kn;
    public nhut_tool()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public string ConvertDataTabletoString(DataTable dt)
    {

        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        foreach (DataRow dr in dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }
        return serializer.Serialize(rows);
    }
    public DataSet getDatasetfromPROC(string tenStore,string condition)
    {
        DataSet ds = new DataSet();
        using (SqlConnection con = new SqlConnection(ketnoi.kn))
        {
            SqlCommand cmd = new SqlCommand(tenStore, con);
            cmd.CommandType = CommandType.StoredProcedure;
            if (condition == null)
                cmd.Parameters.AddWithValue("@condition", "");
            else
                cmd.Parameters.AddWithValue("@condition", condition);
            SqlDataAdapter sa = new SqlDataAdapter(cmd);
            try
            {
                con.Open();
                sa.Fill(ds);

            }
            catch (Exception )
            {
                ds = null;
                //throw ex;

            }
        }
        return ds;
    }
   
   





    public int chaylenhSQL(string sql)
    {
        using (var conn = new SqlConnection(connStr))
        {
            using (var com = new SqlCommand(sql, conn))
            {
                conn.Open();
                int kq = com.ExecuteNonQuery(); //ko cần lấy kết quả ra
                conn.Close();
                return kq;
            }
        }
    }


    public DataSet GetDataset(string sql)
    {

        using (var conn = new SqlConnection(connStr))
        {
            using (var com = new SqlCommand(sql, conn))
            {
                conn.Open();
                SqlDataAdapter adpt = new SqlDataAdapter(com);
                DataSet ds = new DataSet();
                adpt.Fill(ds);
                conn.Close();
                return ds;
            }
        }

    }
   
    
    public int select1giatri(string sql)
    {
        int kq;
        using (var conn = new SqlConnection(connStr))
        {
            using (var com = new SqlCommand(sql, conn))
            {
                conn.Open();
                kq = (int)com.ExecuteScalar();
                conn.Close();

            }
        }
        return kq;

    }
    public int chayStoreProcedure(string storeName)
    {
        int i;
        using (var conn = new SqlConnection(connStr))
        {
            using (var com = new SqlCommand(storeName, conn) { CommandType = CommandType.StoredProcedure })
            {
                conn.Open();
                i = com.ExecuteNonQuery();
            }
        }
        return i;
    }
    public DataSet getDatasetPRO(string storeName, System.Collections.ArrayList parameterCollection)
    {
        SqlConnection sqlConnection1 = new SqlConnection(connStr);
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = storeName;
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Connection = sqlConnection1;
        if (parameterCollection != null)
        {
            foreach (object oParameter in parameterCollection)
            {
                cmd.Parameters.Add(oParameter);
            }
            parameterCollection.Clear();
        }
         
        sqlConnection1.Open();
        SqlDataAdapter adpt = new SqlDataAdapter(cmd);
        DataSet ds = new DataSet();
        adpt.Fill(ds);
        sqlConnection1.Close();
        return ds;
    }
    public int select1giatriPRO(string storeName, System.Collections.ArrayList parameterCollection)
    {
        int kq;
        SqlConnection sqlConnection1 = new SqlConnection(connStr);
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = storeName;
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Connection = sqlConnection1;
        if (parameterCollection != null)
        {
            foreach (object oParameter in parameterCollection)
            {
                cmd.Parameters.Add(oParameter);
            }
            parameterCollection.Clear();
        }
        sqlConnection1.Open();
        try
        {
            kq = (int)cmd.ExecuteScalar();
        }
        catch (Exception)
        {
            return -1;
        }
       
        sqlConnection1.Close();
        return kq;
    }
    public bool chaySQLPRO(string storeName, System.Collections.ArrayList parameterCollection)
    {
        SqlConnection sqlConnection1 = new SqlConnection(connStr);
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = storeName;
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Connection = sqlConnection1;
        if (parameterCollection != null)
        {
            foreach (object oParameter in parameterCollection)
            {
                cmd.Parameters.Add(oParameter);
            }
            parameterCollection.Clear();
        }
        sqlConnection1.Open();
        try
        {
            cmd.ExecuteNonQuery();
        }
        catch (Exception)
        {
            sqlConnection1.Close();
            return false;
        }

        sqlConnection1.Close();
        return true;
    }
    public SqlParameter InitParameter(string parameterName, SqlDbType dataType, int dataSize,
           object parameterValue, ParameterDirection parameterDirection = ParameterDirection.Input)
    {
        SqlParameter oParam = new SqlParameter(parameterName, dataType, dataSize);
        if (parameterValue != null && dataType == SqlDbType.Char)
        {
            oParam.Value = new Guid(parameterValue.ToString());
        }
        else
        {
            oParam.Value = parameterValue;
        }
        oParam.Direction = parameterDirection;
        return oParam;
    }
    public SqlParameter taothamsonull(){
        SqlParameter oParam = new SqlParameter("condition", SqlDbType.NVarChar, 500);
        oParam.Value = "";
        return oParam;
    }
    public Int32 select1giatriPRObigint(string storeName, System.Collections.ArrayList parameterCollection)
    {
        int kq;
        SqlConnection sqlConnection1 = new SqlConnection(connStr);
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = storeName;
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Connection = sqlConnection1;
        if (parameterCollection != null)
        {
            foreach (object oParameter in parameterCollection)
            {
                cmd.Parameters.Add(oParameter);
            }
            parameterCollection.Clear();
        }
        sqlConnection1.Open();
        try
        {
            kq = Convert.ToInt32(cmd.ExecuteScalar());
        }
        catch (Exception)
        {

            return 0;
        }
       
        sqlConnection1.Close();
        return kq;
    }
}