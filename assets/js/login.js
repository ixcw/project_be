$(function () {
  // 点击去注册
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6~12位，且不能出现空格'],
    repwd: function (value) {
      let val = $('.reg-box [name=password]').val()
      if (val !== value) {
        console.log(val)
        console.log(value)
        return '两次输入密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      // 模拟点击登录按钮行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        console.log(res.token)
        // 保存token
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})
