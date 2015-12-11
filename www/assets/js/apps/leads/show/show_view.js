define(["app", "tpl!apps/templates/leads.tpl", "tpl!apps/templates/quicklead.tpl", "tpl!apps/templates/modifylead.tpl", "tpl!apps/templates/pcontact.tpl", 
  "tpl!apps/templates/phonecontacts.tpl", "tpl!apps/templates/companies.tpl", "tpl!apps/templates/branches.tpl", "tpl!apps/templates/categories.tpl", 
  "tpl!apps/templates/products.tpl", "tpl!apps/templates/notifications.tpl", "tpl!apps/templates/history.tpl", "tpl!apps/templates/ros.tpl",
  "tpl!apps/templates/allros.tpl", "backbone.syphon"], 
	function(System, leadsTpl, addleadTpl, modifyleadTpl, contactTpl, contactsTpl, companiesTpl, branchesTpl, categoriesTpl, productsTpl, 
    notificationsTpl, historyTpl, rosTpl, allrosTpl){
  System.module('LeadsApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.GeneratedLeads = Marionette.ItemView.extend({      

        template: leadsTpl,

        events: {
          "click .btncall": "callLead",
        },

        onShow: function(){
          //$("#leadscont").unwrap();
          $("#fetching").show();
          $(".page-header .title").text('MY GENERATED LEADS');
          
          var ul = $('.row > div');
          ul.empty();

          $.get(System.coreRoot + "/gateway.php?generatedLeads="+System.user.id, function(result) {
              var res = JSON.parse(result);
              var tp = $('<div class="row"></div>');            
              res.forEach(function(element, index){
                if (index%2 == 0) {
                  tp = $('<div class="row"></div>');
                  var tpl = $('<div class="col-xs-6" style="border-radius:3px;"><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-institution"></i> '+element.company.name+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b><button type="submit" class="btn btn-success btn-block btn-square btncall" data-tel="'+element.tel+'">CALL</button></div></div></div>');
                  tpl.appendTo(tp);
                }else{
                  var tpl = $('<div class="col-xs-6" style="border-radius:3px;"><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-institution"></i> '+element.company.name+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b><button type="submit" class="btn btn-success btn-block btn-square btncall" data-tel="'+element.tel+'">CALL</button></div></div></div>');
                  tpl.appendTo(tp);
                  tp.appendTo(ul);
                  tp = $('<div class="row"></div>');
                }
              });
              
              setTimeout(function(){
                if (tp.children().length > 0) {
                  tp.appendTo(ul);
                };
                $("#fetching").fadeOut(1000);
              }, 500);
          });
        },

        callLead: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var tel = $(e.currentTarget).data('tel');
          window.open('tel:'+tel, '_system')
        },
    });

    View.AssignedLeads = Marionette.ItemView.extend({      

        template: leadsTpl,

        events: {
          //"click .asslead": "modifyStatus"
        },

        onShow: function(){
          //$("#leadscont").unwrap();
          $("#fetching").show();
          $(".page-header .right").css('display', 'none');

          $(".page-header .title").text('MY ASSIGNED LEADS');
          
          var ul = $('.row > div');
          ul.empty();

          var THAT = this;

          $.get(System.coreRoot + "/gateway.php?assignedLeads="+System.user.id, function(result) {
              var res = JSON.parse(result);
              var tp = $('<div class="row"></div>');            
              
              res.forEach(function(element, index){
                if (index%2 == 0) {
                  tp = $('<div class="row"></div>');
                  var tpl = $('<div class="col-xs-6 asslead" style="border-radius:3px;"><p style="display:none">'+element.id+'</p><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b></div></div></div>');
                  tpl.appendTo(tp);
                }else{
                  var tpl = $('<div class="col-xs-6 asslead" style="border-radius:3px;"><p style="display:none">'+element.id+'</p><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b></div></div></div>');
                  tpl.appendTo(tp);
                  tp.appendTo(ul);
                  tp = $('<div class="row"></div>');
                }
              });
              
              setTimeout(function(){
                if (tp.children().length > 0) {
                  tp.appendTo(ul);
                };

                $('.asslead').on('click', function(e){
                  THAT.modifyStatus(e);
                });

                $("#fetching").fadeOut(1000);
              }, 300);


          });
        },

        modifyStatus: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          //this.trigger("edit", this.model);
          System.modifyLead = parseInt($(e.currentTarget).find('p').text(), 10);
          //swal("Edit Mode!", "Now modifying lead. ID: "+System.modifyLead, "info");
          System.execute("leads:modify");
        }
    });

    View.LeadGroup = Marionette.ItemView.extend({      

        template: leadsTpl,

        events: {
          //"click .asslead": "modifyStatus"
        },

        onShow: function(){
          //$("#leadscont").unwrap();
          $("#fetching").show();
          $(".page-header .right").css('display', 'none');
          
          var ul = $('.row > div');
          ul.empty();

          var THAT = this;

          if (System.leadGroup == "") {
            System.leadGroup = "engaged";
          }

          $.get(System.coreRoot + "/gateway.php?leadGroup="+System.leadGroup+"&personell="+System.user.id, function(result) {

              $(".page-header .title").text('MY '+System.leadGroup.toUpperCase()+' LEADS');

              var res = JSON.parse(result);
              var tp = $('<div class="row"></div>');            
              
              res.forEach(function(element, index){
                if (index%2 == 0) {
                  tp = $('<div class="row"></div>');
                  var tpl = $('<div class="col-xs-6 asslead" style="border-radius:3px;"><p style="display:none">'+element.id+'</p><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b></div></div></div>');
                  tpl.appendTo(tp);
                }else{
                  var tpl = $('<div class="col-xs-6 asslead" style="border-radius:3px;"><p style="display:none">'+element.id+'</p><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b></div></div></div>');
                  tpl.appendTo(tp);
                  tp.appendTo(ul);
                  tp = $('<div class="row"></div>');
                }
              });
              
              setTimeout(function(){
                if (tp.children().length > 0) {
                  tp.appendTo(ul);
                };

                if (System.leadGroup == 'engaged') {
                  $('.asslead').on('click', function(e){
                    THAT.modifyStatus(e);
                  });
                };                

                $("#fetching").fadeOut(1000);
              }, 300);
              
          });
        },

        modifyStatus: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          System.modifyLead = parseInt($(e.currentTarget).find('p').text(), 10);
          //swal("Edit Mode!", "Now modifying lead. ID: "+System.modifyLead, "info");
          System.execute("leads:modify");
        }
    });

    View.Companies = Marionette.ItemView.extend({      

        template: companiesTpl,

        events: {
          //"click #companies > li .imgc": "viewBranches",
          //"click #companies > li h3": "viewDesc",
          //"click #companies > li span": "viewDesc",
        },

        onShow: function(){
          //$("#leadscont").unwrap();

          System.companyid = '?';
          System.branchid = '?';
          System.categoryid = '?';
          System.productid = '?';

          var ul = $('#companies');
          ul.empty();

          var THAT = this;

          if (System.structure.length == 0) {
            $("#fetching").show();
            $.get(System.coreRoot + "/gateway.php?structure", function(result) {
              var res = JSON.parse(result);
              res.forEach(function(element, index){
                var tpl = $('<li><p style="display:none">'+element.company.id+'</p><div class="imgc"><img src="img/companies/'+element.company.logo+'" alt="img" style="width:100%"></div><h3>'+element.company.name+'</h3><span class="desc">'+element.company.descr+'</span></li>');
                tpl.appendTo(ul);
                System.structure[element.company.id] = element;
              });

              setTimeout(function(){
                THAT.initList();
                $("#fetching").fadeOut(1000);
              }, 600);
            });            
          }else{
            System.structure.forEach(function(element, index){
              var tpl = $('<li><p style="display:none">'+element.company.id+'</p><div class="imgc"><img src="img/companies/'+element.company.logo+'" alt="img" style="width:100%"></div><h3>'+element.company.name+'</h3><span class="desc">'+element.company.descr+'</span></li>');
              tpl.appendTo(ul);
            });

            setTimeout(function(){
                THAT.initList();
            }, 600);            
          }          
          
        },

        initList: function() {
          var THAT = this;

          $("#companies > li span").dotdotdot({ ellipsis : ' ... ' });
            
          $("#companies > li span, #companies > li h3").on('click', function(){ 
            THAT.viewDesc(parseInt($(this).parent().find('p').text(), 10));
          });
          
          $("#companies > li .imgc").on('click', function(){ 
            THAT.viewNext(parseInt($(this).parent().find('p').text(), 10));
          });  
        },

        viewNext: function(id) {
          var obj = System.structure[id];
          System.companyid = id;
          System.previousView.push('companies');
          System.prodView = '';
          if (obj.hasOwnProperty('branches')) {
            System.execute("leads:branches");
          }else if(obj.hasOwnProperty('categories')){
            System.execute("leads:categories");
          }else{
            System.prodView = 'company';
            System.execute("leads:products");
          }          
        },

        viewDesc: function(id) {
          var obj = System.structure[id];
          swal(obj.company.name, obj.company.descr);
        }
    });

    View.Branches = Marionette.ItemView.extend({      

        template: branchesTpl,

        events: {
          "click .goback": "goBack",
          "click #branches > li": "viewCategories",
        },

        onShow: function(){
          
          System.branchid = '?';

          var ul = $('.basic-list');
          ul.empty();

          var struct = System.structure[System.companyid];
          struct.branches.forEach(function(element, index){
            var tpl = $('<li><p style="display:none">'+element.id+'</p><b>'+element.name+'</b><br><span class="desc">Location, Town'+element.location+'</span><span class="status"></span></li>');
            tpl.appendTo(ul);
          });

        },

        viewCategories: function(e) {
          e.preventDefault();
          e.stopPropagation();
          var obj = System.structure[System.companyid];
          System.branchid = parseInt($(e.currentTarget).find('p').text(), 10);
          System.previousView.push('branches');
          if(obj.hasOwnProperty('categories')){
            System.execute("leads:categories");
          }else{
            System.execute("leads:products", 'company');
          }          
        },

        goBack: function(id) {
          System.execute("leads:"+System.previousView.pop());
        }
    });

    View.Categories = Marionette.ItemView.extend({      

        template: categoriesTpl,

        events: {
          "click .goback": "goBack",
          //"click #categories > li": "viewProducts",
        },

        onShow: function(){
          //$("#leadscont").unwrap();
          System.categoryid = '?';
          var ul = $('.basic-list');
          ul.empty();

          var struct = System.structure[System.companyid];
          struct.categories.forEach(function(element, index){
            //console.log(index +' - '+element.id);
            var tpl = $('<li><p style="display:none" class="catid">'+element.id+'</p><p style="display:none" class="catind">'+index+'</p><b>'+element.name+'</b></li>');
            tpl.appendTo(ul);
          });

          var THAT = this;
          setTimeout(function(){
            $("#categories > li").on('click', function(){ 
             // alert(parseInt($(this).find('p').text(), 10));
             System.categoryIndex = parseInt($(this).find('p.catind').text(), 10);;
              System.categoryid = parseInt($(this).find('p.catid').text(), 10);
              THAT.viewProducts();
            });

          }, 300);
        },

        viewProducts: function(id) {
          var obj = System.structure[System.companyid];
          System.previousView.push('categories');
          System.prodView = 'category';
          System.execute("leads:products");
        },

        goBack: function() {
          System.execute("leads:"+System.previousView.pop());
        }
    });

    View.Products = Marionette.ItemView.extend({      

        template: productsTpl,

        events: {
          "click .goback": "goBack",
          "click #products > li .imgc": "viewContacts",
          "click #products > li h3": "viewDesc",
          "click #products > li span": "viewDesc",
        },

        onShow: function(){

          System.productid = '?';


          var ul = $('.basic-list');
          ul.empty();

          var struct = System.structure[System.companyid];

          if (System.prodView == 'company') {
            System.productSelect = struct.products;            
          }else{
            System.productSelect = struct.categories[System.categoryIndex].products;
          }

          System.productSelect.forEach(function(element, index){
            var tpl = $('<li><p style="display:none">'+element.id+'</p><div class="imgc" style="background:none;"><img src="img/product-icon.png" alt="img" style="width:100%;padding:5%;"></div><h3>'+element.name+'</h3><span class="desc">'+element.descr+'</span></li>');
            tpl.appendTo(ul);
          });

          setTimeout(function(){
            $("#products > li span").dotdotdot({ ellipsis : ' ... ' });
          }, 500);         

        },

        viewContacts: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.productid = parseInt($(e.currentTarget).parent().find('p').text(), 10); 
          System.previousView.push('products'); 
          //alert("comp:"+System.companyid +", branch:"+System.branchid +", category:"+System.categoryid +", product:"+System.productid);
          //System.execute("leads:contacts");
          
          if (System.ro) {
            System.execute("leads:finalize");  
          } else{
            System.execute("leads:ros");
          };
        },

        viewDesc: function(e) {
          e.preventDefault();
          e.stopPropagation();
          var id = parseInt($(e.currentTarget).parent().find('p').text(), 10);
          //var obj = System.productSelect[id];
          System.productSelect.forEach(function(element, index){
            if (element.id == id) {
              swal(element.name, element.descr);
            }
          });
          
        },

        goBack: function(id) {
          System.execute("leads:"+System.previousView.pop());
        }
    });

    View.RO = Marionette.ItemView.extend({      

        template: rosTpl,

        events: {
          "click .goback": "goBack",
          "click #ros > li": "finalize",
        },

        onShow: function(){

          System.roid = '?';

          System.rid = false;

          $("#fetching").show();

          var ul = $('.basic-list');
          ul.empty();
          var branch = 0;
          if (System.branchid != '?') {
            branch = System.branchid;
          }

          $.get(System.coreRoot + "/service/hrm/index.php?ros&product="+System.productid+"&branch="+branch, function(result) {
            var tp = $('<li><p style="display:none">0</p><i class="fa fa-users" style="font-size:40px; margin-left:-30px;padding-right:10px;vertical-align:middle"></i><b>Allocate Randomly</b></li>');
            tp.appendTo(ul);
            var res = JSON.parse(result);
            res.forEach(function(element, index){
              var tpl = $('<li><p style="display:none">'+element.id+'</p><i class="fa fa-user" style="font-size:40px; margin-left:-30px;padding-right:10px;vertical-align:middle"></i><b>'+element.name+'</b><span style="margin-left:10px;margin-top:-10px" class="desc">Department: '+element.dept.name+'</span></li>');
              tpl.appendTo(ul);
            });
            System.ActiveROs = res;
            setTimeout(function(){
              $("#fetching").fadeOut(500);
            }, 600);
          });
        },

        finalize: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.roid = $(e.currentTarget).find('p').text(); 
          System.previousView.push('ros'); 
          //alert("comp:"+System.companyid +", branch:"+System.branchid +", category:"+System.categoryid +", product:"+System.productid);
          //System.execute("leads:contacts");
          System.execute("leads:finalize");
        },

        goBack: function(id) {
          System.execute("leads:"+System.previousView.pop());
        }
    });

    View.AllRO = Marionette.ItemView.extend({      

        template: allrosTpl,

        events: {
          "click #allros > li": "next",
          "keyup #searchtext": "filter",
        },

        onShow: function(){

          System.roid = '?';
          System.rid = false;

          $("#fetching").show();

          var ul = $('.basic-list');
          ul.empty();

          $.get(System.coreRoot + "/service/hrm/index.php?allros", function(result) {
            //var tp = $('<li><p style="display:none">0</p><i class="fa fa-users" style="font-size:40px; margin-left:-30px;padding-right:10px;vertical-align:middle"></i><b>Allocate Randomly</b></li>');
            //tp.appendTo(ul);
            var res = JSON.parse(result);
            res.forEach(function(element, index){
              var tpl = $('<li><p style="display:none">'+index+'</p><h6 style="display:none">'+element.id+'</h6><i class="fa fa-user" style="font-size:35px; margin-left:-15px;padding-right:10px;vertical-align:middle"></i><b>'+element.name+'</b><br><span style="margin-left:20px;margin-top:-10px" class="desc">'+element.company.name+' ('+element.branch.name+') -> Dept: '+element.dept.name+'</span></li>');
              tpl.appendTo(ul);
            });
            System.ActiveROs = res;
            setTimeout(function(){
              $("#fetching").fadeOut(500);
            }, 600);
          });
        },

        filter: function (){
          var key = $('#searchtext').val();
          var results = [];
          System.ActiveROs.forEach(function(element, index){
            if (element.name.toLowerCase().indexOf(key.toLowerCase()) >= 0 || element.company.name.toLowerCase().indexOf(key.toLowerCase()) >= 0 || element.branch.name.toLowerCase().indexOf(key.toLowerCase()) >= 0 || element.dept.name.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
              results.push(element);
            }
          });
          var THAT = this;
          setTimeout(function () {
            THAT.sortResults(results, 'name', true);
          }, 200);          
        },

        sortResults: function(result, prop, asc) {
          result = result.sort(function(a, b) {
            if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
          });
          this.listROs(result);
        },

        listROs: function (ros){
          var ul = $('.basic-list');
          ul.empty();
          ros.forEach(function(element, index){
            var tpl = $('<li><p style="display:none">'+index+'</p><h6 style="display:none">'+element.id+'</h6><i class="fa fa-user" style="font-size:35px; margin-left:-15px;padding-right:10px;vertical-align:middle"></i><b>'+element.name+'</b><br><span style="margin-left:20px;margin-top:-10px" class="desc">'+element.company.name+' ('+element.branch.name+') -> Dept: '+element.dept.name+'</span></li>');
            tpl.appendTo(ul);
          });
        },        

        next: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.roid = $(e.currentTarget).find('h6').text();
          var ind = 0;
          System.ActiveROs.forEach(function(element, index){
            if (parseInt(element.id) == parseInt(System.roid, 10)) {
              ind = index;
            }
          });
          System.rid = ind;
          System.ro = System.ActiveROs[parseInt(System.rid, 10)];
          System.companyid = System.ro.company.id;
          if (System.ro.branch.id != 0) {
            System.branchid = System.ro.branch.id;
          } else{
            System.branchid = '?';
          };
          //alert(JSON.stringify(System.ro));
          System.previousView.push('allros'); 
          //alert("comp:"+System.companyid +", branch:"+System.branchid +", category:"+System.categoryid +", product:"+System.productid);
          //System.execute("leads:contacts");
          System.execute("leads:contacts");
        },

        goBack: function(id) {
          System.execute("leads:"+System.previousView.pop());
        }
    });

    View.Contacts = Marionette.ItemView.extend({

      template: contactTpl,

      events: {
          "click .goback": "goBack",
          "click .btnsub": "addLead",
          "keyup #searchtext": "filter",
          "click .btncnt": "contactSearch"
      },

      onShow: function(){
          $("#clist").hide();
          this.contactSearch();
          System.leadName = '';
          System.leadNo = '';
          System.leadEmail = '';

          if (System.ro) {
            if (System.structure.length == 0) {
              $("#fetching").show();
              $.get(System.coreRoot + "/gateway.php?structure", function(result) {
                var res = JSON.parse(result);
                res.forEach(function(element, index){
                  System.structure[element.company.id] = element;
                });

                setTimeout(function(){
                  $("#fetching").fadeOut(1000);
                }, 600);
              });            
            }     
          };
      },

      contactSearch: function() { 

        if (!navigator.contacts) {
          swal("Error!", "Contacts API not supported", "error");
          //alert("Contacts API not supported", "Error");
          return;
        }else{
          this.pickContact();
        }

        /*if (System.phoneContacts.length > 0) {
          this.sortResults(System.phoneContacts, 'name', true);
          return;
        }else{
          var searchStr = $('#searchtext').val();
          var searchOptions = {
            filter : "",
            multiple : true,
          };
          var contactFields = ['displayName', 'nickname', 'phoneNumbers', 'emails'];
          navigator.contacts.find(contactFields, this.onSuccess, this.onError, searchOptions);
        }*/


      },

      pickContact: function() {
        var THAT = this;
        System.leadName = "";
        System.leadNo = "";
        navigator.contacts.pickContact(function(contact){
          //alert(JSON.stringify(contact));
          var cont = {};
          cont.name = '';
          if ($.trim(contact.displayName).length != 0) {
            cont.name = contact.displayName ? contact.displayName : contact.nickName;
            if (contact.phoneNumbers) {
                cont.phone = '';
                for (var j = 0; j < contact.phoneNumbers.length; j++) {
                    cont.phone = contact.phoneNumbers[j].value;
                }
            }
            cont.email = '';
            if (contact.emails) {
              for (var j = 0; j < contact.emails.length; j++) {
                cont.email = contact.emails[j].value;
              }
            }
          }
          if (cont.name != undefined && cont.phone != undefined) {
            System.leadName = cont.name;
            System.leadNo = cont.phone;
            System.leadEmail = (cont.email || '');
            //System.execute("leads:finalize");
            if (System.ro) {
              var obj = System.structure[System.companyid];
              System.previousView.push('contacts');
              if(obj.hasOwnProperty('categories')){
                System.execute("leads:categories");
              }else{
                System.execute("leads:products", 'company');
              }  
            } else{
              System.trigger("leads:add");
            };
            
          }else{
            THAT.denyContact();            
          }
        }, function(err){
          swal("Error", err, "error");
        });
      },

      denyContact: function () {
        var THAT = this;
        swal({
          title: "Sorry",
          text: "This contact is missing either a name or a phone number!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Pick Another",
          cancelButtonText: "Skip",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) {
            THAT.pickContact();
          } else {
            //System.execute("leads:finalize");
            if (System.ro) {
              var obj = System.structure[System.ro.company.id];
              System.previousView.push('contacts');
              if(obj.hasOwnProperty('categories')){
                System.execute("leads:categories");
              }else{
                System.execute("leads:products", 'company');
              }  
            } else{
              System.trigger("leads:add");
            };
          }
        });
      },

      /*onSuccess: function (contacts){
        //alert(contacts.length + ' contacts found!');
        var results = [];          

        var ul = $('#contacts.basic-list');
        ul.empty();
        System.phoneContacts = [];

        for (var i = 0; i < contacts.length; i++) {
          var cont = {};
          cont.name = '';
          if ($.trim(contacts[i].displayName).length != 0) {
            cont.name = contacts[i].displayName ? contacts[i].displayName : contacts[i].nickName;
            if (contacts[i].phoneNumbers) {
                cont.phone = '';
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    cont.phone = contacts[i].phoneNumbers[j].value;
                }
            }
            cont.email = '';
            if (contacts[i].emails) {
              for (var j = 0; j < contacts[i].emails.length; j++) {
                cont.email = contacts[i].emails[j].value;
              }
            }
          }
          if (cont.name != undefined && cont.phone != undefined) {
              var tpl = $('<li><b>'+element.name+'</b><br><span class="desc one">'+element.phone+'</span><br><span class="desc two">'+element.email+'</span><span class="add"><i class="fa fa-user"></i></span></li>');
              tpl.appendTo(ul);
              System.phoneContacts.push(cont);
          }
        }

        if (contacts.length === 0) {
          var tpl = $('<li><b>No contacts</b></li>');
          tpl.appendTo(ul);
        }
      },
        
      sortResults: function(result, prop, asc) {
        result = result.sort(function(a, b) {
          if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
          else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        this.listContacts(result);
      },

      listContacts: function (contacts){
        var ul = $('#contacts.basic-list');
        ul.empty();
        var parties = contacts;
        parties.forEach(function(element, index){
          var tpl = $('<li><b>'+element.name+'</b><br><span class="desc one">'+element.phone+'</span><br><span class="desc two">'+element.email+'</span><span class="add"><i class="fa fa-user"></i></span></li>');
          tpl.appendTo(ul);
        });
      },

      filter: function (){
        var key = $('#searchtext').val();
        var results = [];
        System.phoneContacts.forEach(function(element, index){
          if (element.name.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
            results.push(element);
          }
        });
        var THAT = this;
        setTimeout(function () {
          THAT.sortResults(results, 'name', true);
        }, 200);          
      },*/

      onError: function (er){
        swal("Error!", "contact search error", "error");
      },

      addLead: function(e) {
        e.preventDefault();
        e.stopPropagation();
        var data = Backbone.Syphon.serialize(this);
        //System.leadName = $(e.currentTarget).find('b').text();
        //System.leadNo = $(e.currentTarget).find('.desc.one').text();
        //System.leadEmail = ($(e.currentTarget).find('.desc.two').text() || '');
        
        //alert(System.leadName+', '+System.leadNo+', '+System.leadEmail);
        //System.execute("leads:finalize", "opt");
        
        if (data.name == '' || data.phone == '') {
          swal("Missing Details!", "Please ensure you enter all necessary fields.", "error");
        } else{
          System.leadName = data.name;
          System.leadNo = data.phone;
          System.leadEmail = data.email;
          if (System.ro) {
            var obj = System.structure[System.ro.company.id];
            System.previousView.push('contacts');
            if(obj.hasOwnProperty('categories')){
              System.execute("leads:categories");
            }else{
              System.execute("leads:products", 'company');
            }
          } else{
            System.trigger("leads:add");
          };
        };
      },

      goBack: function(id) {
        //System.execute("leads:"+System.previousView.pop());
        System.trigger("dash:show");
      }
    });

    View.AddLead = Marionette.ItemView.extend({      

        template: addleadTpl,

        events: {
          "click .btnsub": "addLead",
          "change #companysel": "updateCompanyChildren",
          "change #categorysel": "updateProducts",
        },

        onShow: function(){

          //this.contactSearch();

          var compsel = $('#companysel');          
          var branchsel = $('#branchsel');
          var catsel = $('#categorysel');
          var prodsel = $('#productsel');
          var rosel = $('#rosel');
          compsel.empty();
          branchsel.empty();
          catsel.empty();
          prodsel.empty();
          rosel.empty();
          
          var tpl = $('<option data-icon="fa fa-institution">Select Company ... </option>');
          tpl.appendTo(compsel);
          System.structure.forEach(function(element, index){
            var tpl1 = $('<option data-icon="fa fa-institution" value="'+element.company.id+'">'+element.company.name+'</option>');
            tpl1.appendTo(compsel);
          });

          if (System.branchid != '?') {
            var tpld = $('<option data-icon="fa fa-map-marker">Select Branch ... </option>');
            tpld.appendTo(branchsel);
            var struct = System.structure[System.companyid];
            struct.branches.forEach(function(element, index){
              var tpl2 = $('<option data-icon="fa fa-map-marker" value="'+element.id+'">'+element.name+'</option>');
              tpl2.appendTo(branchsel);
            });
          }else{
            branchsel.parent().css('display', 'none');
          }

          if (System.categoryid != '?') {
            var tplw = $('<option data-icon="fa fa-cubes">Select Category ... </option>');
            tplw.appendTo(catsel);
            var struct = System.structure[System.companyid];
            struct.categories.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-cubes" data-index="'+index+'" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(catsel);
            });
          }else{
            catsel.parent().css('display', 'none');
          }

          var tplq = $('<option data-icon="fa fa-cube">Select Product ... </option>');
          tplq.appendTo(prodsel);
          System.productSelect.forEach(function(element, index){
            var tpl3 = $('<option data-icon="fa fa-cube" value="'+element.id+'">'+element.name+'</option>');
            tpl3.appendTo(prodsel);
          });

          if (System.ro) {
            var tplr = $('<option data-icon="fa fa-users" value="'+System.ro.id+'">'+System.ro.name+'</option>');
            tplr.appendTo(rosel);
          } else{
            var tplr = $('<option data-icon="fa fa-users" value="0">Allocate Randomly</option>');
            tplr.appendTo(rosel);
            System.ActiveROs.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-user" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(rosel);
            });
          };

          

          
          setTimeout(function (){
            $('.selectpicker').selectpicker();
            $('#companysel option[value="'+System.companyid+'"]').prop('selected', true);
            $('#productsel option[value="'+System.productid+'"]').prop('selected', true); 
            if (System.branchid != '?') {
              $('#branchsel option[value="'+System.branchid+'"]').prop('selected', true); 
            }; 
            if (System.categoryid != '?') {
              $('#categorysel option[value="'+System.categoryid+'"]').prop('selected', true); 
            }; 

            if (System.roid != '?') {
              $('#rosel option[value="'+System.roid+'"]').prop('selected', true); 
            };         
            $('.selectpicker').selectpicker('refresh');
          }, 300);

          $('#leadname').val(System.leadName);
          $('#leadphone').val(System.leadNo);
          $('#leademail').val(System.leadEmail);
        },

        updateCompanyChildren: function(e) { 
          e.preventDefault();
          e.stopPropagation();

          System.prodView = '';

          System.companyid = parseInt($(e.currentTarget).val(), 10);
          
          var branchsel = $('#branchsel');
          var catsel = $('#categorysel');
          var prodsel = $('#productsel');
          catsel.parent().css('display', 'block');
          branchsel.parent().css('display', 'block');
          prodsel.parent().css('display', 'block');
          branchsel.empty();
          catsel.empty();
          prodsel.empty();

          var obj = System.structure[System.companyid];

          if (obj.hasOwnProperty('branches')) {
            var tpld = $('<option data-icon="fa fa-map-marker">Select Branch ... </option>');
            tpld.appendTo(branchsel);
            obj.branches.forEach(function(element, index){
              var tpl2 = $('<option data-icon="fa fa-map-marker" value="'+element.id+'">'+element.name+'</option>');
              tpl2.appendTo(branchsel);
            });
          }else{
            branchsel.parent().css('display', 'none');
          }

          if(obj.hasOwnProperty('categories')){
            System.prodView = 'category';
            var tplw = $('<option data-icon="fa fa-cubes">Select Category ... </option>');
            tplw.appendTo(catsel);
            obj.categories.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-cubes" data-index="'+index+'" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(catsel);
            });
          }else{
            catsel.parent().css('display', 'none');
          }

          if(obj.hasOwnProperty('products')){
            System.prodView = 'company';
            var tplq = $('<option data-icon="fa fa-cube">Select Product ... </option>');
            tplq.appendTo(prodsel);
            obj.products.forEach(function(element, index){
              var tpl3 = $('<option data-icon="fa fa-cube" value="'+element.id+'">'+element.name+'</option>');
              tpl3.appendTo(prodsel);
            });
          }else{
            prodsel.parent().css('display', 'none');
          }     

          setTimeout(function (){
            $('#companysel option[value="'+System.companyid+'"]').prop('selected', true);
            $('.selectpicker').selectpicker('refresh');
          }, 300);
        },

        updateProducts: function(e) { 
          e.preventDefault();
          e.stopPropagation();

          var catid = parseInt($(e.currentTarget).val(), 10);
          //var catindex = parseInt($(e.currentTarget).data('index'), 10);
          var catindex = parseInt($("#categorysel option:selected").data('index'), 10);
          
          var prodsel = $('#productsel');
          prodsel.empty();
          prodsel.parent().css('display', 'block');

          var struct = System.structure[System.companyid];

          if (System.prodView == 'company') {
            System.productSelect = struct.products;            
          }else{
            System.productSelect = struct.categories[catindex].products;
          }
          

          var tplq = $('<option data-icon="fa fa-cube">Select Product ... </option>');
          tplq.appendTo(prodsel);
          System.productSelect.forEach(function(element, index){
            var tpl3 = $('<option data-icon="fa fa-cube" value="'+element.id+'">'+element.name+'</option>');
            tpl3.appendTo(prodsel);
          }); 

          setTimeout(function (){
            $('#categorysel option[value="'+catid+'"]').prop('selected', true);
            $('.selectpicker').selectpicker('refresh');
          }, 300);
        },

        addLead: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          //alert(JSON.stringify(data));
          data['ro'] = parseInt(data['ro'], 10);
          if (data['name'] == '' || data['phone'] == '' || data['company'] == '' || data['product'] == '' ) {
            swal("Missing Details!", "Please ensure you enter all necessary fields.", "error");
          }else{
            //this.trigger("create", data);
            data['operation'] = 'create';
            data['pid'] = System.user.id;

            swal({
              title: "Everything OK?",
              text: "Are you sure you want to create this lead?",
              type: "info",
              showCancelButton: true,
              closeOnConfirm: false,
              showLoaderOnConfirm: true,
            },
            function(){
              $.post(System.coreRoot + '/gateway.php', data, function(result) {
                if (result == 1) {                
                  swal({
                    title: "Success :)",
                    text: "Lead created. Do you want to add another?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
                  },
                  function(isConfirm){
                    if (isConfirm) {
                      System.execute("leads:contacts");
                    } else {
                      //System.execute("leads:finalize");
                      System.trigger("dash:show");
                    }
                  });
                }else{
                  swal("Failed :(", "Lead could not be created", "error");
                }
              });
            });
          }
          
        },

        onFormDone: function() {
          swal("Success :)", "Lead created", "success");
          System.execute("leads:companies");
        }
    });

    View.ModifyLead = Marionette.ItemView.extend({      

        template: modifyleadTpl,

        events: {
          "click .btnsub": "modifyLead",
          "click .btnhist": "leadHistory",
          "click .btncall": "callLead",
        },

        onShow: function(){

          $("#fetching").show();

          var ul = $('.leadtails');
          ul.empty();

          $('.selectpicker').selectpicker();

          $.get(System.coreRoot + "/gateway.php?getLead="+System.modifyLead, function(result) {
              var element = JSON.parse(result);
              System.leadphoneno = element.tel;
              var tpl = $('<div class="col-xs-12" style="z-index:300;"><div class="panel" style="border-bottom:8px solid #f7c331;margin:10px;"><div class="lead-img" style="display: inline-block;width:30%"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text" style="display: inline-block;font-size:2.8vmin;line-height:5vmin;width:60%; padding-left:25px; text-align:left; vertical-align:middle;"><b>'+element.name+'</b><br><span class="desc"><i class="fa fa-phone"></i> '+element.tel+'</span><br><span class="desc"><i class="fa fa-institution"></i> '+element.company.name+'</span><br><span class="desc"><i class="fa fa-cube"></i> '+element.product.name+'</span><br><b><i class="fa fa-info-circle" style="color:#399bff"></i> '+element.status+'</b><button type="submit" class="btn btn-success btn-block btn-square btnhist">VIEW HISTORY</button><button type="submit" class="btn btn-success btn-block btn-square btncall">CALL</button></div></div></div>');
              tpl.appendTo(ul);

              $("#fetching").fadeOut(1000);
          });
        },

        modifyLead: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['leadid'] = System.modifyLead;
          //alert(JSON.stringify(data));
          if (data['leadid'] == '' || data['status'] == '') {
            swal("Missing Details!", "Please ensure you enter all necessary fields.", "error");
          }else{
            this.trigger("modify", data);
          }
          
        },

        callLead: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          window.open('tel:'+System.leadphoneno, '_system')
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

    View.Notifications = Marionette.ItemView.extend({      

        template: notificationsTpl,

        events: {
          //"click .asslead": "modifyStatus"
        },

        onShow: function(){
          //$("#leadscont").unwrap(); 
          $("#fetching").show();         
          var ul = $('#messages');
          ul.empty();

          $.get(System.coreRoot + "/gateway.php?messages="+System.user.id, function(result) {
              var res = JSON.parse(result);
              $('span.notifno').text(res.length);
              res.forEach(function(element, index){
                var tpl = $('<li><a href="#" class="item clearfix" style="line-height:3.5vmin"><span class="from" style="line-height:3vmin">'+element.sender.name+'</span>'+element.message+'<span class="date" style="line-height:1.5vmin">'+element.date+'</span></a></li>');
                tpl.appendTo(ul);               
              });

              setTimeout(function(){
                $("#fetching").fadeOut(1000);
              }, 300);
          });
        }
    });

    View.LeadHistory = Marionette.ItemView.extend({      

        template: historyTpl,

        events: {
          //"click .asslead": "modifyStatus"
        },

        onShow: function(){
          //$("#leadscont").unwrap(); 
          $("#fetching").show();         
          var ul = $('#messages');
          ul.empty();

          $.get(System.coreRoot + "/gateway.php?leadhistory="+System.leadHistory, function(result) {
              var res = JSON.parse(result);
              
              res.forEach(function(element, index){
                if (index == 0) {
                  $('span.leadhist').text(element.lead.name + ' [Status: '+element.lead.status+']');
                };
                var tpl = $('<li><a href="#" class="item clearfix" style="line-height:3.5vmin"><span class="from" style="line-height:3vmin">'+element.status+'</span>'+element.notes+'<span class="date" style="line-height:1.5vmin">'+element.date+'</span></a></li>');
                tpl.appendTo(ul);               
              });

              setTimeout(function(){
                $("#fetching").fadeOut(1000);
              }, 300);
          });
        }
    });

  });

  return System.LeadsApp.Show.View;
});
