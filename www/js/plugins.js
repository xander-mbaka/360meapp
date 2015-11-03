/* Sidebar Menu*/
  $('.nav > li > a').click(function(){
    if ($(this).attr('class') != 'active'){
      $('.nav li ul').slideUp();
      $(this).next().slideToggle();
      $('.nav li a').removeClass('active');
      $(this).addClass('active');
    }
  });

    $("#topstats").click(function(){
        $(".topstats").slideToggle(100);
    });

    $(".sidepanel-open-button").click(function(){
        $(".sidepanel").toggle(100);
    });

    $(".sidebar-open-button-mobile").click(function(){
        $(".sidebar").toggle(150);
    });

    $('.sidebar-open-button').on('click', function(){
        if($('.sidebar').hasClass('hidden')){
            $('.sidebar').removeClass('hidden');
            $('.content').css({
                'marginLeft' : '50%'
            });  
        }else{
            $('.sidebar').addClass('hidden');
            $('.content').css({
                'marginLeft' : 0
            });    
        }
    });

    $('.sidebar-open-button-mobile').on('click', function(){
        if($('.sidebar').hasClass('hidden')){
            $('.sidebar').removeClass('hidden');
            $('.content').css({
                'marginLeft' : '50%',
                'marginRight' : '-50%'
            });  
        }else{
            $('.sidebar').addClass('hidden');
            $('.content').css({
                'marginLeft' : 0,
                'marginRight' : 0
            });    
        }
    });

  $(".panel-tools .minimise-tool").click(function(event){
  $(this).parents(".panel").find(".panel-body").slideToggle(100);

  return false;
}); 


  $(".panel-tools .closed-tool").click(function(event){
    $(this).parents(".panel").fadeToggle(400);

    return false;
  }); 

  $(".panel-tools .search-tool").click(function(event){
  $(this).parents(".panel").find(".panel-search").toggle(100);

  return false;
}); 


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


  $(".widget-tools .closed-tool").click(function(event){
  $(this).parents(".widget").fadeToggle(400);

  return false;
}); 


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

  $(".kode-alert .closed").click(function(event){
  $(this).parents(".kode-alert").fadeToggle(350);

  return false;
}); 


  $(".kode-alert-click").click(function(event){
  $(this).fadeToggle(350);

  return false;
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
