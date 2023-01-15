const app = getApp();
Page({
  data: {
    items: [

    ],
  },
  onSubmit(e) {
    my.alert({
      content: e.detail.value.lib,
    });
    console.log('onSubmit', e.detail);
  },
  onReset(e) {
    console.log('onReset', e);
  },
  radioChange(e) {
    console.log('你选择的框架是：', e.detail.value);
  },

  onShow() {
    // 页面显示


    let data = '';
    // console.log(app.rooms);

    for (let i = 0; i < app.rooms.length; i++) {
      let room = app.rooms[i];
      let patt = /^\d+$/gm;
      if (patt.test(room.desc)) {
        data = data + " " + room.desc;
      }
    }

    my.request({
      url: 'https://tumuyan-bililiveapiproxy.hf.space/run/live',
      method: 'post',
      data: {
        "data": [
          data,
        ]
      },

      success: function (res) {
        // my.alert({ content: 'success' });
        let d = res.data.data
        console.log("get json: " + typeof(d));
        console.log(d[0]);
        // for(i in d){
        //   console.log(i);
        // }
        // console.log(d.toString());
        let result =JSON.parse(d[0]);
        console.log(typeof(result));
        items = []; 
        for (item in result) {
          if (time.live_status == 1) {
            i = [{
              label: item.title + "\n" + item.uname,
              cover: item.cover,
              url: item.live_url
            }];
            console.log(i);
            items = items.concat(i);
          }
        }


        // 设置全局数据到当前页面数据
        this.setData({
          items: items
        });

        // console.log(this.data.items);

      },
      fail: function (res) {
        my.alert({
          content: 'fail'
        });
      },
      complete: function (res) {
        my.hideLoading();
        // my.alert({ content: 'complete' });
      },
    });

  },
});