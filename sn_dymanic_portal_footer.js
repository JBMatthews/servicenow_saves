//
// SN DYNAMIC PORTAL FOOTER
//
//
//
//
//-----------------------------------------------------------------------------------------------
// Simple Example - YouTub video
// - Body html template - 
<div class="sample-footer">
    ${{{::c.data.title}} Non dymanic text {{::c.data.time}}}
</div>

// - CSS -
.sample-footer {
    background-color: black;
    color: white;
    padding: 5px;
}

// - Server script -
(function() {
    data.time = new GlideDateTime().getDisplayValue();
    var portalGR = $sp.getPortalRecord();
        data.title = portalGR.getDisplayValue('title');
})();

// - Client controller -
function() {
    var c = this;
}

//-----------------------------------------------------------------------------------------------
//
//
//
//
//
// MYFOOTER ------------------------------------------------------------------------------------
// - Body html template - 
<footer>
  <div class="rn_Container rn_Container_top">
    <div class="nsitAbout">
      <div class="nsitCoInfo">
        <img class="logo" ng-src="{{::portal.logo}}" title="ServiceNow" role="presentation" alt="${Portal Logo}" />
        ${{{::c.data.co}} {{::c.data.yr}} Copyright© {{::c.data.phn}}}
      </div>
      <div class="nsitPolicies">
        <a href=""></a>
      </div>
    </div>
  </div>
</footer>


// - CSS -
footer {
  border-top: 1px solid #a39d99;
}

.rn_Container_top {
  clear: both;
  padding: 20px 0;
}

.rn_Container {
  max-width: 68em;
  margin-left: auto;
  margin-right: auto;
}

.rn_Container:before,
.rn_Container:after {
  content: " ";
  display: table;
}

.rn_Container:after {
  clear: both;
}

.nsitAbout {
  clear: both;
  font-size: 12px;
  max-width: 100%;
}

.nsitAbout h5 {
  font-size: 24px;
}

.nsitAbout ul li {
  font-size: 14px;
  margin-bottom: 10px;
}

.nsitAbout ul li a,
.nsitAbout .nsitPolicies a {
  color: #7d726d;
  font-weight: 100;
}

.nsitAbout .nsitPolicies a:hover {
  color: #aea9a0;
  font-weight: 100;
}

.nsitAbout .nsitPolicies span {
  display: inline-block;
  padding: 0 20px;
}

.nsitAbout .nsitTerms {
  clear: both;
  font-size: 12px;
  max-width: 100%;
  margin: 0px auto;
  padding: 20px 0 0px;
}

.nsitAbout .nsitCoInfo {
  font-size: 12px;
  font-weight: 100;
  width: 30%;
  margin: 0px;
  padding: 0px;
  float: left;
}

.nsitAbout .nsitPolicies {
  font-size: 12px;
  width: 70%;
  margin: 0px;
  padding: 0px;
  text-align: right;
  float: left;
}

.logo {
  width: 80px;
  padding-right: 3px;
}

@media screen and (max-width: 1088px) {
  .rn_Container {
    margin: 0 1em;
  }
}

@media screen and (max-width: 720px) {
  .rn_Container {
    word-wrap: break-word;
  }
}


// - Server script -
(function() {
	
  // Get Current Year	
	var gdt = new GlideDateTime();
	data.yr = gdt.getYear();
	
  // Find Current User's Company and Number
	var currentUser = gs.getUser();
	var userco = currentUser.getCompanyID();
	var gr = new GlideRecord('core_company');
	gr.get('sys_id',userco);
	data.phn = gr.getDisplayValue('phone');
	data.co = gr.getDisplayValue('name');

  // Check for EULA Agreement
	var page = $sp.getParameter("id");
	data.isAccepted = true;
	if (page != "eula") {
    var eu = new EULAUtil();
	data.isAccepted = eu.acceptedEULA();
  }
})();


// - Cleint script -
function ($scope, $window) {
  /* widget controller */
  var c = this;

  //Watch for page changes and redirect to EULA
  var listener = $scope.$watch(
    //watch for changes to href
    function () {
      if (c.data.isAccepted === true) {
        listener(); //deregister the watch
      }
      return $window.location.href;
    },
    //Callback to set location href
    function (newValue) {
      if (newValue.indexOf("eula") == -1) {
        c.server.update().then(function (response) {
          if (response.isAccepted === false) {
            $window.location.href = "sp?id=eula";
          }
        });
      }
    });
}



//-----------------------------------------------------------------------------------------------


