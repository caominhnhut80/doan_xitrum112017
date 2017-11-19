<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="thongke.aspx.cs" Inherits="thongke" %>

<%@ Register Assembly="DevExpress.XtraReports.v17.1.Web, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>

<%@ Register Assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/thongke.js"></script>
   
    <form id="form1" runat="server">
        <div class="row">

            <table style="margin-left: auto; margin-right: auto" class="center">
                <tr>
                    <td>
                        <label>Loại phiếu</label>

                    </td>
                    <td>
                        <dx:ASPxComboBox ID="cbLoaiphieu" runat="server" SelectedIndex="0" CssClass="center">
                            <Items>
                                <dx:ListEditItem Selected="True" Text="Nhập hàng" Value="0" />
                                <dx:ListEditItem Text="Bán hàng" Value="1" />
                            </Items>
                        </dx:ASPxComboBox>
                    </td>
                    <td style="padding-left: 150px"></td>
                    <td>
                        <asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal" AutoPostBack="True" OnSelectedIndexChanged="RadioButtonList1_SelectedIndexChanged">
                            <asp:ListItem Selected="True">Tất cả</asp:ListItem>
                            <asp:ListItem>Chọn thời gian</asp:ListItem>
                        </asp:RadioButtonList>
                    </td>

                </tr>
                <tr>
                    <td>
                        <label>Kiểu báo cáo</label>

                    </td>
                    <td>
                        <dx:ASPxComboBox ID="cbLoaibaocao" runat="server" SelectedIndex="0" CssClass="center">
                            <Items>
                                <dx:ListEditItem Selected="True" Text="Tổng hợp" Value="0" />

                            </Items>
                        </dx:ASPxComboBox>

                    </td>
                    
                    <td style="padding-left: 100px">
                        <label>Từ ngày</label>

                    </td>
                    <td>
                        <dx:ASPxDateEdit ID="tbTungay" runat="server" Enabled="False">
                            <DateRangeSettings CalendarColumnCount="1" />
                        </dx:ASPxDateEdit>
                    </td>
                    <td>
                        <label>Đến ngày</label>

                    </td>
                    <td>
                        <dx:ASPxDateEdit ID="tbDenngay" runat="server" Enabled="False">
                            <DateRangeSettings CalendarColumnCount="1" StartDateEditID="tbTungay" />
                        </dx:ASPxDateEdit>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <dx:ASPxButton ID="btnOK" runat="server" Text="Xem báo cáo" OnClick="btnOK_Click"></dx:ASPxButton>

                    </td>

                </tr>
            </table>

        </div>
        <div class="container">

            <dx:ASPxGridView ID="gvNhaptonghop" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSource2" KeyFieldName="id" Visible="False" OnFocusedRowChanged="gvNhaptonghop_FocusedRowChanged" OnPreRender="gvNhaptonghop_PreRender">
                <Settings ShowFilterRow="True" />
                <SettingsBehavior AllowFocusedRow="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" ProcessFocusedRowChangedOnServer="True" />
                <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
                <Columns>
                    <dx:GridViewCommandColumn ShowClearFilterButton="True" VisibleIndex="0">
                    </dx:GridViewCommandColumn>
                    <dx:GridViewDataTextColumn FieldName="STT" ReadOnly="True" VisibleIndex="1">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Mã phiếu nhập" FieldName="phieu" VisibleIndex="2">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Tổng tiền phiếu" FieldName="tong" ReadOnly="True" VisibleIndex="3">
                        <PropertiesTextEdit DisplayFormatString="#,###,###,###">
                        </PropertiesTextEdit>
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Right">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Số sản phẩm" FieldName="sosp" ReadOnly="True" VisibleIndex="4">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataDateColumn Caption="Ngày lập phiếu" FieldName="ngaylapphieu" VisibleIndex="6">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataDateColumn>
                    <dx:GridViewDataTextColumn Caption="Ghi chú" FieldName="ghichu" VisibleIndex="8">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Nhân viên lập phiếu" FieldName="hoten" VisibleIndex="5">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Tài khoản NV" FieldName="username" VisibleIndex="7">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                </Columns>
            </dx:ASPxGridView>
            <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:toyshopConnectionString %>" SelectCommand="report_nhap_tonghop" SelectCommandType="StoredProcedure"></asp:SqlDataSource>


        </div>
        <div class="container">
            <dx:ASPxGridView ID="gvBantonghop" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSource1" KeyFieldName="id" Visible="False" OnFocusedRowChanged="gvBantonghop_FocusedRowChanged" OnPreRender="gvBantonghop_PreRender">
                <Settings ShowFilterRow="True" />
                <SettingsBehavior AllowFocusedRow="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="True" />
                <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
                <Columns>
                    <dx:GridViewDataTextColumn FieldName="STT" ReadOnly="True" VisibleIndex="0">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn FieldName="phieu" VisibleIndex="1" Caption="Mã phiếu bán">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn FieldName="tong" ReadOnly="True" VisibleIndex="2" Caption="Tổng tiền phiếu">
                        <PropertiesTextEdit DisplayFormatString="#,###,###,###">
                        </PropertiesTextEdit>
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Right">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn FieldName="sosp" ReadOnly="True" VisibleIndex="3" Caption="Số sản phẩm (món)">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataDateColumn FieldName="ngaylapphieu" VisibleIndex="7" Caption="Ngày lập phiếu">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataDateColumn>
                    <dx:GridViewDataTextColumn FieldName="ghichu" VisibleIndex="10" Caption="Ghi chú">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn FieldName="hoten" VisibleIndex="6" Caption="Nhân viên lập phiếu">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn FieldName="username" VisibleIndex="9" Caption="Tài khoản NV">
                        <HeaderStyle Font-Bold="True" HorizontalAlign="Center" />
                        <CellStyle HorizontalAlign="Center">
                        </CellStyle>
                    </dx:GridViewDataTextColumn>
                </Columns>
            </dx:ASPxGridView>
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:toyshopConnectionString %>" SelectCommand="report_ban_tonghop" SelectCommandType="StoredProcedure"></asp:SqlDataSource>




        </div>

        <asp:Panel ID="panelButton" runat="server" class="center" Style="background-color: darksalmon" Visible="false">
            <dx:ASPxLabel ID="ASPxLabel2" runat="server" Text="Chọn phiếu trên lưới, sau đó nhấn nút xem chi tiết"></dx:ASPxLabel>

            <dx:ASPxButton ID="btnChitiet" runat="server" Text="Xem chi tiết" OnClick="btnChitiet_Click"></dx:ASPxButton>
        </asp:Panel>
    </form>
</asp:Content>

