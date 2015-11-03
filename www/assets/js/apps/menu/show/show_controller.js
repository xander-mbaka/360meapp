define(["app", "apps/menu/show/show_view"], function(System, View){
  System.module('MenuApp.Show', function(Show, System, Backbone, Marionette, $, _){
    Show.Controller = {
      showMenu: function(){ 
        var view = new View.Menu();
        System.menuRegion.show(view);
	    }
    };
  });

  return System.MenuApp.Show.Controller;
});
