/* Sidebar Menu*
$(document).ready(function () {
  $('.nav > li > a').click(function(){
    if ($(this).attr('class') != 'active'){
      $('.nav li ul').slideUp();
      $(this).next().slideToggle();
      $('.nav li a').removeClass('active');
      $(this).addClass('active');
    }
  });
});

/* Top Stats Show Hide */
$(document).ready(function(){
    $("#topstats").click(function(){
        $(".topstats").slideToggle(100);
    });
});

/* Sidepanel Show-Hide *
$(document).ready(function(){
    $(".sidepanel-open-button").click(function(){
        $(".sidepanel").toggle(100);
    });
});

/* Sidebar Show-Hide *
$(document).ready(function(){
    var wide
    var width;
    var widthneg;

    $('#content').on('click', function(){
        wide = $(document).width();
        if (wide > 600) { width = 300; widthneg = -300;}else{width = '50%'; widthneg = '-50%';}
        if($('.sidebar').hasClass('hidden')){
           
        }else{
            $('.sidebar').addClass('hidden');
            $('.content.main').animate({
                'marginLeft' : 0,
                'marginRight' : 0
            }, 300);    
        }
    });

    $('.sidebar-open-button').on('click', function(){
        wide = $(document).width();
        if (wide > 600) { width = 300; widthneg = -300;}else{width = '50%'; widthneg = '-50%';}
        if($('.sidebar').hasClass('hidden')){
            $('.sidebar').removeClass('hidden');
            $('.content.main').animate({
                'marginLeft' : width,
                'marginRight' : widthneg
            }, 300);  //if window.width > 700px, margin = 300px, otherwise: 50%
        }else{
            $('.sidebar').addClass('hidden');
            $('.content.main').animate({
                'marginLeft' : 0,
                'marginRight' : 0
            }, 300);    
        }
    });

    $('.sidebar-open-button-mobile').on('click', function(){
        wide = $(document).width();
        if (wide > 600) { width = 300; widthneg = -300;}else{width = '50%'; widthneg = '-50%';}
        if($('.sidebar').hasClass('hidden')){
            $('.sidebar').removeClass('hidden');
            $('.content.main').animate({
                'marginLeft' : width,
                'marginRight' : widthneg
            }, 300);  
        }else{
            $('.sidebar').addClass('hidden');
            $('.content.main').animate({
                'marginLeft' : 0,
                'marginRight' : 0
            }, 300);    
        }
    });

});


/* ===========================================================
PANEL TOOLS
===========================================================*/
/* Minimize */
$(document).ready(function(){
  $(".panel-tools .minimise-tool").click(function(event){
  $(this).parents(".panel").find(".panel-body").slideToggle(100);

  return false;
}); 

 }); 

/* Close */
$(document).ready(function(){
  $(".panel-tools .closed-tool").click(function(event){
  $(this).parents(".panel").fadeToggle(400);

  return false;
}); 

 }); 

 /* Search */
$(document).ready(function(){
  $(".panel-tools .search-tool").click(function(event){
  $(this).parents(".panel").find(".panel-search").toggle(100);

  return false;
}); 

 }); 




/* expand */
$(document).ready(function(){

    $('.panel-tools .expand-tool').on('click', function(){
        if($(this).parents(".panel").hasClass('panel-fullsize'))
        {
            $(this).parents(".panel").removeClass('panel-fullsize');
        }
        else
        {
            $(this).parents(".panel").addClass('panel-fullsize');
 
        }
    });

});


/* ===========================================================
Widget Tools
===========================================================*/


/* Close */
$(document).ready(function(){
  $(".widget-tools .closed-tool").click(function(event){
  $(this).parents(".widget").fadeToggle(400);

  return false;
}); 

 }); 


/* expand */
$(document).ready(function(){

    $('.widget-tools .expand-tool').on('click', function(){
        if($(this).parents(".widget").hasClass('widget-fullsize'))
        {
            $(this).parents(".widget").removeClass('widget-fullsize');
        }
        else
        {
            $(this).parents(".widget").addClass('widget-fullsize');
 
        }
    });

});

/* Kode Alerts */
/* Default */
$(document).ready(function(){
  $(".kode-alert .closed").click(function(event){
  $(this).parents(".kode-alert").fadeToggle(350);

  return false;
}); 

 }); 


/* Click to close */
$(document).ready(function(){
  $(".kode-alert-click").click(function(event){
  $(this).fadeToggle(350);

  return false;
}); 

 }); 



/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Popover */
$(function () {
  $('[data-toggle="popover"]').popover()
})


/* Page Loading */
$(window).load(function() {
  $(".loading").fadeOut(750);
})


/* Update Fixed */
/* Version 1.2 */
$('.profilebox').on('click',function(){ $(".sidepanel").hide(); })
