///////////////////////////////////// save settings values in local storage  seiings directory///////////////////////////////////////////////////////////////////////



/////////////////////////  save in openwindowconfig   ///////////////////////////////////////
function changewindow() {
    toggle = document.getElementById('opninwindow');
    if (toggle.checked) {
        localStorage.setItem("window", 1);
    } else {
        localStorage.setItem("window", 0);
    }
}

//////////////////   save color settings  ///////////////////////////

function savecol(box, id, value) {
    var settings = JSON.parse(localStorage.getItem("colsettings"));
    if (settings == null) {
        settings = [];
    }
    for (var i = 0; i < settings.length; i++) {
        if (settings[i].boxid == box) {
            settings.splice(i, 1);
        }
    }
    settings.push({ boxid: box, prop: id, value: value });
    localStorage.setItem("colsettings", JSON.stringify(settings));
}




/////////////////////////////   save sliders  /////////////////////////
function saveslidersettings(box, id, value, cvalue) {
    var settings = JSON.parse(localStorage.getItem("slidersettings"));
    if (settings == null) {
        settings = [];
    }
    for (var i = 0; i < settings.length; i++) {
        if (settings[i].boxid == box) {
            settings.splice(i, 1);
        }
    }
    settings.push({ boxid: box, prop: id, value: cvalue, val: value });
    localStorage.setItem("slidersettings", JSON.stringify(settings));
}

//////////////////////// save toggles /////////////////////////////
function savetoggles(tid, id, value) {
    var toggles = JSON.parse(localStorage.getItem("toggles"));
    if (toggles == null) {
        toggles = [];
    }

    for (var i = 0; i < toggles.length; i++) {
        if (toggles[i].togglestate == tid) {
            toggles.splice(i, 1);
        }
    }
    toggles.push({ togglestate: tid, prop: id, value: value });
    localStorage.setItem("toggles", JSON.stringify(toggles));
    console.log(id + " : " + value);
}


//////////////////////////////////////////// font //////////////////////////
function savefont(font) {
    localStorage.setItem("font", font);
}

/////////////////////////////////////// apply the values on page load //////////////////////////

/////////////////////// setting fonts /////////////////////////////////////////////////
function setfont() {
    var font = localStorage.getItem("font");
    if (font == null) {
        font = "Arial";
    }
    root.style.setProperty("--font", font);
}

////////////////////////////////// setting colours /////////////////////////////////
function setcol() {
    var settingsdata = JSON.parse(localStorage.getItem("colsettings"));
    if (settingsdata == null) {
        return;
    }
    for (var i = 0; i < settingsdata.length; i++) {

        var varid = settingsdata[i].prop;
        var value = settingsdata[i].value;
        var colboxid = settingsdata[i].boxid;
        root.style.setProperty(varid, value);
        document.getElementById(colboxid).value = value;

    }
}

////////////////////////////// setting sliders ////////////////////////////////

function setslidersettings() {
    var settingsdata = JSON.parse(localStorage.getItem("slidersettings"));
    if (settingsdata == null) {
        return;
    }
    for (var i = 0; i < settingsdata.length; i++) {

        var varid = settingsdata[i].prop;
        var value = settingsdata[i].value;
        var slidervalue = settingsdata[i].val;
        var sliderid = settingsdata[i].boxid;
        root.style.setProperty(varid, value);
        document.getElementById(sliderid).value = slidervalue;

    }
}
//apply toggles
function settoggles() {
    var togglesdata = JSON.parse(localStorage.getItem("toggles"));
    if (togglesdata == null) {
        return;
    }
    for (var i = 0; i < togglesdata.length; i++) {
        if (togglesdata[i].value == "1") {
            document.getElementById(togglesdata[i].togglestate).checked = true;
            document.getElementById(togglesdata[i].prop).style.opacity = "1";

        } else {
            document.getElementById(togglesdata[i].prop).style.opacity = "0";
            document.getElementById(togglesdata[i].togglestate).checked = false;
        }
    }
}
//set background
function setwindow() {
    var window = localStorage.getItem("window");
    if (window == null) {
        return;
    }
    if (window == "1") {
        document.getElementById("opninwindow").checked = true;
    } else {
        document.getElementById("opninwindow").checked = false;
    }
}