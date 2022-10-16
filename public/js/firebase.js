// initialising firebase and firebase configurations.

window.onload = function() {
    checkAuthState();
}

var firebaseConfig = {
    apiKey: "AIzaSyAfz4hJFk_icFjyCCeYvBC-2wgj7JdxwqE",
    authDomain: "home5559.firebaseapp.com",
    databaseURL: "https://home5559-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "home5559",
    storageBucket: "home5559.appspot.com",
    messagingSenderId: "2097507965",
    appId: "1:2097507965:web:b1748701bde0d2dd358b14",
    measurementId: "G-B6PHS26TPW"
};

firebase.initializeApp(firebaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();

// check the authentication states, and oerform functions accordingly.

function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setBackground()
            setuserdata(user.displayName, user.photoURL, user.displayName, "Sign Out");
            setsite();
            setnotes();
            setdatatolocal(user);
            setbackgroundtolocal(user);
        } else {
            setBackground()
            setuserdata("Guest", "res/defuser.webp", "Guest", "Sign In");
        }
    });
}

///////////////////// sign in and out functions /////////////////

function signinout() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut().then(() => {
            window.location.reload();
            setuserdata("Guest", "res/defuser.png", "Guest", "sign-in");

        }).catch(e => {
            console.log(e)
        })
    } else {
        firebase.auth().signInWithPopup(provider).then(res => {

            usr = res.user;
            setuserdata(usr.displayName, usr.photoURL, usr.displayName, "Sign Out");

        }).catch(e => {
            console.log(e)
        })
    }
}
/////////////////////   function to set the users accordingly /////////////////

function setuserdata(name, imgsrc, profname, btnn) {
    document.getElementById('grtusr').innerHTML = 'Hello ' + name;
    document.getElementById('proimg').src = imgsrc;
    document.getElementById('profname').innerHTML = profname;
    document.getElementById('signinout').innerHTML = btnn;
}



//////////////////// set the sites, notes etc to local storage once user logins
function setdatatolocal(user) {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var db = firebase.database();
        var ref = db.ref('users/' + user.uid + '/sites/');
        ref.once('value', function(snapshot) {
            var sites = snapshot.val();
            var sitelist = [];
            for (var key in sites) {

                sitename = sites[key].site;
                siteurl = sites[key].url;
                sitelist.push({
                    site: sitename,
                    url: siteurl
                });
            }
            localStorage.setItem('sites', JSON.stringify(sitelist));
        });


    }

}

function setbackgroundtolocal(user) {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref('users/' + user.uid + '/bgimg/');
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            localStorage.setItem('bgimg', data.bgimage);
        })
    }
}