define(["app", "tpl!apps/templates/dashboard.tpl", "morris"], 
	function(System, dashTpl){
  System.module('DashApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Dash = Marionette.ItemView.extend({      

        template: dashTpl,

        events: {
          'click div.createbtnx': 'createLead',
          'click div.robtnx': 'createForRo',
          'click #leadgroups > li': 'showGroup',
        },

        onShow: function(){
          //$("#dashcont").unwrap();
          $("#fetching").show();
          var ul = $('#messages');
          ul.empty();

          $.get(System.coreRoot + "/service/gateway.php?dashstats="+System.user.id, function(result) {
              var element = JSON.parse(result);
              $('span.asgleads').text(element.all);
              $('span.genleads').text(element.generated);
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

                  $("#fetching").fadeOut(1000);

                }, 300);
                
              });
          });

          $.get(System.coreRoot + "/service/gateway.php?messages="+System.user.id, function(result) {
              var res = JSON.parse(result);
              $('span.notifno').text(res.length);
              var maxcount = 5;
              res.forEach(function(element, index){
                if (maxcount > 0) {
                  var tpl = $('<li><a href="#" class="item clearfix" style="line-height:3.5vmin"><span class="from">'+element.sender.name+'</span>'+element.message+'<span class="date">'+element.date+'</span></a></li>');
                  tpl.appendTo(ul);
                  --maxcount;
                };                
              });

          });
          
        },
        
        createLead: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.trigger("contact:add");
        },

        createForRo: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.trigger("lead:allros");
        },

        showGroup: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.leadGroup = $(e.currentTarget).data('group');
          System.trigger("lead:group");
        }
    });

  });

  return System.DashApp.Show.View;
});
