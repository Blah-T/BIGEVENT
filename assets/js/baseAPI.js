$.ajaxPrefilter(function (options) {
  //发起Ajax请求之前,同意拼接请求的根路径
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  //统一为有权限的接口,设置headers请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  //调用complete回调函数
  options.complete = function (res) {
    if (res.responseJSON.status === 1) {
      //强制清空token
      localStorage.removeItem("token");
      //强制跳转到登录页面
      location.href = "/login.html";
    }
  };
});
