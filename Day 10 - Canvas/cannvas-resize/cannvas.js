// HTML 5 Cannvas Piece
// 1 : Creating and resizing your cannvas
// 2 : drawing elements
// 3 : Animatting elements
// 4 : Interacting with elements

/*----------------------------------------------------------------*/
// cannvas chỉ là một khối hộp muốn vẽ gì ta phải dùng js để vẽ
// với một số hàm có sẵn
let canvas = document.querySelector("canvas");
// khung phủ hêt toàn bộ trình duyệt theo chiều cao và chiều dài
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// truy cập qua đối tượng Context để vẽ = '2d' hoặc 'WebGL' ( vẽ bằng 3D)
let c = canvas.getContext("2d");

// vẽ hình hộp fillRect(x: number, y: number, w: number, h: number)
let grd = c.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// hình thứ nhất tạo màu gradient
c.fillStyle = grd;
c.fillRect(0, 0, 100, 150);

// hình thứ 2 gắn màu trực tiếp
c.fillStyle = "rgba(255 ,0 ,0 ,0.5)";
c.fillRect(300, 200, 100, 150);

// hình thứ 2 gắn màu trực tiếp
c.fillStyle = "red";
c.fillRect(100, 200, 100, 150);

/*----------------------------------------------------------------*/
// Giải thích các hàm
// c.beginPath();
// bắt đầu một đường vẽ mới, trước khi vẽ bất kỳ hình dạng nào.
//Hàm này sẽ làm cho mọi đường vẽ tiếp theo trong đoạn mã không ảnh hưởng đến nhau.

// c.arc(95, 50, 40, 0, 2 * Math.PI);
//arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined)
// Góc bắt đầu của hình tròn (tính bằng radian). Trong trường hợp này, góc bắt đầu là 0, tức là bắt đầu từ phía dương trục x.
//2 * Math.PI: Góc kết thúc của hình tròn (tính bằng radian). Ở đây, 2 * Math.PI tương đương với 360 độ, tức là kết thúc tại một vòng tròn đầy đủ.
// c.stroke();
// Đây là một phương thức để vẽ đường viền của hình vẽ đã được định nghĩa trước đó.
//----------------------- Vẽ 1 hình tròn ---------------------------------
// Cách vẽ một hình tròn
// c.beginPath();
// c.arc(150, 60, 40, 0, 2 * Math.PI);
// c.strokeStyle = "red";
// c.stroke();
//----------------------- Vẽ n hình tròn ---------------------------------
// cách nhân chúng lên số lượng hình tròn qua vòng lặp
// for (let i = 0; i < 1000; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, 2 * Math.PI);
//   c.strokeStyle = "blue";
//   c.stroke();
// }

//----------------------- Cho chúng chuyển động ---------------------------------

// tạo hàm để cho chúng di chuyển
// let x = 200;
// let dx = 4; // vận tốc di chuyển theo trục x
// let y = 200;
// let dy = 4; // vận tốc di chuyển theo trục x
// let radius = 50;
// // let y = 200;
// function animateCircle() {
//   requestAnimationFrame(animateCircle);
//   c.clearRect(0, 0, innerWidth, innerHeight);
//   // Hàm clearRect() được sử dụng để xóa bỏ hình vẽ hiện tại trên phần tử Canvas
//   // để chuẩn bị vẽ các hình vẽ mới. Bằng cách xóa nội dung trước khi vẽ,
//   //chúng ta có thể tạo các hình ảnh động hoặc di chuyển hình vẽ một cách mượt mà mà không bị các hình vẽ cũ giữ lại.
//   c.beginPath();
//   c.arc(x, y, radius, 0, 2 * Math.PI);
//   c.strokeStyle = "red";
//   c.stroke();

//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }
//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }
//   x += dx;
//   y += dy;
//   //   y++;
//   //   console.log("afd");
// }
// animateCircle();

//----------------------- Tạo đối tượng Circle ---------------------------------
let colorArray = [
  "#2ecc71",
  "#f39c12",
  "#1abc9c",
  "#74b9ff0",
  "#e84393",
  "#a29bfe",
  "#2d3436",
];

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    // c.strokeStyle = "red";
    // c.stroke();
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}
// let circle = new Circle(300, 300, 3, 3, 40);
// đưa đối tượng hình tròn đã tạo vào một mảng
let circleArray = [];
for (let i = 0; i < 200; i++) {
  let radius = Math.floor(Math.random() * 40);
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  //   Circle.update();
}
animateCircle();
