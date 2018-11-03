/**
 * 
 * @param {*} setting 
 * setting配置=>
 * el:轮播器容器
 * imgs:图片列表
 * isDrag:是否拖动
 * 轮播间隔timeCell：单位s
 * boxWidth:图片框的宽度
 * boxHeight:图片框的高度
 */
function carousel(setting) {
  let imgObjs = [];
  let ele = setting.el; //轮播器容器
  let imgUrls = setting.imgs; //轮播器图片列表
  let drag = setting.isDrag; //是否进行轮播器的拖动
  let timeInterval = setting.timeCell; //轮播间隔
  let width = setting.boxWidth; //图片宽度
  let height = setting.boxHeight; //图片高度
  let fragment = document.createDocumentFragment(); //初始化片段

  //设置容器的宽高
  ele.style.width = 2.2 * width + 'px';
  ele.style.height = height + 'px';
  ele.style.position = 'relative';
  ele.style.marginTop = 0.5 * height + 'px';
  ele.style.marginBottom = 0.5 * height + 'px';

  // 当前轮播图片index标记
  let index = 0;

  //将轮播图片添加至容器中
  for(let i = 0; i < imgUrls.length; i++) {
    let imgTemp = document.createElement('img');
    imgTemp.onload = function() {
      // 当前图片的宽高比
      let scale = imgTemp.width / imgTemp.height;
      // 这里用两个临时变量来保存imgTemp的width属性和height属性
      let tempWidth = imgTemp.width;
      let tempHeight = imgTemp.height;
      //当图片的宽高比大于设置的图片标准宽高比
      if(scale > width / height) {
        let widthScale = width / tempWidth;
        imgTemp.style.width = width + 'px';
        imgTemp.style.height = tempHeight * widthScale + 'px'; 
        //获取上下空隙
        let space = (height - parseFloat(imgTemp.style.height)) / 2;
        imgTemp.style.paddingTop = space + 'px';
        imgTemp.style.paddingBottom = space + 'px';
        return;
      }
      //当图片的宽高比大于设置的图片标准宽高比
      let heightScale = height / tempHeight;
      imgTemp.style.height = height + 'px';
      imgTemp.style.width = tempWidth * heightScale + 'px';
      let space = (width - parseFloat(imgTemp.style.width)) / 2;
      imgTemp.style.paddingLeft = space + 'px';
      imgTemp.style.paddingRight = space + 'px';
      // 当所有图片都加载完毕时，先对所有图片进行一次初始化调整布局
      if (i === imgUrls.length - 1) {
        action(imgObjs, index, width, height);
      }
    }
    imgTemp.className = 'carouselImg';
    imgTemp.src = imgUrls[i];
    imgObjs.push(imgTemp);
    fragment.appendChild(imgTemp);
  }
  ele.appendChild(fragment);

  //调整轮播图片
  function adjustment(img, num, width, height) {
    if(parseFloat(img.style.width) / parseFloat(img.style.height) > width / height) {
      let widthScale = (num * width) / parseFloat(img.style.width);
      img.style.width = num * width + 'px';
      img.style.height = (parseFloat(img.style.height) * widthScale) + 'px';
      let space = (num * height - parseFloat(img.style.height)) / 2;
      img.style.paddingTop = space + 'px';
      img.style.paddingBottom = space + 'px';
    } else {
      let heightScale = (num * height) / parseFloat(img.style.height);
      img.style.width = (parseFloat(img.style.width) * heightScale) + 'px';
      img.style.height = num * height + 'px';
      let space = (num * width - parseFloat(img.style.width)) / 2;
      img.style.paddingLeft = space + 'px';
      img.style.paddingRight = space + 'px';
    }
  }

  //轮播效果
  function action(imgObjs, index, width, height) {
    let pre = index == 0 ? imgObjs.length - 1 : index - 1;
    let behi = index == imgObjs.length - 1 ? 0 : index + 1;
    //调整当前轮播
    adjustment(imgObjs[index], 1.2, width, height);
    imgObjs[index].style.left = (0.5 * width) + 'px';
    imgObjs[index].style.top = -(0.1 * height) + 'px';
    imgObjs[index].style.zIndex = 1;
    imgObjs[index].style.opacity = 1;
    //调整前一轮播
    adjustment(imgObjs[pre], 1, width, height);
    imgObjs[pre].style.left = 0 + 'px';
    imgObjs[pre].style.top = 0 + 'px';
    imgObjs[pre].style.zIndex = 0;
    imgObjs[pre].style.opacity = 0.5;
    //调整后一轮播
    adjustment(imgObjs[behi], 1, width, height);
    imgObjs[behi].style.left = (1.2 * width) + 'px';
    imgObjs[behi].style.top = 0 + 'px';
    imgObjs[behi].style.zIndex = 0;
    imgObjs[behi].style.opacity = 0.5;

    for(let i in imgObjs) {
      if(i != index && i != pre && i != behi) {
        imgObjs[i].style.opacity = 0;
      }
    }
  }

  //定时器轮播
  setInterval(function() {
    index = (index + 1) % imgObjs.length;
    action(imgObjs, index, width, height);
  }, timeInterval * 1000);

  //设置轮播拖动
  // if(drag) {
  //   for(let i in imgObjs) {
  //     if()
  //   }
  // }
}