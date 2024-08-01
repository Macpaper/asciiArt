const canv = document.querySelector("canvas")
const ctx = canv.getContext('2d')

canv.width = window.innerWidth;
canv.height = window.innerHeight;

const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";
const body = document.querySelector("body");

const img = new Image(100, 100);
img.src = "dog.jpg";
let strArr = [];

img.addEventListener("load", () => {
  canv.width = img.width;
  canv.height = img.height;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.drawImage(img, 0, 0, canv.width, canv.height);

  const imageData = ctx.getImageData(0, 0, canv.width, canv.height);
  let sum = 0;
  let str = "";
  for (let i = 0; i < imageData.data.length; i += 4) {
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];
    let a = imageData.data[i + 3];
    sum += r;
    sum += g;
    sum += b;
    let ratio = sum / 765;
    // console.log(Math.floor((density.length - 1) * ratio))
    let asc = density[Math.floor((density.length - 1) * ratio)]
    if (!asc) asc = density[0];
    str += asc;
    sum = 0;
    if (i % (canv.width * 4) == 0) {
      strArr.push(str);
      str = "";
    }
  }
  drawStr();
  strArr = [];
});

function drawStr() {
  let el = document.createElement('div')
  for (let arr of strArr) {
    let p = document.createElement('p')
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == ' ') {
        p.innerText += '\u00a0'
      } else {
        p.innerText += arr[i]
      }
    }
    el.appendChild(p)
  }
  body.insertBefore(el, body.firstChild);
}


function update() {

}