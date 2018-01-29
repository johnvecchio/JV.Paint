const canvas = document.querySelector('.drawspace');
const sliderSize = document.querySelector('.slider-size');
const sliderLite = document.querySelector('.slider-lite');
const sliderColor = document.querySelector('.slider-color');
const navBar = document.querySelector('.nav-bar');
const rainbtn = document.querySelector('.btn-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = sliderSize.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = sliderColor.value;
let direction = true;
let lightness = sliderLite.value;
let rainbowOn = false;


function draw(e) {
	if (!isDrawing) return; // stop the fn from running when they are not moused down
	ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
	ctx.beginPath();
	// start from
	ctx.moveTo(lastX, lastY);
	// go to
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
	
	if (rainbowOn) {
		rainbow();	
	}
	

	// changeNavColor();
}

function rainbow() {
	hue++;
	
	if (hue >= 360) {
		hue = 0;
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function turnRainbow() {
	if (rainbowOn) {
		rainbowOn = false;
		rainbtn.innerText = "Rainbow OFF";
	} else {
		rainbowOn = true;
		rainbtn.innerText = "Rainbow ON";
	}

}

function changeNavColor() {
	navBar.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('click', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

sliderSize.addEventListener('change', () => {
	ctx.lineWidth = sliderSize.value; 
	changeNavColor();
});
sliderLite.addEventListener('change', () => {
	lightness = sliderLite.value;
	changeNavColor();
});
sliderColor.addEventListener('change', () => {
	hue = sliderColor.value;
	changeNavColor();
});

setInterval(changeNavColor, 100);

