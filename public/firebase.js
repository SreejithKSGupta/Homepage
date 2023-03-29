import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref, get, set,remove } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAfz4hJFk_icFjyCCeYvBC-2wgj7JdxwqE",
    authDomain: "home5559.firebaseapp.com",
    databaseURL: "https://home5559-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "home5559",
    storageBucket: "home5559.appspot.com",
    messagingSenderId: "2097507965",
    appId: "1:2097507965:web:b1748701bde0d2dd358b14",
    measurementId: "G-B6PHS26TPW"
};
var root = document.querySelector(':root');
const app = initializeApp(firebaseConfig);
let provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getDatabase(app);
const user = auth.currentUser;
window.onload = function () {
    checkAuthState();
    hidepopups();
    setcol();
    setfont();
    showdateandtime();
    enterfunction();
    setBackground();
    setsite();
    setslidersettings();
    setwindow();
    settoggles();
    seteventlisteners();
    setInterval(showdateandtime, 20000);
    showdelbtns();
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('https://home5559.web.app/sw.js?v=4').then(function(registration) {
        // Registration was successful
    }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
        });
    });
}
function showdateandtime() {
    var d = new Date();
    var curr_date = d.getDate();
    if (curr_date < 10) {
        curr_date = "0" + curr_date;
    }
    var curr_month = d.getMonth() + 1;
    if (curr_month < 10) {
        curr_month = "0" + curr_month;
    }
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    if (curr_min < 10) {
        curr_min = "0" + curr_min;
    }
    if (curr_hour < 10) {
        curr_hour = "0" + curr_hour;
    }
    var apm = "AM";
    if (curr_hour % 12) { apm = "PM"; }
    document.getElementById("tmediv").innerHTML = curr_hour + ":" + curr_min + " " + apm;
    document.getElementById("date").innerHTML = curr_date + "/" + curr_month + "/" + curr_year;
}
function search() {
    var query    = document.getElementById("search").value;
    var provider = document.getElementById("provider").value;
    var type     = document.getElementById("SType").value;
    var format   = "";
    var urlq     = "";
    var url      = "";

    if (provider == "google") {
         urlq = "https://www.google.com/search?q=";
         if(type=="img"){
            format="&tbm=isch";
      }
      else if(type=="video"){
        format="&tbm=vid";
    }
     url =urlq+query+format;
    }
     else if (provider == "bing") {
         urlq = "https://www.bing.com/";
               if(type=="web"){
            format="search?q=";
      }
              if(type=="img"){
            format="images/search?q=";
      }
      else if(type=="video"){
        format="videos/search?q=";
    }
     url =urlq+format+query;

    }
     else if (provider == "duckduckgo") {
         urlq = "https://duckduckgo.com/?q=";
             if(type=="img"){
            format="&iax=images&ia=images";
      }
      else if(type=="video"){
        format="&iax=videos&ia=videos";
    }
     url =urlq+query+format;
    } 
    else if (provider == "youtube") {
         urlq = "https://www.youtube.com/results?search_query=";
          url =urlq+query+format;
    }
    if (document.getElementById("opninwindow").checked == true) {
        window.open(url);
    } else if (document.getElementById("opninwindow").checked == false) {
        window.location.href = url;
    }
}
function enterfunction() {
    // search function
    document.getElementById("search").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            document.getElementById("searchbtn").click();
        }
    });
}
function hidepopups() {
    var popdivs = document.getElementsByClassName('popup');
    for (var i = 0; i < popdivs.length; i++) {
        popdivs[i].classList.add("corner");
        popdivs[i].style.height = "0px";
        popdivs[i].style.width = "0px";
        popdivs[i].style.opacity = "0";
        
    }
}
function showhide(needed) {
    var popdivs = document.getElementsByClassName('popup');
    for (var i = 0; i < popdivs.length; i++) {
        if (popdivs[i].id !== needed) {
            popdivs[i].classList.add("corner");
            popdivs[i].style.height = "0px";
            popdivs[i].style.width = "0px";
            popdivs[i].style.opacity = "0";
            
        }
    }
    var showdiv = gid(needed).style;
    if (showdiv.opacity == "0") {
        gid(needed).classList.remove("corner");
        showdiv.width = "";
        showdiv.height = "";
        showdiv.opacity = "1";
        

    } else if (showdiv.opacity == "1") {
        gid(needed).classList.add("corner");
        showdiv.width = "0px";
        showdiv.height = "0px";
        showdiv.opacity = "0";
      
    }
}
function getFavicon(url) {
    var favicon = "https://www.google.com/s2/favicons?sz=256&domain=" + url + "&size=320";
    return favicon;
}
function showdelbtns() {

    var del = document.getElementsByClassName("btnbox");
    if (del == null) { return }
    for (var i = 0; i < del.length; i++) {
        if (del[i].style.display == "none") {
            del[i].style.display = "flex";
        } else if (del[i].style.display = "felx") {
            del[i].style.display = "none";
        }

    }
}
function clearpop(item) {
    var popup = document.getElementById(item);
    popup.style.height = "0px";
    popup.style.width = "0px";
    popup.style.opacity = 0;
}
function seteventlisteners() {
    gid("grtusr").addEventListener("click", function () { showhide("footer"); });
    gid('profsettings').addEventListener("click", function () { showhide('footer'); });
    gid("proimg").addEventListener("click", function () { showhide("profcard"); });
    gid("adbtn").addEventListener("click", function () { showhide('addsite-tooltip'); });
    gid("cansl-site-btn").addEventListener("click", function () { clearpop('addsite-tooltip'); });
    gid("cnsl-sett-btn").addEventListener("click", function () { clearpop('settings-tooltip'); });
    gid("sett").addEventListener("click", function () { showhide('settings-tooltip'); });
    gid('signinout').addEventListener("click", function () { signinout(); });
    gid("searchbtn").addEventListener("click", function () { search(); });
    gid("add-site-btn").addEventListener("click", function () { addsitecomp(); });
    gid("delt").addEventListener("click", function () { showdelbtns(); });

    gid("fontselector").addEventListener("change", function () { changefont(); });
    gid("opninwindow").addEventListener("change", function () { changewindow(); });
    gid("uploadBannerImage").addEventListener("change", function () {getImgData();});
    gid("animtime").addEventListener("change", function () { changevalue(this, '--transitionduration', 'ms', 10); });
    gid("vlfontipt").addEventListener("change", function () { changevalue(this, '--font-size', '', 0.03); });
    gid("iconsizeipt").addEventListener("change", function () { changevalue(this, '--sitewidth', 'vw', 0.5); });
    gid("fasiteipt").addEventListener("change", function () { changevalue(this, '--favsiteswidth', 'vw', 1); });
    gid("genpaddingipt").addEventListener("change", function () { changevalue(this, '--padding', 'px', 0.2); });
    gid("genmarginipt").addEventListener("change", function () { changevalue(this, '--margin', 'px', 0.35); });
    gid("iconbordeript").addEventListener("change", function () { changevalue(this, '--icoborderradius', '%', 0.5); });
    gid("bordeript").addEventListener("change", function () { changevalue(this, '--searchborderradius', 'px', 0.5); });
    gid("tshowdate").addEventListener("change", function () { changeswitch(this, 'date') });
    gid("tshowtime").addEventListener("change", function () { changeswitch(this, 'tmediv') });
    gid("tshowgreetings").addEventListener("change", function () { changeswitch(this, 'grtusr') });
    gid("tshowtopbar").addEventListener("change", function () { changeswitch(this, 'toppart') });
    gid("tshowfavsites").addEventListener("change", function () { changeswitch(this, 'btmpart') });
    gid("primecoul").addEventListener("change", function () { changecol(this, '--primarycol') });
    gid("fontscoul").addEventListener("change", function () { changecol(this, '--fontcolor') });
    gid("searchcoul").addEventListener("change", function () { changecol(this, '--searchbarcol') });
    gid("actionscoul").addEventListener("change", function () { changecol(this, '--actioncol') });
    gid("iconcoul").addEventListener("change", function () { changecol(this, '--iconbackgroundcol') });
    gid("hourcoul").addEventListener("change", function () { changecol(this, '--datetimecol') });
    gid("namecoul").addEventListener("change", function () { changecol(this, '--grtnamecol') });
}
function gid(id) {
    return document.getElementById(id);
}
function changewindow() {
    var toggle = document.getElementById('opninwindow');
    if (toggle.checked) {
        localStorage.setItem("window", 1);
    } else {
        localStorage.setItem("window", 0);
    }
}
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
}
function savefont(font) {
    localStorage.setItem("font", font);
}
function setfont() {
    var font = localStorage.getItem("font");
    if (font == null) {
        font = "Arial";
    }
    root.style.setProperty("--font", font);
}
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
function setBackground() {
    var bgimg = localStorage.getItem("bgimg");
    if (bgimg != null) {
        var img = new Image();
        img.src = bgimg;
        document.body.style.backgroundImage = "url(" + img.src + ")";
    } else {
        return;
    }
}
function addsitecomp() {
    var site = document.getElementById("site-name").value;
    var url = document.getElementById("site-url").value;
    if (site == "" || url == "") {
        alert("Please fill in all fields");
        return;
    }
    var r = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/);
    var urlvalid = r.test(url);
    if (!urlvalid) {
        alert("Please enter a valid URL");
        return;
    }
    //check if the website is alreaady present
    var flagg = 0;
    checksite(site,url).then(function (result) {
        if (result == 1) {
            flagg = 1;
        }
        else {
            flagg = 0;
        }
    }).catch(function (error) { });
    if (flagg == 0) {
        store(site, url);
    }
    else if (flagg == 1) {
        alert("Site already present");
    }
    else {
        alert("unknown error");
    }
    document.getElementById("site-name").value = "";
    document.getElementById("site-url").value = "";
    clearpop("addsite-tooltip");
}
function getImgData() {
    const chooseFile = document.getElementById("uploadBannerImage");
    const files = chooseFile.files[0];
    if (files.type.match(/image*/   )) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            gid("boddy").style.backgroundImage = "url(" + fileReader.result + ")";
            savebgimg(fileReader.result);
        });
 

    } else {
        alert("The dropped file is not an image: ", files.type);
    } 
}
function savebgimg(img) {
    localStorage.setItem("bgimg", img);
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            const refBgImg = ref(db, 'users/' + auth.currentUser.uid + '/bgimg/');
            set(refBgImg, {
                bgimage: img,
            });
        }
    });
}
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
function changefont() {
    var query = document.getElementById("fontselector").value;
    root.style.setProperty("--font", "'" + query + "'");
    savefont(query);
}
function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setBackground()
            setuserdata(user.displayName, user.photoURL, user.displayName, "Sign Out");
            setdatatolocal(user);
            setbackgroundtolocal(user);
        } else {
            setBackground()
            setuserdata("Guest", "res/defuser.webp", "Guest", "Sign In");
        }
    });
}
function signinout() {
    if (auth.currentUser) {
        signOut(auth).then(() => {
            window.location.reload();
            setuserdata("Guest", "res/defuser.png", "Guest", "sign-in");
        }).catch(e => {
            console.log(e)
        })
    } else {
        signInWithPopup(auth, provider).then(res => {

            const usr = res.user;
            setsite();
            setuserdata(usr.displayName, usr.photoURL, usr.displayName, "Sign Out");

        }).catch(e => {
            console.log(e)
        })
    }
}
function setuserdata(name, imgsrc, profname, btnn) {
    document.getElementById('grtusr').innerHTML = 'Hello ' + name;
    document.getElementById('proimg').src = imgsrc;
    document.getElementById('profname').innerHTML = profname;
    document.getElementById('signinout').innerHTML = btnn;
}
function setdatatolocal(user) {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            const refSites = ref(db, 'users/' + auth.currentUser.uid + '/sites/');
            get(refSites).then((snapshot) => {
                const sites = snapshot.val();
                const sitelist = [];
                for (const key in sites) {
                    const sitename = sites[key].site;
                    const siteurl = sites[key].url;
                    sitelist.push({
                        site: sitename,
                        url: siteurl,
                    });
                }
                localStorage.setItem("sites", JSON.stringify(sitelist));
            });
        }
    });
}
function setbackgroundtolocal(user) {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            const refBgImg = ref(db, 'users/' + auth.currentUser.uid + '/bgimg/');
            get(refBgImg).then((snapshot) => {
                const data = snapshot.val();
                localStorage.setItem("bgimg", data.bgimage);
            });
        }
    });
}
function store(site, url) {
    if (auth.currentUser) {
        var sites = JSON.parse(localStorage.getItem("sites"));
        if (sites == null) {
            sites = [];
        }
        sites.push({
            url: url,
            site: site,
        });
        localStorage.setItem("sites", JSON.stringify(sites));
        document.getElementById("div-sites").innerHTML +=  getsitebox(url,site);
        
        var reff =  ref(db, "users/" + auth.currentUser.uid + "/sites/");
        set(reff, sites);
    
    } else {
        alert("Please sign in to add sites");
    }
}
async function deletesite(delbtn) {
    var site = delbtn.id;
    var sites = JSON.parse(localStorage.getItem('sites'));
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].site + 'delbtn' == site) {
            sites.splice(i, 1);
            localStorage.setItem('sites', JSON.stringify(sites));
            delbtn.parentNode.parentNode.remove();
            break;
        }
    }
    if (auth.currentUser) {
        const refSites =get(ref(db, "users/" + auth.currentUser.uid + "/sites/"));
        refSites.then((snapshot) => {
            if (snapshot.exists()) {
              var sites = snapshot.val();
              for (var key in sites) {
                if (sites[key].site + "delbtn" == site) {
                    remove(ref(db, "users/" + auth.currentUser.uid + "/sites/" + key));
                    return;
                }
            }
        }});
    }
}
async function editsite(editbtn){
    var sitenme=prompt("Enter name");
    if(sitenme==null){ return;}
    var siteurl=prompt("Enter url");
    if(siteurl==null){ return;}
    var flagg=4;
    checksite(sitenme,siteurl).then(function (result) {
        if (result == 1) {
            flagg = 1;
        }
        else {
            flagg = 0;
        }
    }).catch(function (error) { });
    if (flagg == 0) {
        var site=editbtn.id;
        var sites=JSON.parse(localStorage.getItem('sites'));
        for(var i=0;i<sites.length;i++){
            if(sites[i].site+'editbtn'==site){
                sites[i].site=sitenme;
                sites[i].url=siteurl;
                localStorage.setItem('sites',JSON.stringify(sites));
                editbtn.parentNode.parentNode.innerHTML= getsitebox(siteurl,sitenme);
                break;
            }
        }
        if(auth.currentUser){
            const refSites =get(ref(db, "users/" + auth.currentUser.uid + "/sites/"));
            refSites.then((snapshot) => {
                if (snapshot.exists()) {
                  var sites = snapshot.val();
                  for (var key in sites) {
                    if (sites[key].site + "editbtn" == site) {
                        set(ref(db, "users/" + auth.currentUser.uid + "/sites/" + key),{
                            site:sitenme,
                            url:siteurl,
                        });
                        return;
                    }
                }
            }});
        }
    }
    else if (flagg == 1) {
        alert("Site already present");
    }
    else {
        alert("unknown error");
    }
}
async function checksite(site,siteurl) {
    let flag = 0;
    if (auth.currentUser) {
        const userSitesRef = ref(db, "users/" + auth.currentUser.uid + "/sites/");
        const snapshot = await get(userSitesRef);
        if (snapshot.exists()) {
            const sites = snapshot.val();
            for (const key in sites) {
                if (sites[key].site == site || sites[key].url == siteurl) {
                    flag = 1;
                    break;
                }
            }
        }
        return flag;
    }
}
function setsite() {
    var siteslist = JSON.parse(localStorage.getItem("sites"));
    if (siteslist == null) {
        siteslist = [];
    }
    for (var i = 0; i < siteslist.length; i++) {
        document.getElementById("div-sites").innerHTML +=  getsitebox(siteslist[i].url,siteslist[i].site);
    }
        var sitedel = document.getElementsByClassName("delicon");
        var siteedit = document.getElementsByClassName("editicon");
    for (var i = 0; i < sitedel.length; i++) {
        gid(sitedel[i].id).addEventListener("click", function () {
            deletesite(this)
        });
    }
     for (var i = 0; i < sitedel.length; i++) {
        gid(siteedit[i].id).addEventListener("click", function () {
           editsite(this)
        });
    }
}
function getsitebox(url,site) {
    var simg="<a href='" + url + "'><img alt='" + site + "' class='Siteicon' src='" + getFavicon(url) + "'></a>"
    var sname="<div class='sitename'>" + site + " </div>"
    var seditbtn="<img class='editicon' id='"+site+"editbtn' alt='edit site' src='res/editsite.webp'></img>"
    var sdelbtn ="<img class='delicon' id='"+site+"delbtn' alt='delete site' src='res/delsite.webp'></img>"
    var sbtnbox="<div class='btnbox'>" + seditbtn + sdelbtn + "</div>"
    var sitebox="<div class='sitebox' id='" + site + "'>"+simg+sname+sbtnbox+"</div>";
    return sitebox;
}