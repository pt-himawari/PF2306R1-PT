function rectangularArea() {
  let inputWidth = prompt("Enter the width");
  let inputHeight = prompt("Enter the height");
  let width = parseInt(inputWidth);
  let height = parseInt(inputHeight);
  let area = height * width;
  document.write("The area is: " + area);
}
function inputDateofBirth() {
  let year = parseInt(prompt("Enter Year of Birth :"));
  let month = parseInt(prompt("Enter Month of Birth :"));
  let day = parseInt(prompt("Enter Day of Birth :"));
  document.write("<h2> " + day + "-" + month + "-" + year + "</h2> ");
}
function circumferenceAreaCircle() {
  let r = parseFloat(prompt("Enter radius:"));
  const PI = 3.14;
  let c = 2 * r * PI;
  let s = r * r * PI;

  document.write("<h2>Chu Vi Hình Tròn : " + c + "</h2> ");
  document.write("<h2>Diện Tích Hình Tròn : " + s + "</h2> ");
}
function bankInterestRate() {
  let amount = parseFloat(prompt("Nhập vào số tiền gửi tiết kiệm:"));
  let interest = parseFloat(
    prompt("Nhập vào số lãi xuât gửi tiết kiệm hàng năm:")
  );
  let year = parseInt(prompt("Nhập vào số năm gửi tiết kiệm: "));
  let oneYear = (amount * interest) / 100;
  let total = amount + year * oneYear;
  document.write(
    "<h2>Số tiền sẽ nhận được sau " +
      year +
      " : " +
      total +
      " (triệu đồng)</h2> "
  );
}
// content of the letter
function contentOfTheLetter() {
  let name = prompt("Nhập vào tên người nhận :");
  let add = prompt("Nhập vào Địa Điểm:");
  let day = prompt("Nhập và ngày:");
  let month = prompt("Nhập vào tháng :");
  let year = prompt("Nhập Năm :");

  document.write(
    "<i>&quot" +
      name +
      " thương nhớ,<br/><br/>Em không biết phải nói sao để anh hiểu rằng, em nhớ anh thật nhiều. Em yêu anh đến khi trái tim này tan thành nghìn mảnh. Tất cả những gì em yêu thương, em khát khao và cần đến, chính là anh, mãi mãi về sau. Em chỉ muốn ở bên anh, và anh yêu hỡi, em sẽ trở thành người phụ nữ như anh mong muốn.<br/><br/>Có phải em thật tệ hại, khi cứ nghĩ đến anh thật nhiều, thật lâu và nhất là mỗi khi đêm xuống? Em hứa sẽ sẽ cố gắng triệu triệu lần hơn thế. Nhưng hơn tất cả, em chỉ mong một ngày nào đó, anh sẽ tự hào về em, như tự hào về vợ của anh, và mẹ của các con anh (ít nhất là 2 nhé, em vừa mới quyết định đấy!). Em nhớ thật nhiều cảm giác mỗi đêm anh ôm em và ru em ngủ trong vòng tay. Đêm nay, em chỉ muốn được gần bên anh… và anh biết không, trái tim em đang đau đớn đến nhường nào.<br/><br/>Anh yêu thương, đừng bao giờ rời xa em nữa nhé. Yêu anh rất nhiều.<br/><br/>" +
      add +
      ", Ngày " +
      day +
      " Tháng " +
      month +
      " Năm " +
      year +
      ".&quot</I>"
  );
}
