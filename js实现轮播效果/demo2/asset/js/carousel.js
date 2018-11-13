// 轮播器对象
function Carousel(options) {

  // 轮播容器
  this.el = options.el;
  // 轮播图片数组
  this.imgs = options.imgs;
  // 轮播时间间隔
  this.timeSpace = options.timeSpace;
  // 初始化当前轮播图下标index
  this.index;
  // 轮播动画计时器flag
  this.animateFlag;
  // 是否轮播
  this.isSwipe;
  // 是否处于轮播滚动状态(用于轮播防抖动)
  this.isRunning;

  this.init();

}

// 轮播器对象原型
Carousel.prototype = {
  // 轮播初始化
  init: function () {
    var con = $(this.el);
    // 1.首先将所有的图片都导进轮播容器中
    var htmlStr = '';
    for (var i in this.imgs) {
      htmlStr += "<li class=\"carou-list-item\"><a href=\"###\" class=\"link\"><img src=\"" + this.imgs[i] + "\" alt=\"\"></a></li>";
    }
    con.html(htmlStr);

    // 2.初始化轮播下标
    this.index = 0;

    // 3.初始化轮播状态
    this.isSwipe = true;

    // 4. 初始化clickAni
    this.isRunning = false;

    // 5.对轮播器中的图片的定位进行初始化
    this.adapt();
  },
  // 调整轮播图位置
  adapt: function () {
    var imgs = Array.prototype.slice.call(document.getElementsByClassName('carou-list-item'));
    var distance = $('.carousel').eq(0).width();
    var index = this.index;

    for (var i in imgs) {
      i === '' + index ? $(imgs[i]).css('left', 0) : $(imgs[i]).css('left', distance + 'px');
    }
  },
  // 轮播动画
  animation: function () {
    var imgs = Array.prototype.slice.call(document.getElementsByClassName('carou-list-item'));
    var distance = $('.carousel').eq(0).width();
    var self = this;

    if (this.isSwipe && !this.isRunning) {
      this.isRunning = true;

      // 1.对当前轮播向左移出
      $(imgs[this.index]).animate({
        left: (-distance) + 'px'
      }, 1000, function () {
        $(imgs[self.index]).css('left', distance + 'px');
      });
      // 2.将后一张轮播向左移进
      var i = (this.index + 1) % imgs.length;
      $(imgs[i]).animate({
        left: 0
      }, 1000, function () {
        self.index = i;
        self.isRunning = false;
      });
    }
  },
  // 向左的动画
  leftAni: function () {
    var imgs = Array.prototype.slice.call(document.getElementsByClassName('carou-list-item'));
    var distance = $('.carousel').eq(0).width();
    var self = this;

    if (!this.isRunning) {
      this.isRunning = true;

      // 1.对当前轮播向左移出
      $(imgs[this.index]).animate({
        left: (-distance) + 'px'
      }, 1000, function () {
        $(imgs[self.index]).css('left', distance + 'px');
      });
      // 2.将后一张轮播向左移进
      var i = (this.index + 1) % imgs.length;
      $(imgs[i]).animate({
        left: 0
      }, 1000, function () {
        self.index = i;
        self.isRunning = false;
      });
    }
  },
  // 向右的动画
  rightAni: function () {
    var imgs = Array.prototype.slice.call(document.getElementsByClassName('carou-list-item'));
    var distance = $('.carousel').eq(0).width();
    var self = this;

    if (!this.isRunning) {
      this.isRunning = true;

      // 1.对当前轮播向右移出
      $(imgs[this.index]).animate({
        left: distance + 'px'
      }, 1000, function () {
        // $(imgs[self.index]).css('left', distance + 'px');
      });
      // 2.将后一张轮播向右移进
      var i = this.index === 0 ? imgs.length - 1 : this.index - 1;
      $(imgs[i]).css('left', (-distance) + 'px');
      $(imgs[i]).animate({
        left: 0
      }, 1000, function () {
        self.index = i;
        self.isRunning = false;
      });
    }

  },
  // 暂停动画
  stop: function () {
    this.isSwipe = false;
  },
  // 重新开始轮播
  restart: function () {
    this.isSwipe = true;
  },
  // 开始轮播
  start: function () {
    this.animateFlag = setInterval(this.animation.bind(this), (this.timeSpace + 2) * 1000);
  }
}