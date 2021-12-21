$(function () {
  let layer = layui.layer
  getUserInfo()
  // 点击退出登录
  $('#btnLogout').on('click', function () {
    layer.confirm(
      '确定退出登录吗？',
      { icon: 3, title: '提示' },
      function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index)
      }
    )
  })
})

/**
 * 获取用户基本信息
 */
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      // console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      renderAvatar(res.data)
    }
  })
}

/**
 * 渲染用户头像
 * @param {*} userData 用户数据
 */
function renderAvatar(userData) {
  // 获取用户名称，昵称或用户名
  let uname = userData.nickname || userData.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
  // 根据是否有头像渲染用户头像
  if (userData.user_pic !== null) {
    $('.layui-nav-img').attr('src', userData.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    firstName = uname[0].toUpperCase()
    $('.text-avatar').html(firstName).show()
  }
}
