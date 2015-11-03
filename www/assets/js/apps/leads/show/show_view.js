define(["app", "tpl!apps/templates/leads.tpl", "tpl!apps/templates/quicklead.tpl", "tpl!apps/templates/addcontactlead.tpl", 
  "tpl!apps/templates/searchhead.tpl", "tpl!apps/templates/contact.tpl", "tpl!apps/templates/phonecontacts.tpl", "tpl!apps/templates/companies.tpl", 
  "tpl!apps/templates/branches.tpl", "tpl!apps/templates/categories.tpl", "tpl!apps/templates/products.tpl", "backbone.syphon"], 
	function(System, leadsTpl, addleadTpl, addcontactleadTpl, searchheadTpl, contactTpl, contactsTpl, companiesTpl, branchesTpl, categoriesTpl, productsTpl){
  System.module('LeadsApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    /*View.Leadss = Marionette.CompositeView.extend({

      className: "col-md-12",

      template: leadsTpl,

      itemView: View.Contact,

      itemViewContainer: "ul.basic-list"
    });        

    View.AddContactLead = Marionette.ItemView.extend({      

        template: addcontactleadTpl,

        events: {
          "click .ioptions #btn-edit": "editIssue",
        },

        onShow: function(){
          //$("#leadscont").unwrap();
          $('.selectpicker').selectpicker();
        },

        editIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.SearchHeader = Marionette.ItemView.extend({      

        template: searchheadTpl,

        events: {
          "click #search": "search",
        },

        onShow: function(){
          //$("#leadscont").unwrap();
          //$('.selectpicker').selectpicker();
        },

        search: function(e) { 
          e.preventDefault();
          e.stopPropagation();

          if (!navigator.contacts) {
            alert("Contacts API not supported", "Error");
            return;
          }
          var searchStr = $('#searchtext').val();
          var searchOptions = {
            filter : searchStr,
            multiple : true,
          };
          var contactFields = ['displayName', 'name', 'nickname'];
          navigator.contacts.find(contactFields, this.onSuccess, this.onError, searchOptions);
        },

        onSuccess: function (contacts){
          //alert(contacts.length + ' contacts found!');
          var results = [];
          var cont = {};
          for (var i = 0; i < contacts.length; i++) {
            cont.name = contacts[i].displayName || contacts[i].name.familyName + " "+ contacts[i].name.givenName;
            cont.phone = '';
            if(contacts[i].phoneNumbers != null) {
              var len = contacts[i].phoneNumbers.length;
              if(len > 0) {
                for(var j = 0; j < len; j++) {
                  cont.phone += contacts[i].phoneNumbers[j].value + ', ';
                }
              }
            }
            results.push(cont);
          };
          var THAT = this;
          setTimeout(function () {
            alert(JSON.stringify(results));
            THAT.trigger("results", results);
          }, 2000);
        },

        onError: function (er){
          alert('contact search error');
        }
    });

    View.Contact = Marionette.ItemView.extend({      

        template: contactTpl,

        tagName: "li",

        events: {
          "click #btn-read": "itemClicked"
        },

        itemClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.trigger("submit", this.model);
        }
    });*/

    View.Leads = Marionette.ItemView.extend({      

        template: leadsTpl,

        events: {
          "click .ioptions #btn-edit": "editIssue",
        },

        onShow: function(){
          $("#leadscont").unwrap();
          
          var ul = $('.row > div');
          ul.empty();

          $.get(System.coreRoot + "/gateway.php?generatedLeads=1", function(result) {
              var res = JSON.parse(result);
              res.forEach(function(element, index){
                var tpl = $('<div class="col-xs-6" style="border-radius:3px;"><div class="panel" style="border-bottom:8px solid #f7c331;"><div class="lead-img"><img src="img/person.png" alt="img" class="img"></div><div class="lead-text"><b>'+element['name']+'</b><br><span class="desc">'+element['phone']+'</span><br><span class="desc">Product - Latest Status</span></div></div></div>');
                tpl.appendTo(ul);
              });
          });
        },

        editIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
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
          System.previousView = [];

          System.companyid = '?';
          System.branchid = '?';
          System.categoryid = '?';
          System.productid = '?';

          var ul = $('#companies');
          ul.empty();

          if (System.structure.length == 0) {
            $.get(System.coreRoot + "/gateway.php?structure", function(result) {
              var res = JSON.parse(result);
              res.forEach(function(element, index){
                var tpl = $('<li><p style="display:none">'+element.company.id+'</p><div class="imgc"><img src="img/companies/'+element.company.logo+'" alt="img" style="width:100%"></div><h3>'+element.company.name+'</h3><span class="desc">'+element.company.descr+'</span></li>');
                tpl.appendTo(ul);
                System.structure[element.company.id] = element;
              });
            });            
          }else{
            System.structure.forEach(function(element, index){
              var tpl = $('<li><p style="display:none">'+element.company.id+'</p><div class="imgc"><img src="img/companies/'+element.company.logo+'" alt="img" style="width:100%"></div><h3>'+element.company.name+'</h3><span class="desc">'+element.company.descr+'</span></li>');
              tpl.appendTo(ul);
            });
          }
          var THAT = this;
          setTimeout(function(){
            $("#companies > li span").dotdotdot({ ellipsis : ' ... ' });

            $("#companies > li span, #companies > li h3").on('click', function(){ 
              THAT.viewDesc(parseInt($(this).parent().find('p').text(), 10));
            });

            $("#companies > li .imgc").on('click', function(){ 
              THAT.viewNext(parseInt($(this).parent().find('p').text(), 10));
            });

          }, 500);
          
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
            //console.log(System.categoryid);
            //console.log(struct.categories);
            System.productSelect = struct.categories[System.categoryIndex].products;
          }

          System.productSelect.forEach(function(element, index){
            var tpl = $('<li><p style="display:none">'+element.id+'</p><div class="imgc" style="background:none;"><img src="img/product-icon.png" alt="img" style="width:100%"></div><h3>'+element.name+'</h3><span class="desc">'+element.descr+'</span></li>');
            tpl.appendTo(ul);
          });

          var THAT = this;
          setTimeout(function(){
            $("#products > li span").dotdotdot({ ellipsis : ' ... ' });
          }, 300);
        },

        viewContacts: function(e) {
          e.preventDefault();
          e.stopPropagation();
          System.productid = parseInt($(e.currentTarget).parent().find('p').text(), 10); 
          System.previousView.push('products'); 
          //alert("comp:"+System.companyid +", branch:"+System.branchid +", category:"+System.categoryid +", product:"+System.productid);
          System.execute("leads:contacts");
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

    View.Contacts = Marionette.ItemView.extend({

      template: contactsTpl,

      events: {
          "click .goback": "goBack",
          "click #contacts > li": "addLead",
          "keyup #searchtext": "filter",
      },

      onShow: function(){
          //$("#leadscont").unwrap();
          this.contactSearch();
          System.leadName = '';
          System.leadNo = '';
          System.leadEmail = '';
      },

      contactSearch: function() { 

        if (!navigator.contacts) {
          swal("Error!", "Contacts API not supported", "error");
          //alert("Contacts API not supported", "Error");
          return;
        }

        if (System.phoneContacts.length > 0) {
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
        }         

      },

      onSuccess: function (contacts){
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
              
              var tpl = $('<li><b>'+cont.name+'</b><br><span class="desc one">'+cont.phone+'</span><br><span class="desc two">'+cont.email+'</span><span class="add"><i class="fa fa-user"></i></span></li>');
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
          
      },

      onError: function (er){
        swal("Error!", "contact search error", "error");
      },

      addLead: function(e) {
        e.preventDefault();
        e.stopPropagation();
        System.leadName = $(e.currentTarget).find('b').text();
        System.leadNo = $(e.currentTarget).find('.desc.one').text();
        System.leadEmail = ($(e.currentTarget).find('.desc.two').text() || '');
        //alert(System.leadName+', '+System.leadNo+', '+System.leadEmail);
        System.execute("leads:finalize", "opt");
      },

      goBack: function(id) {
         System.execute("leads:"+System.previousView.pop());
      }
    });

    View.AddLead = Marionette.ItemView.extend({      

        template: addleadTpl,

        events: {
          "click .btnsub": "addLead",
          "change #companysel": "updateCompanyChildren",
          "change #categorysel": "updateProducts",
          "change .btnsub": "addLead",
        },

        onShow: function(){
          var compsel = $('#companysel');          
          var branchsel = $('#branchsel');
          var catsel = $('#categorysel');
          var prodsel = $('#productsel');
          compsel.empty();
          branchsel.empty();
          catsel.empty();
          prodsel.empty();
          
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
              var tpl3 = $('<option data-icon="fa fa-cubes" value="'+element.id+'">'+element.name+'</option>');
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
          this.trigger("create", data);
        },

        onFormDone: function() {
          System.execute("leads:companies");
        }
    });

  });

  return System.LeadsApp.Show.View;
});
