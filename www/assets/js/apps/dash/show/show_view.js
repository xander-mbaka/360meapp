define(["app", "tpl!apps/templates/dashboard.tpl", "morris"], 
	function(System, dashTpl){
  System.module('DashApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Dash = Marionette.ItemView.extend({      

        template: dashTpl,

        events: {
          'click div.createbtnx': 'createLead'
        },

        onShow: function(){
          $("#dashcont").unwrap();
          var THAT = this;
          require(["plugins"], function(){

            new Morris.Donut({
                element: 'donut-chart1',
                data: [{
                    label: 40,
                    info: "Prospects",
                    value: 40
                }, {
                    label: 25,
                    info: "Closed Leads",
                    value: 25
                }, {
                    label: 17,
                    info: "Cold Leads",
                    value: 17
                }],
                labelColor: '#fff',
                colors: ['#f7c331', '#27c97b', '#626876'],
                formatter: function (x, data) {
                  return data.info;
                }
            });

            $('#dashcont').resize(function () {
              new Morris.Donut({
                data: [{
                    label: 40,
                    info: "Prospects",
                    value: 40
                }, {
                    label: 25,
                    info: "Closed Leads",
                    value: 25
                }, {
                    label: 17,
                    info: "Cold Leads",
                    value: 17
                }],
                labelColor: '#fff',
                colors: ['#f7c331', '#27c97b', '#626876'],
                formatter: function (x, data) {
                  return data.info;
                }
              });
            });

            $('.createbtnx').on('click', function (e) {
              THAT.createLead(e);
            })
          });
        },
        
        createLead: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.trigger("leads:add", "opt");
        }
    });

  });

  return System.DashApp.Show.View;
});
