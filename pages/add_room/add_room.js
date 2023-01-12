const app = getApp();

Page({
  data: {
    inputTitle: '',
    inputDesc: '',
  },

  
  onLoad(query) {

    console.log(query);
    if (query.desc != undefined) {
      this.data.inputDesc = query.desc
    }
    if (query.title != undefined) {
      this.data.inputTitle = query.title
    }

  },


  onBlur(e) {
    console.log("onBlur" + JSON.stringify(e))
    this.setData({
      inputDesc: e.detail.value,
    });
  },

  bindTitle(e) {
    console.log("bindTitle" + JSON.stringify(e))
    this.setData({
      inputTitle: e.detail.value,
    });
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

    app.rooms = app.rooms.concat([{
      label: this.data.inputTitle,
      desc: this.data.inputDesc,
    }, ]);

    console.log("add room result:" + JSON.stringify(app.rooms))
    //   label: '勾檀Mayumi', 
    //   desc: '22778610'
    my.navigateBack();
  },
});