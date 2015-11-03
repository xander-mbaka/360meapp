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

          $.get(System.coreRoot + "/gateway.php?dashstats=1", function(result) {
              var element = JSON.parse(result);
              //System.prospects = element.assigned;
              //System.closed = element.closed;
              //System.cold = element.cold;
              $('span.totleads').text(element.all + " ");
              $('span.prospleads').text(element.assigned);
              $('span.closedleads').text(element.closed);
              $('span.coldleads').text(element.cold);
              $('span.mepoints').text(element.points);

              require(["plugins"], function(){
              setTimeout(function(){
                new Morris.Donut({
                  element: 'donut-chart1',
                  data: [{
                      label: element.assigned,
                      info: "Prospects",
                      value: element.assigned
                  }, {
                      label: element.closed,
                      info: "Closed Leads",
                      value: element.closed
                  }, {
                      label: element.cold,
                      info: "Cold Leads",
                      value: element.cold
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
                        label: element.assigned,
                        info: "Prospects",
                        value: element.assigned
                    }, {
                        label: element.closed,
                        info: "Closed Leads",
                        value: element.closed
                    }, {
                        label: element.cold,
                        info: "Cold Leads",
                        value: element.cold
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
              }, 300)
              
            });
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
