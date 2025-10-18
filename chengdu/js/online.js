; (function (win) {
  var Main = win.Robot || {}
  var doc = win.document
  var pageDomain = doc.domain

  /**
   * 弹框配置
   */
  var Config = {
    domain: '.',
    msgDomain: '',
    cookieDay: 1, // cookie存活天数
    firstInMins: 10000,
    closeAfterMins: 1000 * 45,
    delayMins: 3000,
    monitorMins: 1000
  }

  /**
   * 配置
   */
  Main.initConfig = function () {
    // https 与 http 自适应
    var http = document.location.protocol
    if (http == 'file:') {
      Config.domain = Config.msgDomain = 'http://ik.sungoin.com'
    } else {
      switch (pageDomain) {
        case '192.168.4.144':
          Config.msgDomain = http + '//192.168.4.144:8880'
          break
        case '192.168.1.35':
          Config.msgDomain = http + '//192.168.1.35:8880'
          break
        case '192.168.4.185':
          Config.msgDomain = http + '//192.168.1.144:8880'
          break
        default:
          Config.domain = Config.msgDomain = http + '//ik.sungoin.com'
      }
    }
  }

  /**
   * url参数
   */
  Main.joinUrlParam = function () {
    var parame = []
    parame.push('?page=' + Main.encode(win.location.href))
    parame.push('&pageDomain=' + Main.encode(pageDomain))
    parame.push('&msgDomain=' + Main.encode(Config.msgDomain))
    parame.push('&delayMins=' + Config.delayMins)
    parame.push('&cookieDay=' + Config.cookieDay)
    parame.push('&referrer=' + Main.encode(document.referrer))

    return parame.join('')
  }

  Main.elem = function () {
    return doc.getElementById(arguments[0])
  }

  Main.tag = function () {
    return doc.getElementsByTagName(arguments[0])
  }

  Main.encode = function (str) {
    return encodeURIComponent(str)
  }

  Main.hide = function () {
    if (typeof arguments[0] === 'string') {
      var elem = Main.elem(arguments[0])
      elem.style.display = 'none'
    } else {
      arguments[0].style.display = 'none'
    }
  }

  Main.isShow = function () {
    if (typeof arguments[0] === 'string') {
      var elem = Main.elem(arguments[0])
      return elem.style.display == 'block'
    } else {
      return arguments[0].style.display == 'block'
    }
  }

  Main.show = function () {
    if (typeof arguments[0] === 'string') {
      var elem = Main.elem(arguments[0])
      elem.style.display = 'block'
    } else {
      arguments[0].style.display = 'block'
    }
  }

  /**
   * 是否移动端
   */
  Main.isMobileApp = function () {
    /// return true;
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      return true
    } else {
      return false
    }
  }

  /**
   * 加载css
   */
  Main.createCss = function (styStr) {
    if (styStr) {
      var style = doc.createElement('style')
      style.type = 'text/css'
      if (style.styleSheet) {
        // ie下
        style.styleSheet.cssText = styStr
      } else {
        style.innerHTML = styStr // style.appendChild(doc.createTextNode(str));
      }
      Main.tag('head')[0].appendChild(style)
    } else {
      var link = doc.createElement('link')
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = Config.domain+'/css/online.min.css'
      Main.tag('head')[0].appendChild(link)
    }
  }

  /**
   * 创建div
   */
  Main.createDiv = function (id, html) {
    if (doc.body) {
      var elem = doc.createElement('div')
      elem.id = id
      elem.innerHTML = html
      doc.body.insertBefore(elem, doc.body.childNodes[0])
    } else {
      doc.write('<div id="' + id + '">' + html + '</div>')
    }
  }

  /**
   * 移动端
   */
  Main.MP = {
    popWin: null,
    init: function () {
      this.createCss()
      this.createBox()
    },
    createCss: function () {
      var styStr =
        '.SG-mb-icon{cursor:pointer;width:60px;height:60px;position:fixed;right:0;top:50%;z-index:2147483647}.SG-mb-icon img{width:100%}'
      Main.createCss(styStr)
    },
    createBox: function () {
      var id = 'SG-kf-Online'
      var html =
        '<div id="SG-kf-group" onclick="openSgChat(this)" data-agl-cvt="1" class="SG-mb-icon"> <img src="' +
        Config.domain +
        '/img/kefu-m.png"></div>'
      Main.createDiv(id, html)
    },
    openSgChat: function (elm) {
      // 打开会话
      // var winParm= "toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,z-look=yes";
      Main.MP.popWin = win.open(
        Config.domain +
        '/chat-mobile.html' +
        Main.joinUrlParam() +
        '&isMobile=1',
        '_self'
      )
    },
    isChatPop: function () {
      if (Main.MP.popWin && Main.MP.popWin.closed == false) {
        return true
      } else {
        return false
      }
    }
  }

  /**
   * pc端页面元素
   */
  Main.PC = {
    init: function () {
      this.createCss()
      this.createBox()
      // 客户首次进入页面，弹窗时间延迟
      setTimeout(function () {
        Main.PC.openSgChat('SG-kf-group')
      }, Config.firstInMins)
      // this.monitor()
    },
    monitor: function () { // 监控器
      var key = "noClosed"
      setInterval(function () {
        var noReplyClosed = Cookie.get(key)
        if (noReplyClosed) {
          Main.PC.closeSgWin();
          Cookie.del(key);
        }
      }, Config.monitorMins)
    },
    createCss: function () {
      var styStr =
        '.SG-kf-group{width:140px;height:120px;position:fixed;top:50%;right:0;margin-top:-60px;cursor:pointer;z-index:2147483648}.SG-kf-chat{display:none;width:558px;height:515px;position:fixed;top:50%;left:50%;margin:-315px 0 0 -280px;z-index:2147483647;background-color:#f5f5f5;border:1px solid #e93854;border-radius:5px;overflow:hidden}.SG-kf-chat-top{width:100%;cursor:move;position:absolute;height:42px;overflow:hidden;display:block;right:0}.SG-kf-chat-head{z-index:1000;position:absolute;height:40px;overflow:hidden;display:block;right:0}.SG-kf-chat-close-btn{margin-top:8px;margin-right:10px;padding:6px 12px;color:#ffffff;border-radius:4px;cursor:pointer}.SG-kf-chat-close-btn img{vertical-align:middle}.SG-kf-chat-close-btn span{font-size:14px;margin-left:5px}.SG-kf-chat-close-btn:hover{background:#b9142e}'
      Main.createCss(styStr)
    },
    createBox: function () {
      var id = 'SG-kf-Online'
      var elmBox = []
      elmBox.push(
        '<div id="SG-kf-group" onclick="openSgChat(this)" class="SG-kf-group" data-agl-cvt="1"><img src="' +
        Config.domain +
        '/img/kefu.png"></div>'
      )
      elmBox.push(
        '<div id="SG-kf-chat" class="SG-kf-chat"><div id="SG-kf-chat-top" class="SG-kf-chat-top"><div class="SG-kf-chat-head"><div class="SG-kf-chat-close-btn" onmousedown="closeSgChat(this,event)"><img src="' +
        Config.domain +
        '/img/close-btn.png"></div></div></div><iframe id="SG-kf-iframe" frameborder="0" width="100%" height="100%" src=""></iframe></div>'
      )
      var html = elmBox.join('')
      Main.createDiv(id, html)
      this.moveEvent()
    },
    openSgChat: function (elm) {
      // 打开会话
      if (Main.PC.isChatPop()) {
      } else {
        Main.hide(elm)
        Main.show('SG-kf-chat')
        var iframe = Main.elem('SG-kf-iframe')
        iframe.src = Config.domain + '/chat-pc.html' + Main.joinUrlParam()
      }
    },
    Evt: {
      add: function (t, e, f) {
        // 增加事件监听
        if (t.addEventListener) {
          // 非ie浏览器
          t.addEventListener(e, f, false)
        } else {
          if (t.attachEvent) {
            // ie系列浏览器
            t.attachEvent('on' + e, f)
          } else {
            // 其他
            t['on' + e] = f
          }
        }
      },
      del: function (t, e, f) {
        // 删除事件监听
        if (t.removeEventListener) {
          // 非ie浏览器
          t.removeEventListener(e, f, false)
        } else {
          if (t.detachEvent) {
            // ie系列浏览器
            t.detachEvent('on' + e, f)
          } else {
            // 其他
            t['on' + e] = null
          }
        }
      },
      setCapture: function (t) {
        //设置捕获范围
        if (t.setCapture) {
          t.setCapture()
        }
      },
      releaseCapture: function (t) {
        //取消捕获范围
        if (t.releaseCapture) {
          t.releaseCapture()
        }
      },
      post: function (t, m) {
        // 浏览器窗体间传递信息 postMessage 支持ie8+浏览器
        t.postMessage(m, '*')
      }
    },
    moveEvent: function () {
      // 直接对话框移动
      var Evt = this.Evt,
        head = Main.elem('SG-kf-chat-top'),
        chat = Main.elem('SG-kf-chat'),
        offs
      // 注册鼠标事件
      var mouseDown = function (e) {
        // 鼠标点击，记录当前坐标轴
        e = e || window.event
        offs = { x: e.offsetX || e.layerX, y: e.offsetY || e.layerY }
        Evt.setCapture(head) // ie 增加鼠标捕获
        Evt.add(doc, 'mousemove', mouseMove)
        Evt.add(doc, 'mouseup', mouseUp)
        doc.onselectstart = function () {
          return false
        }
      },
        mouseMove = function (e) {
          // 鼠标移动
          e = e || window.event
          if (e) {
            chat.style.left = e.clientX - offs.x + 280 + 'px'
            chat.style.top = e.clientY - offs.y + 315 + 'px'
          }
          if (window.event) {
            // ie停止事件冒泡
            event.returnValue = false
          }
        },
        mouseUp = function (e) {
          // 鼠标弹起
          Evt.releaseCapture(head)
          Evt.del(doc, 'mousemove', mouseMove)
          Evt.del(doc, 'mouseup', mouseUp)
          doc.onselectstart = null
        }
      Evt.add(head, 'mousedown', mouseDown)
    },
    closeSgWin: function () {
      // 关闭会话
      Main.hide('SG-kf-chat')
      var iframe = Main.elem('SG-kf-iframe')
      iframe.src = ''
      Main.show('SG-kf-group')
    },
    closeSgChat: function (elm) {
      this.closeSgWin()
      // 客户关闭对话窗浏览页面，弹窗时间间隔
      var hasMoblie = Cookie.get('hasMoblie')
      if (hasMoblie) {
      } else {
        clearTimeout(win.SgCloseTimer)
        win.SgCloseTimer = setTimeout(function () {
          Main.PC.openSgChat('SG-kf-group')
        }, Config.closeAfterMins)
      }
    },
    isChatPop: function () {
      var flag = Main.isShow('SG-kf-chat')
      return flag
    }
  }

  /**
   * 打开聊天框
   */
  win.openSgChat = function (elm) {
    stopEvent()
    if (Main.isMobileApp()) {

      Main.MP.openSgChat(elm)
    } else {
      if (elm) {
        Main.PC.openSgChat(elm)
      } else {
        Main.PC.openSgChat('SG-kf-group')
      }
    }
  }

  function stopEvent () {
    var event = event || window.event
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  }

  /**
   * 关闭聊天框
   */
  win.closeSgChat = function (elm, event) {
    Main.PC.closeSgChat(elm)
    try {
      // 关闭阻止事件冒泡
      var event = event || window.event
      if (event.stopPropagation) {
        event.stopPropagation()
      } else {
        event.cancelBubble = true
      }
    } catch (e) { }
  }

  /**
   * 初始化
   */
  Main.init = function () {
    Cookie.prefix = pageDomain
    Cookie.set('delayMins', Config.delayMins)
    Main.initConfig()
    if (Main.isMobileApp()) {
      Main.MP.init()
    } else {
      Main.PC.init()
    }
  }

  /**
   * 启动页面
   */
  Main.run = function () {
    if (doc.body) {
      Main.init()
    } else {
      setTimeout(function () {
        Main.run()
      }, 100)
    }
  }

  /**
   * Cookie操作对象
   */

  var Cookie = {
    max: 10 * 360, // 10年
    map: {},
    prefix: '',
    local: false, // 是否支持  localStorage
    cookie: window.navigator.cookieEnabled ? true : false, // 是否开启cookie
    put: function (name, value, GMT) {
      try {
        name = this.prefix + name
        if (this.cookie) {
          if (GMT) {
            document.cookie =
              name + '=' + escape(value) + ';expires=' + GMT + ';path=/'
          } else {
            document.cookie = name + '=' + escape(value) + ';path=/'
          }
        } else {
          if (this.local) {
            localStorage.setItem(name, value)
          } else {
            this.map[name] = value
          }
        }
      } catch (e) { }
    },
    dayExp: function (name, value) {
      var exp = new Date()
      exp.setDate(exp.getDate() + 1)
      exp.setHours(0)
      exp.setMinutes(0)
      exp.setSeconds(0)
      this.put(name, value, exp.toGMTString())
    },
    set: function () {
      var name = arguments[0],
        value = arguments[1],
        day = arguments[2],
        sec = arguments[3]
      this.dayExp(name, value)
    },
    timeExp: function (name, value, day, sec) {
      // 添加缓存，动态参数
      if (day && day > 0) {
        // cookie 将被保存 day 天
        var exp = new Date()
        exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000)
        this.put(name, value, exp.toGMTString())
      } else {
        if (sec && sec > 0) {
          var exp = new Date()
          exp.setTime(exp.getTime() + sec * 1000)
          this.put(name, value, exp.toGMTString())
        } else {
          // 不设定过期时间，浏览器关闭时cookie自动消失
          this.put(name, value)
        }
      }
    },
    del: function (name) {
      name = this.prefix + name
      //删除 缓存
      if (this.cookie) {
        document.cookie =
          name + '=;expires=' + new Date(0).toGMTString() + ';path=/'
      } else {
        if (this.local) {
          localStorage.removeItem(name)
        } else {
          delete this.map[name]
        }
      }
    },
    get: function (name) {
      name = this.prefix + name
      //取缓存函数
      if (this.cookie) {
        // var strcookie = document.cookie;//获取cookie字符串
        // var arrcookie = strcookie.split("; ");//分割
        // //遍历匹配
        // for (var i = 0; i < arrcookie.length; i++) {
        //   var arr = arrcookie[i].split("=");
        //   if (arr[0] == name) {
        //     return arr[1];
        //   }
        // }
        var arr = document.cookie.match(
          new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        )
        if (arr != null) return unescape(arr[2])
        return null;
      } else {
        if (this.local) {
          return localStorage.getItem(name)
        } else {
          return this.map[name]
        }
      }
    }
  }

  Main.run() // 页面初始化
})(window)
