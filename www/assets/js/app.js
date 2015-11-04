define(["marionette", "sweetalert", "dotdotdot"], function(Marionette){
  var System = new Marionette.Application();

  System.addRegions({
    menuRegion: "#menu",
    contentRegion: "#content"
  });
  
  System.coreRoot = "http://www.qet.co.ke/360";

  System.phoneContacts = [];

  System.structure = [];

  System.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  System.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  System.on("initialize:after", function(){
    if(Backbone.history){
      require([
        "apps/login/login_app",
        "apps/menu/menu_app",
        "apps/dash/dash_app",
        "apps/leads/leads_app"
        //"apps/notifications/notifications_app",
        //"apps/reports/reports_app",
        //"apps/profile/profile_app",
        //"apps/about/about_app"
        ], function () {
        Backbone.history.start();//{ pushState: true, root: "/ecomadmin/frontend/" }

        if(System.getCurrentRoute() === ""){
          System.trigger("login:show");
        }
      });
    }
  });

  return System;
});