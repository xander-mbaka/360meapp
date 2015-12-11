<!-- START CONTENT -->
<div id="leadscont" class="">

  <!-- Start Page Header -->
  <div class="page-header" style="padding-top:0;margin-top:-60px;">
    <h1 class="title" style="padding:5px 15px 10px 0px;">USER REGISTRATION</h1> 
  </div>
  <!-- End Page Header -->

 <!-- //////////////////////////////////////////////////////////////////////////// --> 
  <!-- START CONTAINER -->
  <style type="text/css">
  .upload-img {
      background: rgba(0, 0, 0, 0) url("img/dragdrop.png") no-repeat scroll 0;
      border: 3px dashed #7a7c7f;
      color: #808080;
      height: 300px;
      width: 300px;
      margin: 15px auto;
      background-size: 100%;
  }
  .upload-img.hover {
      border: 3px dashed #f00;
  }
</style>
  <div class="container-widget">
   <div class="col-md-12 login-form new-lead">
      <form action="#" class="rform">
        <label class="title" style="margin:10px 20px 0px 20px">PERSONAL DETAILS</label>
        <div class="form-area" style="padding-bottom:0;position:relative">
          <div class="group upload-img">
            <input type="file" value="" name="pimage" style="display:none" id="pimage">
            <span></span>
          </div>
          <div class="group">
            <input type="text" class="form-control" placeholder="Full Name" name="name" id="pname">
            <i class="fa fa-user"></i>
          </div>
          <div class="group">
            <input type="text" class="form-control" placeholder="Phone Number" name="phone" id="pphone">
            <i class="fa fa-phone"></i>
          </div>
          <div class="group">
            <input type="text" class="form-control" placeholder="Company Email" name="email" id="pemail">
            <i class="fa fa-envelope-o"></i>
          </div>
          <div class="group">
            <input type="password" class="form-control" placeholder="Password" name="pass" id="ppass">
            <i class="fa fa-key"></i>
          </div>
          <div class="group">
            <input type="password" class="form-control" placeholder="Re-type Password" name="repass" id="prepass">
            <i class="fa fa-key"></i>
          </div>
        </div>        

        <label class="title" style="margin:0px 0px 0px 20px">PROFESSIONAL DETAILS</label>
        <div class="form-area" style="position:relative">
          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" name="company" id="companysel">
              <option data-icon="fa fa-institution">Select Company...</option>
              <option data-icon="fa fa-institution" value="Chase Bank">Chase Bank</option>
              <option data-icon="fa fa-institution" value="Chase Iman">Chase Iman</option>
              <option data-icon="fa fa-institution" value="Chase Assurance">Chase Assurance</option>
            </select>            
          </div>

          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="select branch" name="branch" id="branchsel">
              <option data-icon="fa fa-building">Select Branch...</option>
              <option data-icon="fa fa-building" value="Moi Avenue Branch">Moi Avenue Branch</option>
              <option data-icon="fa fa-building" value="Haile Selasie Branch">Haile Selasie Branch</option>
              <option data-icon="fa fa-building" value="Westlands Branch">Westlands Branch</option>
            </select>            
          </div>

          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="select department" name="department" id="departmentsel">
              <option data-icon="fa fa-briefcase">Select Department...</option>
              <option data-icon="fa fa-briefcase" value="Moi Avenue Branch">Moi Avenue Branch</option>
              <option data-icon="fa fa-briefcase" value="Haile Selasie Branch">Haile Selasie Branch</option>
              <option data-icon="fa fa-briefcase" value="Westlands Branch">Westlands Branch</option>
            </select>            
          </div>

          <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="select position" name="position" id="positionsel">
              <option data-icon="fa fa-user" value="6">Non-Marketing/Non-Administration Position</option>
              <option data-icon="fa fa-user" value="2">Relationship Officer</option>
              <option data-icon="fa fa-user" value="3">Head of Department</option>
              <option data-icon="fa fa-user" value="4">Branch Manager</option>
              <option data-icon="fa fa-user" value="5">General Manager</option>
            </select>            
          </div>
          
          <button type="submit" class="btn btn-default btn-block btnsub">REGISTER</button>
        </div>
      </form>
    </div>
  </div>
</div>