function setsite() {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/sites/');
        ref.once('value', function(snapshot) {
            var sites = snapshot.val();
            var siteslist = "";
            for (var key in sites) {
                var sitt = sites[key].site;
                var urll = sites[key].url;
                siteslist += "<div class='site' id='" + sitt + "'><a href='" + urll + "'><img  class='Siteicons' alt='" + sitt + "' src='" + getFavicon(urll) + "'></a><div class='sitenametooltips'>" + sitt + " </div><button id='" + sitt + "btn' class='showdelpng' style='display:none;' onclick='deletesite(this)'><img alt='delete site button' class='delicopng' src='../res/delicoimg.webp'> </button></div>";
            }
            document.getElementById("div-sites").innerHTML = siteslist;
        });
    } else {
        return;
    }
}


function setBackground() {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref('users/' + user.uid + '/bgimg/');
        ref.once('value', function(snapshot) {
            var bgimg = snapshot.val();
            if (bgimg == null) {
                document.body.style.backgroundImage = "url('res/wallw.jpg')";
            } else {
                document.body.style.backgroundImage = "url(" + bgimg.bgimage + ")";
            }
        });
    } else {
        document.body.style.backgroundImage = "url('res/wallw.jpg')";
    }
}

function setnotes() {

    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/notes/');
        ref.once('value', function(snapshot) {
            var notes = snapshot.val();
            var notelist = "";
            for (var key in notes) {
                var note = notes[key].note;
                notelist += '<div id="' + note + '" class="note"><p class="note-content">' + note + '</p><div class="copybtn" onclick="copytexttoclipboard(this)" ><img alt="copy button" src="../res/copy.webp"> </div> <div class="note-delete" onclick="deletenote(this)"><img alt="delete note button" src="../res/closeicon.webp"></div></div>';
            }
            document.getElementById("notelist").innerHTML = notelist;
        });
    }
}