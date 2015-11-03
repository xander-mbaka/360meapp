<!-- START CONTENT -->
<div id="leadscont" class="">

  <!-- Start Page Header -->
  <div class="page-header">
    <h1 class="title" style="padding:5px 15px 10px 0px;">LOG ACTION</h1> 
  </div>
  <!-- End Page Header -->

 <!-- //////////////////////////////////////////////////////////////////////////// --> 
  <!-- START CONTAINER -->
  <div class="container-widget">
    <div class="col-md-12 leadtails"></div>
   <div class="col-md-12 login-form new-lead">
      <form action="#">
        <label class="title" style="margin:0px 0px 0px 20px">ENGAGEMENT DETAILS</label>
        <div class="form-area" style="position:relative">
           <div class="input-group group" style="display:block">
            <select class="selectpicker form-control xf" placeholder="change status" name="status" id="statussel">
              <option data-icon="fa fa-support">Change Status...</option>
              <option data-icon="fa fa-support" value="Lead Contacted">Lead Contacted</option>
              <option data-icon="fa fa-support" value="Lead Met">Lead Met</option>
              <option data-icon="fa fa-support" value="Proposal Sent">Proposal Sent</option>
              <option data-icon="fa fa-support" value="Lead Closed">Lead Closed</option>
              <option data-icon="fa fa-support" value="Gone Cold">Gone Cold</option>
            </select>            
          </div>
          
          <div class="input-group group" style="display:block">
            <textarea class="form-control" rows="3" placeholder="Enter details ..." style="height:unset;padding-left:10px;margin-bottom:20px" name="notes"></textarea>
          </div>
          <button type="submit" class="btn btn-default btn-block btnsub">UPDATE STATUS</button>
        </div>
      </form>
    </div>
  </div>
</div>