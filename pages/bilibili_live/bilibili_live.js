Page({
  data: {},
  onLoad(query) {

    console.log(query);
    if (query.url != undefined) {
      this.data.url = query.url
    } else {
      this.data.url = "https://live.bilibili.com/"
    }
    console.log("new page url: " + this.data)

  }

});