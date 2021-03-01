//
//
//

// The Plot
/*

When someone creates a Service Inteval, they will set the interval to Active, and that needs to trigger a few things:
1. Make it the Current Interval
2. Set the previous Service Interval to false

When a Service Interval is created and set to Active

Find the Service Entitlement it belongs to 
    Clear Current Interval field
    Set newest Service Interval as its Current Interval

NOTE: Service Interval (x_datrp_service_en_service_entitlement) service_entitlement SAME AS Service Entitltment (x_datrp_service_en_service_interval) sys_id

*/


// ---Business Rule - running on the Service Interval table

(function executeRule(current, previous /*null when async*/) {
	var grEnt = new GlideRecord('x_datrp_service_en_service_entitlement');
	grEnt.addQuery('sys_id');
	grEnt.query();
    while(grEnt.next()) {
        if(grEnt.sys_id == '') {
            print('Found: ' + grEnt.sys_id);
        }else{
            print('Noting Found.')
        }
    }

})(current, previous);



// ---TESTING

// Entitlement
var gre = new GlideRecord('x_datrp_service_en_service_entitlement');
gre.addQuery('active','true');
gre.query();

// Interval
var gri = new GlideRecord('x_datrp_service_en_service_interval');
gri.addQuery('active','true');
gri.query();

//while(gri.next()) {
//    gs.info('Interval Sys Id: ' + gri.service_entitlement);
//}

while(gre.next()) {
//gs.info('Entitlement Sys Id: ' + gre.sys_id);
    
    if(gri.getValue('service_entitlement') == gre.getDisplayValue(sys_id)) {
        gri.setValue(current.current_interval, gre.);
        gri.setValue(previous. interval to false);
        gs.info('Match!');  
        
    }else{
        gs.info('Not matched!');
    }
}


// TESTING - ARRAY WAY
var gdt = new GlideDateTime(); // Date/Time API Source
var today = gdt.getDate(); // Today's Date: YYYY/MM/DD
var tmrrw = gdt; // Tomorrow's Date: YYYY/MM/DD (today +1 day)
tmrrw.addDaysLocalTime(1);

var serviceEntitlements = [];
var se = new GlideRecord("x_datrp_service_en_service_entitlement");
se.addQuery("active", true);
se.query();

while (se.next()) {
    serviceEntitlements.push(se.getValue("sys_id"));
        gs.info('manual-count...');
    
var si = new GlideRecord("x_datrp_service_en_service_interval");
si.addQuery("service_entitlement", "IN", serviceEntitlements.toString());
si.addQuery("active", true);
si.query();
    
while (si.next()) {
	gs.info("SE field: " + si.service_entitlement + "SE sys_id: " + se.getValue("sys_id"));
    
    if(si.service_entitlement == se.sys_id){
        gs.info("Match");
        if(se.current_interval == '');
            gs.info("No Current Int");
            se.setValue('current_interval', si.contract_interval_name);
            se.update();
        if(se.current_interval != '');
            gs.info("Current Int: " + se.current_interval);
            se.current_interval = 'NULL';
            
            se.update();
            se.setValue('current_interval', si.contract_interval_name);
            se.update();
            gs.info("Current Int: " + se.current_interval);
    }else{
        gs.info("No Match");
        }
    }
}



// ---Harika's
var si = new GlideRecord("x_datrp_service_en_service_interval");
si.addQuery("service_entitlement", "IN", serviceEntitlements.toString());
si.addQuery("active", true);
si.query();
while (si.next()) {
	gs.info("Service Entitlement field: " + si.service_entitlement + " | sys_id field: " + se.getValue("sys_id"));

        if(si.service_entitlement == se.sys_id){
              gs.info("Match");
        }else{
              gs.info("No Match");
        }

}


// Currently
// SI service_entitlement: '557514591b1e1890e697db91dd4bcb14'
// SE sys_id: '557514591b1e1890e697db91dd4bcb14'