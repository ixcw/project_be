let baseUrl = 'http://api-breakingnews-web.itheima.net'
// 调用ajax前会先调用这个函数
$.ajaxPrefilter(function (options) {
  // 拼接根路径
  options.url = baseUrl + options.url
  // 为有权限的接口设置headers
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 处理非法访问
  options.complete = function (res) {
    // console.log(res)
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})
