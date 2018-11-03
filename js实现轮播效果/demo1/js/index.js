window.onload = function() {
  var box = document.getElementById('carouselBox');
  var setting = {
    el: box,
    imgs: ['imgs/1.jpg', 'imgs/2.jpg', 'imgs/3.jpg', 'imgs/4.jpg', 'imgs/5.jpg'],
    isDrag: true,
    timeCell: 3,
    boxWidth: 200,
    boxHeight: 100
  }
  carousel(setting);
}