var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        this.receivedEvent('deviceready');        
        this.transact();
        /*var conts = new ContactFindOptions();
        conts.filter = "Alex";
        conts.multiple = true;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, onSuccess, onError, conts);*/
    },

    onSuccess: function (contacts){
        for (var i = contacts.length - 1; i >= 0; i--) {
            alert(contacts[i].displayName);
        };
    },

    onError: function (er){
        alert('arror');
    },

    transact: function() {
        var db = window.openDatabase("Database", "1.0", "Chase Demo", 200000);
        db.transaction(this.populateDB, this.errorCB, this.successCB);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Populate the database
    //
    populateDB: function(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id unique, uname, password)');
        tx.executeSql('INSERT INTO users (id, uname, password) VALUES (1, "Alex", "password")');
        tx.executeSql('INSERT INTO users (id, uname, password) VALUES (2, "Michael", "password")');
    },

    // Transaction error callback
    //
    errorCB: function(tx, err) {
        alert("Error processing SQL: "+err);
    },

    // Transaction success callback
    //
    successCB: function() {
        alert("success!");
    }

};
