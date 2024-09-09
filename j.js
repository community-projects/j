
function update_settings(){
    let grList = ["Lagna","Sun","Moon","Mercury","Mars",
	"Saturn","Venus","Jupiter","Rahu"];
    for (gr of grList) {
	c_gr = gr.slice(0,2);
	c_deg = divisional_data['d1']['degree_of_grahas'][c_gr][0];
	c_min = divisional_data['d1']['degree_of_grahas'][c_gr][1];
	c_sec = divisional_data['d1']['degree_of_grahas'][c_gr][2];
	document.getElementById(c_gr.toLowerCase()+'_deg').value = c_deg;
	document.getElementById(c_gr.toLowerCase()+'_min').value = c_min;
	document.getElementById(c_gr.toLowerCase()+'_sec').value = c_sec;
    }
    //
    for (gr of retro_planet_list) {
	document.getElementById(gr+'_retrocbox').checked=true;
    }
    d1_rashiNum_asc = divisional_data['d1']['rashiNum_asc'];
    // console.log(divisional_data);
    for (let house=1; house<=12; house++) {
	// get rashi in the house
	var house_rashiNum = (parseInt(d1_rashiNum_asc)+house-1)%12;
	if (house_rashiNum==0) {house_rashiNum=12};
	if (house_rashiNum==d1_rashiNum_asc) 
	    document.getElementById('lagna').value = house_rashiNum;
	// console.log("house_rashiNum is now : " + house_rashiNum);
	for (graha of divisional_data['d1']['grahas_in_rashi'][parseInt(house_rashiNum)])  {
	    if (graha=='La' || graha=='Ke') continue;
	    document.getElementById('h_'+ graha.toLowerCase()).value = "h" + house_rashiNum;
	}
    }
}

function disp_degree(action) {
    if (typeof l_out['settings'] === 'undefined') { initialize_l_out(); }
    if (action==='show') { 
	$('#hide_degree').removeClass('d-none');
	$('#show_degree').addClass('d-none');
	l_out['settings']['disp_degree']=1;
    } else {
	$('#hide_degree').addClass('d-none');
	$('#show_degree').removeClass('d-none');
	l_out['settings']['disp_degree']=0;
    }
    var all_inputs = document.querySelectorAll('.deg');
    for (x = 0 ; x < all_inputs.length ; x++){
	myid = all_inputs[x].getAttribute("id");
	if (action==='show') { $('#'+myid).removeClass('d-none');}
	else { $('#'+myid).addClass('d-none');}
    }
    // console.log("disp_degree");
    // console.log(l_out);
}

function disp_rotate_links(action) {
    if (action==='show') { 
	$('#hide_rotate_links').removeClass('d-none');
	$('#show_rotate_links').addClass('d-none');
    } else {
	$('#hide_rotate_links').addClass('d-none');
	$('#show_rotate_links').removeClass('d-none');
    }
    var all_inputs = document.querySelectorAll('.rot');
    for (x = 0 ; x < all_inputs.length ; x++){
	myid = all_inputs[x].getAttribute("id");
	if (action==='show') { $('#'+myid).removeClass('d-none');}
	else { $('#'+myid).addClass('d-none');}
    }
}

function choose_view_generate_form(loc) {
    if (loc.length==0) { loc='00';}
    return '<span class=\'h5 text-danger font-weight-bold\'>'
    + 'Choose View</span><br>'
    + '<span onclick="clear_all_view_divs(\''+loc+'\');" class="m-1 btn btn-link border border-danger">Clear-test</span>'
    + '<span onclick="view_d1(\''+loc+'\');" class="m-1 btn btn-link border border-danger">D1-View</span>'
    + '<span onclick="view_d9(\''+loc+'\');" class="m-1 btn btn-link border border-danger">D9-View</span>';
}

function process_jh_freeForm_settings() {
    document.getElementById('modalB').style.display = 'none';
    var tarea0 = document.getElementById('free_form_settings').value.split('\n');
    // let deg = document.getElementById(gr.toLowerCase()+'_deg').value; 
    let i = 0;
    var x_loc='00';
    let grList = ["Lagna","Sun","Moon","Mercury","Mars",
	"Saturn","Venus","Jupiter","Rahu"];
    const rasiNumByName = { "Mesh":"1", "Vrish":"2", "Mith":"3", "Kark":"4", "Simh":"5", "Kanya":"6", 
	"Tula":"7", "Vrisch":"8", "Dhanu":"9", "Makar":"10", "Kumbh":"11", "Meen":"12"
    };
    if (typeof divisional_data['d1'] === 'undefined') { initialize_div_d1(); }
    if (typeof l_out[x_loc] === 'undefined') { initialize_l_out(x_loc); }
    // if (typeof divisional_data['d1'] === 'undefined') { divisional_data['d1'] = {}; }
    // if (typeof divisional_data['d1']['grahas_in_rashi'] === 'undefined') { 
	// divisional_data['d1']['grahas_in_rashi']={};
    // }
    // if (typeof divisional_data['d1']['degree_of_grahas'] === 'undefined') { 
	// divisional_data['d1']['degree_of_grahas']={};
    // }
    //
    for (let raNum=1; raNum<=12; raNum++) { grahas_in_rashi[raNum.toString()]=[]; }
    //
    while (i < tarea0.length) {
	var lineArray = tarea0[i].split(/(\s+)/);
	// console.log(tarea0[i]);
	// console.log(lineArray);
	// Saturn (R) - MK          8 Mith 57' 51.78"   Ardr      1    Mith   Dhanu
	// Lagna                   12 Dhanu 13' 01.23"  Mool      4    Dhanu  Kark
	//[ "Lagna", "  ", "12", " ", "Dhanu", " ", "13' 01.23\"  Mool", "      ", "4", "    ", "Dhanu", "  ", "Kark" ]
	let c_gr = lineArray[0];
	if (grList.includes(c_gr)) {
	    // console.log(lineArray);
	    // console.log(c_gr + " is graha");
	    var c_rashinum = ''; var c_gr_x ='';
	    var c_deg =''; var c_min =''; var c_sec ='';
	    var k = 0;
	    while (k < lineArray.length) {
		// console.log(k + " is now k");
		if (lineArray[k] in  rasiNumByName) {
		    c_rashinum = rasiNumByName[lineArray[k]];
		    c_deg = lineArray[k-2];
		    c_min = lineArray[k+2].replace(/\D/g,''); // strip non digits 
		    c_sec = lineArray[k+4].replace(/["]+/g,''); // remove double quotes
		    c_gr_x = c_gr.slice(0,2);
		    if (c_gr_x == "La") {
			rashiNum_asc = c_rashinum.toString();
			divisional_data['d1']['rashiNum_asc'] = c_rashinum;
			l_out[x_loc]['rashiNum_asc'] = c_rashinum;
		    }
		    // console.log( "Gr:"+ c_gr_x + " - "+c_rashinum + "Rashi @ "+ c_deg + ":" + c_min + ":" + c_sec);
		    document.getElementById(c_gr_x.toLowerCase()+'_deg').value = c_deg;
		    document.getElementById(c_gr_x.toLowerCase()+'_min').value = c_min;
		    document.getElementById(c_gr_x.toLowerCase()+'_sec').value = c_sec;
		    degree_of_grahas[c_gr_x] = [];
		    degree_of_grahas[c_gr_x][0]=c_deg;
		    degree_of_grahas[c_gr_x][1]=c_min;
		    degree_of_grahas[c_gr_x][2]=c_sec;
		    divisional_data['d1']['degree_of_grahas']=degree_of_grahas;
		    l_out[x_loc]['degree_of_grahas']=degree_of_grahas;
		    if (c_gr_x != "La") { 
			grahas_in_rashi[c_rashinum].push(c_gr_x); 
			divisional_data['d1']['grahas_in_rashi']=grahas_in_rashi;
			l_out[x_loc]['grahas_in_rashi']=grahas_in_rashi;
		    }
		    // if Retro mark as required and update arrays as needed
		    if (tarea0[i].includes("(R)")) {
			retro_planet_list.push(c_gr_x);
			document.getElementById(c_gr_x+'_retrocbox').checked=true;
		    }
		    //
		    if (c_gr_x == "Ra") {
			// find the 7th house from Ra house - for Ke house
			var ke_rashinum = (parseInt(c_rashinum)+6)%12;
			if (ke_rashinum==0) { ke_rashinum=12; }
			grahas_in_rashi[ke_rashinum.toString()].push('Ke');
			divisional_data['d1']['grahas_in_rashi']=grahas_in_rashi;
			l_out[x_loc]['grahas_in_rashi']=grahas_in_rashi;
		    }
		    break;
		}
		k++;
		if (tarea0[i].includes("-")) { if (k>11) break;
		} else { if (k>9) break; }
	    }
		    
	} 
	i++;
    }
    l_out[x_loc]['rashiNum_h1'] = rashiNum_asc
    l_out[x_loc]['chart_title'] = 'D1';
    // console.log(rashiNum_asc);
    // console.log(grahas_in_rashi);
    // console.log(degree_of_grahas);
    // display_saved_degree();
    // place_rashi_num_in_houses(rashiNum_asc);
    // populate_graha_in_rashi();
    // chart_d1();
    view_1x1(x_loc);
    // change settings of Gr drop down menu values
    var arn = rashiNum_asc;
    var gir = grahas_in_rashi;
    var dog = degree_of_grahas;
    //
    for (let house=1; house<=12; house++) {
	// get rashi in the house
	house_rashinum = document.getElementById('rashi_in_h'+ house.toString()+'_'+x_loc).innerHTML;
	// console.log(house_rashinum + " is now house_rashinum");
	if (house_rashinum==rashiNum_asc) 
	    document.getElementById('lagna').value = house_rashinum;
	for ( graha of gir[house_rashinum])  {
	    if (graha=='La' || graha=='Ke') continue;
	    // console.log("graha is now " + graha);
	    // console.log("settting h_" + graha.toLowerCase().value + " to h" + house_rashinum);
	    document.getElementById('h_'+ graha.toLowerCase()).value = "h" + house_rashinum;
	}
    }
    calc_d9();
    // console.log("l_out here");
    // console.log(l_out);
    // console.log("divisional here");
    // console.log(divisional_data);
}


function openFile() {
      var input = document.getElementById("file-input");
      input.click();
}


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
	font_size[inputs[x].id] = inputs[x].style.fontSize;
	// alert(parseFloat(fontSize));
	// inputs[x].style.fontSize = fontSize + "4px";
	// inputs[x].style.fontSize = fontSize + "10%";
    }
    l_out_save_fontSize();
    // console.log(font_size);
}

function l_out_save_fontSize() {
    var s_loc="";
    if (curr_layout_name==='1x1') s_loc='00';
    if (curr_layout_name==='1x2') s_loc='11';
    if (curr_layout_name==='2x2') s_loc='211';
    // save rashinum fontsize
    // <div class="rb3 h5 rashinum font-weight-bold text-black" 
    // style="z-index:2;font-size: 120%; " id="rashi_in_h3_00">1</div>
    if (typeof l_out['fontSize'] === 'undefined') { l_out['fontSize']={}; }
    if (typeof l_out['fontSize'][curr_layout_name] === 'undefined') { l_out['fontSize'][curr_layout_name]=[]; }
    l_out['fontSize'][curr_layout_name][0] = document.getElementById("rashi_in_h1_"+s_loc).style.fontSize;
    // save graha fontsize
    // <span class="lh-sm my-0 py-0 h3 graha font-weight-bold text-success" 
    // style="line-height:90%;font-size: 180%;" id="Ve"><br class="p-0 m-0">Ve</span>
    l_out['fontSize'][curr_layout_name][1] = document.getElementById("h1_"+s_loc).style.fontSize;
}

function change_view(viewObj) {
    let n_view = viewObj.value;
    // let o_view = viewObj.oldvalue;
    // console.log("Changing from view:" + viewObj.oldvalue + " to view: " + n_view);
    // console.log(views[n_view]);
    // save_view(o_view);
    document.getElementById('j_comments').value = views[n_view]['j_comments'];
    document.getElementById('j_notes').value = views[n_view]['j_notes'];
    document.getElementById('j_title').value = views[n_view]['j_title'];
    curr_drawing_idList = views[n_view]['drawing_idList'];
    document.getElementById('j_drawings').innerHTML = "";
    document.getElementById('title').innerHTML = n_view + '-Title';
    document.getElementById('comments').innerHTML = n_view + '-Comments';
    document.getElementById('notes').innerHTML = n_view + '-Notes';
    document.getElementById('drawings').innerHTML = n_view + '-Drawings';
    if (curr_drawing_idList.length>0) {
	for (d_id of curr_drawing_idList) 
	    document.getElementById('j_drawings').innerHTML += return_drawing_btnStr(d_id);
    }
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
    curr_drawing_idList = [];
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



function return_drawing_btnStr(d_id) {
    let c_btn_str = "";
    c_btn_str += '<btn ';
    c_btn_str += ' id="b'+d_id+'" ';
    c_btn_str += ' onclick=disp_drawing(\''+d_id+'\'); ';
    c_btn_str += ' class="small font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
    c_btn_str += d_id;
    c_btn_str += '</btn>';
    c_btn_str += '<img id="del_'+d_id+'" ';
    c_btn_str += ' onclick="del_drawing(\''+d_id+'\');"'; 
    c_btn_str += ' class="ml-0 mr-1" src="images/clear.png" height="11"/></span>';
    return c_btn_str;
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
//     // document.getElementById('j_view_formats').innerHTML += btn_str;
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
    // if (document.getElementById('j_drawings').innerHTML) {
	// views[view]["j_drawings"] = document.getElementById('j_drawings').innerHTML;
    // } else { views[view]["j_drawings"] = ""; }
    // console.log(views);
    views[view]['drawing_idList'] = curr_drawing_idList;
}

// function save_view() {
//     var currentdate = new Date();
//     let view = 'v'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
//     if (document.getElementById('j_view').value) {
// 	view = document.getElementById('j_view').value;
//     } 
//     views[view] = {};
//     if (document.getElementById('j_notes').value) {
// 	views[view]["j_notes"] = document.getElementById('j_notes').value;
//     } else { views[view]["j_notes"] = "NONE"; }
//     if (document.getElementById('j_title').value) {
// 	views[view]["j_title"] = document.getElementById('j_title').value;
//     } else { views[view]["j_title"] = "NONE"; }
//     if (document.getElementById('j_comments').value) {
// 	views[view]["j_comments"] = document.getElementById('j_comments').value;
//     } else { views[view]["j_comments"] = "NONE"; }
//     views[view]["j_drawings"] = document.getElementById('j_drawings').innerHTML;
//     views[view]['drawing_idList'] = curr_drawing_idList;
//     // console.log(views);
// }

function del_drawing(d_id) {
    let cDiv = document.getElementById('b'+ d_id);
    if (cDiv) cDiv.parentNode.removeChild(cDiv);
    cDiv = document.getElementById('del_'+ d_id);
    if (cDiv) cDiv.parentNode.removeChild(cDiv);
    delete drawings[d_id];
    // console.log(drawings);
}


function save_drawing() {
    if (typeof drawings_arr == 'undefined') { drawings_arr=['printme']; }
    var currentdate = new Date();
    var drawing_id = 'd'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
    // console.log(drawing_id); // For debugging. 
    drawings_arr.push(drawing_id);
    var btn_str = '';
    // console.log("length of drawings is " + Object.keys(drawings).length);
    if (Object.keys(drawings).length>0 && Object.keys(drawings).length % 5 === 0) {
 	btn_str += '<br>';
 	// console.log(btn_str);
    }
    curr_drawing_idList.push(drawing_id);
    document.getElementById('j_drawings').innerHTML += return_drawing_btnStr(drawing_id);
    // save lines from current drawing
    drawings[drawing_id] = {};
    // drawings[drawing_id]['lines'] = lines;
    drawings[drawing_id]['curr_layout_name'] = curr_layout_name;
    drawings[drawing_id]['title'] = drawing_id;
    drawings[drawing_id]['lines'] = structuredClone(lines);
    drawings[drawing_id]['lines_by_color'] = structuredClone(lines_by_color);
    //
    drawings[drawing_id]["degree_of_grahas"] = degree_of_grahas;
    // drawings[drawing_id]["rashiNum_asc"] = rashiNum_asc;
    drawings[drawing_id]["comments"] = document.getElementById('j_comments').value;
    drawings[drawing_id]["rashiNum_h1"] = {};
    drawings[drawing_id]["rashiNum_asc"] = {};
    drawings[drawing_id]["grahas_in_rashi"] = {};
    drawings[drawing_id]["degree_of_grahas"] = {};
    drawings[drawing_id]['chart_title'] = {};
    // console.log(l_out);
    for (xloc of l_out['locList'][curr_layout_name]) {
	drawings[drawing_id]["rashiNum_h1"][xloc] = 
	    document.getElementById('rashi_in_h1_'+xloc).innerHTML;
	drawings[drawing_id]["rashiNum_asc"][xloc] = l_out[xloc]['rashiNum_asc'];
	drawings[drawing_id]["grahas_in_rashi"][xloc] = l_out[xloc]["grahas_in_rashi"];
	drawings[drawing_id]["degree_of_grahas"][xloc] = l_out[xloc]["degree_of_grahas"];
	drawings[drawing_id]["chart_title"][xloc] = l_out[xloc]["chart_title"];
    }
    // console.log(curr_drawing_idList);
    // console.log(drawings);
}


function save_drawing0() {
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
    // btn_str += '<btn ';
    // btn_str += ' id="b'+drawing_id+'" ';
    // btn_str += ' onclick=disp_drawing(\''+drawing_id+'\'); ';
    // btn_str += ' class="small font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
    // btn_str += drawing_id;
    // // 17/1/2024 @ 10:39:55
    // // var currentdate = new Date();
    // // btn_str += + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "
    // //       + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    // btn_str += '</btn>';
    // btn_str += '<img id="del_'+drawing_id+'" ';
    // btn_str += ' onclick="del_drawing(\''+drawing_id+'\');"'; 
    // btn_str += ' class="ml-0 mr-1" src="images/clear.png" height="11"/></span>';
    curr_drawing_idList.push(drawing_id);
    // document.getElementById('j_view_formats').innerHTML += btn_str;
    // document.getElementById('j_drawings').innerHTML += btn_str;
    document.getElementById('j_drawings').innerHTML += return_drawing_btnStr(drawing_id);
    // if (drawings_arr.length==2) { $('#j_view_formats').removeClass('d-none');}
    // save lines from current drawing
    drawings[drawing_id] = {};
    // drawings[drawing_id]['lines'] = lines;
    drawings[drawing_id]['curr_layout_name'] = curr_layout_name;
    drawings[drawing_id]['title'] = drawing_id;
    drawings[drawing_id]['lines'] = structuredClone(lines);
    drawings[drawing_id]['lines_by_color'] = structuredClone(lines_by_color);
    //
    drawings[drawing_id]["grahas_in_rashi"] = grahas_in_rashi;
    drawings[drawing_id]["degree_of_grahas"] = degree_of_grahas;
    // drawings[drawing_id]["rashiNum_asc"] = rashiNum_asc;
    drawings[drawing_id]["comments"] = document.getElementById('j_comments').value;
    drawings[drawing_id]["rashiNum_h1"] = {};
    drawings[drawing_id]["rashiNum_asc"] = {};
    for (xloc of l_out['locList'][curr_layout_name]) {
	drawings[drawing_id]["rashiNum_h1"][xloc] = 
	    document.getElementById('rashi_in_h1_'+xloc).innerHTML;
	drawings[drawing_id]["rashiNum_asc"][xloc] = l_out[xloc]['rashiNum_asc'];
    }
    // console.log(drawings);
    // console.log(curr_drawing_idList);
}

function undo_stroke(){
    clear_canvas();
    // console.log(lines);
    lines = lines.slice(0,-2)
    lines_by_color = lines_by_color.slice(0,-2)
    // const index = array.indexOf(lines.length);
    // if (index > -1) {
    //       array.splice(index, 1); // 1 means remove one item only
    // }
    // console.log(lines);
    draw_saved_strokes();
    // console.log("just popped");
}

function draw_saved_strokes() {
    if (lines_by_color.length>0) {
	let old_xcoord = 0; 
	let old_ycoord=0; let strokeColor='red';
	let c_canvas_height = 0; let c_canvas_width=0;
	for (c_line in lines_by_color) {
	    strokeColor=lines_by_color[c_line]['color'];
	    strokeColor=lines_by_color[c_line]['color'];
	    c_canvas_height=lines_by_color[c_line]['canvas_dims'][0];
	    c_canvas_width=lines_by_color[c_line]['canvas_dims'][1];
	    y_ratio = canvas.width/c_canvas_width;
	    x_ratio = canvas.height/c_canvas_height;
	if (lines_by_color[c_line]['coords'].length==0) continue;
	    old_xcoord = Math.floor(lines_by_color[c_line]['coords'][0][0]  * x_ratio);
	    old_ycoord = Math.floor(lines_by_color[c_line]['coords'][0][1]  * y_ratio);
	    for (let e=1;e<lines_by_color[c_line]['coords'].length;e++) {
		// console.log(e);
		new_xcoord = Math.floor(lines_by_color[c_line]['coords'][e][0] * x_ratio);
		new_ycoord = Math.floor(lines_by_color[c_line]['coords'][e][1] * y_ratio);
		ctx.beginPath();
		// getPosition(event);
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = strokeColor;
		ctx.moveTo(old_xcoord, old_ycoord);
		ctx.lineTo(new_xcoord, new_ycoord);
		ctx.stroke();
		old_xcoord = new_xcoord;
		old_ycoord = new_ycoord;
	    }
	}
    }
}

function draw_saved_strokes1() {
    // version 1 using efficient code - but still no color
    if (lines.length>0) {
	let old_xcoord = 0; let old_ycoord=0;
	for (c_line in lines) {
	    old_xcoord = lines[c_line][0][0];
	    old_ycoord = lines[c_line][0][1];
	    for (let e=1;e<lines[c_line].length;e++) {
		// console.log(e);
		new_xcoord = lines[c_line][e][0];
		new_ycoord = lines[c_line][e][1];
		ctx.beginPath();
		// getPosition(event);
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = strokeColor;
		ctx.moveTo(old_xcoord, old_ycoord);
		ctx.lineTo(new_xcoord, new_ycoord);
		ctx.stroke();
		old_xcoord = new_xcoord;
		old_ycoord = new_ycoord;
	    }
	}
    }
}

function draw_saved_strokes0() {
    // version 0 using less efficient code
    if (lines.length>0) {
	let old_xcoord = 0; let old_ycoord=0;
	for (c_line in lines) {
	    // console.log(lines[c_line]);
	    for (e in lines[c_line]) {
		// console.log(e);
		new_xcoord = lines[c_line][e][0];
		new_ycoord = lines[c_line][e][1];
	// console.log("new_xcoord " + new_xcoord + " new_ycoord " + new_ycoord); 
		ctx.beginPath();
		// getPosition(event);
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = strokeColor;
		if (old_xcoord==0) {
		    old_xcoord = new_xcoord;
		    old_ycoord = new_ycoord;
		}
		ctx.moveTo(old_xcoord, old_ycoord);
		ctx.lineTo(new_xcoord, new_ycoord);
		ctx.stroke();
		old_xcoord = new_xcoord;
		old_ycoord = new_ycoord;
	    }
	    old_xcoord = 0; old_ycoord=0;
	}
    }
}

function update_obs_title(d_id) {
    document.getElementById('modal2B').style.display = 'none';
    drawings[d_id]['title'] = document.getElementById('new_obs_title').value;
    document.getElementById('j_comm_title').innerHTML = document.getElementById('new_obs_title').value;
}

function obs_update_title_form(d_id) {
    document.getElementById('modal2B').style.display = 'block';
    // document.getElementById('modal2M').innerHTML  = '<div class="h5 font-weight-bold text-black"> Rename Observation Title:</div>';
    // document.getElementById('modal2M').innerHTML  += '<input id="new_obs_title" type="text" value="'+ d_id +'" ';
    // document.getElementById('modal2M').innerHTML  += ' class="text-primary font-weight-bold h6"/>';
    document.getElementById('modal2M').innerHTML  = '<div class="h5 font-weight-bold text-black"> Rename Observation Title:</div>';
    document.getElementById('modal2M').innerHTML  += '<input id="new_obs_title" type="text" value="'+ drawings[d_id]['title'] +'" class="text-primary font-weight-bold h6"/>';
    document.getElementById('modal2M').innerHTML  += '<span class="btn btn-primary" onclick="update_obs_title(\''+d_id +'\');">Update</span>';
}

function disp_layout(l_view) {
    if (l_view==='1x1') { view_1x1(); }
    if (l_view==='1x2') { view_1x2(); }
    if (l_view==='2x2') { view_2x2(); }
}

function disp_drawing(c_drawing_id){
    let l_data = drawings[c_drawing_id];
    if ("curr_layout_name" in l_data) {
	curr_layout_name = l_data["curr_layout_name"];
    }
    if ("rashiNum_asc" in l_data) {
	for (xloc of l_out['locList'][curr_layout_name]) {
	    l_out[xloc]['rashiNum_asc'] = drawings[c_drawing_id]["rashiNum_asc"][xloc];
	}
    }
    if ("title" in l_data) {
	document.getElementById('j_comm_title').innerHTML =  l_data["title"];
	btn_str = '<img ';
	btn_str += ' onclick="obs_update_title_form(\''+c_drawing_id+'\');" ';
	btn_str += ' class="ml-0 mr-1" src="images/edit.png" height="11"/>';
	document.getElementById('j_comm_title').innerHTML += btn_str;
    } else {
	drawings[c_drawing_id]["title"] = c_drawing_id;
	btn_str = '<img ';
	btn_str += ' onclick="obs_update_title_form(\''+c_drawing_id+'\');" ';
	btn_str += ' class="ml-0 mr-1" src="images/edit.png" height="11"/>';
	document.getElementById('j_comm_title').innerHTML += btn_str;
    }
    if ("comments" in l_data) {
	document.getElementById('j_comments').value =  l_data["comments"];
    }
    if ("rashiNum_h1" in l_data) {
	for (xloc of l_out['locList'][curr_layout_name]) {
	    l_out[xloc]['rashiNum_h1'] = drawings[c_drawing_id]["rashiNum_h1"][xloc];
	}
    }
    if ("retro_planet_list" in l_data) {
	retro_planet_list = l_data["retro_planet_list"];
    }
    // let grahas_in_rashi = {}
    if ("degree_of_grahas" in l_data) {
	// degree_of_grahas = l_data["degree_of_grahas"];
	for (xloc of l_out['locList'][curr_layout_name]) {
	    l_out[xloc]['degree_of_grahas'] = drawings[c_drawing_id]["degree_of_grahas"][xloc];
	}
    }
    if ("chart_title" in l_data) {
	// console.log("chart_title is " + chart_title);
	for (xloc of l_out['locList'][curr_layout_name]) {
	    l_out[xloc]['chart_title'] = drawings[c_drawing_id]["chart_title"][xloc];
	    create_chart_title_div(xloc);
	}
    }
    if ("grahas_in_rashi" in l_data) {
	for (xloc of l_out['locList'][curr_layout_name]) {
	    l_out[xloc]['grahas_in_rashi'] = drawings[c_drawing_id]["grahas_in_rashi"][xloc];
	}
    }
    if ("lines_by_color" in l_data) {
	// lines_by_color = l_data['lines_by_color'];
	// lines_by_color = Object.assign({}, l_data['lines_by_color']);
	lines_by_color =  JSON.parse(JSON.stringify(l_data['lines_by_color']));
	clear_canvas();
	// redraw the lines from memory
	draw_saved_strokes();
    }
    $('#bprintme').removeClass('bg-warning');
    for (p in drawings) { 
	// $('#'+p).addClass('d-none');
	$('#b'+p).removeClass('bg-warning');
    } 
    // $('#'+c_drawing_id).removeClass('d-none');
    $('#b'+c_drawing_id).addClass('bg-warning');
    disp_layout(curr_layout_name);
}

function change_ascendant(new_asc) {
    // console.log(new_asc);
    rashiNum_asc = new_asc.toString();
    rashiNum_h1 = new_asc.toString();
    place_rashi_num_in_houses(rashiNum_asc);
    // for(let i=1; i<=12; i++) { 
    //     var rnum = (parseInt(rashiNum_asc)+i-1)%12;
    //     if (rnum==0) {rnum=12};
    //     // change rashinum in this house
    //     document.getElementById('rashi_in_h'+i.toString()).innerHTML = rnum.toString(); 
    // }
    // 
    // now populate grahas wher they belong
    populate_graha_in_rashi();
}



function display_all_graha_degree(loc) {
    if (loc.length==0) { loc='00';}
    var c_dog = l_out[loc]['degree_of_grahas'];
    // "degree_of_grahas": { "La": [ "15", "58", "37.09" ]} deg,min,sec 
    // 
    for (const c_gr in c_dog) { 
	document.getElementById(c_gr.toLowerCase()+'_deg_'+loc).value = 
	    c_dog[c_gr][0]; 
	document.getElementById(c_gr.toLowerCase()+'_min_'+loc).value = 
	    c_dog[c_gr][1]; 
	document.getElementById(c_gr.toLowerCase()+'_sec_'+loc).value = 
	    c_dog[c_gr][2]; 
    }
}




function display_saved_degree(c_dog={}) {
    // console.log(c_dog);
    let d1_data=0;
    if (Object.keys(c_dog).length==0)  {
	c_dog=degree_of_grahas;
	d1_data=1;
    }
    // console.log(d1_data);
    for (const c_gr in c_dog) { 
	document.getElementById(c_gr.toLowerCase()+'_deg').value = 
	    c_dog[c_gr][0]; 
	document.getElementById(c_gr.toLowerCase()+'_min').value = 
	    c_dog[c_gr][1]; 
	document.getElementById(c_gr.toLowerCase()+'_sec').value = 
	    c_dog[c_gr][2]; 
    }
    // now populate grahas where they belong
    if (d1_data==1) populate_graha_in_rashi();
}

function populate_all_graha_in_rashi(loc="") {
    //
    // console.log("populate_all_graha_in_rashi - l_out");
    // console.log(l_out);
    if (loc.length==0) { loc='00';}
    var c_arn = l_out[loc]['rashiNum_asc'];
    var c_gir = l_out[loc]['grahas_in_rashi'];
    var c_dog = l_out[loc]['degree_of_grahas'];
    // console.log(c_gir);
    //
    var rashiIdSuffix = "";
    for (let house=1; house<=12; house++) {
	// get rashi in the house
	if (loc.length==0) {
	    rashiIdSuffix = house.toString();
	} else {
	    rashiIdSuffix = house.toString() + "_" + loc;
	    c_dog = {};
	}
	house_rashi = document.getElementById('rashi_in_h'+ rashiIdSuffix).innerHTML;
	// empty graha from house innerHTML
	document.getElementById('h'+ rashiIdSuffix).innerHTML = '';
	// if ASC mark it so
	// if (house_rashi==rashiNum_asc.toString()) 
	//     document.getElementById('h'+ rashiIdSuffix).innerHTML += '<br><b>ASC</b>';
	if (house_rashi==c_arn.toString()) 
	    document.getElementById('h'+ rashiIdSuffix).innerHTML += generate_string_gr_deg('La',loc);
	if (typeof c_gir[house_rashi.toString()]!== 'undefined') {
	    for ( graha of c_gir[house_rashi.toString()])  {
		if (graha=='La') { continue; }
		document.getElementById('h'+ rashiIdSuffix).innerHTML += generate_string_gr_deg(graha,loc);
		if (retro_planet_list.includes(graha)) 
		    document.getElementById('h'+ rashiIdSuffix).innerHTML +=
			"<span id='sa_retro' class='h6 text-danger border-danger'>(R)</span>";
	    }
	}
	// // restore the graha font size if it was changed
	// var inputs = document.getElementsByClassName('graha');
	// for (x = 0 ; x < inputs.length ; x++){
	    // if (inputs[x].id in font_size) 
	    // if (loc.length>0) {
		// inputs[x].style.fontSize =  (parseFloat(inputs[x].style.fontSize)- 10) + '%'; 
	    // } else {
		// inputs[x].style.fontSize = font_size[inputs[x].id];
	    // }
	// }
    }
}



function populate_graha_in_rashi(c_arn="",c_gir={},c_dog={},loc="") {
    //
    if (c_arn.length==0) c_arn = rashiNum_asc.toString();
    if (Object.keys(c_gir).length==0) c_gir = grahas_in_rashi;
    if (Object.keys(c_dog).length==0)  c_dog=degree_of_grahas;
    // console.log(c_gir);
    //
    var rashiIdSuffix = "";
    for (let house=1; house<=12; house++) {
	// get rashi in the house
	if (loc.length==0) {
	    rashiIdSuffix = house.toString();
	} else {
	    rashiIdSuffix = house.toString() + "_" + loc;
	    c_dog = {};
	}
	house_rashi = document.getElementById('rashi_in_h'+ rashiIdSuffix).innerHTML;
	// empty graha from house innerHTML
	document.getElementById('h'+ rashiIdSuffix).innerHTML = '';
	// if ASC mark it so
	// if (house_rashi==rashiNum_asc.toString()) 
	//     document.getElementById('h'+ rashiIdSuffix).innerHTML += '<br><b>ASC</b>';
	if (house_rashi==c_arn.toString()) 
	    document.getElementById('h'+ rashiIdSuffix).innerHTML += format_graha('La',c_dog);
	if (typeof c_gir[house_rashi.toString()]!== 'undefined') {
	    for ( graha of c_gir[house_rashi.toString()])  {
		if (graha=='La') { continue; }
		document.getElementById('h'+ rashiIdSuffix).innerHTML += format_graha(graha,c_dog);
		if (retro_planet_list.includes(graha)) 
		    document.getElementById('h'+ rashiIdSuffix).innerHTML +=
			"<span id='sa_retro' class='h6 text-danger border-danger'>(R)</span>";
	    }
	}
	// restore the graha font size if it was changed
	var inputs = document.getElementsByClassName('graha');
	for (x = 0 ; x < inputs.length ; x++){
	    if (inputs[x].id in font_size) 
	    if (loc.length>0) {
		inputs[x].style.fontSize =  (parseFloat(inputs[x].style.fontSize)- 10) + '%'; 
	    } else {
		inputs[x].style.fontSize = font_size[inputs[x].id];
	    }
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
    if (typeof divisional_data['d1'] === 'undefined') { divisional_data['d1'] = {}; }
    if (typeof divisional_data['d1']['grahas_in_rashi'] === 'undefined') { 
	divisional_data['d1']['grahas_in_rashi']={};
    }
    // console.log(grahas_in_rashi);
    // find rashi of the house
    rashi_in_h1= document.getElementById('rashi_in_h1').innerHTML;
    c_rashi=((parseInt(rashi_in_h1)+parseInt(house.substring(1))-1)%12); if (c_rashi==0) { c_rashi=12;}
    // console.log(c_rashi.toString());
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
    divisional_data['d1']['grahas_in_rashi'][c_rashi.toString()].push(graha);
    // console.log(grahas_in_rashi);
}

function save_details() {
    save_view();
    const saveMe = {};
    saveMe["rashiNum_asc"] = rashiNum_asc.toString();
    saveMe["divisional_data"] = divisional_data;
    saveMe["l_out"] = l_out;
    // saveMe["rashiNum_h1"] = document.getElementById('rashi_in_h1').innerHTML;
    // 
    saveMe["grahas_in_rashi"] = grahas_in_rashi;
    saveMe["degree_of_grahas"] = degree_of_grahas;
    saveMe["views"] = views;
    saveMe["retro_planet_list"] = retro_planet_list;
    // get fileName, title and Notes
    if (document.getElementById('j_filename').value) {
	var j_filename = document.getElementById('j_filename').value;
    } else { j_filename = "UnKnown"; }
    saveMe["j_filename"] = j_filename;
    //
    saveMe["j_title"] = views['Basic']['j_title'];
    saveMe["j_comments"] = views['Basic']['j_comments'];
    saveMe["j_notes"] = views['Basic']['j_notes'];
    // saveMe["j_drawings"] = views['Basic']['j_drawings'];
    saveMe["drawing_idList"] = curr_drawing_idList;
    //
    if (typeof drawings == 'undefined') { drawings={}; }
    if (Object.keys(drawings).length>0) saveMe["drawings"] = drawings;
    //
    return saveMe;
}

function saveData() {
    var saved_details = save_details();
    let saveMeStr = JSON.stringify(saved_details);
    var j_filename = document.getElementById('j_filename').value;
    download(saveMeStr, j_filename + '.jgd', 'text/plain');
}

function readMultipleFiles(e) {
  if (e.length==0) { return;};
  // console.log(e);
  for (i in e.target.files) {
      // console.log(e.target.files);
      // console.log("i is now " + i);
      if (isNaN(i)) continue;
      var file = e.target.files[i];
      var reader = new FileReader();
      reader.onload = function(e) {
	var contents = e.target.result;
	// console.log("contents:" + contents);
	//displayContents(contents);
	// loadData(contents);
	// removeAllGr();
	const l_data = JSON.parse(contents);
	loadData(l_data);
	open_files[l_data["j_filename"]]=l_data;
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
  // reader.readAsText(file);
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
  // reader.readAsText(file);
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
    // console.log("was here");
}

function reLoadData(j_filename){
    var saved_details = save_details();
    var o_filename = document.getElementById('j_filename').value;
    open_files[o_filename] = saved_details;
    const c_data =  open_files[j_filename];
    clear_canvas();
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



function generate_string_gr_deg(gr,loc) {
    var red_gr_list = ['Su', 'Ma', 'Ra', 'Ke', 'Sa'];
    var green_gr_list = ['Ju', 'Mo', 'Ve','Me'];
    //
    if (loc.length==0) { loc='00';}
    var c_dog = l_out[loc]['degree_of_grahas'];
    // display Degrees
    let degStr="";
    if (gr  in c_dog) {
	degStr += "<span id='deg_"+gr+"_"+loc+"' class='deg my-0 py-0 small font-weight-bold'>"+c_dog[gr][0]+"D</span>";
    }
    //
    if (red_gr_list.includes(gr)) 
	var returnStr = "<span class='lh-sm my-0 py-0 h3 graha font-weight-bold text-danger' "
	+ "style='line-height:90%;font-size: 180%;'";
    if (green_gr_list.includes(gr)) 
	var returnStr = "<span class='lh-sm my-0 py-0 h3 graha font-weight-bold text-success' "
	+ "style='line-height:90%;font-size: 180%;'";
    if (gr==='La') {
	var returnStr = "<span class='lh-sm my-0 py-0 h3 graha font-weight-bold' " 
	+ "style='line-height:90%;font-size: 150%;'";
	gr='ASC';
    }
    //
    returnStr += " id='"+gr+"_"+loc+"'><br class='p-0 m-0'>"+gr+"</span>";
    returnStr += degStr;
    return returnStr;
}


function format_graha(gr,c_dog={}) {
    var red_gr_list = ['Su', 'Ma', 'Ra', 'Ke', 'Sa'];
    var green_gr_list = ['Ju', 'Mo', 'Ve','Me'];
    if (Object.keys(c_dog).length==0) c_dog = degree_of_grahas;
    // display Degrees
    let degStr="";
    if (gr  in c_dog) {
	degStr += "<span class='small font-weight-bold'>"+c_dog[gr][0]+"D</span>";
    }
    //
    if (red_gr_list.includes(gr)) 
	var returnStr = "<span class='h3 graha font-weight-bold text-danger' style='font-size: 180%;'";
    if (green_gr_list.includes(gr)) 
	var returnStr = "<span class='h3 graha font-weight-bold text-success' style='font-size: 180%;'";
    if (gr==='La') {
	var returnStr = "<span class='h3 graha font-weight-bold' style='font-size: 150%;'";
	gr='ASC';
    }
    //
    returnStr += " id='"+gr+"'><br>"+gr+"</span>";
    returnStr += degStr;
    return returnStr;
}

function loadData(l_data,make_tab=1) {
    initialize_l_out();
    // const l_data = JSON.parse(contents);
    if ("rashiNum_asc" in l_data) {
	rashiNum_asc = parseInt(l_data["rashiNum_asc"]);
    }
    if ("degree_of_grahas" in l_data) {
	degree_of_grahas= l_data["degree_of_grahas"];
	// display_saved_degree();
    }
    if ("views" in l_data) {
	views = l_data["views"];
	var select = document.getElementById('j_view');
	for (v in views) {
	    if (v=='Basic') continue;
	   select.options[select.options.length] = new Option(v,v);
	}
    }
    // console.log(l_data);
    if ("retro_planet_list" in l_data) {
	retro_planet_list = l_data["retro_planet_list"];
    }
    if ("drawings" in l_data) { drawings = l_data["drawings"]; }
    if ("divisional_data" in l_data) { divisional_data = l_data["divisional_data"];}
    if ("l_out" in l_data) { 
	l_out = l_data["l_out"];
	initialize_l_out();
	update_settings();
    }
    // 
    if ("grahas_in_rashi" in l_data) {
	grahas_in_rashi = l_data["grahas_in_rashi"];
	// now populate grahas wher they belong
	// populate_graha_in_rashi();
	// calc_d9();
    }
    if ("rashiNum_h1" in l_data) {
        rashiNum_h1 = l_data["rashiNum_h1"];
        // console.log(rashiNum_h1);
        // rotate_by_rashi(parseInt(rashiNum_h1));
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
    // if ("j_drawings" in l_data) {
	// document.getElementById('j_drawings').innerHTML = l_data["j_drawings"];
    //}
    document.getElementById('j_drawings').innerHTML = "";
    if (views['Basic']['drawing_idList'].length>0) {
	curr_drawing_idList = views['Basic']['drawing_idList'];
	for (d_id of views['Basic']['drawing_idList']) 
	    document.getElementById('j_drawings').innerHTML += return_drawing_btnStr(d_id);
    }
    view_1x1('00');
    l_out_restore_fontSize();
    l_out['locList'] = {};
    l_out['locList']['1x1']=['00'];
    l_out['locList']['1x2']=['11','12'];
    l_out['locList']['2x2']=['211','212','221','222'];
    // console.log(l_out);
    set_layout_chart_positions();
}

function set_layout_chart_positions() {
    l_out['locPos'] = {};
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    // l_out['locPos'][loc] = [topPos,leftPos,width,height]
    l_out['locPos']['00'] = [0,0,width,height];
    l_out['locPos']['11'] = [0,0,width/2,height];
    l_out['locPos']['12'] = [0,width/2,width/2,height];
    l_out['locPos']['211'] = [10,0,width/2,height/2];
    l_out['locPos']['212'] = [10,width/2,width/2,height/2];
    l_out['locPos']['221'] = [height/2+10,0,width/2,height/2];
    l_out['locPos']['222'] = [height/2+10,width/2,width/2,height/2];
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
// 		     document.getElementById('j_view_formats').offsetHeight
// 	     );
// 	    canvas.id=canvas_id; 
// 	    canvas.crossOrigin = 'anonymous';
// 	    // document.getElementById('output').appendChild(canvas);
// 	    if (screenshots_arr.length==2) { $('#j_view_formats').removeClass('d-none');}
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
// 	document.getElementById('j_view_formats').innerHTML += btn_str;
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




function rotate_by_rashi(new_lagna_view,loc='00') {
    // console.log("rotate_by_rashi -- " + new_lagna_view  + " - " + loc);
    // set the rashi num for the houses
    for (let house=1; house<=12; house++) {
	new_rashi = ((house+parseInt(new_lagna_view)-1)%12); 
	if (new_rashi==0) { new_rashi=12;}
	// console.log("new_rashi of h" + house + "is" + new_rashi.toString());
	document.getElementById('rashi_in_h'+ house.toString()+'_'+loc).innerHTML = new_rashi.toString();
    }
    // console.log(l_out)
    // now populate grahas wher they belong
    l_out[loc]['rashiNum_h1'] = document.getElementById('rashi_in_h1_'+loc).innerHTML;
    populate_all_graha_in_rashi(loc);
    l_out_restore_fontSize();
    // console.log(l_out)
}



function rotate_by_house(rotate_house_count) {
    // rotate_house_count 3_11
    const rhc_split = rotate_house_count.split("_");
    var rhc= rhc_split[0];
    var loc = rhc_split[1];
    curr_rashiNum_h1 = document.getElementById('rashi_in_h1_'+loc).innerHTML;
    new_rashi = ((parseInt(curr_rashiNum_h1)+parseInt(rhc)-1)%12);
    if (curr_rashiNum_h1==0) { new_rashi=12;}
    l_out[loc]['rashiNum_h1'] = new_rashi.toString();
    // console.log("rotate_by_house: Setting rashiNum_h1 of " + loc + " to " + new_rashi.toString());
    // console.log(l_out);
    //
    // // set the rashi num for the houses
    // for (let house=1; house<=12; house++) {
	// curr_rashi = document.getElementById('rashi_in_h'+ house.toString()+'_'+loc).innerHTML;
	// new_rashi = ((parseInt(curr_rashi)+parseInt(rhc)-1)%12); 
	// if (new_rashi==0) { new_rashi=12;}
	// document.getElementById('rashi_in_h'+ house.toString()+'_'+loc).innerHTML = new_rashi.toString();
    // }
    // // now populate grahas wher they belong
    // l_out[loc]['rashiNum_h1'] = document.getElementById('rashi_in_h1_'+loc).innerHTML;
    place_rashi_num_in_houses(new_rashi.toString(),loc);
    populate_all_graha_in_rashi(loc);
    l_out_restore_fontSize();
}


function rotate_by_house0(rotate_house_count) {
    // set the rashi num for the houses
    for (let house=1; house<=12; house++) {
	curr_rashi = document.getElementById('rashi_in_h'+ house.toString()).innerHTML;
	new_rashi = ((parseInt(curr_rashi)+rotate_house_count-1)%12); 
	if (new_rashi==0) { new_rashi=12;}
	document.getElementById('rashi_in_h'+ house.toString()).innerHTML = new_rashi.toString();
    }
    // now populate grahas wher they belong
    populate_graha_in_rashi();
    rashiNum_h1 =  document.getElementById('rashi_in_h1').innerHTML;
    // // set the rashi num for the houses
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
    // const curr_ggr = { };
    // for (let i=1; i<=12; i++) {
	// curr_ggr[i.toString()] = document.getElementById('gh'+ i.toString()).innerHTML;
    // }
    // step-2: move new data into the house
    // for (let i=1; i<=12; i++) {
	// n_val = ((i+rotate_house_count-1)%12); if (n_val==0) { n_val=12;}
	// document.getElementById('gh'+ i.toString()).innerHTML = curr_ggr[n_val.toString()];
    // }
}


function disp_notes(){
    $('#drawme').removeClass('d-none'); 
    $('#notes_panel').removeClass('d-none'); 
    $('#settings_panel').addClass('d-none'); 
    $('#j_view_formats').removeClass('d-none'); 
}


function disp_settings(){
    $('#drawme').addClass('d-none'); 
    $('#settings_panel').removeClass('d-none'); 
    $('#notes_panel').addClass('d-none'); 
    $('#j_view_formats').addClass('d-none'); 
}


function save_degree(gr) {
    degree_of_grahas[gr] = []
    let deg = document.getElementById(gr.toLowerCase()+'_deg').value; 
    let min = document.getElementById(gr.toLowerCase()+'_min').value; 
    let sec = document.getElementById(gr.toLowerCase()+'_sec').value; 
    if (deg.length==0) return;
    degree_of_grahas[gr][0] = deg;
    if (min.length==0) min='0'; 
    if (sec.length==0) sec='0';
    degree_of_grahas[gr][1] = min; 
    degree_of_grahas[gr][2] = sec;
    // console.log(degree_of_grahas);
    // now populate grahas where they belong
    divisional_data['d1']['degree_of_grahas']=degree_of_grahas;
    populate_graha_in_rashi();
    calc_d9();
}

function calc_d9() {
    divisional_data["d9"] = {};
    for (const c_gr in degree_of_grahas) { 
	// skip if no deg found. Not checking min/sec. only deg which is [0]
	if (degree_of_grahas[c_gr][0].length==0) continue;
	let c_deg=0;let c_min=0;let c_sec=0; let tot_sec=0;
	c_deg=parseInt(degree_of_grahas[c_gr][0]);
	c_min=parseInt(degree_of_grahas[c_gr][1]);
	c_sec=parseInt(degree_of_grahas[c_gr][2]);
	tot_sec=60*60*c_deg + 60*c_min + c_sec;
	for (let i=1; i<=12; i++) { 
	    if (grahas_in_rashi[i.toString()].includes(c_gr)) 
		tot_sec += (i-1)*30*60*60;
	}
	if (c_gr=='La') {
	    tot_sec += (parseInt(rashiNum_asc)-1)*30*60*60;
	}
	//
	// console.log(c_gr + ' tot_sec is ' + tot_sec);
	c_d9_tot_rashis = Math.floor(tot_sec/(3*60*60+20*60));
	c_d9_rashi_num = (c_d9_tot_rashis % 12)+1;
	c_d9_rasi_totsecs = tot_sec - c_d9_tot_rashis*(3*60*60+20*60);
	c_d9_rasi_totsecs += (Math.floor(c_d9_tot_rashis/12))*(3*60*60+20*60);
	const [d9_c_deg,d9_c_min,d9_c_sec] = conv_sec_to_degMinSec(c_d9_rasi_totsecs)
	// console.log(c_gr + ' D9 is ' + c_d9_rashi_num);
	// console.log([d9_c_deg,d9_c_min,d9_c_sec]);
	if (divisional_data["d9"]["grahas_in_rashi"]==undefined) {
	    divisional_data["d9"]["grahas_in_rashi"]={};
	    for (let i=1; i<=12; i++)  
		divisional_data["d9"]["grahas_in_rashi"][i.toString()] = []; 
	}
	// if (divisional_data["d9"]["grahas_in_rashi"][c_d9_rashi_num.toString()] == undefined)
	    // divisional_data["d9"]["grahas_in_rashi"][c_d9_rashi_num.toString()] = [];
	divisional_data["d9"]["grahas_in_rashi"][c_d9_rashi_num.toString()].push(c_gr);
	//
	if (divisional_data["d9"]["degree_of_grahas"]==undefined)
	    divisional_data["d9"]["degree_of_grahas"]={};
	divisional_data["d9"]["degree_of_grahas"][c_gr] = [d9_c_deg,d9_c_min,d9_c_sec];
	//
	if (c_gr=='La') 
	    divisional_data["d9"]["rashiNum_asc"] = c_d9_rashi_num.toString();
    }
    // console.log(divisional_data);
}

function conv_sec_to_degMinSec(c_totsec) {
    c_deg = (Math.floor(c_totsec/(60*60)));
    c_deg_offset = c_totsec - c_deg*60*60;
    c_min = (Math.floor(c_deg_offset/60));
    c_sec = c_deg_offset - 60*c_min;
    return [c_deg,c_min,c_sec];
}

function make_button_current(curr_btn_id,id_beg_string,id_end_string=""){
    if (id_end_string.length==0)
	var buttons = document.querySelectorAll( "button[id^='"+id_beg_string+"']" );
    else
	var buttons = document.querySelectorAll( "button[id^='"+id_beg_string+"'][id$='"+id_end_string+"']" );
    for (x = 0 ; x < buttons.length ; x++){
	$('#'+buttons[x].id).removeClass('bg-warning');
	$('#'+buttons[x].id).addClass('text-warning');
    }
    $('#'+curr_btn_id).addClass('bg-warning');
    $('#'+curr_btn_id).removeClass('text-warning');
}





function view_1x2() {
    if (typeof divisional_data['d1'] === 'undefined') { initialize_div_d1(); }
    if (typeof l_out['11'] === 'undefined') { initialize_l_out('11'); }
    if (typeof l_out['12'] === 'undefined') { initialize_l_out('12'); }
    make_button_current('view_1x2','view_');
    curr_layout_name='1x2';
    document.getElementById("empty_image").src="images/empty_1_2.png";
    document.getElementById("empty_image").height=ctx.canvas.height;
    clear_all_view_divs();
    // l_out['locPos']['12'] = [0,width/2,width/2,height];
    var divId='';
    var divElem = '';
    var c_rashiNum_h1 ='';
    for (xloc of l_out['locList']['1x2']) {
	var divStyle = 'style="position: absolute; ';
	var topPos = l_out['locPos'][xloc][0];
	var leftPos = l_out['locPos'][xloc][1];
	var width = l_out['locPos'][xloc][2];
	var height = l_out['locPos'][xloc][3];
	var divStyle = 'style="position: absolute; ';
	divStyle += 'top: ' + topPos.toString() + 'px;';
	divStyle += 'left: ' + leftPos.toString() + 'px;';
	divStyle += 'width: '+ width.toString() + 'px; ';
	divStyle += 'height: ' + height.toString() + 'px;"';
	divId=' id="chart_'+ xloc+ '" ';
	divElem = '<div '+ divStyle + divId + '><\/div>';
	$("#drawme").append(divElem);
	if (Object.keys(l_out[xloc]['grahas_in_rashi']).length ==0) { 
	    // console.log("l_out - grahas_in_rashi for loc " + xloc + " is zero length");
	    window[l_out['defaultView'][xloc]](xloc); 
	} else {
	    create_house_rashinums(xloc);
	    c_rashiNum_h1 = l_out[xloc]["rashiNum_h1"];
	    place_rashi_num_in_houses(c_rashiNum_h1,xloc);
	    //
	    create_house_grahaDivs(xloc);
	    populate_all_graha_in_rashi(xloc); // this also brings the degree info
	    //
	    create_house_rotate_links(xloc);
	    create_chart_title_div(xloc);
	    l_out_restore_fontSize();
	}
	// create_house_rashinums(xloc);
	// place_rashi_num_in_houses(rashiNum_asc,xloc);
	// //
	// create_house_grahaDivs(xloc);
	// populate_all_graha_in_rashi(xloc); // this also brings the degree info
	// //
	// create_house_rotate_links(xloc);
	// // show the title 
	// create_chart_title_div(xloc);
	// l_out_restore_fontSize();
    }
    if (l_out['settings']['disp_degree']==1) {disp_degree('show');} 
    else {disp_degree('hide');}
    // console.log(l_out);
}

function view_2x2() {
    if (typeof divisional_data['d1'] === 'undefined') { initialize_div_d1(); }
    if (typeof l_out['211'] === 'undefined') { initialize_l_out('211'); }
    if (typeof l_out['212'] === 'undefined') { initialize_l_out('212'); }
    if (typeof l_out['221'] === 'undefined') { initialize_l_out('221'); }
    if (typeof l_out['222'] === 'undefined') { initialize_l_out('222'); }
    make_button_current('view_2x2','view_');
    curr_layout_name='2x2';
    document.getElementById("empty_image").src="images/empty_2_2.png";
    document.getElementById("empty_image").height=ctx.canvas.height;
    clear_all_view_divs();
    // l_out['locPos']['12'] = [0,width/2,width/2,height];
    var divId='';
    var divElem = '';
    for (xloc of l_out['locList']['2x2']) {
	var divStyle = 'style="position: absolute; ';
	var topPos = l_out['locPos'][xloc][0];
	var leftPos = l_out['locPos'][xloc][1];
	var width = l_out['locPos'][xloc][2];
	var height = l_out['locPos'][xloc][3];
	var divStyle = 'style="position: absolute; ';
	divStyle += 'top: ' + topPos.toString() + 'px;';
	divStyle += 'left: ' + leftPos.toString() + 'px;';
	divStyle += 'width: '+ width.toString() + 'px; ';
	divStyle += 'height: ' + height.toString() + 'px;"';
	divId=' id="chart_'+ xloc+ '" ';
	divElem = '<div '+ divStyle + divId + '><\/div>';
	$("#drawme").append(divElem);
	if (Object.keys(l_out[xloc]['grahas_in_rashi']).length ==0) { 
	    // console.log("l_out - grahas_in_rashi for loc " + xloc + " is zero length");
	    window[l_out['defaultView'][xloc]](xloc); 
	} else {
	    create_house_rashinums(xloc);
	    c_rashiNum_h1 = l_out[xloc]["rashiNum_h1"];
	    place_rashi_num_in_houses(c_rashiNum_h1,xloc);
	    //
	    create_house_grahaDivs(xloc);
	    populate_all_graha_in_rashi(xloc); // this also brings the degree info
	    //
	    create_house_rotate_links(xloc);
	    create_chart_title_div(xloc);
	    l_out_restore_fontSize();
	}
    }
    // console.log(l_out);
    // if (l_out['settings']['disp_degree']) {disp_degree('show');} 
    // else {disp_degree('hide');}
    if (l_out['settings']['disp_degree']==1) {disp_degree('show');} 
    else {disp_degree('hide');}
}

function clear_all_view_divs(loc="") {
    // console.log("clear_all_view_divs");
    // if (c_locList.length==0) return;
    if (loc.length>0) {
	if (typeof l_out[loc] === 'undefined') { initialize_l_out(loc); }
    }
    // console.log(loc);
    for (xview in l_out['locList']) {
	// console.log("view_1x2: view =" + xview);
	for (xloc of l_out['locList'][xview]) {
	    if (xloc !== loc) {
		if (l_out['locList'][xview].includes(loc)) {
		    // console.log("Skipping .." + xloc);
		    continue; 
		}
	    }
	    // console.log("removing .." + xloc);
	    // console.log("view_1x2: view =" + xview + " loc: " + xloc);
	    remove_house_rashinums(xloc);
	    remove_house_grahaDivs(xloc);
	    remove_house_rotate_links(xloc);
	    remove_chart_title(xloc);
	}
    }
}


function view_d1(loc){
    // console.log("view_d1 - divisional_data");
    // console.log(divisional_data);
    if (loc.length==0) { loc='00'; }
    // clean up any older divs if present
    // l_out['locList']['1x1']=['00'];
    // var c_locList = [];
    // for (xview in l_out['locList']) {
	// if (l_out['locList'][xview].includes(loc)) {
	    // c_locList = l_out['locList'][xview];
	// }
    // }
    clear_all_view_divs(loc);
    //
    rashiNum_asc = divisional_data["d1"]["rashiNum_asc"];
    grahas_in_rashi = divisional_data["d1"]["grahas_in_rashi"];
    degree_of_grahas = divisional_data["d1"]["degree_of_grahas"];
    l_out[loc] = divisional_data['d1'];
    l_out[loc]["chart_title"] = 'D1';
    l_out[loc]['rashiNum_h1'] = rashiNum_asc.toString();
    //
    create_house_rashinums(loc);
    place_rashi_num_in_houses(rashiNum_asc,loc);
    //
    create_house_grahaDivs(loc);
    populate_all_graha_in_rashi(loc); // this also brings the degree info
    //
    create_house_rotate_links(loc);
    create_chart_title_div(loc);
    // chart_d1();
    l_out_restore_fontSize(); // restore rashiNum and graha fontSize
}


function view_d9(loc){
    if (loc.length==0) { loc='00'; }
    if (typeof divisional_data['d9'] === 'undefined') { return; }
    // clean up any older divs if present
    clear_all_view_divs(loc);
    //
    rashiNum_asc = divisional_data["d9"]["rashiNum_asc"];
    grahas_in_rashi = divisional_data["d9"]["grahas_in_rashi"];
    degree_of_grahas = divisional_data["d9"]["degree_of_grahas"];
    l_out[loc] = divisional_data['d9'];
    l_out[loc]["chart_title"] = 'D9';
    l_out[loc]['rashiNum_h1'] = rashiNum_asc
    //
    create_house_rashinums(loc);
    place_rashi_num_in_houses(rashiNum_asc,loc);
    //
    create_house_grahaDivs(loc);
    populate_all_graha_in_rashi(loc); // this also brings the degree info
    //
    create_house_rotate_links(loc);
    create_chart_title_div(loc);
    l_out_restore_fontSize(); // restore rashiNum and graha fontSize
}


function l_out_restore_fontSize() {
    // console.log('l_out_restore_fontSize: curr_layout_name is ' + curr_layout_name);
    // console.log(l_out['fontSize']);
    // l_out['locList']['1x1']=['00'];
    if (typeof l_out['locList'][curr_layout_name]!== 'undefined') {
	if (typeof l_out['fontSize'][curr_layout_name]!== 'undefined') {
	    for (xloc of l_out['locList'][curr_layout_name]) {
		// restore the graha font size 
		var g_inputs = document.getElementsByClassName('house'); 
		for (x = 0 ; x < g_inputs.length ; x++){ 
		    if (g_inputs[x].id.endsWith("_"+xloc)) {
			// console.log("Changing fontsize of :" + g_inputs[x].id + " from " + g_inputs[x].style.fontSize);
			g_inputs[x].style.fontSize = l_out['fontSize'][curr_layout_name][1];
		    }
		}
		// restore the rashiNum font size 
		var r_inputs = document.getElementsByClassName('rashinum'); 
		for (x = 0 ; x < r_inputs.length ; x++){ 
		    if (r_inputs[x].id.endsWith("_"+xloc)) {
			r_inputs[x].style.fontSize = l_out['fontSize'][curr_layout_name][0];
		    }
		}
	    }
	}
    }
}




function view_1x1(loc='00'){
    // console.log("view_1x1: l_out");
    // console.log(l_out);
    if (typeof divisional_data['d1'] === 'undefined') { initialize_div_d1(); }
    if (typeof l_out['00'] === 'undefined') { initialize_l_out('00'); }
    if (loc.length==0) { loc='00'; }
    // get the proper background image
    document.getElementById("empty_image").src="images/empty.png";
    // display the bottom tab 1x1 as selected
    make_button_current('view_1x1','view_');
    // clean up any older divs if present
    clear_all_view_divs('00');
    // Draw position 1,1 row-1 col-1 11
    var topPos = 0;
    var leftPos = 0;
    var width = ctx.canvas.width; 
    var height = ctx.canvas.height; 
    var divStyle = 'style="position: absolute; ';
    divStyle += 'top: ' + topPos.toString() + 'px;';
    divStyle += 'left: ' + leftPos.toString() + 'px;';
    divStyle += 'width: '+ width.toString() + 'px; ';
    divStyle += 'height: ' + height.toString() + 'px;"';
    var divId=' id="chart_00" ';
    var divElem = '<div '+ divStyle + divId + '><\/div>';
    $("#drawme").append(divElem);
    curr_layout_name='1x1';
    rashiNum_asc = l_out['00']['rashiNum_asc'];
    rashiNum_h1 = l_out['00']['rashiNum_h1'];
    create_house_rashinums('00');
    place_rashi_num_in_houses(rashiNum_h1,'00');
    //
    create_house_grahaDivs('00');
    populate_all_graha_in_rashi('00'); // this also brings the degree info
    //
    create_house_rotate_links('00');
    // populate_graha_in_rashi("",{},{},'00');
    // show the title 
    create_chart_title_div('00');
    l_out_restore_fontSize();
    // if (l_out['settings']['disp_degree']) {disp_degree('show');} 
    // else {disp_degree('hide');}
    // console.log("view_1x1: l_out- AA");
    // console.log(l_out);
    if (l_out['settings']['disp_degree']==1) {
	disp_degree('show');
    } else {
	disp_degree('hide');
    }
}


function initialize_l_out(loc='00') {
    // console.log("initialize_l_out - for loc " + loc);
    if (loc.length==0) { loc='00'; }
    if (typeof l_out[loc] === 'undefined') { l_out[loc] = {}; }
    if (typeof l_out[loc]['grahas_in_rashi'] === 'undefined') { 
	l_out[loc]['grahas_in_rashi']={};
    }
    if (typeof l_out[loc]['degree_of_grahas'] === 'undefined') { 
	l_out[loc]['degree_of_grahas']={};
    }
    if (typeof l_out[loc]['rashiNum_asc'] === 'undefined') {
	l_out[loc]['rashiNum_asc']=1;
    }
    if (typeof l_out['chart_title'] === 'undefined') {
	l_out[loc]['chart_title']='D1';
    }
    if (typeof l_out['rashiNum_h1'] === 'undefined') {
	l_out[loc]['rashiNum_h1']='1';
    }
    if (typeof l_out['fontSize'] === 'undefined') {
	l_out['fontSize'] = {};
    }
    if (typeof l_out['fontSize']['1x1'] === 'undefined') {
	l_out['fontSize']['1x1'] = []; // [0]; rashinumFontsize, [1];GrahaFontsize
    }
    if (typeof l_out['fontSize']['1x2'] === 'undefined') {
	l_out['fontSize']['1x2'] = []; // [0]; rashinumFontsize, [1];GrahaFontsize
    }
    if (typeof l_out['fontSize']['2x2'] === 'undefined') {
	l_out['fontSize']['2x2'] = ['90%','90%']; // [0]; rashinumFontsize, [1];GrahaFontsize
    }
    //
    if (typeof l_out['settings'] === 'undefined') {
	l_out['settings']  = {};
	l_out['settings']['disp_degree']=1;
	// console.log(l_out['settings']);
    }
    if (typeof l_out['locList'] === 'undefined') {
	l_out['locList'] = {};
	l_out['locList']['1x1']=['00'];
	l_out['locList']['1x2']=['11','12'];
	l_out['locList']['2x2']=['211','212','221','222'];
	set_layout_chart_positions();
    }
    l_out['defaultView'] = {};
    l_out['defaultView']['00']="view_d1";
    l_out['defaultView']['11']="view_d1";
    l_out['defaultView']['12']="view_d9";
    l_out['defaultView']['211']="view_d1";
    l_out['defaultView']['212']="view_d1";
    l_out['defaultView']['221']="view_d1";
    l_out['defaultView']['222']="view_d9";
    // console.log("initialize_l_out : l_out: ");
    // console.log(l_out);
}

function initialize_div_d1() {
    if (typeof divisional_data['d1'] === 'undefined') { divisional_data['d1'] = {}; }
    if (typeof divisional_data['d1']['grahas_in_rashi'] === 'undefined') { 
	divisional_data['d1']['grahas_in_rashi']={};
    }
    if (typeof divisional_data['d1']['degree_of_grahas'] === 'undefined') { 
	divisional_data['d1']['degree_of_grahas']={};
    }
    if (typeof divisional_data['d1']['rashiNum_asc'] === 'undefined') {
	divisional_data['d1']['rashiNum_asc']=1;
    }
}

function chart_d1_0(){
    if (typeof divisional_data['d1'] === 'undefined') { divisional_data['d1'] = {}; }
    if (typeof divisional_data['d1']['grahas_in_rashi'] === 'undefined') { 
	divisional_data['d1']['grahas_in_rashi']={};
    }
    if (typeof divisional_data['d1']['degree_of_grahas'] === 'undefined') { 
	divisional_data['d1']['degree_of_grahas']={};
    }
    if (typeof divisional_data['d1']['rashiNum_asc'] === 'undefined') {
	divisional_data['d1']['rashiNum_asc']=1;
    }
    //
    degree_of_grahas = divisional_data["d1"]["degree_of_grahas"];
    grahas_in_rashi = divisional_data["d1"]["grahas_in_rashi"];
    rashiNum_asc = divisional_data["d1"]["rashiNum_asc"];
    // console.log(rashiNum_asc);
    // console.log(grahas_in_rashi);
    // console.log(degree_of_grahas);
    //
    document.getElementById("empty_image").src="images/empty.png";
    if (typeof grList_by_dNum_raNum['d1'] === 'undefined') { grList_by_dNum_raNum['d1'] = {}; }
    // make_button_current('chart_d1','chart_');
    // make_button_current('view_1x1','view_');
    remove_house_rashinums('00');
    remove_house_rashinums("12");
    remove_house_rashinums();
    create_house_rashinums();
    create_house_rotate_links();
    remove_house_grahaDivs();
    create_house_grahaDivs();
    place_rashi_num_in_houses(rashiNum_asc);
    display_saved_degree();
    populate_graha_in_rashi();
    document.getElementById('chart_title').innerHTML = "D1";
}


function chart_d9(){
    if (divisional_data["d9"]==undefined) return;
    document.getElementById("empty_image").src="images/empty.png";
    // make_button_current('chart_d9','chart_');
    remove_house_rashinums('00');
    remove_house_rashinums("12");
    remove_house_rashinums();
    create_house_rashinums();
    remove_house_grahaDivs('00');
    remove_house_grahaDivs('12');
    remove_house_grahaDivs();
    create_house_grahaDivs();
    //
    degree_of_grahas = divisional_data["d9"]["degree_of_grahas"];
    grahas_in_rashi = divisional_data["d9"]["grahas_in_rashi"];
    rashiNum_asc = divisional_data["d9"]["rashiNum_asc"];
    //
    let c_rashiNum_asc = divisional_data["d9"]["rashiNum_asc"];
    place_rashi_num_in_houses(c_rashiNum_asc);
    let c_degree_of_grahas = divisional_data["d9"]["degree_of_grahas"];
    display_saved_degree(c_degree_of_grahas); 
    let c_grahas_in_rashi = divisional_data["d9"]["grahas_in_rashi"];
    populate_graha_in_rashi(c_rashiNum_asc,c_grahas_in_rashi,c_degree_of_grahas);
    document.getElementById('chart_title').innerHTML = "D9";
}



function chart_d1d9(){
    if (divisional_data["d9"]==undefined) return;
    // var canvas_w = document.getElementById('drawme').offsetWidth;
    // var canvas_h = document.getElementById('drawme').offsetHeight;
    // document.getElementById('drawme').style.width = '25%';
    // console.log([canvas_w,canvas_h]);
    // drawImageAtQuadrants([[1,1], [1,2]], "images/empty.png", "drawme");
    // make_button_current('chart_d1d9','chart_');
    // make_button_current('view_1x2','view_');
    // Change the background diagram
    document.getElementById("empty_image").src="images/empty_1_2.png";
    document.getElementById("empty_image").height=ctx.canvas.height;
    // clear all d1Only/d9Only rashi numbers
    remove_house_rashinums();
    remove_house_grahaDivs();
    // hide the m in each house of D1Only/D9Only
    var all_inputs = document.querySelectorAll('.rot,.house');
    for (x = 0 ; x < all_inputs.length ; x++){
	myid = all_inputs[x].getAttribute("id");
	document.getElementById(myid).style.display = 'none';
    }
    // Draw D1 of D1D9 chart
    var topPos = 0;
    var leftPos = 0;
    var width = ctx.canvas.width/2;
    var height = ctx.canvas.height;
    var divStyle = 'style="position: absolute; ';
    divStyle += 'top: ' + topPos.toString() + 'px;';
    divStyle += 'left: ' + leftPos.toString() + 'px;';
    divStyle += 'width: '+ width.toString() + 'px; ';
    divStyle += 'height: ' + height.toString() + 'px;"';
    var divId=' id="chart_11" ';
    var divElem = '<div '+ divStyle + divId + '><\/div>';
    $("#drawme").append(divElem);
    create_house_rashinums('00');
    place_rashi_num_in_houses(rashiNum_asc,'00');
    create_house_grahaDivs('00');
    populate_graha_in_rashi("",{},{},'00');
    //
    // Draw D9 of D1D9 chart
    topPos = 0;
    leftPos = ctx.canvas.width/2;
    width = ctx.canvas.width/2;
    height = ctx.canvas.height;
    divStyle = 'style="position: absolute; ';
    divStyle += 'top: ' + topPos.toString() + 'px;';
    divStyle += 'left: ' + leftPos.toString() + 'px;';
    divStyle += 'width: '+ width.toString() + 'px; ';
    divStyle += 'height: ' + height.toString() + 'px;"';
    divId=' id="chart_12" ';
    var divElem = '<div '+ divStyle + divId + '><\/div>';
    $("#drawme").append(divElem);
    create_house_rashinums('12');
    let c_rashiNum_asc = divisional_data["d9"]["rashiNum_asc"];
    place_rashi_num_in_houses(c_rashiNum_asc,"12");
    create_house_grahaDivs('12');
    let c_degree_of_grahas = divisional_data["d9"]["degree_of_grahas"];
    let c_grahas_in_rashi = divisional_data["d9"]["grahas_in_rashi"];
    populate_graha_in_rashi(c_rashiNum_asc,c_grahas_in_rashi,c_degree_of_grahas,'12');
}

function remove_house_rashinums(loc="") {
    var cDiv =""; 
    for (let i=1; i<=12; i++) {
	if (loc.length==0) {
	    idStrSuffix = i.toString();
	} else {
	    idStrSuffix = i.toString() + "_" + loc;
	}
	cDiv = document.getElementById('rashi_in_h'+ idStrSuffix);
	// if (cDiv) cDiv.parentNode.removeChild(cDiv);
	if (cDiv) cDiv.remove();
    }
}

function remove_house_grahaDivs(loc="") {
    var cDiv =""; 
    for (let i=1; i<=12; i++) {
	if (loc.length==0) {
	    idStrSuffix = i.toString();
	} else {
	    idStrSuffix = i.toString() + "_" + loc;
	}
	cDiv = document.getElementById('h'+ idStrSuffix);
	// // console.log("remove_house_grahaDivs: About to delete div h"+idStrSuffix);
	// if (cDiv) {
	    // console.log("here");
	    // console.log(cDiv);
	    // cDiv.parentNode.removeChild(cDiv);
	// }
	if (cDiv) { cDiv.remove(); }
	// if (cDiv) { cDiv.style.display = 'none'; }
    }
}

function  create_house_grahaDivs(loc="") {
    var c_divStr = ""; var chartStr="";
    for (let i=1; i<=12; i++) {
	if (loc.length==0) {
	    idStrSuffix = i.toString();
	    chartStr = "#drawme";
	} else {
	    idStrSuffix = i.toString() + "_" + loc;
	    chartStr = "#chart_"+loc;
	}
	c_divStr = '<div ';
	c_divStr +=' class="b'+i.toString()+' house "';
	c_divStr += ' style="z-index:2;font-size: 120%; "';
	c_divStr += ' id="h'+idStrSuffix+'" ';
	c_divStr += ' ><br></div>';
	$(chartStr).append(c_divStr);
    }
}


function remove_chart_title(loc=""){
    // console.log("Removing chart title of loc: " + loc);
    var all_inputs = document.querySelectorAll('.chart_title');
    for (x = 0 ; x < all_inputs.length ; x++){
	var myid = all_inputs[x].getAttribute("id");
	// console.log("checking now: " + myid);
	if (all_inputs[x].id.endsWith("_"+loc)) {
	    cDiv = document.getElementById(myid);
	    // if (cDiv) cDiv.parentNode.removeChild(cDiv);
	    if (cDiv) { cDiv.remove(); }
	    // if (cDiv) { cDiv.style.display = 'none'; }
	}
    }
}



function create_chart_title_div(loc="") {
    // <div class=" p-1 m-1 chart_title h4 bg-warning text-danger font-weight-bold"  
	// onclick="{ 
	    // document.getElementById('modal2B').style.display = 'block';
	    // document.getElementById('modal2M').innerHTML  = choose_view_generate_form(); 
	// }"
    // style="z-index:3;font-size: 150%; "  
    // id='chart_title'>D1</div> 
    //
    var title= l_out[loc]['chart_title'];
    var c_divStr = ""; var chartStr="";
    // console.log("create_chart_title_div for loc: " + loc + " / title is " + title);
    //
    if (loc.length==0) {
	idStrSuffix = "";
	chartStr = "#drawme";
    } else {
	idStrSuffix = loc;
	chartStr = "#chart_"+loc;
    }
    c_divStr = '<div ';
    // c_divStr +=' class="p-1 m-1 chart_title h4 bg-warning text-danger font-weight-bold"';
    c_divStr +=' class="p-1 m-1 chart_title h4 bg-warning text-danger font-weight-bold" ' 
	+ 'onclick="{ '
	+   ' document.getElementById(\'modal2B\').style.display = \'block\'; '
	+   ' document.getElementById(\'modal2M\').innerHTML  = choose_view_generate_form(\''+loc+'\'); '
	+ '}" '
    c_divStr += ' style="z-index:3;font-size: 150%; "';
    c_divStr += ' id="chart_title_'+idStrSuffix+'" ';
    c_divStr += ' >'+title+'</div>';
    $(chartStr).append(c_divStr);
}



function create_house_rashinums(loc="") {
    // <div class="rb1 h5 rashinum font-weight-bold text-black"  
    // style="z-index:2;font-size: 120%; "  
    // id='rashi_in_h1'>1</div> 
    var c_divStr = ""; var chartStr="";
    for (let i=1; i<=12; i++) {
	if (loc.length==0) {
	    idStrSuffix = i.toString();
	    chartStr = "#drawme";
	} else {
	    idStrSuffix = i.toString() + "_" + loc;
	    chartStr = "#chart_"+loc;
	}
	c_divStr = '<div ';
	c_divStr +=' class="rb'+i.toString()+' h5 rashinum font-weight-bold text-black"';
	c_divStr += ' style="z-index:2;font-size: 120%; "';
	c_divStr += ' id="rashi_in_h'+idStrSuffix+'" ';
	c_divStr += ' >'+i.toString()+'</div>';
	// $("#chart_"+loc).append(c_divStr);
	$(chartStr).append(c_divStr);
    }
}



function remove_house_rotate_links(loc=""){
    //
    var all_inputs = document.querySelectorAll('.rot');
    for (x = 0 ; x < all_inputs.length ; x++){
	var myid = all_inputs[x].getAttribute("id");
	if (all_inputs[x].id.endsWith("_"+loc)) {
	    cDiv = document.getElementById(myid);
	    // if (cDiv) cDiv.parentNode.removeChild(cDiv);
	    if (cDiv) { cDiv.remove(); }
	    // if (cDiv) { cDiv.style.display = 'none'; }
	}
    }
}


function  create_house_rotate_links(loc="") {
    // <span onclick=rotate_by_house(2); style="z-index:2;" id='make_ascndnt_h2' 
    //   title='rotate_make_this_H1' class='rot small rotb2'>m</span> 
    //
    // console.log("create_house_rotate_links: loc: " + loc);
    var c_divStr = ""; var chartStr="";
    for (let i=1; i<=12; i++) {
	if (loc.length==0) {
	    idStrSuffix = i.toString();
	    chartStr = "#drawme";
	} else {
	    idStrSuffix = i.toString() + "_" + loc;
	    chartStr = "#chart_"+loc;
	}
	c_divStr = '<span onclick=rotate_by_house(\''+idStrSuffix+'\'); ';
	c_divStr +=' class="d-none rot rotb'+i.toString()+' small"';
	c_divStr += ' style="z-index:2;"';
	c_divStr += ' title="rotate_make_this_H1"';
	c_divStr += ' id="make_ascndnt_h'+idStrSuffix+'" ';
	c_divStr += ' >m</span>';
	$(chartStr).append(c_divStr);
    }
}


function place_rashi_num_in_houses(c_rashiNum_h1,loc="") {
    for (let i=1; i<=12; i++) {
	house_rashi_num = ((parseInt(c_rashiNum_h1)+i-1)%12); 
	if (house_rashi_num==0) { house_rashi_num=12;}
	if (loc.length==0) idStrSuffix = i.toString();
	else idStrSuffix = i.toString() + "_" + loc;
	document.getElementById('rashi_in_h'+ idStrSuffix).innerHTML = 
	    house_rashi_num.toString();
    }
}

function place_rashi_num_in_houses0(c_asc_rashi_num,loc="") {
    for (let i=1; i<=12; i++) {
	house_rashi_num = ((parseInt(c_asc_rashi_num)+i-1)%12); 
	if (house_rashi_num==0) { house_rashi_num=12;}
	if (loc.length==0) idStrSuffix = i.toString();
	else idStrSuffix = i.toString() + "_" + loc;
	document.getElementById('rashi_in_h'+ idStrSuffix).innerHTML = 
	    house_rashi_num.toString();
    }
}


function drawImageAtQuadrants(positions, imgUrl, parentId) { 
    positions.forEach(function(position) { 
	drawImageAtQuadrant(position[0], position[1], imgUrl, parentId); 
    })
}

function drawImageAtQuadrant(rowIndex, colIndex, imgUrl, parentId) { 
    if (rowIndex < 1 || colIndex < 1) { 
	console.log("drawImageAtQuadrant: Invalid row or column index (must be > 1)"); 
    } else { 
	var img = new Image(); 
	img.onload = function() { 
	    //loadedImagesCount++; 
	    // imageY = (rowIndex - 1)*img.height;
	    imageY = (rowIndex - 1)*ctx.canvas.height;
	    // imageX = (colIndex - 1)*img.width; 
	    imageX = (colIndex - 1)*ctx.canvas.width/2; 
	    // ctx.drawImage(img, imageX, imageY); 
	    ctx.drawImage(img, imageX, imageY, ctx.canvas.width/2, img.height); 
	    // createDiv(parentId, imageY, imageX, img.width, img.height); 
	    createDiv(parentId, imageY/2, imageX/2, ctx.canvas.width/2, ctx.canvas.height/2); 
	}; 
	img.src = imgUrl; 
    }
}
function createDiv(parentId, topPos, leftPos, width, height) {
    var divStyle = 'style="position: absolute; ';
    divStyle += 'top: ' + topPos.toString() + 'px;';
    divStyle += 'left: ' + leftPos.toString() + 'px;';
    divStyle += 'width: '+ width.toString() + 'px; ';
    divStyle += 'height: ' + height.toString() + 'px;"';
    console.log(divStyle);
    //
    var divElem = '<div '+ divStyle + '><\/div>';
    $("#" + parentId).append(divElem);
}









