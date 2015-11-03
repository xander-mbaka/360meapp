define(["app", "tpl!apps/templates/menu.tpl", "tpl!apps/templates/empty.tpl"], 
	function(System, menuTpl, emptyTpl){
  System.module('MenuApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Menu = Marionette.ItemView.extend({      

        template: menuTpl,

        onShow: function(){
          $("#top").unwrap();
          this.activateMenu();
        },

        activateMenu: function(){
          var wide
          var width;
          var widthneg;
          //setup menu elements based on the user role

          $('#content').off('click');
          $('.sidebar-open-button').off('click');
          $('.sidebar-open-button-mobile').off('click');
          $('.nav > li > a').off('click');

          $('.nav > li > a').on('click', function(){
            if ($(this).attr('class') != 'active'){
              $('.nav li ul').slideUp();
              $(this).next().slideToggle();
              $('.nav li a').removeClass('active');
              $(this).addClass('active');
            }

            if($('.sidebar').hasClass('hidden')){
                 
            }else{
              $('.sidebar').addClass('hidden');
              $('.content.main').animate({
                 'marginLeft' : 0,
                 'marginRight' : 0
              }, 250);    
            }
          });

          $('#content').on('click', function(){
              wide = $(document).width();
              if (wide > 600) { width = 250; widthneg = -250;}else{width = '50%'; widthneg = '-50%';}
              if($('.sidebar').hasClass('hidden')){
                 
              }else{
                  $('.sidebar').addClass('hidden');
                  $('.content.main').animate({
                      'marginLeft' : 0,
                      'marginRight' : 0
                  }, 250);    
              }
          });
          
          $('.sidebar-open-button').on('click', function(){
              wide = $(document).width();
              if (wide > 600) { width = 250; widthneg = -250;}else{width = '50%'; widthneg = '-50%';}
              if($('.sidebar').hasClass('hidden')){
                  $('.sidebar').removeClass('hidden');
                  $('.content.main').animate({
                      'marginLeft' : width,
                      'marginRight' : widthneg
                  }, 250);  //if window.width > 700px, margin = 250px, otherwise: 50%
              }else{
                  $('.sidebar').addClass('hidden');
                  $('.content.main').animate({
                      'marginLeft' : 0,
                      'marginRight' : 0
                  }, 250);    
              }
          });

          $('.sidebar-open-button-mobile').on('click', function(){
              wide = $(document).width();
              if (wide > 600) { width = 250; widthneg = -250;}else{width = '50%'; widthneg = '-50%';}
              if($('.sidebar').hasClass('hidden')){
                  $('.sidebar').removeClass('hidden');
                  $('.content.main').animate({
                      'marginLeft' : width,
                      'marginRight' : widthneg
                  }, 250);  
              }else{
                  $('.sidebar').addClass('hidden');
                  $('.content.main').animate({
                      'marginLeft' : 0,
                      'marginRight' : 0
                  }, 250);    
              }
          });

          setTimeout(function() {
            $('.loading').hide();
            if(System.getCurrentRoute() === "" || System.getCurrentRoute() === "logout" || System.getCurrentRoute() === "login"){
              //$('ul#presentation > li:first-child > ul > li > a').first().get(0).click();
            }
            
          }, 300);
        },
    });

    View.Empty = Marionette.ItemView.extend({      

        template: emptyTpl

    });

  });

  return System.MenuApp.Show.View;
});
