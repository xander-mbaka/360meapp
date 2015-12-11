<!-- START CONTENT -->
<div id="leadscont" class="">

  <!-- Start Page Header -->
  <div class="page-header">
    <h1 class="title" style="padding:5px 15px 10px 0px;">CREATE LEAD</h1> 
  </div>
  <!-- End Page Header -->

 <!-- //////////////////////////////////////////////////////////////////////////// --> 
  <!-- START CONTAINER -->
  <div class="container-widget">
   <div class="col-md-12 login-form new-lead">
      <form action="#">
        <label class="title" style="margin:10px 20px 0px 20px">Prospect's Details</label>
        <div class="form-area" style="padding-bottom:0;position:relative">
          <div class="group">
            <input type="text" class="form-control" placeholder="Prospects Name" name="name" id="leadname">
            <i class="fa fa-user"></i>
          </div>
          <div class="group">
            <input type="text" class="form-control" placeholder="Phone Number" name="phone" id="leadphone">
            <i class="fa fa-phone"></i>
          </div>
          <div class="group">
            <input type="text" class="form-control" placeholder="E-mail" name="email" id="leademail">
            <i class="fa fa-envelope-o"></i>
          </div>
          <div class="input-group group" style="display:block">
            <textarea class="form-control" rows="3" placeholder="Additional info ..." style="height:unset;padding-left:10px;margin-bottom:20px" name="notes"></textarea>
          </div>
        </div>
        <label class="title" style="margin:0px 0px 0px 20px">Product Details</label>
        <div class="form-area" style="position:relative">
          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" name="company" id="companysel">
              <option data-icon="fa fa-institution">Select Company...</option>
              <option data-icon="fa fa-institution" value="Chase Bank">Chase Bank</option>
              <option data-icon="fa fa-institution" value="Chase Iman">Chase Iman</option>
              <option data-icon="fa fa-institution" value="Chase Assurance">Chase Assurance</option>
              <option data-icon="fa fa-institution" value="Genghis Capital">Genghis Capital</option>
              <option data-icon="fa fa-institution" value="Light House Properties">Light House Properties</option>
              <option data-icon="fa fa-institution" value="Orchid Capital">Orchid Capital</option>
              <option data-icon="fa fa-institution" value="Rafiki Microfinance">Rafiki Microfinance</option>
              <option data-icon="fa fa-institution" value="Tulip Healthcare">Tulip Healthcare</option>
              <option data-icon="fa fa-institution" value="Rivieres Finance">Rivieres Finance</option>
            </select>
            
          </div>          
          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="select branch" name="branch" id="branchsel">
              <option data-icon="fa fa-map-marker">Select Branch...</option>
              <option data-icon="fa fa-map-marker" value="Moi Avenue Branch">Moi Avenue Branch</option>
              <option data-icon="fa fa-map-marker" value="Haile Selasie Branch">Haile Selasie Branch</option>
              <option data-icon="fa fa-map-marker" value="Westlands Branch">Westlands Branch</option>
              <option data-icon="fa fa-map-marker" value="Thika Branch">Thika Branch</option>
              <option data-icon="fa fa-map-marker" value="TRM Branch">TRM Branch</option>
              <option data-icon="fa fa-map-marker" value="Nyali Branch">Nyali Branch</option>
              <option data-icon="fa fa-map-marker" value="Mombasa Island Branch">Mombasa Island Branch</option>
            </select>            
          </div>

          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="select product category" name="category" id="categorysel">
              <option data-icon="fa fa-support">Select Product Category...</option>
              <option data-icon="fa fa-support" value="Fixed Deposit Accounts">Fixed Deposit Accounts</option>
              <option data-icon="fa fa-support" value="Current Accounts">Current Accounts</option>
              <option data-icon="fa fa-support" value="Loans">Loans</option>
              <option data-icon="fa fa-support" value="Savings Accounts">Savings Accounts</option>
              <option data-icon="fa fa-support" value="Foreign Exchange">Foreign Exchange</option>
              <option data-icon="fa fa-support" value="Securities Investment">Securities Investment</option>
              <option data-icon="fa fa-support" value="Internet Banking">Internet Banking</option>
            </select>            
          </div>

           <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="select product" name="product" id="productsel">
              <option data-icon="fa fa-support">Select Product...</option>
              <option data-icon="fa fa-support" value="Fixed Deposit Accounts">Fixed Deposit Accounts</option>
              <option data-icon="fa fa-support" value="Current Accounts">Current Accounts</option>
              <option data-icon="fa fa-support" value="Loans">Loans</option>
              <option data-icon="fa fa-support" value="Savings Accounts">Savings Accounts</option>
              <option data-icon="fa fa-support" value="Foreign Exchange">Foreign Exchange</option>
              <option data-icon="fa fa-support" value="Securities Investment">Securities Investment</option>
              <option data-icon="fa fa-support" value="Internet Banking">Internet Banking</option>
            </select>            
          </div>
        </div>
        <label class="title" style="margin:0px 0px 0px 20px">Relationship Officer</label>
        <div class="form-area" style="position:relative">
          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" name="ro" id="rosel">
              <option data-icon="fa fa-user">Select Company...</option>
              <option data-icon="fa fa-user" value="Chase Bank">Chase Bank</option>
            </select>            
          </div>          
          <button type="submit" class="btn btn-default btn-block btnsub">ADD LEAD</button>
        </div>
      </form>
    </div>
  </div>
</div>