define(["app", "tpl!apps/templates/menu.tpl", "tpl!apps/templates/empty.tpl", "touchswipe"], 
	function(System, menuTpl, emptyTpl){
  System.module('MenuApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Menu = Marionette.ItemView.extend({      

        template: menuTpl,

        onShow: function(){
          $("#top").unwrap();
          this.activateMenu();
          //$('.profilelink').find('.uname').text(System.user.name);
          $('.profilelink').find('img').attr('src', System.coreRoot+'/profile/'+System.user.pic);
        },

        activateMenu: function(){
          //var wide
          var left;
          //var widthneg;
          //setup menu elements based on the user role

          $("body").swipe( {
            //Generic swipe handler for all directions
            swipeLeft:function(event, direction, distance, duration, fingerCount) {
              var wide = $(document).width();
              if (wide > 600) { left = -200;}else{ left = '-50%';}
              $('.sidebar').addClass('hidden');
              $('.sidebar').animate({
                 'marginLeft' : '-50%'
              }, 250);   
            },

            swipeRight:function(event, direction, distance, duration, fingerCount) {
              console.log('swiped right');
              //wide = $(document).width();
              //if (wide > 600) { width = 200; widthneg = -200;}else{width = '50%'; widthneg = '-50%';}
              $('.sidebar').removeClass('hidden');
              $('.sidebar').animate({
                  'marginLeft' : 0
              }, 250);
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:40,

            /*click:function (event, target) {
              $(target).click();
            },
            threshold:75*/
          });

           $('.nav > li > a').off('click');

           $('.nav > li > a').on('click', function(){
            if ($(this).attr('class') != 'active'){
              $('.nav li ul').slideUp();
              $(this).next().slideToggle();
              $('.nav li a').removeClass('active');
              $(this).addClass('active');
            }
          });

          /*$('#content').off('click');
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
              if (wide > 600) { width = 200; widthneg = -200;}else{width = '40%'; widthneg = '-40%';}
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
              if (wide > 600) { width = 200; widthneg = -200;}else{width = '40%'; widthneg = '-40%';}
              if($('.sidebar').hasClass('hidden')){
                  $('.sidebar').removeClass('hidden');
                  $('.sidebar').animate({
                      'width' : width
                  }, 250);
                  $('.content.main').animate({
                      'marginLeft' : width,
                      'marginRight' : widthneg
                  }, 250);  //if window.width > 700px, margin = 250px, otherwise: 40%
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
              if (wide > 600) { width = 200; widthneg = -200;}else{width = '40%'; widthneg = '-40%';}
              if($('.sidebar').hasClass('hidden')){
                  $('.sidebar').animate({
                      'width' : width
                  }, 250);
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
          });*/

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
 