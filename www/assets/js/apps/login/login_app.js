define(["app", "apps/login/show/show_controller"], function(System, ShowController){
  System.module('LoginApp', function(LoginApp, System, Backbone, Marionette, $, _){

    LoginApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "login" : "showLogin",
        "logout" : "showLogout",
        "register" : "showRegistration",
        "profile" : "showProfile"
      }
    });

    var API = {
      showLogin: function(){
        if (localStorage.getItem("userdata") === null) {
          ShowController.showLogin();            
        }else{
          var data = JSON.parse(localStorage.getItem("userdata"));
          //swal("Welcome!", data.name, "success");
          System.user = data;
          System.user.id = parseInt(System.user.id, 10);
          System.trigger("menu:show");
          System.trigger("dash:show");
        }
        $('.loading').css({'display' : 'none'});
      },

      showLogout: function(){
        localStorage.removeItem("userdata");
        ShowController.showLogin();
      },

      showRegistration: function(){
        ShowController.showRegistration(); 
      },

      showProfile: function(){
        ShowController.showProfile(); 
      }
    };

    System.on("login:show", function(){
      System.navigate("login");
      API.showLogin();
    });

    System.commands.setHandler("register:show", function(){
      System.navigate("register");
      API.showRegistration();
    });

    System.commands.setHandler("profile:show", function(){
      System.navigate("profile");
      API.showProfile();
    });

    System.addInitializer(function(){
      new LoginApp.Router({
        controller: API
      });
    });
  });

  return System.LoginApp;
});
