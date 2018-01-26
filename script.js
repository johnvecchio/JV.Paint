const canvas = document.querySelector('.drawspace');
const sliderSize = document.querySelector('.slider-size');
const sliderLite = document.querySelector('.slider-lite');
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
let hue = 0;
let direction = true;
let lightness = 50;


function draw(e) {
	if (!isDrawing) return; // stop the fn from running when they are not moused down
	console.log(e);
	ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
	ctx.beginPath();
	// start from
	ctx.moveTo(lastX, lastY);
	// go to
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
	hue++;
	
	if (hue >= 360) {
		hue = 0;
	}
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

sliderSize.addEventListener('change', () => ctx.lineWidth = sliderSize.value);
sliderLite.addEventListener('change', () => lightness = sliderLite.value);