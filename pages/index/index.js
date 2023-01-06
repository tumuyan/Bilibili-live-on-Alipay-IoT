Page({
  data: {
    btn_list: [
      {
        name: '支付能力', btnList: [
          { label: '启动收银台', func: 'callStartApp', icon: 'active.png', desc: '调用收银台' },
        ]
      },
      {
        name: '会员能力', btnList: [
          { label: '刷脸核身', func: 'callFaceVerify', icon: 'face.png', desc: '用于刷脸核身' },
        ]
      },
      {
        name: '连接收银机能力', btnList: [
          { label: '发送付款码', func: 'callWriteHID', icon: 'send_code.png', desc: '向收银机发送付款码' },
          { label: '小指令', func: 'callTinyCommand', icon: 'tiny_command.png', desc: '发送接收小指令' },
        ]
      },
      {
        name: '基础能力', btnList: [
          { label: '容器版本查询', func: 'callGetVersion', icon: 'version.png', desc: '查询小程序容器版本' },
          { label: '获取设备序列号', func: 'callGetSysProp', icon: 'get_sys.png', desc: '查询设备序列号', key: 'ro.serialno' },
          { label: '获取设备型号', func: 'callGetSysProp', icon: 'get_sys.png', desc: '查询设备型号', key: 'ro.product.model' },
          { label: '获取设备 ID', func: 'callGetSysProp', icon: 'get_sys.png', desc: '查询设备 ID', key: 'unisdk.deviceId' },
          { label: '打开系统设置', func: 'callSySSetting', icon: 'setting.png', desc: '打开系统设置页面' },
          { label: '扫描二维码', func: 'callScanQr', icon: 'scan_code.png', desc: '单次扫描二维码' },
          { label: '连续扫描二维码', func: 'callContinuousScanQr', icon: 'scan_code.png', desc: '连续扫描二维码' },
          { label: '生成二维码', func: 'callGenerateQr', icon: 'qr.png', desc: '用于生成二维码' },
          { label: '跳转海报页面', func: 'callPoster', icon: 'poster.png', desc: '用于展示电子海报' }
        ]
      },
      {
        name: '语音能力', btnList: [
          { label: '语音播报1.0', func: 'callVoice1', icon: 'audio1.png', desc: '支持数值播报类型和自定义语音' },
          { label: '语音播报2.0', func: 'callVoice2', icon: 'audio2.png', desc: '支持在线合成语音' },
        ]
      },
      {
        name: '外设接入能力', btnList: [
          { label: '连接打印机', func: 'callPrinter', icon: 'print.png', desc: '用于打印小票' },
          { label: '身份证读卡器', func: 'callIdCardReader', icon: 'card.png', desc: '需连接读卡器' },
        ]
      }
    ],
    shownCode: '',
    floatShown: false,
    image: '',
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this.startListenKeyboardEvent();
    //开始监听小指令
    my.ix.startMonitorTinyCommand();
    /**
     * 监听小指令
     */
    my.ix.onMonitorTinyCommand((data) => {
      my.showToast({ content: data });
    });
    /**
     * 添加打印机状态监听
     */
    my.ix.startMonitorPrinter({
      success: (r) => {
        console.log("success");
      },
      fail: (r) => {
        console.log("fail, errorCode:" + r.error);
      }
    });
    //打印机状态监听
    my.ix.onMonitorPrinter((r) => {
      console.log("received data:" + r);
    });
  },
  onHide() {
    // 页面隐藏
    //关闭收银台事件监听
    my.ix.offCashierEventReceive();
    //关闭键盘事件监听
    my.ix.offKeyEventChange();
    //移除监听小指令
    my.ix.offMonitorTinyCommand();
    //移除打印机监听
    my.ix.offMonitorPrinter({
      success: (r) => {
        console.log("success");
      },
      fail: (r) => {
        console.log("fail, errorCode:" + r.error);
      }
    });
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

  startListenCashierEvent() {
    my.ix.onCashierEventReceive((r) => {
      if (r.bizType === 'RESULT_CLOSED') {
        my.ix.offCashierEventReceive();
        my.showToast({ content: '收银台关闭' });
      } else if (r.bizType === 'RESULT_BTN_FUNCTION')
        my.showToast({ content: '收银台自定义按钮按下' });
      else
        my.showToast({ content: 'RESULT: ' + r.bizType });
    });
  },

  startListenKeyboardEvent() {
    my.ix.onKeyEventChange((r) => {
      if (r.keyCode === 131)
        my.showToast({ content: 'amount: ' + r.amount });
      else
        my.showToast({ content: 'keyCode: ' + r.keyCode });
    });
  },

  callStartApp() {
    this.startApp();
  },

  callFaceVerify() {
    my.ix.faceVerify({
      option: 'life',
      success: (r) => {
        my.showToast({ content: 'uid : ' + r.buyerId })
      },
      fail: (r) => {
        my.showToast({ content: JSON.stringify(r) });
      }
    });
  },
  /**
   * 添加会员卡功能
   * 该功能需要提前配置好会员卡
   * 参考文档：https://opendocs.alipay.com/mini/introduce/card
   * 以下仅展示小程序内功能代码
   */
  callCardAuth() {
    my.addCardAuth({
      url: '从 openapi 接口获取到的 url',
      success: (res) => {
        my.alert({ content: '授权成功' });
      },
      fail: (res) => {
        my.alert({ content: '授权失败' });
      },
    });
  },

  callWriteHID() {
    this.startApp((code) => {
      my.ix.writeHID({
        protocol: 'barcode',
        value: code,
        success: (r) => {
          my.showToast({ content: 'success: ' + JSON.stringify(r) });
        },
        fail: (r) => {
          my.showToast({ content: 'fail: ' + JSON.stringify(r) });
        }
      })
    })
  },

  callTinyCommand() {
    my.showToast({ content: '测试本接口需要连接收银机并写入代码' })
    my.ix.tinyCommand({
      target: 'ix',
      content: { bizNo: '12345678', data: 'hello world' },
      success: (r) => {
        my.showToast({ content: '发送小指令成功' })
      },
      fail: (r) => {
        my.showToast({ content: "发送小指令失败 : " + r.error })
      }
    });
  },

  callGetVersion() {
    my.ix.getVersion({
      success: (r) => {
        my.showToast({
          content: JSON.stringify(r)//'服务版本号: ' + r.versionName + '-' + r.versionCode
        })
      }
    });
  },
  callGetSysProp(evt) {
    const { key } = evt.target.dataset;
    my.ix.getSysProp({
      key: key,
      success: (r) => {
        my.showToast({
          content: JSON.stringify(r)//'DeviceSn: ' + r.value
        })
      }
    });
  },

  callSySSetting() {
    my.ix.startApp({
      appName: 'settings',
    });
  },

  callScanQr() {
    my.showToast({ content: '开始扫码状态，请将二维码放在摄像头前' });
    this.showCodes('scan');
    my.ix.codeScan({
      success: (r) => {
        my.showToast({ content: r.code });
      },
      fail: (r) => {
        console.log('error: ' + r.errorMessage);
      }
    });
  },

  callContinuousScanQr() {
    let time = 0;
    this.showCodes('scan')
    my.showToast({ content: '开始扫码状态，请将二维码放在摄像头前' });
    my.ix.onCodeScan((res) => {
      if (res.success) {
        if (++time === 3) {
          my.ix.offCodeScan();
          this.hideFloat();
        }
        my.showToast({ content: res.code });
      }
    })
  },

  callGenerateQr() {
    my.ix.generateImageFromCode({
      code: 'https://opensupport.alipay.com/support/home.htm',
      format: 'QRCODE',
      width: 200,
      correctLevel: 'H',
      success: (r) => {
        // my.showToast({ content: JSON.stringify(r) })
        this.showImage(r.image);
      }
    });
  },

  callVoice1() {
    my.ix.voicePlay({
      eventId: 'ZFDZ',
      number: '100',
      success: (r) => {
        my.showToast({ content: '语音播放结束' })
      }
    });
  },

  callVoice2() {
    my.ix.speech({
      text: '欢迎光临',
      success: (r) => {
        my.showToast({ content: '语音播放结束' })
      }
    });
  },

  callPrinter() {
    my.ix.printerStatus({
      success: (r) => {
        my.showToast({ content: '打印机状态连接中' });
        //调用打印机API
        //Esc指令文档：https://opendocs.alipay.com/mini/multi-platform/dp4shc
        my.ix.printer({
          cmds: [{ 'cmd': 'addSelectJustification', 'args': ['CENTER'] },
          { 'cmd': 'addSelectPrintingPositionForHRICharacters', 'args': ['BELOW'] },
          { 'cmd': 'addSetBarcodeHeight', 'args': ['60'] },
          { 'cmd': 'addCODE128General', 'args': ['ALIPAY', '300', '100'] },
          { 'cmd': 'addPrintAndLineFeed', 'args': [] }],
          success: (r) => {
            my.showToast({ content: '打印成功' });
          },
          fail: (r) => {
            my.showToast({ content: '打印失败' });
          }
        });
      },
      fail: (r) => {
        my.showToast({ content: 'fail : ' + r.errorMessage })
      }
    });
  },

  callPoster() {
    my.navigateTo({
      url: '/pages/poster/poster'
    });
  },

  callIdCardReader() {
    my.showToast({ content: '测试本接口需要连接读卡器' })
    //调用读卡器读取身份证信息
    //文档地址：https://opendocs.alipay.com/mini/multi-platform/xiisgz
    my.ix.readCard({
      success: (r) => {
        my.showToast({ content: JSON.stringify(r) });
      },
      fail: (r) => {
        my.showToast({ content: "fail, errorCode:" + r.error });
      }
    });
  },

  startApp(callback) {
    this.startListenCashierEvent();
    my.ix.startApp({
      appName: 'cashier',
      bizNo: Math.random().toString(16).slice(2),
      totalAmount: '0.01',
      orderDetail: [{ name: '名称1', content: '详情134', fontColor: 'gray' }, { name: '名称2', content: '详情456', fontColor: 'red' }],
      posTimeout: '30',
      faceLoadingTimeout: '10',
      scanLoadingTimeout: '10',
      success: (r) => {
        my.showToast({ content: r.barCode });
        if (callback && r.barCode) {
          callback(r.barCode);
        }
      },
      fail: (r) => {
        my.showToast({ content: JSON.stringify(r) });
      }
    });
  },
  showCodes(code) {
    this.setData({
      floatShown: true,
      shownCode: code
    })
  },
  showImage(img) {
    this.setData({
      image: img,
      shownCode: '',
      floatShown: true,
    })
  },
  hideFloat() {
    this.setData({
      floatShown: false,
      shownCode: '',
      image: '',
    })
  }
});
