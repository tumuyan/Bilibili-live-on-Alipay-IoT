App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

  rooms: [
    // {
    //   label: '弥希Miki',  
    //   desc: '21672023'
    // },
    // {
    //   label: '胡桃Usa', 
    //   desc: '4788550'
    // },
    // {
    //   label: '岁己Sui', 
    //   desc: '25788785'
    // },
    // {
    //   label: '勾檀Mayumi', 
    //   desc: '22778610'
    // },
  ],


});
