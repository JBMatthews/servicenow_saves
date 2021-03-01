// Today &  Tomorrow Date vars
var gdt = new GlideDateTime(); // Date/Time API Source
var today = gdt.getDate(); // Today's Date: YYYY/MM/DD
var tmrrw = gdt; // Tomorrow's Date: YYYY/MM/DD (today +1 day)
tmrrw.addDaysLocalTime(1);

// Service Entitlements Query
var grEnt = new GlideRecord('x_datrp_service_en_service_entitlement');
var entQuery = 'active=true^current_interval.interval_endONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()'; // Query: Currrent Interval ends today, Active is true
grEnt.addEncodedQuery(entQuery);
grEnt.query();

// Loop through Service Entitlement query results
while (grEnt.next()) {
    // Vars from Service Entitlement form
    var num = grEnt.number; //Number
    var co = grEnt.company; // Company
    var po = grEnt.customer_po; // Customer PO
    var offering = grEnt.service_offering; // Service Offering
    var current_interval = grEnt.current_interval; // Current Interval
    var type = grEnt.type; // Type
    var freq = grEnt.getValue('interval_frequency'); // Interval Frequency (number)
    
    // If Service Entitlement End Date is NOT Today   
    var grInt = new GlideRecord('x_datrp_service_en_service_interval');
    if (grEnt.end_date != today && grEnt.recurring == true) {
        // Create next Interval and set Active to True
        grInt.initialize(); // Start record creation
        grInt.setValue('company', co);
        grInt.setValue('type', 'Block Hour');
        grInt.setValue('interval_start', tmrrw);
        grInt.setValue('service_entitlement', grEnt.sys_id);
        grInt.setValue('entitled_block_hours', grEnt.quantity_allowed);
        grInt.setValue('active', true);
        // Set Interval End
        tmrrw.addDaysLocalTime(freq);
        grInt.setValue('interval_end', tmrrw);
        grInt.insert(); // Insert new Service Interval Record
        
        // Set newly created Interval as 'Current Interval' on the Service Entitlement 
        grEnt.setValue('current_interval', grInt.getUniqueValue());
        grEnt.update(); // Update Service Entitltment Record
        
        // Deactivate any other Service Intervals
        var queryInt = 'active=true^interval_endONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^ORinterval_endONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()'; // Query: Active, Interval End is Today OR Yesterday
        grInt.addEncodedQuery(queryInt);
        grInt.query();
        // Loop through Intervals
        while(grInt.next()) {
            grInt.setValue('active', false);
            grInt.update();
        }
    }
    // Deactivate the Service Entitlement 
    if (grEnt.end_date == today) { // Service Entitlement is ending
        gs.info('Ends: ' + today);
        grEnt.current_interval = 'NULL';
        grEnt.active = false;
        grEnt.update();
    }
}