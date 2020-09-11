$(function () {
  //点击"去注册账号"的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击"去登陆"的链接
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  //从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify()函数自定义效验规则
  form.verify({
    //自定义pwd验证规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次输入的密码不一致!";
      }
    },
  });

  //监听表单的注册事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (
      res
    ) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功,请登录!");
      //模拟人的点击事件
      $("#link_login").click();
    });
  });

  //监听表单登陆事件
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      //快速获取表单中的元素
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登陆失败!");
        }
        layer.msg("登陆成功");
        //将登陆成功的token字符串保存下来
        localStorage.setItem("token", res.token);

        //跳转到后台主页
        location.href = "/index.html";
      },
    });
  });
});
