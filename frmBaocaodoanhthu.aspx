<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="frmBaocaodoanhthu.aspx.cs" Inherits="frmBaocaodoanhthu" %>

<%@ Register Assembly="DevExpress.Web.v17.1, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <script src="Scripts/xitrumshop/baocaodoanhthu.js"></script>
    <div class="row">
        <div class=" col-xs-12">
            <div>
                <div class="h4 text-center text-info">BÁO CÁO DOANH THU</div>
                <hr />
                <form runat="server">


                    <div class="well">
                        <div class="form-group">
                            <label for="deTungay">Từ ngày</label>
                            <dx:ASPxDateEdit ID="deTungay" runat="server"></dx:ASPxDateEdit>
                        </div>
                        <div class="form-group">
                            <label for="modal_id">Đến ngày</label>
                            <dx:ASPxDateEdit ID="deDenngay" runat="server"></dx:ASPxDateEdit>
                        </div>
                        <div class="form-group">
                            <div class="form-group text-center">
                                <dx:ASPxButton ID="btSub" runat="server" Text="Xem báo cáo" OnClick="btSub_Click"></dx:ASPxButton>

                            </div>
                        </div>
                    </div>
                   
                    <dx:ASPxGridView ID="gvBaocao" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSource1" OnPreRender="gvBaocao_PreRender" >
                        <Settings ShowFooter="True" />
                        <Columns>
                            <dx:GridViewDataTextColumn Caption="STT" FieldName="STT" ReadOnly="True" VisibleIndex="0">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Mã hàng" FieldName="mahang" VisibleIndex="3">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tên hàng" FieldName="tenhang" VisibleIndex="4">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Số lượng" FieldName="soluong" VisibleIndex="5">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Giá bán" FieldName="giaban" VisibleIndex="7">
                                <PropertiesTextEdit DisplayFormatString="N0" />  
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tổng tiền bán ra" FieldName="thanhtien" VisibleIndex="9">
                                <PropertiesTextEdit DisplayFormatString="N0" />  
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Mã phiếu" FieldName="phieu" VisibleIndex="1">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataDateColumn Caption="Ngày lập phiếu" FieldName="ngaylapphieu" VisibleIndex="11">
                            </dx:GridViewDataDateColumn>
                            <dx:GridViewDataTextColumn Caption="Nhân viên lập phiếu" FieldName="hoten" VisibleIndex="12">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tài khoản NV lập" FieldName="username" VisibleIndex="13">
                            </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tiền lãi" FieldName="tienlai" ReadOnly="True" VisibleIndex="10">
                          <PropertiesTextEdit DisplayFormatString="N0" />  
                                </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Giá nhập vào" FieldName="gianhap" VisibleIndex="6">
                           <PropertiesTextEdit DisplayFormatString="N0" />  
                                </dx:GridViewDataTextColumn>
                            <dx:GridViewDataTextColumn Caption="Tổng tiền gốc" FieldName="tongtiengoc" ReadOnly="True" VisibleIndex="8">
                           <PropertiesTextEdit DisplayFormatString="N0" />  
                                </dx:GridViewDataTextColumn>
                        </Columns>
                        <TotalSummary>
                            <dx:ASPxSummaryItem DisplayFormat="n0" FieldName="tienlai" ShowInGroupFooterColumn="Tiền lãi" SummaryType="Sum" />
                            <dx:ASPxSummaryItem DisplayFormat="n0" FieldName="tongtiengoc" ShowInGroupFooterColumn="Tổng tiền gốc" SummaryType="Sum" />
                            <dx:ASPxSummaryItem DisplayFormat="n0" FieldName="thanhtien" ShowInGroupFooterColumn="Tổng tiền bán ra" SummaryType="Sum" />
                        </TotalSummary>
                        <Styles>
                            <Footer ForeColor="#0000CC">
                            </Footer>
                        </Styles>
                    </dx:ASPxGridView>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:toyshopConnectionString %>" SelectCommand="report_doanhthu" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
                </form>

            </div>

        </div>

    </div>
</asp:Content>

