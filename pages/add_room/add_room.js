const app = getApp();

Page({
  // data: {
  //   inputTitle: '',
  //   inputDesc: '',
  //   edit:'添加项目',
  // },


  onLoad(query) {
    this.data.edit = '添加项目';
    this.data.inputDesc = '';
    this.data.inputTitle = '';
    this.data.iid = ''
    console.log("query:" + JSON.stringify(query));

    if (query.iid != undefined) {
      this.data.iid = query.iid;
      this.data.edit = '修改项目';
    }

    if (query.desc != undefined) {
      this.data.inputDesc = query.desc;

    }
    if (query.title != undefined) {
      this.data.inputTitle = query.title;
    }


  },

  onBlur(e) {
    // console.log("onBlur" + JSON.stringify(e))
    this.setData({
      inputDesc: e.detail.value,
    });
  },

  bindTitle(e) {
    // console.log("bindTitle" + JSON.stringify(e))
    this.setData({
      inputTitle: e.detail.value,
    });
  },

  guid2() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },

  add() {
    console.log("add room");
    console.log(this.data);
    if (this.data.inputTitle.replace(" ", "") == '') {

      my.showToast({
        content: "未输入标题"
      });
      return;
    }

    if (this.data.inputDesc.replace(" ", "") == '') {
      my.showToast({
        content: "使用标题作为数据"
      })
      this.data.inputDesc = this.data.inputTitle;
    }

    if (this.data.iid != '') {
      for (let i = 0; i < app.rooms.length; i++) {
        let item = app.rooms[i];
        if (item.iid == this.data.iid) {

          app.rooms[i] = {
            label: this.data.inputTitle,
            desc: this.data.inputDesc,
            iid: this.data.iid
          };
          console.log("edit " + i + ": " + JSON.stringify(app.rooms));
          break;
        }
      }
      console.log("no matched room")

    } else {

      app.rooms = app.rooms.concat([{
        label: this.data.inputTitle,
        desc: this.data.inputDesc,
        iid: this.guid2()
      }, ]);
    }


    console.log("add room:" + JSON.stringify(app.rooms))

    let res = my.setStorageSync({
      key: 'rooms',
      data: app.rooms,
    });

    // console.log(res)

    my.navigateBack();
  },
});