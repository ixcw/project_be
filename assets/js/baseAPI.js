let baseUrl = 'http://api-breakingnews-web.itheima.net'
// 调用ajax前会先调用这个函数
$.ajaxPrefilter(function (options) {
  options.url = baseUrl + options.url
  console.log(options)
})
