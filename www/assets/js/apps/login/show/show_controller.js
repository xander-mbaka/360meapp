define(["app", "apps/login/show/show_view"], function(System, View){
  System.module('LoginApp.Show', function(Show, System, Backbone, Marionette, $, _){
    Show.Controller = {
      showLogin: function(){
        var view = new View.Login();
        var empty = new System.MenuApp.Show.View.Empty();
        System.menuRegion.show(empty);
        System.contentRegion.show(view);

        view.on('login', function(data) {
            data['operation'] = 'applogin';
            $.post(System.coreRoot + '/service/hrm/index.php', data, function(result) {
              if (result != 0) {
                var data = JSON.parse(result);
                if (data['id']) {
                  view.triggerMethod("success", data);
                };                    
              }else{
                view.triggerMethod("error");
              }
            });
        });

        view.on('forgot', function(data) {
          //var recoverview = new View.Recover();
          //System.contentRegion.show(recoverview);
        });
      },

      showRegistration: function(){
        var THAT = this;
        var view = new View.Register();
        System.contentRegion.show(view);
        view.on('register', function(data) {
          data['operation'] = 'register';
          $.post(System.coreRoot + '/service/gateway.php', data, function(result) {
            if (result = 1) {
              view.triggerMethod("success");
              THAT.showLogin();
            }else{
              view.triggerMethod("error");
            }
          });
        });


      },

      showProfile: function(){
        var view = new View.Profile();
        System.contentRegion.show(view);

        view.on('modify', function() {
          var aview = new View.ModifyProfile();
          System.contentRegion.show(aview);
          
          aview.on('update', function(data) {
            data['operation'] = 'updateProfile';
            $.post(System.coreRoot + '/service/gateway.php', data, function(result) {
              if (result != 0) {
                  var data = JSON.parse(result);
                  if (data['id']) {
                    aview.triggerMethod("profupdate", data);
                  };                    
                }else{
                  aview.triggerMethod("error");
                }
            });
          });
        });
      }
    };
  });

  return System.LoginApp.Show.Controller;
});
