
function read_url(url) {
   var xmlhttp;
   if (window.XMLHttpRequest) {
         // code for IE7+, Firefox, Chrome, Opera, Safari
         xmlhttp=new XMLHttpRequest();
   } else {
         // code for IE6, IE5
         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
   }
   xmlhttp.onreadystatechange=function() {
          if (xmlhttp.readyState==4 && xmlhttp.status==200) {
           return xmlhttp.responseText;
          }
   }
   xmlhttp.open("GET",url,true);
   // xmlhttp.setRequestHeader('mode','no-cors');
   xmlhttp.setRequestHeader('Accept','text/html');
   xmlhttp.setRequestHeader('Content-Type','text/html');
   xmlhttp.send();
}

function incr_font_size(c,f){
    var inputs = document.getElementsByClassName(c);
    for (x = 0 ; x < inputs.length ; x++){
	var fontSize = inputs[x].style.fontSize;
	inputs[x].style.fontSize = (parseFloat(fontSize) + f) + '%';
	// alert(parseFloat(fontSize));
	// inputs[x].style.fontSize = fontSize + "4px";
	// inputs[x].style.fontSize = fontSize + "10%";
    }
}

function change_view(viewObj) {
    let n_view = viewObj.value;
    let o_view = viewObj.oldvalue;
    // console.log("Changing from view:" + viewObj.oldvalue + " to view: " + n_view);
    save_view(o_view);
    document.getElementById('j_comments').value = views[n_view]['j_comments'];
    document.getElementById('j_notes').value = views[n_view]['j_notes'];
    document.getElementById('j_title').value = views[n_view]['j_title'];
    document.getElementById('j_drawings').innerHTML = views[n_view]['j_drawings'];
    document.getElementById('title').innerHTML = n_view + '-Title';
    document.getElementById('comments').innerHTML = n_view + '-Comments';
    document.getElementById('notes').innerHTML = n_view + '-Notes';
    document.getElementById('drawings').innerHTML = n_view + '-Drawings';
}

function add_view() {
    save_view();
    let view = document.getElementById('j_new_view').value;
    if (view.length>9) view=view.slice(0,9);
    if (view in views) {
	add_view_form();
	document.getElementById('modal2M').innerHTML  += 
	    "<br><span class='text-danger font-weight-bold'>#ERROR# View Already Present!!</span>";
	return;
    }
    views[view] = {};
    document.getElementById('modal2B').style.display = 'none';
    var select = document.getElementById('j_view');
    select.options[select.options.length] = new Option(view,view);
    //empty all fields
    document.getElementById('j_view').value=view;
    document.getElementById('j_title').value='';
    document.getElementById('j_notes').value='';
    document.getElementById('j_comments').value='';
    document.getElementById('j_drawings').innerHTML='';
    document.getElementById('title').innerHTML = view + '-Title';
    document.getElementById('comments').innerHTML = view + '-Comments';
    document.getElementById('notes').innerHTML = view + '-Notes';
    document.getElementById('drawings').innerHTML = view + '-Drawings';
}


function add_view_form() {
    document.getElementById('modal2B').style.display = 'block';
    document.getElementById('modal2M').innerHTML  = 
        '<div class="h5 font-weight-bold text-black"> Adding View:</div>' +
	"<input id='j_new_view' type='text' class='text-primary font-weight-bold h6'/>";
    document.getElementById('modal2M').innerHTML  += 
	"<span class='btn btn-primary' onclick='add_view();'>Add</span>";
    document.getElementById('j_new_view').value  ='';
}

function save_view() {
    var currentdate = new Date();
    let view = 'v'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
    if (document.getElementById('j_view').value) {
	view = document.getElementById('j_view').value;
    } 
    views[view] = {};
    if (document.getElementById('j_notes').value) {
	views[view]["j_notes"] = document.getElementById('j_notes').value;
    } else { views[view]["j_notes"] = "NONE"; }
    if (document.getElementById('j_title').value) {
	views[view]["j_title"] = document.getElementById('j_title').value;
    } else { views[view]["j_title"] = "NONE"; }
    if (document.getElementById('j_comments').value) {
	views[view]["j_comments"] = document.getElementById('j_comments').value;
    } else { views[view]["j_comments"] = "NONE"; }
    views[view]["j_drawings"] = document.getElementById('j_drawings').innerHTML;
    // console.log(views);
}


// function save_drawing() {
//     if (typeof drawings_arr == 'undefined') { drawings_arr=['printme']; }
//     if (typeof drawings == 'undefined') { drawings={}; }
//     var currentdate = new Date();
//     var drawing_id = 'd'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
//     // console.log(drawing_id); // For debugging. 
//     drawings_arr.push(drawing_id);
//     var btn_str = '<btn ';
//     btn_str += ' id="b'+drawing_id+'" ';
//     btn_str += ' onclick=disp_drawing(\''+drawing_id+'\'); ';
//     btn_str += ' class="font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
//     btn_str += drawing_id;
//     // 17/1/2024 @ 10:39:55
//     // var currentdate = new Date();
//     // btn_str += + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "
//     //       + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
//     btn_str += '</btn>';
//     // document.getElementById('j_screenshots').innerHTML += btn_str;
//     document.getElementById('j_drawings').innerHTML += btn_str;
//     save_view();
//     //empty all fields
//     // document.getElementById('j_title').value='';
//     // document.getElementById('j_notes').value='';
//     // document.getElementById('j_comments').value='';
// }

function save_view(view="") {
    if (view.length==0) {
	var currentdate = new Date();
	view = 'v'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
	if (document.getElementById('j_view').value) {
	    view = document.getElementById('j_view').value;
	} 
    } 
    // console.log("Saving view: " + view);
    views[view] = {};
    if (document.getElementById('j_notes').value) {
	views[view]["j_notes"] = document.getElementById('j_notes').value;
    } else { views[view]["j_notes"] = "NONE"; }
    if (document.getElementById('j_title').value) {
	views[view]["j_title"] = document.getElementById('j_title').value;
    } else { views[view]["j_title"] = "NONE"; }
    if (document.getElementById('j_comments').value) {
	views[view]["j_comments"] = document.getElementById('j_comments').value;
    } else { views[view]["j_comments"] = "NONE"; }
    if (document.getElementById('j_drawings').innerHTML) {
	views[view]["j_drawings"] = document.getElementById('j_drawings').innerHTML;
    } else { views[view]["j_drawings"] = ""; }
    // console.log(views);
}


function save_drawing() {
    if (typeof drawings_arr == 'undefined') { drawings_arr=['printme']; }
    var currentdate = new Date();
    var drawing_id = 'd'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
    // console.log(drawing_id); // For debugging. 
    drawings_arr.push(drawing_id);
    var btn_str = '';
    // console.log("Hi");
    // console.log("length of drawings is " + Object.keys(drawings).length);
    if (Object.keys(drawings).length>0 && Object.keys(drawings).length % 5 === 0) {
 	btn_str += '<br>';
 	// console.log(btn_str);
    }
    btn_str += '<btn ';
    btn_str += ' id="b'+drawing_id+'" ';
    btn_str += ' onclick=disp_drawing(\''+drawing_id+'\'); ';
    btn_str += ' class="small font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
    btn_str += drawing_id;
    // 17/1/2024 @ 10:39:55
    // var currentdate = new Date();
    // btn_str += + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "
    //       + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    btn_str += '</btn>';
    // document.getElementById('j_screenshots').innerHTML += btn_str;
    document.getElementById('j_drawings').innerHTML += btn_str;
    // if (drawings_arr.length==2) { $('#j_screenshots').removeClass('d-none');}
    // save lines from current drawing
    drawings[drawing_id] = {};
    // drawings[drawing_id]['lines'] = lines;
    drawings[drawing_id]['lines'] = structuredClone(lines);
    //
    // if (document.getElementById('j_notes').value) {
    //     drawings[drawing_id]["j_notes"] = document.getElementById('j_notes').value;
    // } else { drawings[drawing_id]["j_notes"] = "NONE"; }
    // if (document.getElementById('j_title').value) {
    //     drawings[drawing_id]["j_title"] = document.getElementById('j_title').value;
    // } else { drawings[drawing_id]["j_title"] = "NONE"; }
    // if (document.getElementById('j_comments').value) {
    //     drawings[drawing_id]["j_comments"] = document.getElementById('j_comments').value;
    // } else { drawings[drawing_id]["j_comments"] = "NONE"; }
    drawings[drawing_id]["grahas_in_rashi"] = grahas_in_rashi;
    drawings[drawing_id]["ascendant_rashi_num"] = ascendant_rashi_num;
    drawings[drawing_id]["curr_h1_rashi_num"] = 
	document.getElementById('rashi_in_h1').innerHTML;
    // console.log(drawings);
}

function undo_stroke(){
    clear_canvas();
    // console.log(lines);
    lines = lines.slice(0,-2)
    // const index = array.indexOf(lines.length);
    // if (index > -1) {
    //       array.splice(index, 1); // 1 means remove one item only
    // }
    // console.log(lines);
    draw_saved_strokes();
    // console.log("just popped");
}

function draw_saved_strokes() {
    if (lines.length>0) {
	for (c_line in lines) {
	    // console.log(lines[c_line]);
	    for (e in lines[c_line]) {
		// console.log(e);
		new_xcoord = lines[c_line][e][0];
		new_ycoord = lines[c_line][e][1];
		// console.log("new_xcoord " + new_xcoord + " new_ycoord " + new_ycoord); 
		ctx.beginPath();
		getPosition(event);
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = strokeColor;
		ctx.lineTo(new_xcoord, new_ycoord);
		ctx.stroke();
	    }
	}
    }
}

function disp_drawing(c_drawing_id){
    let l_data = drawings[c_drawing_id];
    if ("ascendant_rashi_num" in l_data) {
	ascendant_rashi_num = parseInt(l_data["ascendant_rashi_num"]);
	for (let i=1; i<=12; i++) {
	    house_rashi_num = ((parseInt(ascendant_rashi_num)+i-1)%12); 
	    if (house_rashi_num==0) { house_rashi_num=12;}
	    document.getElementById('rashi_in_h'+ i.toString()).innerHTML = 
		house_rashi_num.toString();
	}
    }
    if ("curr_h1_rashi_num" in l_data) {
	curr_h1_rashi_num = parseInt(l_data["curr_h1_rashi_num"]);
	rotate(curr_h1_rashi_num);
    }
    if ("retro_planet_list" in l_data) {
	retro_planet_list = l_data["retro_planet_list"];
    }
    // let grahas_in_rashi = {}
    if ("grahas_in_rashi" in l_data) {
	grahas_in_rashi = l_data["grahas_in_rashi"];
	// now populate grahas wher they belong
	populate_graha_in_rashi();
    }
    clear_canvas();
    // redraw the lines from memory
    var c_lines = [];
    if (c_drawing_id=='printme') c_lines = lines;
    else c_lines = l_data['lines'];
    if (c_lines.length>0) {
	for (c_line in c_lines) {
	    // console.log(c_lines[c_line]);
	    for (e in c_lines[c_line]) {
		// console.log(e);
		new_xcoord = c_lines[c_line][e][0];
		new_ycoord = c_lines[c_line][e][1];
		// console.log("new_xcoord " + new_xcoord + " new_ycoord " + new_ycoord); 
		ctx.beginPath();
		getPosition(event);
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = strokeColor;
		ctx.lineTo(new_xcoord, new_ycoord);
		ctx.stroke();
	    }
	}
    }
    // if (c_drawing_id in drawings) {
    //     if ("j_title" in drawings[c_drawing_id]) {
    //         document.getElementById('j_title').value = drawings[c_drawing_id]["j_title"];
    //     }
    //     if ("j_comments" in drawings[c_drawing_id]) {
    //         document.getElementById('j_comments').value = drawings[c_drawing_id]["j_comments"];
    //     }
    //     if ("j_notes" in drawings[c_drawing_id]) {
    //         document.getElementById('j_notes').value = drawings[c_drawing_id]["j_notes"];
    //     }
    // }
    $('#bprintme').removeClass('bg-warning');
    for (p in drawings) { 
	// $('#'+p).addClass('d-none');
	$('#b'+p).removeClass('bg-warning');
    } 
    // $('#'+c_drawing_id).removeClass('d-none');
    $('#b'+c_drawing_id).addClass('bg-warning');
}

function change_ascendant(new_asc) {
    // console.log(new_asc);
    ascendant_rashi_num = new_asc;
    curr_h1_rashi_num = new_asc;
    for(let i=1; i<=12; i++) { 
	var rnum = (parseInt(ascendant_rashi_num)+i-1)%12;
	if (rnum==0) {rnum=12};
	// change rashinum in this house
	document.getElementById('rashi_in_h'+i.toString()).innerHTML = rnum.toString(); 
	// now populate grahas wher they belong
	populate_graha_in_rashi();
    }
}

function populate_graha_in_rashi() {
    for (let house=1; house<=12; house++) {
	// get rashi in the house
	house_rashi = document.getElementById('rashi_in_h'+ house.toString()).innerHTML;
	// empty graha from house innerHTML
	document.getElementById('h'+ house.toString()).innerHTML = '';
	// if ASC mark it so
	if (house_rashi==ascendant_rashi_num.toString()) 
	    document.getElementById('h'+ house.toString()).innerHTML += '<br><b>ASC</b>';
	for ( graha of grahas_in_rashi[house_rashi.toString()])  {
	    document.getElementById('h'+ house.toString()).innerHTML += format_graha(graha);
	    if (retro_planet_list.includes(graha)) 
		document.getElementById('h'+ house.toString()).innerHTML +=
		    "<span id='sa_retro' class='h6 text-danger border-danger'>(R)</span>";
	}
    }
}


function place_graha_in_house(graha,house) {
    // graha:Su house;h3 <-- need to strip the "h" from the house
    // console.log("graha: " + graha + " House: " + house.substring(1));
    if (typeof grahas_in_rashi == 'undefined') { 
	grahas_in_rashi={}; 
	for (let i=1; i<=12; i++) { grahas_in_rashi[i.toString()] = []; }
    }
    // find rashi of the house
    rashi_in_h1= document.getElementById('rashi_in_h1').innerHTML;
    c_rashi=((parseInt(rashi_in_h1)+parseInt(house.substring(1))-1)%12); if (c_rashi==0) { c_rashi=12;}
    // make sure graha is pesent in just one place
    for (let i=1; i<=12; i++) { 
	if (grahas_in_rashi[i.toString()].includes(graha)) {
	    // unconditionally remove 
	    const g_idx = grahas_in_rashi[i.toString()].indexOf(graha);
	    // console.log("About to delete idx: " + g_idx + " for rashi " + i.toString());
	    const x1 = grahas_in_rashi[i.toString()].splice(g_idx,1);
	}
    }
    // console.log(c_rashi.toString());
    grahas_in_rashi[c_rashi.toString()].push(graha);
    // console.log(grahas_in_rashi);
}

function saveData() {
    save_view();
    const saveMe = {};
    // gets the rashi_in_house data first
    // saveMe["rashi_in_house"] = {};
    // for (let i=1; i<=12; i++) {
    //     c_val = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
    //     saveMe["rashi_in_house"][i] = c_val;
    // }
    // get rashi in first house
    // saveMe["ascendant_rashi_num"] = 
    // document.getElementById('rashi_in_h1').innerHTML;
    saveMe["ascendant_rashi_num"] = ascendant_rashi_num;
    saveMe["curr_h1_rashi_num"] = document.getElementById('rashi_in_h1').innerHTML;
    // gets the planets in house now
    // saveMe["planets_in_house"] = {};
    // for (let i=1; i<=12; i++) {
    //     c_val = document.getElementById('h'+ i.toString()).innerHTML;
    //     saveMe["planets_in_house"][i] = c_val;
    // }
    // 
    saveMe["grahas_in_rashi"] = grahas_in_rashi;
    saveMe["views"] = views;
    saveMe["retro_planet_list"] = retro_planet_list;
    // get fileName, title and Notes
    if (document.getElementById('j_filename').value) {
	var j_filename = document.getElementById('j_filename').value;
    } else { j_filename = "UnKnown"; }
    saveMe["j_filename"] = j_filename;
    //
    // if (document.getElementById('j_title').value) {
    //     saveMe["j_title"] = document.getElementById('j_title').value;
    // } else { saveMe["j_title"] = "NONE"; }
    // if (document.getElementById('j_notes').value) {
    //     saveMe["j_notes"] = document.getElementById('j_notes').value;
    // } else { saveMe["j_notes"] = "NONE"; }
    // if (document.getElementById('j_comments').value) {
    //     saveMe["j_comments"] = document.getElementById('j_comments').value;
    // } else { saveMe["j_comments"] = "NONE"; }
    //
    saveMe["j_title"] = views['Basic']['j_title'];
    saveMe["j_comments"] = views['Basic']['j_comments'];
    saveMe["j_notes"] = views['Basic']['j_notes'];
    saveMe["j_drawings"] = views['Basic']['j_drawings'];
    //
    if (typeof drawings == 'undefined') { drawings={}; }
    if (Object.keys(drawings).length>0) saveMe["drawings"] = drawings;
    // console.log(saveMe);
    //
    saveMeStr = JSON.stringify(saveMe);
    // var fs = require('fs');
    // var dir = './raju_1';
    // if (!fs.exists(dir)){ fs.mkdir(dir); }
    // alert("rama");
    download(saveMeStr, j_filename + '.jgd', 'text/plain');
}

// function saveData_works() {
//     const saveMe = {};
//     // get rashi in first house
//     saveMe["ascendant_rashi_num"] = 
// 	document.getElementById('rashi_in_h1').innerHTML;
//     // gets the rashi_in_house data first
//     saveMe["rashi_in_house"] = {};
//     for (let i=1; i<=12; i++) {
// 	c_val = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
// 	saveMe["rashi_in_house"][i] = c_val;
//     }
//     // gets the planets in house now
//     saveMe["planets_in_house"] = {};
//     for (let i=1; i<=12; i++) {
// 	c_val = document.getElementById('h'+ i.toString()).innerHTML;
// 	saveMe["planets_in_house"][i] = c_val;
//     }
//     // get fileName, title and Notes
//     if (document.getElementById('j_filename').value) {
// 	var j_filename = document.getElementById('j_filename').value;
//     } else { j_filename = "UnKnown"; }
//     saveMe["j_filename"] = j_filename;
//     if (document.getElementById('j_title').value) {
// 	saveMe["j_title"] = document.getElementById('j_title').value;
//     } else { saveMe["j_title"] = "NONE"; }
//     if (document.getElementById('j_notes').value) {
// 	saveMe["j_notes"] = document.getElementById('j_notes').value;
//     } else { saveMe["j_notes"] = "NONE"; }
//     saveMeStr = JSON.stringify(saveMe);
//     // var fs = require('fs');
//     // var dir = './raju_1';
//     // if (!fs.exists(dir)){ fs.mkdir(dir); }
//     // alert("rama");
//     download(saveMeStr, j_filename + '.jgd', 'text/plain');
// }


// async function saveData_exp() {
//     const saveMe = {};
//     // get rashi in first house
//     saveMe["ascendant_rashi_num"] = 
// 	document.getElementById('rashi_in_h1').innerHTML;
//     // gets the rashi_in_house data first
//     saveMe["rashi_in_house"] = {};
//     for (let i=1; i<=12; i++) {
// 	c_val = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
// 	saveMe["rashi_in_house"][i] = c_val;
//     }
//     // gets the planets in house now
//     saveMe["planets_in_house"] = {};
//     for (let i=1; i<=12; i++) {
// 	c_val = document.getElementById('h'+ i.toString()).innerHTML;
// 	saveMe["planets_in_house"][i] = c_val;
//     }
//     // get fileName, title and Notes
//     if (document.getElementById('j_filename').value) {
// 	var j_filename = document.getElementById('j_filename').value;
//     } else { j_filename = "UnKnown"; }
//     saveMe["j_filename"] = j_filename;
//     if (document.getElementById('j_title').value) {
// 	saveMe["j_title"] = document.getElementById('j_title').value;
//     } else { saveMe["j_title"] = "NONE"; }
//     if (document.getElementById('j_notes').value) {
// 	saveMe["j_notes"] = document.getElementById('j_notes').value;
//     } else { saveMe["j_notes"] = "NONE"; }
//     saveMeStr = JSON.stringify(saveMe);
//     // var fs = require('fs');
//     // var dir = './raju_1';
//     // if (!fs.exists(dir)){ fs.mkdir(dir); }
//     // alert("rama");
//     // download(saveMeStr, j_filename + '.jgd', 'text/plain');
//     // alert("rama");
// 
//     // await createZip().then( async (res) => { await res.generateAsync({ type: "blob" }).then(function(content) { 
// // 	    download(content, 'test2.zip', 'application/zip'); });
//   //   })
// 
//     // // zip0 = createZip();
//     // const zip = new JSZip(); 
//     // var savable = new Image();
//     for (ss of screenshots_arr) { 
// 	if (ss=="printme") {continue;}
// 	var canvas = document.getElementById(ss);
// 	// savable.src = canvas.toDataURL("image/png");
// 	var c_image  = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
// 	// var c_image  = canvas.toDataURL("image/png");
// 	// zip.file("rama.png", savable.src.substr(savable.src.indexOf(',')+1), {base64: true});
// 	// download(savable.src.substr(savable.src.indexOf(',')+1), 'image.png', 'image/png');
// 	download(c_image, 'image.png', 'image/png');
//     }
//     // content = zip.generate();
//     // download(content, 'test2.zip', 'application/zip');
// 
// 
// }

// async function createZip() {
//     if (typeof screenshots_arr == 'undefined') { screenshots_arr=[]; }
//     const zip = new JSZip(); 
//     var savable = new Image();
//     if (screenshots_arr.length>0) { 
// 	for (ss of screenshots_arr) { 
// 	    if (ss=="printme") {continue;} 
// 	    // alert(ss);
// 	    var canvas = document.getElementById(ss); 
// 	    // var image = new Image();
// 	    // image.id = "p"+ss;
// 	    // image.crossOrigin = 'anonymous';
// 	    // image.src = canvas.toDataURL();
// 	    // zip.file(ss,image);
// 
// 	    // canvas.toBlob(function(data) { zip.file(ss,data); }); 
// 
// 	    savable.src = canvas.toDataURL();
// 	    zip.file("rama.png", savable.src.substr(savable.src.indexOf(',')+1), {base64: true});
// 
// 	} 
//     }
//     return zip;
// }

function readMultipleFiles(e) {
  if (e.length==0) { return;};
  for (i in e.target.files) {
      var file = e.target.files[i];
      var reader = new FileReader();
      reader.onload = function(e) {
	var contents = e.target.result;
	//displayContents(contents);
	// loadData(contents);
	removeAllGr();
	const l_data = JSON.parse(contents);
	loadData(l_data);
      };
      reader.readAsText(file);
  }
}


function readGocharFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    //displayContents(contents);
    // loadData(contents);
    removeAllGocharGr();
    const g_data = JSON.parse(contents);
    loadGocharData(g_data);
  };
  reader.readAsText(file);
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    //displayContents(contents);
    // loadData(contents);
    removeAllGr();
    const l_data = JSON.parse(contents);
    loadData(l_data);
  };
  reader.readAsText(file);
}




function removeAllGocharGr(){
    for (let h=1; h<=12; h++) {
	document.getElementById('gh'+h).innerHTML =" ";
    }
}

function removeAllGr(){
    const all_gr = ["Su","Ju","Sa","Me","Ra","Ke","Mo","Ma","Ve"];
    for (i in all_gr) {
	document.getElementById(all_gr[i]).remove();
    }
}

function reLoadData(j_filename){
    const c_data =  o_data[j_filename];
    loadData(c_data,make_tab=0);
}


function loadGocharData(g_data) {
    // alert("hi");
    // const l_data = JSON.parse(contents);
    if ("location" in g_data) {
	document.getElementById('g_loc').innerHTML = g_data["location"];
    }
    if ("disp_date" in g_data) {
	document.getElementById('g_date').innerHTML = g_data["disp_date"]
    }
    if ("disp_time" in g_data) {
	document.getElementById('g_time').innerHTML = g_data["disp_time"]
    }
    // if ("7" in g_data) {
    //     var brStr = "";
    //     for (i in g_data["7"]) {
    //         document.getElementById('gh7').innerHTML += brStr;
    //         document.getElementById('gh7').innerHTML += i;
    //         document.getElementById('gh7').innerHTML += " " + g_data["7"][i]["deg"]+ "d";
    //         brStr = "<br>";
    //     }
    // }
    for (let h=1; h<=12; h++) {
	rashinum = document.getElementById('rashi_in_h'+ h).innerHTML; 
	if (rashinum in g_data) {
	    var brStr = "";
	    for (i in g_data[rashinum]) {
		if (i=='La') { continue; }
		document.getElementById('gh'+h).innerHTML += brStr;
		document.getElementById('gh'+h).innerHTML += "<b>"+i+ "</b>";
		document.getElementById('gh'+h).innerHTML += " " + 
		    g_data[rashinum][i]["deg"]+ "d";
		brStr = "<br>";
	    }
	}
    }
}



function format_graha(gr) {
    var red_gr_list = ['Su', 'Ma', 'Ra', 'Ke', 'Sa'];
    var green_gr_list = ['Ju', 'Mo', 'Ve','Me'];
    //
    if (red_gr_list.includes(gr)) 
	var returnStr = "<span class='h3 graha font-weight-bold text-danger' style='font-size: 180%;'";
    if (green_gr_list.includes(gr)) 
	var returnStr = "<span class='h3 graha font-weight-bold text-success' style='font-size: 180%;'";
    //
    returnStr += " id='"+gr+"'><br>"+gr+"</span>";
    return returnStr;
}

function loadData(l_data,make_tab=1) {
    // const l_data = JSON.parse(contents);
    if ("ascendant_rashi_num" in l_data) {
	ascendant_rashi_num = parseInt(l_data["ascendant_rashi_num"]);
	for (let i=1; i<=12; i++) {
	    house_rashi_num = ((parseInt(ascendant_rashi_num)+i-1)%12); 
	    if (house_rashi_num==0) { house_rashi_num=12;}
	    document.getElementById('rashi_in_h'+ i.toString()).innerHTML = 
		house_rashi_num.toString();
	}
    }
    if ("curr_h1_rashi_num" in l_data) {
	curr_h1_rashi_num = parseInt(l_data["curr_h1_rashi_num"]);
	rotate(curr_h1_rashi_num);
    }
    if ("views" in l_data) {
	views = l_data["views"];
	var select = document.getElementById('j_view');
	for (v in views) {
	    if (v=='Basic') continue;
	   select.options[select.options.length] = new Option(v,v);
	}
    }
    // if ("rashi_in_house" in l_data) {
    //     for (i in l_data["rashi_in_house"]) {
    //         document.getElementById('rashi_in_h'+ i).innerHTML = l_data["rashi_in_house"][i];
    //     }
    // }
    // if ("planets_in_house" in l_data) {
    //     for (i in l_data["planets_in_house"]) {
    //         document.getElementById('h'+ i).innerHTML = l_data["planets_in_house"][i];
    //     }
    // }
    // console.log(l_data);
    if ("retro_planet_list" in l_data) {
	retro_planet_list = l_data["retro_planet_list"];
    }
    if ("drawings" in l_data) { drawings = l_data["drawings"]; }
    // let grahas_in_rashi = {}
    if ("grahas_in_rashi" in l_data) {
	grahas_in_rashi = l_data["grahas_in_rashi"];
	// now populate grahas wher they belong
	populate_graha_in_rashi();
	// console.log(grahas_in_rashi);
	// for (let i=1; i<=12; i++) {
	//     var c_rashi = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
	//     document.getElementById('h'+ i).innerHTML = '';
	//     if (i==1) document.getElementById('h'+ i).innerHTML += '<b>ASC</b>';
	//     for ( graha of grahas_in_rashi[c_rashi]) 
	// 	document.getElementById('h'+ i).innerHTML += format_graha(graha);
	// }
    }
    // console.log(grahas_in_rashi);
    if ("j_filename" in l_data) {
	document.getElementById('j_filename').value = l_data["j_filename"];
	var j_f = l_data["j_filename"];
	var btn_str = '<span id="' + j_f +'"><btn ' ;
	btn_str += ' onclick="reLoadData(\''+l_data["j_filename"] +'\');" ';
	btn_str += ' class="font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
	btn_str +=  l_data["j_filename"];
	btn_str += '</btn>';
	btn_str += '<img ';
	btn_str += ' onclick="$(\'#'+j_f+'\').addClass(\'d-none\');" ' 
	btn_str += ' class="ml-0 mr-1" src="images/clear.png" height="11"/></span>';
	if (make_tab==1) {
	    document.getElementById('j_opened').innerHTML += btn_str
	}
    }
    if ("j_title" in l_data) {
	document.getElementById('j_title').value = l_data["j_title"];
    }
    if ("j_notes" in l_data) {
	document.getElementById('j_notes').value = l_data["j_notes"];
    }
    if ("j_comments" in l_data) {
	document.getElementById('j_comments').value = l_data["j_comments"];
    }
    if ("j_drawings" in l_data) {
	document.getElementById('j_drawings').innerHTML = l_data["j_drawings"];
    }
    // o_data[l_data["j_filename"]] = l_data;
    // if ("drawings" in l_data) {
    //     drawings = l_data["drawings"];
    //     let drawings_arr=['printme'];
    //     for (drawing_id in drawings) {
    //         drawings_arr.push(drawing_id);
    //         var btn_str = '<btn ';
    //         btn_str += ' id="b'+drawing_id+'" ';
    //         btn_str += ' onclick=disp_drawing(\''+drawing_id+'\'); ';
    //         btn_str += ' class="font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
    //         btn_str += drawing_id;
    //         btn_str += '</btn>';
    //         document.getElementById('j_screenshots').innerHTML += btn_str;
    //     }
    //     $('#j_screenshots').removeClass('d-none');
    // }
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";
    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
    // if (window.MSBlobBuilder) { // IE10
      //   var bb = new MSBlobBuilder();
        // bb.append(strData);
        // return navigator.msSaveBlob(bb, strFileName);
    // } /* end if(window.MSBlobBuilder) */
    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */
    // 
    // 
    //do iframe dataURL download: (older W3)
    // var f = D.createElement("iframe");
    // D.body.appendChild(f);
    // f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    // setTimeout(function() {
        // D.body.removeChild(f);
    // }, 333);
    // return true;
}

function clearShot() {
    $('#Screenshot').removeClass('d-none'); 
    $('#ClearScreenshot').addClass('d-none'); 
    document.getElementById('output').innerHTML= "";
}





// function takeShot() {
//     if (typeof screenshots_arr == 'undefined') { screenshots_arr=['printme']; }
//     // $('#Screenshot').addClass('d-none');
//     // $('#ClearScreenshot').removeClass('d-none'); 
//     // let div1 = document.getElementById('printme');
//     // html2canvas(div1, {letterRendering: 1, allowTaint     : true, onrendered}).then(
//     // function (canvas) {
//     //     document.getElementById('output').appendChild(canvas);
//     // })
//     var currentdate = new Date();
//     var canvas_id = 'ss'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
//     screenshots_arr.push(canvas_id);
//     // allowTaint: true, foreignObjectRendering: true, 
//     // allowTaint: true, 
//     // removeContainer: true,
//     html2canvas(document.getElementById('printme'), { 
// 	logging: false, 
// 	letterRendering: 1, 
// 	allowTaint: true, 
// 	removeContainer: true,
// 	foreignObjectRendering: false,
// 	useCORS: false 
//     } ).then(canvas => {
// 	     var ctx = canvas.getContext('2d');
// 	     ctx.crossOrigin = 'anonymous';
// 	     ctx.drawImage(document.getElementById('canvas'), 
// 	         document.getElementById('first_col').offsetWidth, 
// 		 document.getElementById('header').offsetHeight+
// 		     document.getElementById('j_opened').offsetHeight+
// 		     document.getElementById('j_screenshots').offsetHeight
// 	     );
// 	    canvas.id=canvas_id; 
// 	    canvas.crossOrigin = 'anonymous';
// 	    // document.getElementById('output').appendChild(canvas);
// 	    if (screenshots_arr.length==2) { $('#j_screenshots').removeClass('d-none');}
// 	    document.getElementById('main_disp').appendChild(canvas);
// 	    $('#'+canvas_id).addClass('d-none');  
// 	})
// 	//
// 	var btn_str = '<btn ';
// 	btn_str += ' id="b'+canvas_id+'" ';
// 	btn_str += ' onclick=disp_ss(\''+canvas_id+'\'); ';
// 	btn_str += ' class="font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
// 	btn_str += canvas_id;
// 	// 17/1/2024 @ 10:39:55
// 	// var currentdate = new Date();
// 	// btn_str += + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "
//         //       + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
// 	btn_str += '</btn>';
// 	document.getElementById('j_screenshots').innerHTML += btn_str;
// }

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    document.getElementById('canvas').style.zIndex = '1';
}

// function disp_ss(c_canvas_id){
//     for (p of screenshots_arr) { 
// 	$('#'+p).addClass('d-none');
// 	$('#b'+p).removeClass('bg-warning');
//     } 
//     $('#'+c_canvas_id).removeClass('d-none');
//     $('#b'+c_canvas_id).addClass('bg-warning');
// }

function retro_flag(graha) {
    if (document.getElementById(graha+'_retrocbox').checked==true)  
	retro_planet_list.push(graha);
    else { 
	if (retro_planet_list.includes(graha)) {
	    const r_idx = retro_planet_list.indexOf(graha);
	    const x1 = retro_planet_list.splice(r_idx,1);
	}
    }
    // console.log(retro_planet_list);
    // now populate grahas where they belong
    populate_graha_in_rashi();
}

function addRetro(gr) {
    if (document.getElementById(gr+'_retrocbox').checked==true) { 
	// alert("box is chcked");
	$('#'+gr+'_retro').removeClass('d-none');} 
    else { 
	// alert("box is not chcked");
	$('#'+gr+'_retro').addClass('d-none'); 
    }
}

function rotate(new_lagna_view) {
    curr_h1_rashi_num = new_lagna_view.toString();
    // console.log('new_lagna_view isnow ' + new_lagna_view );
    // console.log("ascendant_rashi_num:" + ascendant_rashi_num);
    // set the rashi num for the houses
    for (let house=1; house<=12; house++) {
	curr_rashi = document.getElementById('rashi_in_h'+ house.toString()).innerHTML;
	new_rashi = ((parseInt(curr_rashi)+new_lagna_view-1)%12); 
	if (new_rashi==0) { new_rashi=12;}
	document.getElementById('rashi_in_h'+ house.toString()).innerHTML = new_rashi.toString();
    }
    // now populate grahas wher they belong
    populate_graha_in_rashi();
    //
    // change Grahas  CG in two steps
    // step-1: collect current graha data
    // const curr_gr = { };
    // for (let i=1; i<=12; i++) {
    //     curr_gr[i.toString()] = document.getElementById('h'+ i.toString()).innerHTML;
    // }
    // alert(JSON.stringify(curr_gr));
    // step-2: move new data into the house
    // for (let i=1; i<=12; i++) {
    //     n_val = ((i+n-1)%12); if (n_val==0) { n_val=12;}
    //     document.getElementById('h'+ i.toString()).innerHTML = curr_gr[n_val.toString()];
    //     // document.getElementById('r'+ i.toString()).setAttribute('onclick','rotate('+i+');');
    // }
    // change gochar-Grahas CGG in two steps
    // step-1: collect current gochar-graha data
    const curr_ggr = { };
    for (let i=1; i<=12; i++) {
	curr_ggr[i.toString()] = document.getElementById('gh'+ i.toString()).innerHTML;
    }
    // step-2: move new data into the house
    for (let i=1; i<=12; i++) {
	n_val = ((i+new_lagna_view-1)%12); if (n_val==0) { n_val=12;}
	document.getElementById('gh'+ i.toString()).innerHTML = curr_ggr[n_val.toString()];
    }
}

