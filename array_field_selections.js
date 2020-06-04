//
//
//


var gr = new GlideRecord(''); //Service Offerings selected
gr.query(''); //

while(gr.next()){
    
}



// EXAMPLE:
//		if(!offerings)
//			return false;
//		var companyID = gs.getUser().getCompanyID();
//		var gr = new GlideRecord("service_subscribe_company");
//		gr.addQuery("core_company", companyID);
//		gr.query();
//		while(gr.next()){
//			if(offerings.indexOf(gr.service_offering.name.toString())>-1)
//				return true;
//		}
//		return false;