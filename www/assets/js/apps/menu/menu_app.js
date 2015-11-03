define(["app", "apps/menu/show/show_controller", "tpl!apps/templates/menu.tpl"], function(System, showController, menuTpl){
  System.module('MenuApp', function(MenuApp, System, Backbone, Marionette, $, _){

    MenuApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "menu" : "showMenu"
      }
    });

    /*var MenuLayout = Backbone.Marionette.Layout.extend({
      template: MenuTpl,

      regions: {
        topRegion: ".slider",
        latestRegion: ".carosel"
      }

    });

    var layout = new MenuLayout();*/

    var API = {
      showMenu: function(){
        //System.contentRegion.show();
        //System.menuRegion.close();
        showController.showMenu();
        //System.execute("set:active:header", "Menu");
      }
    };

    System.on("menu:show", function(){
      System.navigate("menu");
      API.showMenu();
    });

    System.addInitializer(function(){
      new MenuApp.Router({
        controller: API
      });
    });
  });

  return System.MenuApp;
});

