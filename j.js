
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


function saveData_works() {
    const saveMe = {};
    // gets the rashi_in_house data first
    saveMe["rashi_in_house"] = {};
    for (let i=1; i<=12; i++) {
	c_val = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
	saveMe["rashi_in_house"][i] = c_val;
    }
    // gets the planets in house now
    saveMe["planets_in_house"] = {};
    for (let i=1; i<=12; i++) {
	c_val = document.getElementById('h'+ i.toString()).innerHTML;
	saveMe["planets_in_house"][i] = c_val;
    }
    // get fileName, title and Notes
    if (document.getElementById('j_filename').value) {
	var j_filename = document.getElementById('j_filename').value;
    } else { j_filename = "UnKnown"; }
    saveMe["j_filename"] = j_filename;
    if (document.getElementById('j_title').value) {
	saveMe["j_title"] = document.getElementById('j_title').value;
    } else { saveMe["j_title"] = "NONE"; }
    if (document.getElementById('j_notes').value) {
	saveMe["j_notes"] = document.getElementById('j_notes').value;
    } else { saveMe["j_notes"] = "NONE"; }
    saveMeStr = JSON.stringify(saveMe);
    // var fs = require('fs');
    // var dir = './raju_1';
    // if (!fs.exists(dir)){ fs.mkdir(dir); }
    // alert("rama");
    download(saveMeStr, j_filename + '.jgd', 'text/plain');
}


async function saveData() {
    const saveMe = {};
    // gets the rashi_in_house data first
    saveMe["rashi_in_house"] = {};
    for (let i=1; i<=12; i++) {
	c_val = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
	saveMe["rashi_in_house"][i] = c_val;
    }
    // gets the planets in house now
    saveMe["planets_in_house"] = {};
    for (let i=1; i<=12; i++) {
	c_val = document.getElementById('h'+ i.toString()).innerHTML;
	saveMe["planets_in_house"][i] = c_val;
    }
    // get fileName, title and Notes
    if (document.getElementById('j_filename').value) {
	var j_filename = document.getElementById('j_filename').value;
    } else { j_filename = "UnKnown"; }
    saveMe["j_filename"] = j_filename;
    if (document.getElementById('j_title').value) {
	saveMe["j_title"] = document.getElementById('j_title').value;
    } else { saveMe["j_title"] = "NONE"; }
    if (document.getElementById('j_notes').value) {
	saveMe["j_notes"] = document.getElementById('j_notes').value;
    } else { saveMe["j_notes"] = "NONE"; }
    saveMeStr = JSON.stringify(saveMe);
    // var fs = require('fs');
    // var dir = './raju_1';
    // if (!fs.exists(dir)){ fs.mkdir(dir); }
    // alert("rama");
    // download(saveMeStr, j_filename + '.jgd', 'text/plain');
    // alert("rama");

    // await createZip().then( async (res) => { await res.generateAsync({ type: "blob" }).then(function(content) { 
// 	    download(content, 'test2.zip', 'application/zip'); });
  //   })

    // // zip0 = createZip();
    // const zip = new JSZip(); 
    // var savable = new Image();
    for (ss of screenshots_arr) { 
	if (ss=="printme") {continue;}
	var canvas = document.getElementById(ss);
	// savable.src = canvas.toDataURL("image/png");
	var c_image  = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	// var c_image  = canvas.toDataURL("image/png");
	// zip.file("rama.png", savable.src.substr(savable.src.indexOf(',')+1), {base64: true});
	// download(savable.src.substr(savable.src.indexOf(',')+1), 'image.png', 'image/png');
	download(c_image, 'image.png', 'image/png');
    }
    // content = zip.generate();
    // download(content, 'test2.zip', 'application/zip');


}

async function createZip() {
    if (typeof screenshots_arr == 'undefined') { screenshots_arr=[]; }
    const zip = new JSZip(); 
    var savable = new Image();
    if (screenshots_arr.length>0) { 
	for (ss of screenshots_arr) { 
	    if (ss=="printme") {continue;} 
	    // alert(ss);
	    var canvas = document.getElementById(ss); 
	    // var image = new Image();
	    // image.id = "p"+ss;
	    // image.crossOrigin = 'anonymous';
	    // image.src = canvas.toDataURL();
	    // zip.file(ss,image);

	    // canvas.toBlob(function(data) { zip.file(ss,data); }); 

	    savable.src = canvas.toDataURL();
	    zip.file("rama.png", savable.src.substr(savable.src.indexOf(',')+1), {base64: true});

	} 
    }
    return zip;
}

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




function loadData(l_data,make_tab=1) {
    // const l_data = JSON.parse(contents);
    if ("rashi_in_house" in l_data) {
	for (i in l_data["rashi_in_house"]) {
	    document.getElementById('rashi_in_h'+ i).innerHTML = l_data["rashi_in_house"][i];
	}
    }
    if ("planets_in_house" in l_data) {
	for (i in l_data["planets_in_house"]) {
	    document.getElementById('h'+ i).innerHTML = l_data["planets_in_house"][i];
	}
    }
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
	btn_str += ' class="ml-0 mr-1" src="clear.png" height="11"/></span>';
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
    o_data[l_data["j_filename"]] = l_data;
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

function takeShot() {
    if (typeof screenshots_arr == 'undefined') { screenshots_arr=['printme']; }
    // $('#Screenshot').addClass('d-none');
    // $('#ClearScreenshot').removeClass('d-none'); 
    // let div1 = document.getElementById('printme');
    // html2canvas(div1, {letterRendering: 1, allowTaint     : true, onrendered}).then(
    // function (canvas) {
    //     document.getElementById('output').appendChild(canvas);
    // })
    var currentdate = new Date();
    var canvas_id = 'ss'+currentdate.getHours()+currentdate.getMinutes()+currentdate.getSeconds();
    screenshots_arr.push(canvas_id);
    // allowTaint: true, foreignObjectRendering: true, 
    // allowTaint: true, 
    // removeContainer: true,
    html2canvas(document.getElementById('printme'), { 
	logging: false, 
	letterRendering: 1, 
	allowTaint: true, 
	removeContainer: true,
	foreignObjectRendering: false,
	useCORS: false 
    } ).then(canvas => {
	     var ctx = canvas.getContext('2d');
	     ctx.crossOrigin = 'anonymous';
	     ctx.drawImage(document.getElementById('canvas'), 
	         document.getElementById('first_col').offsetWidth, 
		 document.getElementById('header').offsetHeight+
		     document.getElementById('j_opened').offsetHeight+
		     document.getElementById('j_screenshots').offsetHeight
	     );
	    canvas.id=canvas_id; 
	    canvas.crossOrigin = 'anonymous';
	    // document.getElementById('output').appendChild(canvas);
	    if (screenshots_arr.length==2) { $('#j_screenshots').removeClass('d-none');}
	    document.getElementById('main_disp').appendChild(canvas);
	    $('#'+canvas_id).addClass('d-none');  
	})
	//
	var btn_str = '<btn ';
	btn_str += ' id="b'+canvas_id+'" ';
	btn_str += ' onclick=disp_ss(\''+canvas_id+'\'); ';
	btn_str += ' class="font-weight-bold btn-link border border-primary py-0 px-1 mx-0">';
	btn_str += canvas_id;
	// 17/1/2024 @ 10:39:55
	// var currentdate = new Date();
	// btn_str += + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " @ "
        //       + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	btn_str += '</btn>';
	document.getElementById('j_screenshots').innerHTML += btn_str;
}

function disp_ss(c_canvas_id){
    for (p of screenshots_arr) { 
	$('#'+p).addClass('d-none');
	$('#b'+p).removeClass('bg-warning');
    } 
    $('#'+c_canvas_id).removeClass('d-none');
    $('#b'+c_canvas_id).addClass('bg-warning');
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

function rotate(n) {
    // alert('n isnow ' + n);
    // change rashi_in_h nums first
    for (let i=1; i<=12; i++) {
	c_val = document.getElementById('rashi_in_h'+ i.toString()).innerHTML;
	n_val = ((parseInt(c_val)+n-1)%12); if (n_val==0) { n_val=12;}
	document.getElementById('rashi_in_h'+ i.toString()).innerHTML = n_val.toString();
    }
    // change Grahas  CG in two steps
    // step-1: collect current graha data
    const curr_gr = { };
    for (let i=1; i<=12; i++) {
	curr_gr[i.toString()] = document.getElementById('h'+ i.toString()).innerHTML;
    }
    // alert(JSON.stringify(curr_gr));
    // step-2: move new data into the house
    for (let i=1; i<=12; i++) {
	n_val = ((i+n-1)%12); if (n_val==0) { n_val=12;}
	document.getElementById('h'+ i.toString()).innerHTML = curr_gr[n_val.toString()];
	// document.getElementById('r'+ i.toString()).setAttribute('onclick','rotate('+i+');');
    }
    // change gochar-Grahas CGG in two steps
    // step-1: collect current gochar-graha data
    const curr_ggr = { };
    for (let i=1; i<=12; i++) {
	curr_ggr[i.toString()] = document.getElementById('gh'+ i.toString()).innerHTML;
    }
    // step-2: move new data into the house
    for (let i=1; i<=12; i++) {
	n_val = ((i+n-1)%12); if (n_val==0) { n_val=12;}
	document.getElementById('gh'+ i.toString()).innerHTML = curr_ggr[n_val.toString()];
    }
}

