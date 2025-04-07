let circles = [];
let sakura = []; // 用於存放櫻花的陣列
let colorChangeSpeed = 0.005; // 顏色變化速率

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffcad4");

  // Generate 40 circles with random positions, sizes, and pastel colors
  for (let i = 0; i < 40; i++) {
    let circle = {
      x: random(width),
      y: random(height),
      size: random(30, 50),
      colorStart: color(random(200, 255), random(200, 255), random(200, 255)), // 起始顏色
      colorEnd: color(random(200, 255), random(200, 255), random(200, 255)),   // 結束顏色
      t: 0 // 用於控制漸變進度
    };
    circles.push(circle);
  }

  // Generate 50 sakura petals with random positions and speeds
  for (let i = 0; i < 50; i++) {
    let petal = {
      x: random(width),
      y: random(-height, 0), // 初始位置在畫布上方
      size: random(10, 20),
      speed: random(1, 3), // 下落速度
      sway: random(0.5, 1.5) // 左右擺動幅度
    };
    sakura.push(petal);
  }
}

function draw() {
  background("#ffcad4");

  // Update and draw each circle
  for (let circle of circles) {
    // 計算漸變顏色
    circle.t += colorChangeSpeed; // 漸變進度增加
    if (circle.t > 1) {
      circle.t = 0; // 重置漸變進度
      circle.colorStart = circle.colorEnd; // 將結束顏色設為新的起始顏色
      circle.colorEnd = color(random(200, 255), random(200, 255), random(200, 255)); // 生成新的結束顏色
    }
    let currentColor = lerpColor(circle.colorStart, circle.colorEnd, circle.t);

    let sizeVariation = map(mouseX, 0, width, 20, 80); // Map mouseX to size variation
    let newSize = circle.size + sizeVariation;

    fill(currentColor); // 使用漸變顏色
    noStroke();
    ellipse(circle.x, circle.y, newSize);
  }

  // Update and draw each sakura petal
  for (let petal of sakura) {
    petal.y += petal.speed; // 下落
    petal.x += sin(frameCount * 0.05) * petal.sway; // 左右擺動

    // 如果櫻花超出畫布，重置到畫布上方
    if (petal.y > height) {
      petal.y = random(-50, 0);
      petal.x = random(width);
    }

    fill("#ffe5ec"); // 櫻花顏色 (淡粉色)
    noStroke();
    ellipse(petal.x, petal.y, petal.size, petal.size * 0.8); // 橢圓形模擬花瓣
  }
}
