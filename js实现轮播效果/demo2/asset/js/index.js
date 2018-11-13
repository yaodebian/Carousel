// 判断某个元素是否为指定元素的子元素或本身
jQuery.fn.isChildAndSelfOf = function (b) {
  return (this.closest(b).length > 0);
};

$(document).ready(function () {

  // 1. 初始化轮播定位器宽度
  var carousel = $('.carousel').eq(0);
  carousel.height(carousel.width());

  // 2. 初始化轮播适应
  adaptCarou();

  // 3. 初始化轮播图
  var options = {
    el: document.getElementsByClassName('carou-list')[0],
    imgs: [
      './asset/imgs/1_1.jpg',
      './asset/imgs/2_2.jpg',
      './asset/imgs/3_3.jpg',
      './asset/imgs/4_4.jpg',
      './asset/imgs/5_5.jpg',
    ],
    timeSpace: 3
  };
  var carou = new Carousel(options);

  // 4.开始轮播
  carou.start();

  // 5. 绑定轮播的hover暂停事件
  carousel.mouseenter(function (e) {
    var claName = e.target.className;
    var reg = /(search)|(^s-)/;
    if (!reg.test(claName)) {
      carou.stop();
    }
  })

  // 判断是否是有效的mouseout触发
  function checkUsefulAction(e) {
    var target = e.target;
    var relatedTarget = e.relatedTarget;
    var claName = target ? target.className : null;
    var relaClaName = relatedTarget ? relatedTarget.className : null;
    var reg = /(search)|(^s-)/;

    if (!reg.test(claName)) {
      if (relatedTarget === null || !$(relatedTarget).isChildAndSelfOf('.carousel') || reg.test(relaClaName)) {
        return true;
      }
    } else {
      if (!reg.test(relaClaName) && $(relatedTarget).isChildAndSelfOf('.carousel')) {
        return false;
      }
      return 'not useful';
    }
  }

  carousel.mouseout(function (e) {
    var res = checkUsefulAction(e);

    if (res === true) {
      carou.restart();
      return;
    }
    if (res === false) {
      carou.stop();
      return;
    }
    return;

  })

  // 6. 绑定箭头点击切换轮播
  var leftIcon = $('.left-icon').eq(0);
  var rightIcon = $('.right-icon').eq(0);
  leftIcon.click(function () {
    carou.leftAni();
  });
  rightIcon.click(function () {
    carou.rightAni();
  });
  // 绑定箭头显示
  var leftBody = $('.leftBody').eq(0);
  var rightBody = $('.rightBody').eq(0);
  leftBody.mouseenter(function () {
    leftIcon.animate({
      opacity: 1
    }, 'fast');
  })
  leftBody.mouseleave(function () {
    leftIcon.animate({
      opacity: 0
    }, 'fast');
  })
  rightBody.mouseenter(function () {
    rightIcon.animate({
      opacity: 1
    }, 'fast');
  })
  rightBody.mouseleave(function () {
    rightIcon.animate({
      opacity: 0
    }, 'fast');
  })

  // 7. 轮播定位器宽度随窗口宽度的变化而变化,同时调整轮播的位置
  // 节流设置
  var winAdapt = throttle(function () {
    carousel.height(carousel.width());
    carou.adapt();
    adaptCarou();
  }, 200);
  $(window).resize(winAdapt);

})

// 轮播调整
function adaptCarou() {

  var headWidth = $('.headBox').eq(0).width();
  var carouWidth = $('.carousel').eq(0).width();
  var carouHeight = $('.carousel').eq(0).height() - 60 - $('.search').eq(0).height();
  var leftBody = $('.leftBody').eq(0);
  var rightBody = $('.rightBody').eq(0);
  // 设置左右两边箭头区的宽高
  leftBody.width(headWidth / 3);
  leftBody.height(carouHeight);
  rightBody.width(headWidth / 3);
  rightBody.height(carouHeight);
  // 左右两边箭头区到窗口边缘的距离
  var l_r_space = (carouWidth - headWidth) / 2;
  // 设置两边箭头区位置
  leftBody.css('left', l_r_space + 'px');
  rightBody.css('right', l_r_space + 'px');
  // 设置箭头位置
  var leftIcon = $('.left-icon').eq(0);
  var rightIcon = $('.right-icon').eq(0);
  var top = (carouHeight - leftIcon.height()) / 2;
  leftIcon.css({
    top: top + 'px',
    opacity: 0
  });
  rightIcon.css({
    top: top + 'px',
    opacity: 0
  });
  // 设置轮播文字位置
  var carouTag = $('.carou-tag');
  var tagTop = (carouHeight - carouTag.height()) / 2 + 60;
  carouTag.css('top', tagTop + 'px');

}
