define(["app", "apps/leads/show/show_view"], function(System, View){
  System.module('LeadsApp.Show', function(Show, System, Backbone, Marionette, $, _){
    Show.Controller = {
      showGeneratedLeads: function(){ 
        var view = new View.GeneratedLeads();
        System.contentRegion.show(view);
	    },

      showAssignedLeads: function(){ 
        var view = new View.AssignedLeads();
        System.contentRegion.show(view);
      },

      addLead: function(a){ 
        var view = new View.AddLead();
        
        System.contentRegion.show(view);

        view.on('create', function(data) {
          data['operation'] = 'create';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {                
                view.triggerMethod("form:done");
              };
            });
        });
      },

      modifyLead: function(a){ 
        var view = new View.ModifyLead();
        
        System.contentRegion.show(view);

        view.on('modify', function(data) {
          data['operation'] = 'modifyStatus';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {                
                view.triggerMethod("form:done");
              };
            });
        });
      },

      viewCompanies: function(a){ 
        var view = new View.Companies();
        
        System.contentRegion.show(view);

        view.on('create', function(data) {
          data['operation'] = 'create';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {
                alert('Success: Lead created');
                //admin.triggerMethod("form:done");
              };
            });
        });
      },

      viewBranches: function(id){
        var view = new View.Branches();
        
        System.contentRegion.show(view);

        view.on('create', function(data) {
          data['operation'] = 'create';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {
                alert('Success: Lead created');
                //admin.triggerMethod("form:done");
              };
            });
        });
      },

      viewCategories: function(a){ 
        var view = new View.Categories();
        
        System.contentRegion.show(view);

        view.on('create', function(data) {
          data['operation'] = 'create';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {
                alert('Success: Lead created');
                //admin.triggerMethod("form:done");
              };
            });
        });
      },

      viewProducts: function(a){ 
        var view = new View.Products();
        
        System.contentRegion.show(view);

        view.on('create', function(data) {
          data['operation'] = 'create';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {
                alert('Success: Lead created');
                //admin.triggerMethod("form:done");
              };
            });
        });
      },

      viewContacts: function(a){ 
        var view = new View.Contacts();
        
        System.contentRegion.show(view);

        view.on('create', function(data) {
          data['operation'] = 'create';
            $.post(System.coreRoot + '/gateway.php', data, function(result) {
              if (result == 1) {
                alert('Success: Lead created');
                //admin.triggerMethod("form:done");
              };
            });
        });
      },

      searchContact: function(layout){ 
        var views = new View.SearchHeader();
        layout.topRegion.show(views);

        views.on('results', function(data) {
          //alert(JSON.stringify(data));
          var mod = Backbone.Model.extend({
            urlRoot: "presentation/blog",
          });

          var col = Backbone.Collection.extend({
            url: "presentation/blog",
            model: mod
          });

          var collection = new col(data);

          alert(collection.length + ' contacts found!');
          var result = new View.Contacts({ collection: collection});
          layout.resultRegion.show(result);
        });
      },

      showNotifications: function(){ 
        var view = new View.Notifications();
        System.contentRegion.show(view);
      }
    };
  });

  return System.LeadsApp.Show.Controller;
});
