////////////////////////////////////////////// input variable   ///////////////////////////////

var root = document.querySelector(':root');

///////////////////////////////////////////////////////////   changing Background image    ///////////////////////////////////////////

//get the image from uploadbannerimg
function changebg() {
    const chooseFile = document.getElementById("uploadBannerImage");
    chooseFile.addEventListener("change", function() {
        getImgData();
    });
}

function getImgData() {
    const chooseFile = document.getElementById("uploadBannerImage");
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function() {
            document.getElementById("boddy").style.backgroundImage = "url(" + fileReader.result + ")";
            savebgimg(fileReader.result);
        });
    }
}



////////////////////////////////////////////////////// change username  /////////////////////////////////////////////////////////////////

function changename() {
    var name = document.getElementById("nameipt").value;
    if (name == "") {
        alert("Please enter a name");
        return;
    }
    document.getElementById("grtusr").innerHTML = "Hello " + name;
    savename(name);
}

///////////////////////////////////////////////// change values //////////////////////////////////////////////////////////////////////////////






function changecol(picker, id) {
    var value = picker.value;
    var box = picker.id;
    root.style.setProperty(id, value);
    savecol(box, id, value);
}



function changeswitch(toggle, id) {
    var toggleid = toggle.id;
    if (toggle.checked) {
        document.getElementById(id).style.opacity = "1";
        savetoggles(toggleid, id, "1");
    } else {
        document.getElementById(id).style.opacity = "0";
        savetoggles(toggleid, id, "0");
    }
}



function changevalue(slider, id, measure, mult) {
    var value = slider.value;
    var cvalue = value * mult;
    cvalue = cvalue + measure;
    var box = slider.id;
    root.style.setProperty(id, cvalue);
    saveslidersettings(box, id, value, cvalue);
}

//////////////////////////////////////////////   font change   //////////////////////////////////////////

function changefont() {
    var query = document.getElementById("font").value;
    root.style.setProperty("--font", "'" + query + "'");
    savefont(query);
}