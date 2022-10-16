////////////////////// store notes in users database in firebase  //////////////////////////////////////////////////
function addnnote() {
    var textnote = document.getElementById("notepaddtextipt").value;
    if (textnote == "") {
        alert("Add note first")
        return;
    }

    // store notes in local storage
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        notes = [];
    }
    notes.push({
        note: textnote,
    });
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("notelist").innerHTML += "<div class='note' id='" + textnote + "'><div class='notetext'>" + textnote + "</div><button class='deletenote' onclick='deletenote(this)'><img class='delicopng' alt='delete note' src='../res/delicoimg.webp'> </button></div>";


    // store in firebase
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/notes/');
        ref.push({
            note: textnote,
        }); //push note to firebase 
        document.getElementById("notepaddtextipt").value = "";
    }
}


/////////////////////////////////////// delete notes  /////////////////////////////////
function deletenote(item) {
    var note = item.parentNode.id;

    //delete notes in local storage
    var notes = JSON.parse(localStorage.getItem("notes"));
    for (var key in notes) {
        if (notes[key].note == note) {
            notes.splice(key, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            break;
        }
    }

    // delete notes in firebase
    var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notes/');
    ref.once('value', function(snapshot) {
        var notes = snapshot.val();
        for (var key in notes) {
            if (notes[key].note == note) {
                ref.child(key).remove();
                return;
            }
        }
    });
    item.parentNode.remove();
}


///////////////////////////// add notes to website from firebase ///////////////////////////////
function setnotes() {

    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        notes = [];
    }
    for (var key in notes) {
        document.getElementById("notelist").innerHTML += "<div class='note' id='" + notes[key].note + "'><div class='notetext'>" + notes[key].note + "</div><button class='deletenote' onclick='deletenote(this)'><img class='delicopng' alt='delete note' src='../res/delicoimg.webp'> </button></div>";
    }
}
////////////////////////// save background image to firebase ///////////////////////////////

function savebgimg(img) {
    localStorage.setItem("bgimg", img);
    //save to firebase
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/bgimg/');
        ref.set({
            bgimage: img,
        });
    }
}

///////////////////////////// set the background image  ////////////////////////////////////
function setBackground() {

    // get background image from local storage stored as a img64 string
    var bgimg = localStorage.getItem("bgimg");
    if (bgimg != null) {
        //convert img64 string to image and set it as background
        var img = new Image();
        img.src = bgimg;
        document.body.style.backgroundImage = "url(" + img.src + ")";
    } else {
        return;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////  check and add site   /////////////////////////////////////
function addsitecomp() {
    var site = document.getElementById("site-name").value;
    var url = document.getElementById("site-url").value;
    if (site == "" || url == "") {
        alert("Please fill in all fields");
        return;
    }
    document.getElementById("site-name").value = "";
    document.getElementById("site-url").value = "";
    clearpop("addsite-tooltip");

    var r = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/);
    var urlvalid = r.test(url);
    if (!urlvalid) {
        alert("Please enter a valid URL");
        return;
    }
    flag = 0;
    //check if the website is alreaady present
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/sites/');
        ref.once('value', function(snapshot) {
            var sites = snapshot.val();
            for (var key in sites) {
                if (sites[key].site == site) {
                    alert("Site already present");
                    flag = 1;
                    return;
                }
            }
            if (flag == 0) {
                var favicon = getFavicon(url);
                document.getElementById("div-sites").innerHTML += "<div class='site' id='" + site + "'><a href='" + url + "'><img alt='" + site + "' class='Siteicons' src='" + getFavicon(url) + "'></a><div class='sitenametooltips'>" + site + " </div><button id='" + site + "btn' class='showdelpng' style='display:none;'><img class='delicopng' alt='delete site' src='../res/delicoimg.webp'> </button></div>";
                store(site, url);
                window.location.reload();
            }
        });
    } else {
        alert("Please sign in to add sites");
    }

}
/////////////////////////////////////// Stire site to firebase /////////////////////////////////
function store(site, url) {

    //store in local storage

    var sites = JSON.parse(localStorage.getItem("sites"));
    if (sites == null) {
        sites = [];
    }
    sites.push({
        url: url,
        site: site,
    });

    localStorage.setItem("sites", JSON.stringify(sites));

    document.getElementById("div-sites").innerHTML += "<div class='site' id='" + site + "'><a href='" + url + "'><img alt='" + site + "' class='Siteicons' src='" + getFavicon(url) + "'></a><div class='sitenametooltips'>" + site + " </div><button id='" + site + "btn' class='showdelpng' style='display:none;' onclick=' deletesite(this)'><img class='delicopng' alt='delete site' src='../res/delicoimg.webp'> </button></div>";
    //store in firebase

    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/sites/');
        ref.push({
            url: url,
            site: site,
        });


    } else {
        alert("Please sign in to add sites");
    }
}
////////////////////////////// retrive and display sites from firebase ///////////////////////////////
function setsite() {
    var siteslist = JSON.parse(localStorage.getItem("sites"));
    if (siteslist == null) {
        siteslist = [];
    }
    for (var i = 0; i < siteslist.length; i++) {
        document.getElementById("div-sites").innerHTML += "<div class='site' id='" + siteslist[i].site + "'><a href='" + siteslist[i].url + "'><img alt='" + siteslist[i].site + "' class='Siteicons' src='" + getFavicon(siteslist[i].url) + "'></a><div class='sitenametooltips'>" + siteslist[i].site + " </div><button id='" + siteslist[i].site + "btn' class='showdelpng' style='display:none;' onclick=' deletesite(this)'><img class='delicopng' alt='delete site' src='../res/delicoimg.webp'> </button></div>";
    }

}

///////////////////////////   remove site from firebase and from the page ////////////////////////////////////
function deletesite(e) {

    var site = e.id;


    //removing from local storage
    var sites = JSON.parse(localStorage.getItem('sites'));

    for (var i = 0; i < sites.length; i++) {
        if (sites[i].site + 'btn' == site) {
            sites.splice(i, 1);
            localStorage.setItem('sites', JSON.stringify(sites));
            break;
        }

    }

    //removing from firebase
    var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/sites/');
    ref.once('value', function(snapshot) {
        var sites = snapshot.val();
        for (var key in sites) {
            if (sites[key].site + "btn" == site) {
                ref.child(key).remove();
                e.parentNode.remove();
                return;
            }
        }
    });
}


///////////////// copy notepad text to clipboard ///////////////////////////////
function copytexttoclipboard(text) {
    copyTextToClipboard(text.parentElement.id);
}