const app = getApp();

Page({
  data: {
    btn_list: [{
        name: '我的...',
        btnList: [{
            label: 'MacroDeck',
            func: 'callBilibiliLive',
            icon: 'macrodeck.png',
            desc: '控制台',
            url: 'http://web.macrodeck.org/'
          }, {
            label: '时间',
            func: 'callBilibiliLive',
            icon: 'time.svg',
            desc: 'time.is',
            url: 'https://time.is/'
          },
          {
            label: '我的直播间',
            func: 'callBilibiliLive',
            icon: 'active.png',
            desc: '853641'
          },

          {
            label: '个人中心-PC版',
            func: 'callBilibiliLive',
            icon: 'version.png',
            desc: '动态和直播',
            url: "https://t.bilibili.com/"
          },

          // {
          //   label: 'Test',
          //   func: 'testImg',
          //   icon: 'version.png',
          //   desc: '拍照和相册'
          // }

        ]
      },

      {
        name: '直播区',
        btnList: [{
            label: '直播区',
            func: 'callBilibiliLive',
            icon: 'version.png',
            desc: 'Bilibili直播',
            url: "https://live.bilibili.com/"
          }, {
            label: '虚拟主播分区',
            func: 'callBilibiliLive',
            icon: 'version.png',
            desc: 'VTuber',
            url: "https://live.bilibili.com/p/eden/area-tags?parentAreaId=9&areaId=0"
          },

        ]
      },


      {
        name: '查看直播',
        btnList: [
          // { label: '添加直播间', func: 'callAddRoom', icon: 'setting.png', desc: ' ' },
          // { },
          {
            label: '弥希Miki',
            func: 'callBilibiliLive',
            icon: 'active.png',
            desc: '21672023'
          },
          {
            label: '胡桃Usa',
            func: 'callBilibiliLive',
            icon: 'active.png',
            desc: '4788550'
          },
          {
            label: '岁己Sui',
            func: 'callBilibiliLive',
            icon: 'active.png',
            desc: '25788785'
          },
          {
            label: '勾檀Mayumi',
            func: 'callBilibiliLive',
            icon: 'active.png',
            desc: '22778610'
          },
        ]
      },
      {
        name: '虚拟主播社团公式站',
        btnList: [{
            label: 'Virtuareal',
            func: 'callBilibiliLive',
            icon: 'project_vr.jpg',
            url: 'https://vrp.live/',
            desc: 'vrp.live'
          },
          {
            label: 'psplive',
            func: 'callBilibiliLive',
            icon: 'project_psp.jpg',
            url: 'https://psplive.com/',
            desc: 'psplive.com'
          }, {
            label: '普罗维登',
            func: 'callBilibiliLive',
            icon: 'project_plwd.jpg',
            url: 'https://www.pdplive.net/',
            desc: 'pdplive.net'
          }, {
            label: '虚研社',
            func: 'callBilibiliLive',
            icon: 'project_x.jpg',
            url: 'https://www.vdproject.com/',
            desc: 'vdproject.com'
          }, {
            label: '星律动',
            func: 'callBilibiliLive',
            icon: 'project_nb.jpg',
            url: 'https://www.happyelements.com/',
            desc: 'Nebula-Beat'
          },

        ]
      },

      {
        name: '其他视频网站',
        btnList: [{
          label: '抖音直播',
          func: 'callBilibiliLive',
          icon: 'douyin.svg',
          desc: '没什么卵用',
          url: "https://live.douyin.com/"
        }, {
          label: '抖音短视频',
          func: 'callBilibiliLive',
          icon: 'douyin.svg',
          desc: '一个测试视频',
          url: "https://m.douyin.com/share/video/7183279068568243456"
        }, ]
      },
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

    // 设置全局数据到当前页面数据
    this.setData({
      rooms: app.rooms
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


  callBilibiliVTuber() {
    // 进行页面跳转
    my.navigateTo({
      url: '../bilibili/bilibili'
    });
  },

  callCheckRoom(){
    // 检查自定义直播间的开播情况
    my.navigateTo({
      url: '../check_room/check_room'
    });
  },

  openUrl(text) {
    let patt = /^\d+$/gm;
    let url = text;
    if (patt.test(text)) {
      url = "https://live.bilibili.com/" + text;
    } else if (text.indexOf(".") == -1) {
      url = "https://search.bilibili.com/all?keyword=" + text;
    } else if (text.indexOf("http") == -1) {
      url = "http://" + text;
    }

    console.log("openUrl(), url = " + url)
    my.navigateTo({
      url: `/pages/bilibili_live/bilibili_live?url=${url}`
    })

  },

  testImg() {
    // IoT设备实测无法直接调用摄像头
    my.chooseImage({
      sourceType: ['camera', 'album'],
      count: 2,
      success: (res) => {
        console.log(res);
        my.previewImage({
          urls: res.tempFilePaths, // 使用所选中图片的本地临时文件路径列表
        });
      },
      fail: (res) => {
        // 可自行查看错误信息并进行相关处理
        console.log(res);
      }
    })
  },

  callEditRoom(e) {
    console.log("callEditRoom: " + JSON.stringify(e))
    my.navigateTo({
      url: `../add_room/add_room?desc=${e.currentTarget.dataset.desc}&title=${e.currentTarget.dataset.title}&iid=${e.currentTarget.dataset.iid}`
    });
  },

  callBilibiliLive(e) {
    // 进行页面跳转 - 打开item对应的网址或直播间
    // console.log("callBilibiliLive() e:")
    // console.log(e.currentTarget.dataset)

    if (e.currentTarget.dataset.url != undefined) {
      let url = e.currentTarget.dataset.url
      console.log("e.currentTarget.dataset.url = " + url)
      this.openUrl(url);
    } else {
      this.openUrl(e.currentTarget.dataset.desc);
    }

  },


  callAddRoom() {
    // 进行页面跳转
    my.navigateTo({
      url: '../add_room/add_room'
    });
  },


  handleSearch(e) {
    console.log('search', e.detail.value);
    this.setData({
      search: e.detail.value,
    });
  },
  doneSearch() {
    let text = this.data.search
    console.log('doneSearch', text);
    this.openUrl(text);
    my.hideKeyboard();
  },
  clearSearch() {
    console.log('clear search', this.data.search);
    this.setData({
      search: '',
    });
  },



  startListenKeyboardEvent() {
    my.ix.onKeyEventChange((r) => {
      console.log("keyevent:" + JSON.stringify(r));
      // if (r.keyCode === 131)
      //   my.showToast({
      //     content: 'amount: ' + r.amount
      //   });
      // else
      //   my.showToast({
      //     content: 'keyCode: ' + r.keyCode
      //   });
    });
  },


  callSySSetting() {
    my.ix.startApp({
      appName: 'settings',
    });
  },



  callVoice1() {
    my.ix.voicePlay({
      eventId: 'ZFDZ',
      number: '100',
      success: (r) => {
        my.showToast({
          content: '语音播放结束'
        })
      }
    });
  },

  callVoice2() {
    my.ix.speech({
      text: '欢迎光临',
      success: (r) => {
        my.showToast({
          content: '语音播放结束'
        })
      }
    });
  },



  startApp(callback) {
    this.startListenCashierEvent();
    my.ix.startApp({
      appName: 'cashier',
      bizNo: Math.random().toString(16).slice(2),
      totalAmount: '0.01',
      orderDetail: [{
        name: '名称1',
        content: '详情134',
        fontColor: 'gray'
      }, {
        name: '名称2',
        content: '详情456',
        fontColor: 'red'
      }],
      posTimeout: '30',
      faceLoadingTimeout: '10',
      scanLoadingTimeout: '10',
      success: (r) => {
        my.showToast({
          content: r.barCode
        });
        if (callback && r.barCode) {
          callback(r.barCode);
        }
      },
      fail: (r) => {
        my.showToast({
          content: JSON.stringify(r)
        });
      }
    });
  },

  hideFloat() {
    this.setData({
      floatShown: false,
      shownCode: '',
      image: '',
    })
  }
});