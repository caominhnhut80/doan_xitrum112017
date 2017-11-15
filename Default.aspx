<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery-3.2.1.min.js"></script>
    <script src="Scripts/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="Scripts/xitrumshop/default.js"></script>

    <link href="Scripts/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/nhut.css" rel="stylesheet" />
    <title>Trang chủ</title>
</head>
<body style="background: url('images/toyshop.jpg'); background-size: cover;">
    <div class="modal " tabindex="-1" id="loginModal" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content " id="loginform">
                <div class="modal-header">
                    <%--<button class="close" data-dismiss="modal">&times;</button>--%>
                    <h4 class="modal-title">Đăng nhập</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="tbUser">Người dùng</label>
                            <div class="col-sm-8">
                                <input onfocus="this.select();" type="text" id="tbUser" class="form-control" placeholder="Nhập tài khoản" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3 " for="tbPass">Mật khẩu</label>
                            <div class="col-sm-8">
                                <input onfocus="this.select();" type="password" id="tbPass" class="form-control" placeholder="Nhập mật khẩu" />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer center">
                    <button class="btn login_button" onclick="login();">OK</button>
                    <button class="btn login_button" data-dismiss="modal">Thoát</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
