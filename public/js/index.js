//////////////////////////////////////////////////     start of code  ////////////////////////////////////////////////////////     

enterfunction();
setBackground();
setcol();
setslidersettings();
hidepopups();
setfont();
showdateandtime();
setwindow();
settoggles();



//////////////////////////////////////////////////////////////////////////////////////////////
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(() => {})
    })
}


////////////////////////////////////////////  functions to be called on start     ////////////////////////////////////////////


function toggleprofcard() {

    var profcard = document.getElementById("profcard");
    if (profcard.style.display == "block") {
        profcard.style.display = "none";
    } else {
        profcard.style.display = "block";
    }

}


async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        alert('Error in copying text: ', err);
    }
}

////////////////////////////////  show date and time  ////////////////////////////////////////
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
    document.getElementById("hour").innerHTML = curr_hour + ":";
    document.getElementById("min").innerHTML = curr_min + " ";
    document.getElementById("ampm").innerHTML = apm;
    document.getElementById("date").innerHTML = curr_date + "/" + curr_month + "/" + curr_year;

}



///////////////////////////////////////////// search function ///////////////////////////////////////////////////////////
function search() {
    var query = document.getElementById("search").value;
    var provider = document.getElementById("provider").value;
    if (provider == "google") {
        var url = "https://www.google.com/search?q=" + query;
    } else if (provider == "bing") {
        var url = "https://www.bing.com/search?q=" + query;
    } else if (provider == "duckduckgo") {
        var url = "https://duckduckgo.com/?q=" + query;
    } else if (provider == "youtube") {
        var url = "https://www.youtube.com/results?search_query=" + query;
    }

    if (document.getElementById("opninwindow").checked == true) {;
        window.open(url);
    } else if (document.getElementById("opninwindow").checked == false) {
        window.location.href = url;
    }
}

//////////////////////////// enter to search function  //////////////////////////////////////////////////////////////////
function enterfunction() {

    // search function
    document.getElementById("search").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            document.getElementById("searchbtn").click();
        }
    });

    //////////////////////addnotes function  ////////////////////////////
    document.getElementById("notepaddtextipt").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            document.getElementById("adnnte").click();
        }
    });


}

/////////////////////////////////////////////////////    tootl-tips  and cancells       ///////////////////////////////////////
function hidepopups() {

    var popdivs = document.getElementsByClassName('popup');

    for (var i = 0; i < popdivs.length; i++) {

        popdivs[i].style.height = "0px";
        popdivs[i].style.width = "0px";
        popdivs[i].style.opacity = "0";

    }
}

function showhide(needed) {

    var popdivs = document.getElementsByClassName('popup');

    for (var i = 0; i < popdivs.length; i++) {
        if (popdivs[i].id !== needed) {
            popdivs[i].style.height = "0px";
            popdivs[i].style.width = "0px";
            popdivs[i].style.opacity = "0";
        }

    }

    showdiv = document.getElementById(needed).style;
    if (showdiv.opacity == "0") {
        showdiv.width = "";
        showdiv.height = "";
        showdiv.opacity = "1";
    } else if (showdiv.opacity == "1") {
        showdiv.width = "0px";
        showdiv.height = "0px";
        showdiv.opacity = "0";
    }

}

////////////////////////////////////////////////////// adding sites   //////////////////////////////////
//get the favicon
function getFavicon(url) {
    var favicon = "https://www.google.com/s2/favicons?sz=256&domain=" + url + "&size=150";
    return favicon;
}


//to show deleteicon
function del() {

    var del = document.getElementsByClassName("showdelpng");
    if (del == null) { return }
    for (var i = 0; i < del.length; i++) {
        if (del[i].style.display == "none") {
            del[i].style.display = "block";
        } else if (del[i].style.display = "block") {
            del[i].style.display = "none";
        }

    }
}


///////////////////////////////////////////////////////////// clearnotes /////////////////////////////////////////////

function clearpop(item) {
    var popup = document.getElementById(item);
    popup.style.height = "0px";
    popup.style.width = "0px";
    popup.style.opacity = 0;
}

//to update time every 20 seconds.
setInterval(showdateandtime, 20000);

///////////////////////////////////////////////////////////////      end of code      /////////////////////////////////////////////////