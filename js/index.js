$(function (canv, particleSize = 4, particleCount = 400, interval = 200, W = window.innerWidth, H = window.innerHeight) {

    var W, H, canvas, ctx, particles = [];
    
        W = W
        H = H
        var canvas = canv;
        canvas.width = W;
        canvas.height = H;
        
    canvas = $("#canvasOne").get(0);
        canvas.width = W;
        canvas.height = H;
    
    ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "lighter";
    
        var mouse = {
          x: 0, 
          y: 0,
          rx:0,
          ry:0
        };
        
    var counter = 0;
                
    function randomNorm(mean, stdev) {
                    
    return Math.abs(Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*stdev)+mean;
    }
    
    
    function Particle() {
    //---------------------- PARTICLE COLORS
    this.h = parseInt( 180, 10);
    this.s = parseInt( 100 * Math.random() + 30, 10);
    this.l = parseInt( 50 * Math.random() + 30, 10);
    this.a = .7 * Math.random();
    
    this.color = "hsla("+ this.h +","+ this.s +"%,"+ this.l +"%,"+(this.a)+")";
    this.shadowcolor = "hsla("+ this.h +","+ this.s +"%,"+ this.l + "%," + parseFloat(this.a-0.55)+")";
    //--------------------------------------                
    
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.direction = {
         "x": -1 + Math.random() * 2,
         "y": -1 + Math.random() * 2
    };
    
    this.radius=randomNorm(0,particleSize);
    this.scale=0.7*Math.random()+0.5;
    this.rotation=Math.PI/4*Math.random();
          
    this.grad=ctx.createRadialGradient( this.x, this.y, this.radius, this.x, this.y, 0 );
    
      this.grad.addColorStop(0,this.color);
      this.grad.addColorStop(1,this.shadowcolor);
          
      this.vx = (2 * Math.random() + 4)*.01*this.radius;
      this.vy = (2 * Math.random() + 4)*.01*this.radius;
            
    this.valpha = 0.01*Math.random()-0.02;
            
    this.move = function () {
    this.x += this.vx * this.direction.x;
    this.y += this.vy * this.direction.y;
    this.rotation+=this.valpha;
    };
    
    this.changeDirection = function (axis) {
                this.direction[axis] *= -1;
                this.valpha *= -1;
            };
            this.draw = function () {
                ctx.save();
                ctx.translate(this.x+mouse.rx/-20*this.radius,this.y+mouse.ry/-20*this.radius);  
              ctx.rotate(this.rotation);  
              ctx.scale(1,this.scale);
                
                this.grad=ctx.createRadialGradient( 0, 0, this.radius, 0, 0, 0 );
                this.grad.addColorStop(1,this.color);
                this.grad.addColorStop(0,this.shadowcolor);
                ctx.beginPath();
                ctx.fillStyle = this.grad;
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.restore();
       
            };
    this.boundaryCheck = function () {
                if (this.x >= W*1.2) {
                    this.x = W*1.2;
                    this.changeDirection("x");
                } else if (this.x <= -W*0.2) {
                    this.x = -W*0.2;
                    this.changeDirection("x");
                }
                if (this.y >= H*1.2) {
                    this.y = H*1.2;
                    this.changeDirection("y");
                } else if (this.y <= -H*0.2) {
                    this.y = -H*0.2;
                    this.changeDirection("y");
                }
            };
        }
    
        function clearCanvas() {
            ctx.clearRect(0, 0, W, H);
        }
    
        function createParticles() {
            for (var i = particleCount - 1; i >= 0; i--) {
                p = new Particle();
                particles.push(p);
            }
        }
        function drawParticles() {
            for (var i = particleCount - 1; i >= 0; i--) {
                p = particles[i];
                p.draw();
            }
    
          
        }
    
        function updateParticles() {
            for (var i = particles.length - 1; i >= 0; i--) {
                p = particles[i];
                p.move();
                p.boundaryCheck();
    
            }
        }
    
        function initParticleSystem() {
            createParticles();
            drawParticles();
        }
    
        function animateParticles() {
            clearCanvas();
            setDelta();
            update()
            drawParticles();
            updateParticles();
            requestAnimationFrame(animateParticles);
        }
      
        initParticleSystem();
        requestAnimationFrame(animateParticles);
      
        function setDelta() {  
          this.now    =   (new Date()).getTime();  
          mouse.delta  =   (this.now-this.then)/1000;  
          this.then   =   this.now;  
        }
        function update() {  
     
        if(isNaN(mouse.delta) || mouse.delta <= 0) { return; }  
     
        var distX   =   mouse.x - (mouse.rx),  
            distY   =   mouse.y - (mouse.ry);  
    
        if(distX !== 0 && distY !== 0) {          
     
            mouse.rx -=  ((mouse.rx - mouse.x) / mouse.speed); 
            mouse.ry -=  ((mouse.ry - mouse.y) / mouse.speed); 
             
        }   
      
    };  
    
    });
    
    
    
    
    
    // ----------------------- FIREFLIES
    
    
    
    
    (function(w) { var canvas, ctx;
    
                  var pen_size = 30;
                  var canvas_width = 1700;
                  var canvas_height = 1000;
                  
                  var resolution = 50;
                  var num_cols = canvas_width / resolution;
                  var num_rows = canvas_height / resolution;
                  
                  var mouse = {
                    x: 0,
                    y: 0,
                    px: 0,
                    py: 0,
                    down: false
                  };
    
    // ----------------------- NUMBER OF PARTICLES
    
                  var speck_count = 2000;
    
                  var vec_cells = [];
                  var particles = [];
    
                  function update_particle() {
    
                    for (i = 0; i < particles.length; i++) {
    
                      var p = particles[i];
    
                      if (p.x >= 0 && p.x < canvas_width && p.y >= 0 && p.y < canvas_height) {
                        var col = parseInt(p.x / resolution);
                        var row = parseInt(p.y / resolution);
                        var cell_data = vec_cells[col][row];
                        var ax = (p.x % resolution) / resolution;
                        var ay = (p.y % resolution) / resolution;
    
                        p.xv += (1 - ax) * cell_data.xv * 0.05;
                        p.yv += (1 - ay) * cell_data.yv * 0.05;
                        p.xv += ax * cell_data.right.xv * 0.05;
                        p.yv += ax * cell_data.right.yv * 0.05;
    
                        p.xv += ay * cell_data.down.xv * 0.05;
                        p.yv += ay * cell_data.down.yv * 0.05;
    
                        p.x += p.xv;
                        p.y += p.yv;
    
                        var dx = p.px - p.x;
                        var dy = p.py - p.y;
    
                        var dist = Math.sqrt(dx * dx + dy * dy);
    
                        var limit = Math.random() * 0.5;
    
                        if (dist > limit) {
                          ctx.beginPath();
                          ctx.moveTo(p.x, p.y);
                          ctx.lineTo(p.px, p.py);
                          ctx.stroke();
                        }else{
                          ctx.beginPath();
                          ctx.moveTo(p.x, p.y);
                          ctx.lineTo(p.x + limit, p.y + limit);
                          ctx.stroke();
                        }
    
                        p.px = p.x;
                        p.py = p.y;
                      }
                      else {
    
                        p.x = p.px = Math.random() * canvas_width;
                        p.y = p.py = Math.random() * canvas_height;
                      }
                      
    // ----------------------- PARTICLE MOVEMENT SPEED
                      
                      p.xv *= 0.1;
                      p.yv *= 0.1;
                    }
                  }
    
                   function init() {
    
                    canvas = document.getElementById("fireFlies");
                    ctx = canvas.getContext("2d");
    
                    canvas.width = canvas_width;
                    canvas.height = canvas_height;
    
                    for (i = 0; i < speck_count; i++) {
    
                      particles.push(new particle(Math.random() * canvas_width, Math.random() * canvas_height));
                    }
    
                    for (col = 0; col < num_cols; col++) { 
    
                      vec_cells[col] = [];
    
                      for (row = 0; row < num_rows; row++) { 
    
                        var cell_data = new cell(col * resolution, row * resolution, resolution)
    
                        vec_cells[col][row] = cell_data;
                        vec_cells[col][row].col = col;
                        vec_cells[col][row].row = row;
                      }
                    }
    
                    for (col = 0; col < num_cols; col++) { 
    
                      for (row = 0; row < num_rows; row++) { 
    
                        var cell_data = vec_cells[col][row];
                        var row_up = (row - 1 >= 0) ? row - 1 : num_rows - 1;
                        var col_left = (col - 1 >= 0) ? col - 1 : num_cols - 1;
                        var col_right = (col + 1 < num_cols) ? col + 1 : 0;
                        var up = vec_cells[col][row_up];
                        var left = vec_cells[col_left][row];
                        var up_left = vec_cells[col_left][row_up];
                        var up_right = vec_cells[col_right][row_up];
    
                        cell_data.up = up;
                        cell_data.left = left;
                        cell_data.up_left = up_left;
                        cell_data.up_right = up_right;
    
                        up.down = vec_cells[col][row];
                        left.right = vec_cells[col][row];
                        up_left.down_right = vec_cells[col][row];
                        up_right.down_left = vec_cells[col][row];
                      }
                    }  
    
                    w.addEventListener("mousedown", mouse_down_handler);
                    w.addEventListener("touchstart", mouse_down_handler);
    
                    w.addEventListener("mouseup", mouse_up_handler);
                    w.addEventListener("touchend", touch_end_handler);
    
                    canvas.addEventListener("mousemove", mouse_move_handler);
                    canvas.addEventListener("touchmove", touch_move_handler);
    
                    w.onload = draw;
                  }
                  
                  function draw() {
    
                    var mouse_xv = mouse.x - mouse.px;
                    var mouse_yv = mouse.y - mouse.py;
    
                    for (i = 0; i < vec_cells.length; i++) {
                      var cell_datas = vec_cells[i];
    
                      for (j = 0; j < cell_datas.length; j++) {
    
                        var cell_data = cell_datas[j];
                        if (mouse.down) {
                          change_cell_velocity(cell_data, mouse_xv, mouse_yv, pen_size);
                        }
    
                        update_pressure(cell_data);
                      }
                    }
    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // -------------------------- COLOR OF PARTICLES
    
                    ctx.strokeStyle = "#00fffa";
    
                    update_particle();
    
                    for (i = 0; i < vec_cells.length; i++) {
                      var cell_datas = vec_cells[i];
    
                      for (j = 0; j < cell_datas.length; j++) {
                        var cell_data = cell_datas[j];
    
                        update_velocity(cell_data);
    
                      }
                    }
    
                    mouse.px = mouse.x;
                    mouse.py = mouse.y;
    
                    requestAnimationFrame(draw);
    
                  }
    
                  function change_cell_velocity(cell_data, mvelX, mvelY, pen_size) {
    
                    var dx = cell_data.x - mouse.x;
                    var dy = cell_data.y - mouse.y;
                    var dist = Math.sqrt(dy * dy + dx * dx);
    
                    if (dist < pen_size) {
    
                      if (dist < 100) {
                        dist = pen_size;
                      }
    
                      var power = pen_size / dist;
    
                      cell_data.xv += mvelX * power;
                      cell_data.yv += mvelY * power;
                    }
                  }
    
                  function update_pressure(cell_data) {
    
                    var pressure_x = (
                      cell_data.up_left.xv * 0.5
                      + cell_data.left.xv
                      + cell_data.down_left.xv * 0.5
                      - cell_data.up_right.xv * 0.5
                      - cell_data.right.xv
                      - cell_data.down_right.xv * 0.5
                    );
    
                    var pressure_y = (
                      cell_data.up_left.yv * 0.5
                      + cell_data.up.yv
                      + cell_data.up_right.yv * 0.5
                      - cell_data.down_left.yv * 0.5
                      - cell_data.down.yv
                      - cell_data.down_right.yv * 0.5
                    );
    
                    cell_data.pressure = (pressure_x + pressure_y) * 0.25;
                  }
    
                  function update_velocity(cell_data) {
    
                    cell_data.xv += (
                      cell_data.up_left.pressure * 0.5
                      + cell_data.left.pressure
                      + cell_data.down_left.pressure * 0.5
                      - cell_data.up_right.pressure * 0.5
                      - cell_data.right.pressure
                      - cell_data.down_right.pressure * 0.5
                    ) * 0.25;
    
                    cell_data.yv += (
                      cell_data.up_left.pressure * 0.5
                      + cell_data.up.pressure
                      + cell_data.up_right.pressure * 0.5
                      - cell_data.down_left.pressure * 0.5
                      - cell_data.down.pressure
                      - cell_data.down_right.pressure * 0.5
                    ) * 0.25;
    
                    cell_data.xv *= 0.99;
                    cell_data.yv *= 0.99;
                  }
    
                  function cell(x, y, res) {
    
                    this.x = x;
                    this.y = y;
    
                    this.r = res;
    
                    this.col = 0;
                    this.row = 0;
    
                    this.xv = 0;
                    this.yv = 0;
    
                    this.pressure = 0;
                  }
    
                  function particle(x, y) {
                    this.x = this.px = x;
                    this.y = this.py = y;
                    this.xv = this.yv = 0;
                  }
    
                  function mouse_down_handler(e) {
                    e.preventDefault();
                    mouse.down = true;
                  }
       
                  function mouse_up_handler() {
                    mouse.down = false; 
                  }
    
                  function touch_end_handler(e) {
                    if (!e.touches) mouse.down = false;
                  }
    
                  function mouse_move_handler(e) {
    
                    mouse.px = mouse.x;
                    mouse.py = mouse.y;
                    
                    mouse.x = e.offsetX || e.layerX;
                    mouse.y = e.offsetY || e.layerY;
                  }
    
                  function touch_move_handler(e) {        
                    mouse.px = mouse.x;
                    mouse.py = mouse.y;
    
                    var rect = canvas.getBoundingClientRect();
    
                    mouse.x = e.touches[0].pageX - rect.left;
                    mouse.y = e.touches[0].pageY - rect.top;
                  }
    
                  w.Fluid = {
                    initialize: init
                  }
    
                 }(window));
    
    Fluid.initialize();
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
let question = document.querySelectorAll(".question");

question.forEach((qsitem) => {
  qsitem.addEventListener("click", function (e) {
    //   store the .answer div containing the answer
    let sibling = qsitem.nextElementSibling;

    // Nested loop for removing active class from all and set answer height to 0
    question.forEach((item) => {
      item.nextElementSibling.style.height = "0px";
      //   remove class "active" except for the currently clicked item
      item != qsitem && item.parentNode.classList.remove("active");
    });
    //then toggle the "active" class of clicked item's parent ".qna"
    this.parentNode.classList.toggle("active");

    // set actual height for .answer div if .qna has the class "active"
    if (qsitem.parentNode.classList.contains("active")) {
      sibling.style.height = sibling.scrollHeight + "px";
    } else {
      sibling.style.height = "0px";
    }
  });
});
let city = document.querySelector('.Header_nav_list-city_link')
let cityMenu = document.querySelector('.Header_nav_city_container')
let cityMobile=document.querySelector('.Header_nav_list-city-mobile')
let cityMenuMobile=document.querySelector('.Header_nav_city_container-mobile')
let burgerMenu = document.querySelector('.Header_nav_mobile_List')
let toggle = document.querySelector("#toggle")
let header = document.querySelector('.Header_container')
let societyMobile = document.querySelector('.Header_social-mobile')
const headerContainer = document.querySelector(".Header")

// Open and Close City menu
const openCityMenu = () => {
    city.classList.toggle('Header_nav_list-city-db')
    cityMenu.classList.toggle('db')
}

// Open and Close City menu mobile version
const openCityMenuMobile = () => {
    cityMobile.classList.toggle('Header_nav_list-city-db-mobile')
    // burgerMenu.classList.toggle('pd147')
    cityMenuMobile.classList.toggle('db')
    // societyMobile.classList.toggle('b110')
}

// Closing of Hamburger
const deleteBurgerMenu = () => {
    burgerMenu.classList.add("dn")
    toggle.checked = false
    burgerMenu.classList.remove("dn")
}
