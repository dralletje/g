//canvas vars
var my_canvas = document.getElementById("canvas");
var context = my_canvas.getContext("2d");

//set time + time step
var x = 1; //time step
var c2 = 0;

//time function
var interval = function() {
  d2 = new Date();
  c2++;
  //if(c2 == 10000) clearInterval(t);
};
t = setInterval(interval, x);
//set calc vars
var G = 6.67384e-11; // m3 kg-1 s-2
function getAcceleration(distance, m2) {
  return G * m2 / (Math.pow(distance, 2));
}


//Remember: .arc(x, y, radius, startAngle, endAngle (2PI))
var acceleration = 0.00002;
var rearth = 7;
var R = 275;
var R2 = 150;
var R3 = 65;

//updating drawing function
var drawingisfun = function() {
	context.clearRect (0,0, my_canvas.width, my_canvas.height);
	//redraw Sun
	context.beginPath();
	context.arc(600,400,40,0,2*Math.PI);
	context.stroke();

	//draw trail
	context.beginPath();
	context.arc(600,400,275,0,2*Math.PI);
	context.stroke();

	//calc values
	var velocity = 0.002//+(acceleration*c2);
	//var ObjectX = 800+(velocity*c2);
	//var ObjectY = 85+(velocity2*c2);
	var ObjectX = 600+(R * Math.cos((velocity*c2)));
	var ObjectY = 400+(R * Math.sin((velocity*c2)));
	context.beginPath();
	context.arc(ObjectX,ObjectY,20,0,2*Math.PI);
	context.stroke();


	//draw Mercury

	//calc values
	var velocity2 = 0.005//+(acceleration*c2);
	var ObjectX2 = 600+(R2 * Math.cos((velocity2*c2)));
	var ObjectY2 = 400+(R2 * Math.sin((velocity2*c2)));
	context.beginPath();
	context.arc(ObjectX2,ObjectY2,15,0,2*Math.PI);
	context.stroke();
	
	//draw trail Mercury
	context.beginPath();
	context.arc(600,400,150,0,2*Math.PI);
	context.stroke();

	//draw the Moon
	var velocity3 = 0.008;
	var MoonX = ObjectX + (R3 * Math.cos((velocity3*c2)))
	var MoonY = ObjectY + (R3 * Math.sin((velocity3*c2)))
	context.beginPath();
	context.arc(MoonX,MoonY,10,0,2*Math.PI);
	context.stroke();
	
	//draw Moon trail
	context.beginPath();
	context.arc(ObjectX,ObjectY,(R3),0,2*Math.PI);
	context.stroke();

}
runit = setInterval(drawingisfun, 10);
