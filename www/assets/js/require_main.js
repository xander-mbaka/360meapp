requirejs.config({
  baseUrl: "assets/js",
  paths: {
    jquery: "vendor/jquery.min",    
    json2: "vendor/json2",
    backbone: "vendor/backbone",
    marionette: "vendor/backbone.marionette",
    tpl: "vendor/tpl",    
    underscore: "vendor/underscore",
    //backbone plugins
    "backbone.picky": "vendor/backbone.picky",
    "backbone.syphon": "vendor/backbone.syphon",    
    "backbone.modelBinder": "vendor/backbone.modelbinder",    
    localstorage: "vendor/backbone.localstorage",
    //bootstrap
    bootstrap: "plugins/bootstrap/bootstrap.min",    
    bootselect: "plugins/bootstrap-select/bootstrap-select",
    boottoggle: "plugins/bootstrap-toggle/bootstrap-toggle.min",
    //wysiwsyg editors
    bootwysi: "plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.min",
    bootwysiboot: "plugins/bootstrap-wysihtml5/bootstrap-wysihtml5",
    summernote: "plugins/summernote/summernote.min",
    dotdotdot: "plugins/dotdotdot/jquery.dotdotdot.min",
    //charting
    flotchart: "plugins/flot-chart/flot-chart",
    flottime: "plugins/flot-chart/flot-chart-time",
    flotstack: "plugins/flot-chart/flot-chart-stack",
    flotpie: "plugins/flot-chart/flot-chart-pie",
    chartist: "plugins/chartist/chartist",
    easypie: "plugins/easypiechart/easypiechart",
    sparkline: "plugins/sparkline/sparkline",
    d3: "plugins/rickshaw/d3.v3",
    rickshaw: "plugins/rickshaw/rickshaw",
    eve: "plugins/morris/eve",
    raphael: "plugins/morris/raphael.min",
    morris: "plugins/morris/morris.min",
    //datatables
    datatables: "plugins/datatables/datatables.min",
    //alerts
    sweetalert: "plugins/sweet-alert/sweetalert.min",
    kodealert: "plugins/kode-alert/main",
    jqueryui: "plugins/jquery-ui/jquery-ui.min",
    moment: "plugins/moment/moment.min",
    calendar: "plugins/full-calendar/fullcalendar",
    daterange: "plugins/date-range-picker/daterangepicker",

    touchswipe: "plugins/jquery.touchswipe.min",
    plugins: "plugins/plugins",
    pieplug: "plugins/easypiechart/easypiechart-plugin",
    dash: "dash",

    fileupload: "plugins/upload/jquery.fileupload",
    iframe: "plugins/upload/jquery.iframe-transport",
    knob: "plugins/upload/jquery.knob",
    widget: "plugins/upload/jquery.ui.widget",

  },

  shim: {
    underscore: {
      exports: "_"
    },

    jquery: {
      exports: "$"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    "backbone.modelBinder": ["backbone"],
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    flotchart: {
      deps: ["jquery"],
      exports: '$.plot'
    },
    flottime: {
      deps: ["flotchart"]
    },
    flotstack: {
      deps: ["flotchart"]
    },
    flotpie: {
      deps: ["flotchart"]
    },
    fileupload: ["knob", "widget", "iframe"],
    raphael: ["eve"],
    morris: ["raphael"],
    jqueryui: ["jquery"],
    touchswipe: ["jquery"],
    localstorage: ["backbone"],
    dotdotdot: ["jquery"],
    bootstrap: ["jquery"],
    calendar: ["moment"],
    plugins: ["bootstrap", "bootselect", "boottoggle", "kodealert", "jqueryui"],
    dash: ["bootstrap", "bootselect", "boottoggle", "bootwysiboot", "summernote", "flotchart", "flottime", "flotstack", "flotpie", "chartist", "easypie", "sparkline", "d3", "rickshaw", "datatables", "sweetalert", "kodealert", "jqueryui", "calendar", "daterange"]
  }
});

require(["app"], function(System){
  System.start();
});
