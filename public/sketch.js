var checksa = []; 
var checksb = []; 
var checksc = []; 
var checksd = [];
var checkse = []; 
var checksf = []; 
var checksg = []; 
var checksh = [];
var play, stop, tempolabel, temposlider, savebutton, clearbutton, reloadbutton, setsel;
var conainer, rowa, rowb, ctlsrow;
var offcolor = '#cccccc';
var offcolor2 = '#bcbcbc';
var oncolor = '#ff422d';
var go = false;
var patlen = 16;
var soundset = 'tr808';
var tempo, bpm, timer;
var inc = 0;
var tr808 = {}; var tr606 = {}; var mt32 = {};
var drums = { 'tr808': tr808, 'tr606': tr606 , 'mt32': mt32};


function preload(){
  tr808.a = loadSound('sounds/808/bd.wav'); tr808.alabel = 'bd';
  tr808.b = loadSound('sounds/808/sd.wav'); tr808.blabel = 'sd';
  tr808.c = loadSound('sounds/808/hh.wav'); tr808.clabel = 'hh';
  tr808.d = loadSound('sounds/808/oh.wav'); tr808.dlabel = 'oh';
  tr808.e = loadSound('sounds/808/cy.wav'); tr808.alabel = 'cy';
  tr808.f = loadSound('sounds/808/cp.wav'); tr808.blabel = 'cp';
  tr808.g = loadSound('sounds/808/rs.wav'); tr808.clabel = 'rs';
  tr808.h = loadSound('sounds/808/cb.wav'); tr808.dlabel = 'cb';

  tr606.a = loadSound('sounds/606/bd.wav'); tr606.alabel = 'bd';
  tr606.b = loadSound('sounds/606/sd.wav'); tr606.alabel = 'sd';
  tr606.c = loadSound('sounds/606/hh.wav'); tr606.alabel = 'hh';
  tr606.d = loadSound('sounds/606/oh.wav'); tr606.alabel = 'oh';
  tr606.e = loadSound('sounds/606/mh.wav'); tr606.alabel = 'mh';
  tr606.f = loadSound('sounds/606/cy.wav'); tr606.alabel = 'cy';
  tr606.g = loadSound('sounds/606/lt.wav'); tr606.alabel = 'lt';
  tr606.h = loadSound('sounds/606/ht.wav'); tr606.alabel = 'ht';

  mt32.a = loadSound('sounds/mt32/bd.wav'); mt32.alabel = 'bd';
  mt32.b = loadSound('sounds/mt32/sd.wav'); mt32.alabel = 'sd';
  mt32.c = loadSound('sounds/mt32/hh.wav'); mt32.alabel = 'hh';
  mt32.d = loadSound('sounds/mt32/oh.wav'); mt32.alabel = 'oh';
  mt32.e = loadSound('sounds/mt32/cy.wav'); mt32.alabel = 'cy';
  mt32.f = loadSound('sounds/mt32/cp.wav'); mt32.alabel = 'cp';
  mt32.g = loadSound('sounds/mt32/tb.wav'); mt32.alabel = 'tb';
  mt32.h = loadSound('sounds/mt32/cs.wav'); mt32.alabel = 'cs';
}

function setup() {

 noLoop();	
 bpm = 90.0;	
 tempo = (60000.0/bpm)/4.0;
 tr808.a.setVolume(1.0);
 tr808.b.setVolume(1.0);
 tr808.c.setVolume(1.0);
 tr808.d.setVolume(1.0);
 tr808.e.setVolume(1.0);
 tr808.f.setVolume(1.0);
 tr808.g.setVolume(1.0);
 tr808.h.setVolume(1.0);
 tr606.a.setVolume(1.0);
 tr606.b.setVolume(1.0);
 tr606.c.setVolume(1.0);
 tr606.d.setVolume(1.0);
 tr606.e.setVolume(1.0);
 tr606.f.setVolume(1.0);
 tr606.g.setVolume(1.0);
 tr606.h.setVolume(1.0);
 mt32.a.setVolume(1.0);
 mt32.b.setVolume(1.0);
 mt32.c.setVolume(1.0);
 mt32.d.setVolume(1.0);
 mt32.e.setVolume(1.0);
 mt32.f.setVolume(1.0);
 mt32.g.setVolume(1.0);
 mt32.h.setVolume(1.0);
 container = createDiv('');	
 // container.style('margin', 'auto');
 // container.style('padding', '10px');
 container.id('sketchcontainer');

 var skc = document.querySelector('#sketchcontainer')
 document.querySelector('#container').appendChild(skc);

 rowa = createDiv('');	
 rowa.parent(container);
 createBoxes(checksa, patlen, rowa, 20);

 rowb = createDiv('');	
 rowb.parent(container);
 createBoxes(checksb, patlen, rowb, 20);

 rowc = createDiv('');	
 rowc.parent(container);
 createBoxes(checksc, patlen, rowc, 20);

 rowd = createDiv('');	
 rowd.parent(container);
 createBoxes(checksd, patlen, rowd, 20);

 rowe = createDiv('');	
 rowe.parent(container);
 createBoxes(checkse, patlen, rowe, 20);

 rowf = createDiv('');	
 rowf.parent(container);
 createBoxes(checksf, patlen, rowf, 20);

 rowg = createDiv('');	
 rowg.parent(container);
 createBoxes(checksg, patlen, rowg, 20);

 rowh = createDiv('');	
 rowh.parent(container);
 createBoxes(checksh, patlen, rowh, 20);

 ctlsrow = createDiv('');
 ctlsrow.style('margin-top', '20px');
 ctlsrow.parent(container);
 ctlsrow.addClass('ctlrow');

 play = createCheckbox('play (space)');
 play.parent(ctlsrow);
 play.style('display', 'inline-block');
 play.changed(function(){
  go = !go;
  if(!go){inc = 0;}
 });
 play.style('display', 'inline-block');
 document.querySelector('label').style.paddingLeft = "10px";

 document.addEventListener('keydown', (event) => {
  
 if(event.key === ' '){
    go = !go;
    if(!go){inc = 0;}
 	play.checked(go);
 }
 
 });	

 temposlider = createSlider(20, 300, 90, 1.0);
 temposlider.input(function(){
 	bpm = temposlider.value();
 	tempo = (60000.0/bpm)/4.0;
 	tempolabel.html('bpm: '+bpm);
 	timer.set_interval(tempo);
 	//mainTimer = window.setInterval(timerFunc, tempo);
 });
 temposlider.parent(ctlsrow);
 temposlider.style('display', 'inline-block');
 temposlider.style('margin-left', '20px');
 temposlider.style('width', '160px');
 temposlider.addClass('tslider');

 tempolabel = createP('tempo: '+bpm);
 tempolabel.parent(ctlsrow);
 tempolabel.style('display', 'inline-block');
 tempolabel.style('margin-left', '20px');

 setsel = createSelect();
 setsel.parent(ctlsrow);
 setsel.addClass('setsel');
 setsel.style('display', 'inline-block');
 setsel.style('margin-left', '10px');
 setsel.option('tr808');
 setsel.option('tr606');
  setsel.option('mt32');
 setsel.changed(function(){  
 soundset = setsel.value();
 });

  clearbutton = createButton('clear pattern');
  clearbutton.parent(ctlsrow);
  clearbutton.style('display', 'inline-block');
  clearbutton.style('margin-left', '10px');
  clearbutton.mousePressed(function(){
  clearPat();
  });

  if(inuser){
 savebutton = createButton('save pattern');
 savebutton.parent(ctlsrow);
 savebutton.style('display', 'inline-block');
 savebutton.style('margin-left', '10px');
 savebutton.mousePressed(function(){
  setPat(pat);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/savepat', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({pat})); 
   if(inuser)
  inuser.pat = pat;
 });
}else{
 savebutton = createDiv('log in to save patterns!');
 savebutton.parent(ctlsrow);
 savebutton.style('display', 'inline-block');
 savebutton.style('margin-left', '20px');
}


  if(inuser){
  reloadbutton = createButton('reload pattern');
  reloadbutton.parent(ctlsrow);
  reloadbutton.style('display', 'inline-block');
  reloadbutton.style('margin-left', '10px');
  reloadbutton.mousePressed(function(){
   // if(inuser){
   getPat(inuser.pat);
   //}
  });
  }

  //document.querySelectorAll('.ctlrow > *').paddingTop = '20px';

if(inuser){
   getPat(inuser.pat);
}

// getPat(testpat);

timer.start(timerFunc, tempo);

}

function draw(){

}

var pat = {
a: [],
b: [],
c: [],
d: [],
e: [],
f: [],
g: [],
h: [],
len: 16
}

var testpat = {
a: [1,0,1,1, 0,0,0,0, 0,0,1,0, 0,1,0,0],
b: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
c: [1,0,1,1, 0,1,1,0, 1,1,1,0, 0,0,1,1],
d: [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0],
len: 16
}

function setPat(pat){
	pat.a = []; pat.b = []; pat.c = []; pat.d = [];
	pat.e = []; pat.f = []; pat.g = []; pat.h = [];

	pat.len = patlen;
  pat.bpm = bpm;
  pat.set = soundset;
	for (var i = 0; i < patlen; i++) {
		 pat.a.push(toInt(checksa[i].val));
		 pat.b.push(toInt(checksb[i].val));
		 pat.c.push(toInt(checksc[i].val));
		 pat.d.push(toInt(checksd[i].val));
 		 pat.e.push(toInt(checkse[i].val));
		 pat.f.push(toInt(checksf[i].val));
		 pat.g.push(toInt(checksg[i].val));
		 pat.h.push(toInt(checksh[i].val));
	}
}

function getPat(pat){
patlen = pat.len;
bpm = pat.bpm;
soundset = pat.set;

for (var i = 0; i < pat.len; i++) {
 	 checksa[i].val = pat.a[i];
 	 changeColor(checksa[i], i);
 	 checksb[i].val = pat.b[i];
 	 changeColor(checksb[i], i);
	 checksc[i].val = pat.c[i];
	 changeColor(checksc[i], i);
	 checksd[i].val = pat.d[i];
	 changeColor(checksd[i], i);

// if(drums[soundset].hasOwnProperty('a')){
// 	 checksa[i].val = pat.a[i];
// 	 changeColor(checksa[i], i);
// }
// if(drums[soundset].hasOwnProperty('b')){
// 	 checksb[i].val = pat.b[i];
// 	 changeColor(checksb[i], i);
// }
// if(drums[soundset].hasOwnProperty('c')){
// 	 checksc[i].val = pat.c[i];
// 	 changeColor(checksc[i], i);
// }
// if(drums[soundset].hasOwnProperty('d')){
// 	 checksd[i].val = pat.d[i];
// 	 changeColor(checksd[i], i);
// }

 	 checkse[i].val = pat.e[i];
	 changeColor(checkse[i], i);
 	 checksf[i].val = pat.f[i];
 	 changeColor(checksf[i], i);
	 checksg[i].val = pat.g[i];
	 changeColor(checksg[i], i);
	 checksh[i].val = pat.h[i];
	 changeColor(checksh[i], i);

}

setsel.value(soundset); 
tempo = (60000.0/bpm)/4.0;
temposlider.value(bpm);
tempolabel.html('bpm: '+bpm);
timer.set_interval(tempo);
}

function clearPat(){
for (var i = 0; i < pat.len; i++) {
   checksa[i].val = 0;
   changeColor(checksa[i], i);
   checksb[i].val = 0;
   changeColor(checksb[i], i);
   checksc[i].val = 0;
   changeColor(checksc[i], i);
   checksd[i].val = 0;
   changeColor(checksd[i], i);
   checkse[i].val = 0;
   changeColor(checkse[i], i);
   checksf[i].val = 0;
   changeColor(checksf[i], i);
   checksg[i].val = 0;
   changeColor(checksg[i], i);
   checksh[i].val = 0;
   changeColor(checksh[i], i);
}  
}

function toInt(arg){
  if(arg){
    return 1;
  }else{
    return 0;
  }
}


function afunc(set){
drums[set].a.play();
}
function bfunc(set){
drums[set].b.play();
}
function cfunc(set){
drums[set].c.play(); 
}
function dfunc(set){
drums[set].d.play();
}
function efunc(set){
drums[set].e.play();
}
function ffunc(set){
drums[set].f.play();
}
function gfunc(set){
drums[set].g.play(); 
}
function hfunc(set){
drums[set].h.play();
}
function timerFunc(){
 if(go){	
  if(checksa[inc].val){
 	afunc(soundset);
 }
   if(checksb[inc].val){
 	bfunc(soundset);
 }
   if(checksc[inc].val){
 	cfunc(soundset);
 }
   if(checksd[inc].val){
 	dfunc(soundset);
 }
   if(checkse[inc].val){
 	efunc(soundset);
 }
   if(checksf[inc].val){
 	ffunc(soundset);
 }
   if(checksg[inc].val){
 	gfunc(soundset);
 }
   if(checksh[inc].val){
 	hfunc(soundset);
 }
 inc = ++inc%patlen;
 }
}

function getoffcolor(i){
	if(i >=4 && i <= 7 || i >=12 && i <= 15){
		return offcolor2;
	}else{return offcolor;} 
}

function changeColor(box, i){
	box.num = i
  if(box.val){
  	box.style('background-color', oncolor);
  }else{
  	box.style('background-color', getoffcolor(i));
  }
}

function createBoxes(arr, num, parentel, size){

for (var i = 0; i < num; i++) {
	arr[i] = createDiv('');
	arr[i].style('display', 'inline-block');
    arr[i].style('margin', '2px');
    arr[i].style('padding', size+'px');
    arr[i].style('border', '1px solid black');
    arr[i].style('background-color',  getoffcolor(i));
    arr[i].val = false; 
    arr[i].num = i;
	arr[i].mouseClicked(function(){
	this.val = !this.val;
	if(this.val){ 
	this.style('background-color', oncolor)
	}else{ 
	this.style('background-color', getoffcolor(this.num))}	
	});
	if(parentel){
	arr[i].parent(parentel);
	}
}

}

var timer = {
    running: false,
    iv: 5000,
    timeout: false,
    cb : function(){},
    start : function(cb,iv){
        var elm = this;
        clearInterval(this.timeout);
        this.running = true;
        if(cb) this.cb = cb;
        if(iv) this.iv = iv;
        this.timeout = setTimeout(function(){elm.execute(elm)}, this.iv);
    },
    execute : function(e){
        if(!e.running) return false;
        e.cb();
        e.start();
    },
    stop : function(){
        this.running = false;
    },
    set_interval : function(iv){
        clearInterval(this.timeout);
        this.start(false, iv);
    }
};