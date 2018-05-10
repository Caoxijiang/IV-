const helloData = {
  name:'wechat'
}
Page({
  data:helloData,
  changeName:function(e){
    console.log(e);
    this.setData({
      name:'jay chou'
    })
  }
})