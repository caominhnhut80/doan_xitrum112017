﻿<%@ Page Title="" Language="C#" MasterPageFile="~/nhut.master" AutoEventWireup="true" CodeFile="frmQuyen.aspx.cs" Inherits="frmQuyen" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" Runat="Server">
    <script src="Scripts/xitrumshop/quyen.js"></script>
      <div class="row">
        <div class=" col-xs-8">
            <div>
                <div class="h4 text-center text-info">QUẢN LÝ QUYỀN</div>
                <hr />
                <table id="datatable" style="width: 100%" class="cell-border stripe compact">
                </table>
            </div>
        </div>
        <div class=" col-xs-4 ">
            <div class="well">
                <div class="h3 text-center text-info">THÊM QUYỀN</div>
                <div class="form-group">
                    <div id="thanhcong" class="alert alert-success hidden">
                    </div>
                    <div id="loi" class="alert alert-danger loi hidden">
                    </div>
                </div>
                <div class="form-group">
                    <label for="tenquyen">Tên quyền</label>
                    <input onfocus="this.select();" type="text" id="tenquyen" placeholder="Nhập tên quyền" class="form-control" />
                </div>
                <div class="form-group">
                    <div class="form-group text-center">
                        <button id="btSub" class="btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </div>



    </div>

    <div class="modal" tabindex="-1" id="EditModal" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">

                    <button class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Cập nhật quyền</h4>
                    
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="modal_id">ID</label>
                            <input type="text" id="modal_id" class="form-control" disabled/>
                          
                        </div>
                        <div class="form-group">
                            <label for="modal_tenquyen">Tên quyền</label>
                            <input type="text" id="modal_tenquyen" class="form-control" />
                           
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="UpdateQuyen();">Lưu</button>
                    <button class="btn btn-primary" data-dismiss="modal">Thoát</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" id="ThongbaoModal" data-backdrop="static">
        <div class="modal-dialog" >
            <div class="modal-content ThongbaoModal_Dialog" id="ThongbaoModal_Dialog">
                <div class="modal-header">
                </div>
                <div class="modal-body">
                    <div id="noidungthongbao" class="center"></div>
                </div>
                <div class="modal-footer center">
                    <button class="btn btn-primary" id="okThongbao">OK</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

