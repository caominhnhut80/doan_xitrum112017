using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class frmQuantri : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            quyen q = new quyen();
            ddlNhomquyen.DataSource = q.quyen_laydanhsach();
            ddlNhomquyen.DataTextField = "tenquyen";
            ddlNhomquyen.DataValueField = "id";
            ddlNhomquyen.DataBind();
            // load checklistbox
            frmQuantriWS qt = new frmQuantriWS();
            cblQuyen.DataSource = qt.quantri_select_trang_theoquyen(-1);  //select all
            cblQuyen.DataTextField = "tentrang";
            cblQuyen.DataValueField = "trang_id";
            cblQuyen.DataBind();
            check_quyen();
        }

    }


    protected void ddlNhomquyen_SelectedIndexChanged(object sender, EventArgs e)
    {
        check_quyen();
    }
    void check_quyen()
    {
        for (int j = 0; j < cblQuyen.Items.Count; j++)
        {
            cblQuyen.Items[j].Selected = false;

        }
        DataTable dt = new DataTable();
        // load checklistbox
        frmQuantriWS qt = new frmQuantriWS();
        dt = qt.quantri_select_trang_theoquyen(int.Parse(ddlNhomquyen.SelectedValue.ToString()));
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            for (int j = 0; j < cblQuyen.Items.Count; j++)
            {
                if (int.Parse(cblQuyen.Items[j].Value.ToString()) == int.Parse(dt.Rows[i][0].ToString()))
                {
                    cblQuyen.Items[j].Selected = true;
                }
            }

        }
    }

    protected void btnOK_Click(object sender, EventArgs e)
    {
        frmQuantriWS qt = new frmQuantriWS();
        int first = 1;  
        for (int j = 0; j < cblQuyen.Items.Count; j++)
        {
            if (cblQuyen.Items[j].Selected)
            {
                qt.quantri_capnhatquyen_trangweb(first, int.Parse(ddlNhomquyen.SelectedValue.ToString()), int.Parse(cblQuyen.Items[j].Value.ToString()));
                first = 0;
            }

        }
    }
}