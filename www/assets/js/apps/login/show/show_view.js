define(["app", "tpl!apps/templates/login.tpl", "tpl!apps/templates/recover.tpl", "tpl!apps/templates/register.tpl", 
	"tpl!apps/templates/profile.tpl", "tpl!apps/templates/modifyprofile.tpl", "backbone.syphon", "fileupload"], 
	function(System, loginTpl, recoverTpl, registerTpl, profileTpl, modprofileTpl){
  System.module('LoginApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Login = Marionette.ItemView.extend({
	    template: loginTpl,

	    events: {
	    	'click button.btn': 'submitClicked',
	    	'click #forgot-pass': 'forgotClicked',	        
	    },

	    onShow: function(){
	    	//$(".login-form").unwrap();
	    	//this.delegateEvents();
	    	$("#loading").hide();
	        $("input[name=name]").focus();

	        System.modifyProfile = "";

	        /*if (AndroidFullScreen.isSupported()) {
	        	AndroidFullScreen.leanMode(this.fullOK, this.fullError);
	        };*/	        
	    },

	    submitClicked: function(e){
	        e.preventDefault();
	        var data = Backbone.Syphon.serialize(this);
	        this.trigger("login", data);	     
	    },

	    forgotClicked: function(e){
	        e.preventDefault();
	        this.trigger("forgot");
	    },

	    onSuccess: function(data) { 
        swal("Welcome!", data.name, "success");
        System.user = data;
        System.user.id = parseInt(System.user.id, 10);
        System.trigger("menu:show");
        System.trigger("dash:show");
        localStorage.setItem("userdata", JSON.stringify(data));
      },

      onError: function(e) { 
        $("input[name=pass]").val("");
	      $("input[name=pass]").focus();
        swal("Access Denied!", "Check your details and try again", "error");
      }
    });

	  View.Register = Marionette.ItemView.extend({
	    template: registerTpl,

	    events: {
	    	'click button.btnsub': 'submitClicked',
	    	'click .upload-img': 'photo',
	    	'change #companysel': 'updateCompanyChildren',
          	//'change #departmentsel': 'updatePositions',
	    },

	    onShow: function(){
	    	System.profileImage = "";
	    	$("#loading").hide();
	    	$("input[name=name]").focus();
	    	var THAT = this;
	    	require(["plugins"], function(){
	    	 	THAT.loadStructure();
	    	});

	      $('.rform').fileupload({
          // This element will accept file drag/drop uploading
          dropZone: $('.upload-img'),

          url: System.coreRoot + '/upload/',

          add: function (e, data) {
            data.context = $('.upload-img');
            // Automatically upload the file once it is added to the queue
            var jqXHR = data.submit();
          },

          progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);

            data.context.find('span').val(progress+"%").change();

            if(progress == 100){
              swal("Success!", "The image has been uploaded successfully.", "success");
              data.context.find('span').val("").change();
              System.profileImage = data.files[0].name;
              $('.upload-img').css({'background': 'url('+System.coreRoot+'/profile/'+data.files[0].name+') no-repeat scroll 0 center / 100% auto', 'border': 'none'});
                //$(new Image()).attr('src', '' + _filename).appendTo($('#imageContainter')).fadeIn();
            }
          },

          fail:function(e, data){
            data.context.addClass('error');
            swal("Failed!", "The image could not be uploaded", "error");
          }

        });
	    },

	    photo: function(e){
	    	if($(e.target).is('div')){
			   $('#pimage').click();
			 }
	    },

	    loadStructure: function(){
	      var THAT = this;
	      if (System.structure.length == 0) {

          $("#fetching").show();

          $.get(System.coreRoot + "/gateway.php?structure", function(result) {
            var res = JSON.parse(result);
            res.forEach(function(element, index){
              System.structure[element.company.id] = element;
            });

            setTimeout(function(){
              THAT.initStructure();
              $("#fetching").fadeOut(1000);
            }, 600);
          });            
        }else{
          THAT.initStructure();
        }
      },

      initStructure: function(){
          var compsel = $('#companysel');          
          var branchsel = $('#branchsel');
          var deptsel = $('#departmentsel');
          var possel = $('#positionsel');
          compsel.empty();
          branchsel.empty();
          branchsel.parent().css('display', 'none');
          deptsel.empty();
          deptsel.parent().css('display', 'none');
          //possel.empty();
          possel.parent().css('display', 'none');
          
          var tpl = $('<option data-icon="fa fa-institution">Select Company ... </option>');
          tpl.appendTo(compsel);
          System.structure.forEach(function(element, index){
            var tpl1 = $('<option data-icon="fa fa-institution" value="'+element.company.id+'">'+element.company.name+'</option>');
            tpl1.appendTo(compsel);
          });
          
          setTimeout(function (){
            $('.selectpicker').selectpicker(); 
          }, 300); 

          $('#pname').val('');
          $('#pphone').val('');
          $('#pemail').val('');
      },

      updateCompanyChildren: function(e) { 
          e.preventDefault();
          e.stopPropagation();

          System.companyid = parseInt($(e.currentTarget).val(), 10);
          
          var branchsel = $('#branchsel');
          var deptsel = $('#departmentsel');
          deptsel.parent().css('display', 'block');
          branchsel.parent().css('display', 'block');
          branchsel.empty();
          deptsel.empty();

          var obj = System.structure[System.companyid];

          if (obj.hasOwnProperty('branches')) {
            var tpld = $('<option data-icon="fa fa-building">Select Branch ... </option>');
            tpld.appendTo(branchsel);
            obj.branches.forEach(function(element, index){
              var tpl2 = $('<option data-icon="fa fa-building" value="'+element.id+'">'+element.name+'</option>');
              tpl2.appendTo(branchsel);
            });
          }else{
            branchsel.parent().css('display', 'none');
          }

          if(obj.hasOwnProperty('departments')){
            var tplw = $('<option data-icon="fa fa-briefcase">Select Department ... </option>');
            tplw.appendTo(deptsel);
            obj.departments.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-briefcase" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(deptsel);
            });
          }else{
            deptsel.parent().css('display', 'none');
          }

          /*if(obj.hasOwnProperty('products')){
            System.prodView = 'company';
            var tplq = $('<option data-icon="fa fa-cube">Select Position ... </option>');
            tplq.appendTo(possel);
            obj.products.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-cube" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(possel);
            });
          }else{
            possel.parent().css('display', 'none');
          } */   

          setTimeout(function (){
            $('#companysel option[value="'+System.companyid+'"]').prop('selected', true);
            $('.selectpicker').selectpicker('refresh');
          }, 300);
      },

	    submitClicked: function(e){
	        e.preventDefault();
	        var data = Backbone.Syphon.serialize(this);

	        data['company'] = parseInt(data['company'], 10) || 0;
	        
	        var em = data['email'].split('@');
	        if (System.modifyProfile != 1) {
	        	if (em[1] == 'genghis-capital.com' || em[1] == 'chase-assurance.com' || em[1] == 'chasebank.co.ke' || em[1] == 'rafiki.co.ke') {
		        	if (data['pass'] == data['repass']) {
		        		if (data['name'] != "" && data['phone'] != "" && data['company'] != 0) {
		        			//CHECK PASSWORD LENGTH
		        			data['picture'] = System.profileImage;
		        			this.trigger("register", data);
		        		}else{
		        			swal("Missing Details", "Ensure you enter your name, phone number and your company.", "info");
		        		}
			        	
			        }else{
			        	swal("Password Mismatch", "Ensure both passwords are the same.", "info");
			        }
		        }else{
		        	swal("Invalid Data", "Your have not entered a valid company email.", "info");
		        }
	        }else{
	        	if (em[1] == 'genghis-capital.com' || em[1] == 'chase-assurance.com' || em[1] == 'chasebank.co.ke' || em[1] == 'rafiki.co.ke') {
		        	if (data['name'] != "" && data['phone'] != "" && data['company'] != 0) {
		        		//CHECK PASSWORD LENGTH
		        		data['picture'] = System.profileImage;
		        		data['pid'] = System.user.id;
		        		this.trigger("update", data);
		        	}else{
		        		swal("Missing Details", "Ensure you enter your name, phone number and your company.", "info");
		        	}
		        }else{
		        	swal("Invalid Data", "Your have not entered a valid company email.", "info");
		        }
	        }
	        
	    },

	    onSuccess: function(){
	        swal("Success", " Your have been registered", "success");
	    },

	    onProfupdate: function(data){
	        swal("Success", " Your profile has been updated", "success");
	        System.user = data;
          	System.user.id = parseInt(System.user.id, 10);
	    },

	    onError: function(){
	      	//var $view = this.$el;
	       	swal("Error", "Your profile could not be registerd. Try again later", "error");
	    }
    });

	  View.Profile = Marionette.ItemView.extend({      
 
        template: profileTpl,

        events: {
          "click button.btnprofile": "modifyProfile",
          "click button.btnnotifs": "showNotifications",
          "click .btnhist": "leadHistory",
        },

        onShow: function(){

          var ul = $('.leadtails');
          ul.empty();

          var tpl = $('<div class="col-xs-12" style="z-index:300;"><div class="panel" style="border-bottom:8px solid #f7c331;margin:10px;"><div class="lead-img" style="display: inline-block;width:30%"><img src="'+System.coreRoot+'/profile/'+System.user.pic+'" alt="img" class="img"></div><div class="lead-text" style="display: inline-block;font-size:2.8vmin;line-height:5vmin;width:60%; padding-left:25px; text-align:left; vertical-align:middle;"><b>'+System.user.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+System.user.phone+'</span><br><span class="desc"><i class="fa fa-mail"></i> '+System.user.email+'</span><br><span class="desc"><i class="fa fa-institution"></i> '+System.user.company.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+System.user.position.name+'</b></div></div></div>');
          tpl.appendTo(ul);
        },

        modifyProfile: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          System.modifyProfile = 1;
          this.trigger("modify");          
        },

        showNotifications: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          System.trigger("notifications:show");          
        },

        leadHistory: function(e) { 
          System.leadHistory = System.modifyLead;
          System.execute("lead:history");
        },

        onFormDone: function() {
          swal("Updated :)", "Prospect status modified", "success");
          System.execute("leads:assigned");
        }
    });

    View.ModifyProfile = Marionette.ItemView.extend({
      template: modprofileTpl,

      events: {
        'click button.btnsub': 'submitClicked',
        'click .upload-img': 'photo',
        'change #companysel': 'updateCompanyChildren',
            //'change #departmentsel': 'updatePositions',
      },

      onShow: function(){
        System.profileImage = System.user.pic;
        $('.upload-img').css({'background': 'url('+System.coreRoot+'/profile/'+System.user.pic+') no-repeat scroll 0 center / 100% auto', 'border': 'none'});
        //<img src="'+System.coreRoot+'/profile/'+System.user.pic+'" alt="img" class="img">
        $("#loading").hide();
        $('#pname').val(System.user.name);
        $('#pphone').val(System.user.phone);
        $('#pemail').val(System.user.email);

        var THAT = this;
        require(["plugins"], function(){
          THAT.loadStructure();
        });

        $('.rform').fileupload({
          // This element will accept file drag/drop uploading
          dropZone: $('.upload-img'),

          url: System.coreRoot + '/upload/',

          add: function (e, data) {
            data.context = $('.upload-img');
            // Automatically upload the file once it is added to the queue
            var jqXHR = data.submit();
          },

          progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);

            data.context.find('span').val(progress+"%").change();

            if(progress == 100){
              swal("Success!", "The image has been uploaded successfully.", "success");
              data.context.find('span').val("").change();
              System.profileImage = data.files[0].name;
              System.user.pic = data.files[0].name;
              $('.upload-img').css({'background': 'url('+System.coreRoot+'/profile/'+data.files[0].name+') no-repeat scroll 0 center / 100% auto', 'border': 'none'});
                //$(new Image()).attr('src', '' + _filename).appendTo($('#imageContainter')).fadeIn();
            }
          },

          fail:function(e, data){
            data.context.addClass('error');
            swal("Failed!", "The image could not be uploaded", "error");
          }
        });
      },

      photo: function(e){
        if($(e.target).is('div')){
         $('#pimage').click();
       }
      },

      loadStructure: function(){
        var THAT = this;

        System.orgstructure = [];

        if (System.orgstructure.length == 0) {

          $.get(System.coreRoot + "/service/organizations/index.php?orgstructure", function(result) {
              var res = JSON.parse(result);
              res.forEach(function(element, index){
                System.orgstructure[element.company.id] = element;
              });

              setTimeout(function(){
                THAT.prepareSelection();
                //$("#fetching").fadeOut(500);
              }, 600);
          });            
        }else{
            THAT.prepareSelection();
        }
        /*if (System.structure.length == 0) {

          $("#fetching").show();

          $.get(System.coreRoot + "/gateway.php?structure", function(result) {
            var res = JSON.parse(result);
            res.forEach(function(element, index){
              System.structure[element.company.id] = element;
            });

            setTimeout(function(){
              THAT.initStructure();
              $("#fetching").fadeOut(1000);
            }, 600);
          });            
        }else{
          THAT.initStructure();
        }*/
      },

      prepareSelection: function(){
          var compsel = $('#companysel');     
          var branchsel = $('#branchsel');
          var deptsel = $('#departmentsel');
          var possel = $('#positionsel');
          compsel.empty();
          branchsel.empty();
          deptsel.empty();
          possel.empty();
          branchsel.parent().css('display', 'none');
          deptsel.parent().css('display', 'none');

          var cid = 1;
          var tpl = $('<option data-icon="fa fa-institution">Select Company ... </option>');
          tpl.appendTo(compsel);
          System.orgstructure.forEach(function(element, index){
            if (index == 0 ) {
              cid = element.company.id;
            };
            var tpl1 = $('<option data-icon="fa fa-institution" value="'+element.company.id+'">'+element.company.name+'</option>');
            tpl1.appendTo(compsel);
          });
          

          var tpl4 = $('<option data-icon="fa fa-user">Select Position ... </option>');
          tpl4.appendTo(possel);

          var obj = System.orgstructure[cid];
          obj.positions.forEach(function(element, index){
            var tpl1 = $('<option data-icon="fa fa-user" value="'+element.id+'">'+element.name+'</option>');
            tpl1.appendTo(possel);
          });
          

          var objs = System.orgstructure[parseInt(System.user.company.id, 10)];

          if (System.user.branch.id != 0 && System.user.branch.id != null) {
            if (objs.hasOwnProperty('branches')) {
              var tpld = $('<option data-icon="fa fa-building">Select Branch ... </option>');
              tpld.appendTo(branchsel);
              objs.branches.forEach(function(element, index){
                var tpl2 = $('<option data-icon="fa fa-building" value="'+element.id+'">'+element.name+'</option>');
                tpl2.appendTo(branchsel);
              });
            }
            $('#branchsel option[value="'+System.user.branch.id+'"]').prop('selected', true);
            $('select[name=branch]').val(System.user.branch.id);
            branchsel.parent().css('display', 'block');
          }else{
            branchsel.parent().css('display', 'none');
          }
          
          if (System.user.dept.id != 0 && System.user.dept.id != null) {
            if(objs.hasOwnProperty('departments')){                
              var tplw = $('<option data-icon="fa fa-suitcase">Select Department ... </option>');
              tplw.appendTo(deptsel);
              objs.departments.forEach(function(element, index){
                var tpl3 = $('<option data-icon="fa fa-suitcase" value="'+element.id+'">'+element.name+'</option>');
                tpl3.appendTo(deptsel);
              });
            } 
            $('#departmentsel option[value="'+System.user.dept.id+'"]').prop('selected', true);
            $('select[name=department]').val(System.user.dept.id);
            deptsel.parent().css('display', 'block');
          }else{
            deptsel.parent().css('display', 'none');
          }

          setTimeout(function (){ 
            $('#companysel option[value="'+System.user.company.id+'"]').prop('selected', true);
            $('#positionsel option[value="'+System.user.position.id+'"]').prop('selected', true);
            $('.selectpicker').selectpicker('refresh');
          }, 300);          
      },

      updateCompanyChildren: function(e) { 
          e.preventDefault();
          e.stopPropagation();

          var companyid = parseInt($("#companysel option:selected").val(), 10);
          
          var branchsel = $('#branchsel');
          var deptsel = $('#departmentsel');
          branchsel.parent().css('display', 'block');
          deptsel.parent().css('display', 'block');
          branchsel.empty();
          deptsel.empty();

          var objs = System.orgstructure[companyid];

          if (objs.hasOwnProperty('branches')) {
            //alert(JSON.stringify(objs.branches));            
            var tpld = $('<option data-icon="fa fa-building">Select Branch ... </option>');
            tpld.appendTo(branchsel);
            objs.branches.forEach(function(element, index){
              var tpl2 = $('<option data-icon="fa fa-building" value="'+element.id+'">'+element.name+'</option>');
              tpl2.appendTo(branchsel);
            });
          }else{
            //alert(JSON.stringify(objs));
            branchsel.parent().css('display', 'none');
          }
          
          if(objs.hasOwnProperty('departments')){
            
            var tplw = $('<option data-icon="fa fa-suitcase">Select Department ... </option>');
            tplw.appendTo(deptsel);
            objs.departments.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-suitcase" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(deptsel);
            });
          }else{
            deptsel.parent().css('display', 'none');
          }     
          
          setTimeout(function (){
            $('#companysel option[value="'+companyid+'"]').prop('selected', true);
            $('.selectpicker').selectpicker('refresh');
          }, 300);
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);

        data['company'] = parseInt(data['company'], 10) || 0;
          
        var em = data['email'].split('@');
        if (em[1] == 'genghis-capital.com' || em[1] == 'chase-assurance.com' || em[1] == 'chasebank.co.ke' || em[1] == 'rafiki.co.ke') {
          if (data['name'] != "" && data['phone'] != "" && data['company'] != 0) {
            //CHECK PASSWORD LENGTH
            data['picture'] = System.profileImage;
            data['pid'] = System.user.id;
            this.trigger("update", data);
          }else{
            swal("Missing Details", "Ensure you enter your name, phone number and your company.", "info");
          }
        }else{
          swal("Invalid Data", "Your have not entered a valid company email.", "info");
        }
      },

      onSuccess: function(){
        swal("Success", " Your have been registered", "success");
      },

      onProfupdate: function(data){
        swal("Success", " Your profile has been updated", "success");
        System.user = data;
        System.user.id = parseInt(System.user.id, 10);
      },

      onError: function(){
        //var $view = this.$el;
        swal("Error", "Your profile could not be registered. Try again later", "error");
      }
    });

	  View.Recover = Marionette.ItemView.extend({
	    template: recoverTpl,

	    events: {
	    	'click button.ssmall': 'submitClicked',
	    	'click #login-link': 'loginClicked'
	    },

	    onShow: function(){
	    	$("#loading").hide();
	    	var $view = this.$el;
	        var $form = $view.find("form");
	    	$form.find("input").each(function(){
	           $(this).val("");
	        });
	        $("input[name=email]").focus();
	    },

	    submitClicked: function(e){
	        e.preventDefault();
	        var data = Backbone.Syphon.serialize(this);
	        this.trigger("submit", data);	     
	    },

	    onFormClear: function(){
	      	var $view = this.$el;
	        //$("input[name=password]").val("");
	       	//$("input[name=password]").focus();
	       	var $name = $("input[name=name]").val();
	        var $form = $view.find("form");
	        $form.find("input").each(function(){
	           $(this).val("");
	        });
	        $("input[name=name]").focus();
	        alert('Success: Your password has been reset. Please check your email for your new credentials');
	        //window.location.replace('http://localhost/user');
	    },

	    onAuthError: function(){
	      	//var $view = this.$el;
	        $("input[name=password]").val("");
	       	$("input[name=password]").focus();
	       	alert('Error: Your email did not match any in our records. Check your details and try again');
	    }
    });
  });

  return System.LoginApp.Show.View;
});
