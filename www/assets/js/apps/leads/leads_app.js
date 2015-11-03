define(["app", "apps/leads/show/show_controller", "tpl!apps/templates/searchcontact.tpl",], function(System, showController, searchTpl){
  System.module('LeadsApp', function(LeadsApp, System, Backbone, Marionette, $, _){

    LeadsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "generated" : "showGeneratedLeads",
        "assigned" : "showAssignedLeads",
        "quicklead" : "quickLead",
        "addlead" : "companies",
        "branches" : "branches",
        "categories" : "categories",
        "products" : "products",
        "searchcontact" : "searchContact"
      }
    });

    var SearchLayout = Backbone.Marionette.Layout.extend({
      template: searchTpl,

      regions: {
        topRegion: ".page-header",
        resultRegion: ".container-widget"
      }

    });

    var layout = new SearchLayout();

    var API = {
      showGeneratedLeads: function(){
        //System.contentRegion.show();
        showController.showGeneratedLeads();
        //System.execute("set:active:header", "Menu");
      },

      showAssignedLeads: function(){
        //System.contentRegion.show();
        showController.showAssignedLeads();
        //System.execute("set:active:header", "Menu");
      },

      quickLead: function(a){
        //System.contentRegion.show();
        showController.addLead(a);
        //System.execute("set:active:header", "Menu");
      },

      companies: function(a){
        //System.contentRegion.show();
        showController.viewCompanies(a);
        //System.execute("set:active:header", "Menu");
      },

      branches: function(id){
        //System.contentRegion.show();
        showController.viewBranches(id);
        //System.execute("set:active:header", "Menu");
      },

      categories: function(){
        //System.contentRegion.show();
        showController.viewCategories();
        //System.execute("set:active:header", "Menu");
      },

      products: function(){
        //System.contentRegion.show();
        showController.viewProducts();
        //System.execute("set:active:header", "Menu");
      },

      contacts: function(){
        //System.contentRegion.show();
        showController.viewContacts();
        //System.execute("set:active:header", "Menu");
      },

      finalize: function(){
        //System.contentRegion.show();
        showController.addLead();
        //System.execute("set:active:header", "Menu");
      },

      modify: function(){
        //System.contentRegion.show();
        showController.modifyLead();
        //System.execute("set:active:header", "Menu");
      },

      searchContact: function(){
        System.contentRegion.show(layout);
        showController.searchContact(layout);
        //System.execute("set:active:header", "Menu");
      }
    };

    System.on("leads:show", function(){
      System.navigate("leads");
      API.showLeads();
    });

    System.on("leads:add", function(){
      System.navigate("companies");
      API.companies();
    });

    System.on("leads:quickadd", function(a){
      System.navigate("quicklead");
      API.quickLead(a);
    });

    System.commands.setHandler("leads:assigned", function(){
      System.navigate("assigned");
      API.showAssignedLeads();
    });

    System.commands.setHandler("leads:companies", function(a){
      System.navigate("companies");
      API.companies(a);
    });

    System.commands.setHandler("leads:branches", function(id){
      System.navigate("branches");
      API.branches(id);
    });

    System.commands.setHandler("leads:categories", function(a){
      System.navigate("categories");
      API.categories(a);
    });

    System.commands.setHandler("leads:products", function(a){
      System.navigate("products");
      API.products(a);
    });

    System.commands.setHandler("leads:contacts", function(a){
      System.navigate("contacts");
      API.contacts(a);
    });

    System.commands.setHandler("leads:finalize", function(a){
      System.navigate("finalize");
      API.finalize(a);
    });

    System.commands.setHandler("leads:modify", function(){
      System.navigate("modify");
      API.modify();
    });

     System.commands.setHandler("leads:search", function(){
      System.navigate("searchcontact");
      API.searchContact();
    });

    System.addInitializer(function(){
      new LeadsApp.Router({
        controller: API
      });
    });
  });

  return System.LeadsApp;
});

