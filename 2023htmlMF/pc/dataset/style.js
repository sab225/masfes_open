const circleWrap = document.querySelector(".circle-wrap");
const circleItem = document.querySelectorAll(".circle-item");
const circleItemLength = circleItem.length;
const spaceRatio = 1.4; // 要素同士の感覚比率
const deg = 360.0 / circleItemLength;
const red = (deg * Math.PI) / 180.0;
let xArray = [];
let maxDiameter;
 
window.addEventListener("load", function () {
  circleItem.forEach(function (elem, index) {
    setCircle(elem, index);
  });
});
 
window.addEventListener("resize", function () {
  xArray = [];
  circleItem.forEach(function (elem, index) {
    setCircle(elem, index);
  });
});
 
function setCircle(item, number) {
  deviceWidth = window.innerWidth;
  const circleR = item.offsetWidth * spaceRatio;
  const x = Math.cos(red * number) * circleR + circleR;
  const y = Math.sin(red * number) * circleR + circleR;
  item.style.left = x + "px";
  item.style.top = y + "px";
  const circleWidth = document.defaultView.getComputedStyle(item, null).width;
  const circleLeft = document.defaultView.getComputedStyle(item, null).left;
  const circleWidthNum = Number(parseFloat(circleWidth));
  const circleLeftNum = Number(parseFloat(circleLeft));
  xArray.push(circleLeftNum);
  // Math.max Math.min は複数の数値を比較できるが配列を比較できないためスプレッド構文で渡す
  const maxLeft = Math.max(...xArray);
  maxDiameter = maxLeft + circleWidthNum;
  circleWrap.style.width = maxDiameter + "px";
  circleWrap.style.height = maxDiameter + "px";
  if (deviceWidth < maxDiameter) {
    const dif = (deviceWidth - maxDiameter) / 2;
    circleWrap.style.left = dif + "px";
  }
}