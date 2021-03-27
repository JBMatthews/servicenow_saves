// Today &  Tomorrow Date vars
var gdt = new GlideDateTime(); // Date/Time API Source
var today = gdt.getDate(); // Today's Date: YYYY/MM/DD
var tmrrw = gdt; // Tomorrow's Date: YYYY/MM/DD (today +1 day)
tmrrw.addDaysLocalTime(1);
// xxDEBUGxx
gs.info(tmrrw,'JMx');

// Service Entitlements Query
var grEnt = new GlideRecord('x_datrp_service_en_service_entitlement');

// Query: Recurring is checked, Service Entitlement doesn't end tomorrow, Currrent Interval ends today, Active is true
//var entQuery = addEncodedQuery("active=true^current_interval.interval_endONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^recurring=true");
//grEnt.addEncodedQuery(entQuery);

// xxDEBUGxx
grEnt.addQuery('active', true); // Active Service Entitlements
//grEnt.addQuery('interval_end', today); //Service Entitlements with End Date of today
grEnt.addQuery('recurring', true); // Recurring field is checked (true) 
grEnt.query();

// Loop through Service Entitlement query results
while (grEnt.next()) {
    // Vars we need from Service Entitlement form
    // Number
    var num = grEnt.number;
    gs.info("num " + num,'JMx');
    // Company
    var co = grEnt.company;
    gs.info("co " + co,'JMx');
    // Customer PO
    var po = grEnt.customer_po;
    gs.info("po " + po,'JMx');
    // Service Offering
    var offering = grEnt.service_offering;
    gs.info("offering " + offering,'JMx');
    // Current Interval
    var current_interval = grEnt.current_interval;
    gs.info("current_interval " + current_interval,'JMx');
    // Type
    var type = grEnt.type;
    gs.info("type " + type,'JMx');
    

// Interval Frequency
    var freq = grEnt.interval_frequency;
    gs.info("freq" +  freq, 'JMx');

    

    // If Service Entitlement End Date is NOT Today or Tomorrow    
    var grInt = new GlideRecord('x_datrp_service_en_service_interval');
    if(grEnt.end_date !=  today) {
        // Create next Interval and set Active to True
        grInt.initialize();
        grInt.setValue('company',co);
        grInt.setValue('type','Block Hour');
        grInt.setValue('interval_start',tmrrw);
        grInt.setValue('service_entitlement', num); // NOT WORKING
        gs.info("num " + num,'JMx');
        grInt.setValue('entitled_block_hours',grEnt.quantity_allowed);
        var int_end = gdt; 
        int_end = int_end.addDaysLocalTime(30);
        grInt.setValue('interval_end',tmrrw);
        grInt.setValue('active', true);
        var name = num + ' - ' + tmrrw +' - ' + tmrrw;
        grInt.setValue('contract_interval_name', name);;
        
        grInt.insert();

    // Set new Current Interval as 'Current Interval' on the Service Entitlement  
        var current_interval = grEnt.current_interval;
        gs.info("Current Interval: " + grEnt.current_interval,'JMx');
        grEnt.update();

    // Deactivate the Service Entitlement - ***MAKE SURE NOT TO DEACTIVATE TOO SOON***
    }else if(grEnt.end_date == today && grEnt.active == true) { // Service Entitlement is ending
        gs.info("Whoa. This thing ends tomorrow: " + tmrrw);
        grEnt.active = false;
        gs.info(grEnt.active);
        grEnt.update(); 
    }else{
        continue;
    }
}  




//TEST INTERVAL FREQ
// Today &  Tomorrow Date vars
var gdt = new GlideDateTime(); // Date/Time API Source
var today = gdt.getDate(); // Today's Date: YYYY/MM/DD
var tmrrw = gdt; // Tomorrow's Date: YYYY/MM/DD (today +1 day)
tmrrw.addDaysLocalTime(1);

// Service Entitlements Query
var grEnt = new GlideRecord('x_datrp_service_en_service_entitlement');
grEnt.addQuery('recurring', true); // Recurring field is checked (true) 
grEnt.query();

// Loop through Service Entitlement query results
while(grEnt.next()) {

// Interval Frequency
    var freq = grEnt.interval_frequency;
    freq.getChoiceValue(); 
    gs.info("freq: " +  freq, 'JMx')


}




// OLD Recurring Calc


// Today &  Tomorrow Date vars
var gdt = new GlideDateTime(); // Date/Time API Source
var today = gdt.getDate(); // Today's Date: YYYY/MM/DD
var tmrrw = gdt; // Tomorrow's Date: YYYY/MM/DD (today +1 day)
tmrrw.addDaysLocalTime(1);
// xxDEBUGxx
gs.info(today, 'JMx');
gs.info(tmrrw, 'JMx');

// Service Entitlements Query
var grEnt = new GlideRecord('x_datrp_service_en_service_entitlement');
var entQuery = 'active=true^current_interval.interval_endONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()'; // Query: Currrent Interval ends today, Active is true
grEnt.addEncodedQuery(entQuery);
grEnt.query();

// Loop through Service Entitlement query results
while (grEnt.next()) {

    // Vars from Service Entitlement form
    // Number
    var num = grEnt.number;
    gs.info("num: " + num, 'JMx');
    // Company
    var co = grEnt.company;
    gs.info("company: " + co, 'JMx');
    // Customer PO
    var po = grEnt.customer_po;
    gs.info("po: " + po, 'JMx');
    // Service Offering
    var offering = grEnt.service_offering;
    gs.info("offering " + offering, 'JMx');
    // Current Interval
    var current_interval = grEnt.current_interval;
    gs.info("current_interval " + current_interval.getDisplayValue(), 'JMx');
    // Type
    var type = grEnt.type;
    gs.info("type " + type, 'JMx');
    // Interval Frequency (number)
    var freq = grEnt.getValue('interval_frequency');
	gs.info('Start freq: ' + freq);
/*    if (freq == "Annual") {
        freq = 365;
        gs.info("freq: " + freq, 'JMx');
    } else if (freq == "Semi-annual") {
        freq = 180;
        gs.info("freq: " + freq, 'JMx');
    } else if (freq == "Quarterly") {
        freq = 90;
        gs.info("freq: " + freq, 'JMx');
    } else if (freq == "Monthly") {
        freq = 30;
        gs.info("freq: " + freq, 'JMx');
    } else {
        freq = 0;
        gs.info("freq: " + freq, 'JMx');
    }
	gs.info('End freq: ' + freq);*/

    // If Service Entitlement End Date is NOT Today   
    var grInt = new GlideRecord('x_datrp_service_en_service_interval');
    if (grEnt.end_date != today && grEnt.recurring == true) {
        gs.info("Doesn't end: " + today + '. Running if');
        // Create next Interval and set Active to True
        grInt.initialize(); // Start record creation
        grInt.setValue('company', co);
        grInt.setValue('type', 'Block Hour');
        grInt.setValue('interval_start', tmrrw);
        grInt.setValue('service_entitlement', grEnt.sys_id);
        grInt.setValue('entitled_block_hours', grEnt.quantity_allowed);
        grInt.setValue('additional_block_hours',grEnt.additional_block_hours);
        grInt.setValue('active', true);
        
        
        // **ALERT** - NOT WORKING
        // Set Interval End
        gs.info('Freq: ' + freq);
        
        if(freq == 0 || freq == 'Manual'){
            gs.info('Manual' + freq);
            
        } else {
            tmrrw.addDaysLocalTime(freq);
            grInt.setValue('interval_end', tmrrw);
        } // tmrrw.daysAgo(-freq)
        
        grInt.insert(); // Insert new Service Interval Record
        
        // **ALERT** - NOT WORKING 
        // Could be done using a seperate Client Script
        // Set newly created Interval as 'Current Interval' on the Service Entitlement 
        grEnt.setValue('current_interval', grInt.getUniqueValue()); // TRY THIS getUnqiueValue
        gs.info("Current Interval is now: " + grEnt.current_interval, 'JMx');
        
        // Update Service Entitlements
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
    } // NOTE: Make sure Intervals do NOT go out further than the Entitlement 
    
    // - STILL ALL RECURRING grENT - Does NOT matter if it is recurringd
    // Deactivate the Service Entitlement 
    if (grEnt.end_date == today) { // Service Entitlement is ending
        gs.info('Ends: ' + today);
        grEnt.active = false;
 /*       gs.info(grEnt.active);
        grEnt.current_interval = 'NULL';
        gs.info('Current Interval: NULL');  // IMPORTANT: Delete this. Use BR to make Interval false and not current. */
        grEnt.update();
/*        
        // All active intervals deactivate
        grInt.addQuery('active', true);
        grInt.query();
        
        while(grInt.next()); {
            gs.info('Running while loop...');
            gs.info(grEnt.service_offering);
            gs.info(grInt.service_entitlement); // SAME: Delete and include in the BR
            gs.info(grEnt.company);
            gs.info(grInt.company);
            // ALERT - NOT WORKING
            if(grInt.company == grEnt.company) { // If interval belongs to grEnt
                gs.info('Running for loop...');
                grInt.setValue('active', false);
                grInt.update();
            }*/
        }
    }




//
// ---MULTIPLE ARRAYS PUSH TYPES---
//
var variables = [];
var variable_sets_m2m = [];
var variable_sets = [];
var choices = [];

//get all standalone variables for catalog item
var vars = new GlideRecord('item_option_new');
vars.addQuery('cat_item',inputs.id);
vars.queryNoDomain();while(vars.next()){    
    variables.push(vars.sys_id+'');
}

//get all catalog variable set m2m records
var m2m = new GlideRecord('io_set_item');
m2m.addQuery('sc_cat_item',inputs.id);
m2m.queryNoDomain();while(m2m.next()){    
    variable_sets_m2m.push(m2m.sys_id+'');    
    
    //get all catalog variable set records 
    variable_sets.push(m2m.variable_set.sys_id+'');}

//get all variables in these variable sets
for(i=0; i < variable_sets.length; i++){    
    var var_set_vars = new GlideRecord('item_option_new');    
    var_set_vars.addQuery('variable_set',variable_sets[i]);   var_set_vars.queryNoDomain();    
    while(var_set_vars.next()){       
        variables.push(var_set_vars.sys_id+'');    }}

//get choices for all variable records
for(y=0; y < variables.length; y++){    
    var question = new GlideRecord('question');   question.addQuery('sys_update_name','item_option_new_'+variables[y]);   question.queryNoDomain();    while(question.next()){        var choice = new GlideRecord('question_choice');       choice.addQuery('question',question.sys_id+'');        
    choice.queryNoDomain();        
    while(choice.next()){            
        choices.push(choice.sys_id+'');        
    }    
    }
}
outputs.variables = variables;
outputs.variable_sets_m2m = variable_sets_m2m;
outputs.variable_sets = variable_sets;
outputs.choices = choices;






(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {

    // CREATE NEW USER RECORD
    var user = new GlideRecord('sys_user');
    user.addQuery('email', source.admin_email);
    user.query();
    if (user.getRowCount() == 0) {
        user.initialize();
        user.email = source.admin_email;
        user.user_name = source.admin_email;
        user.company = target.sys_id;
        user.first_name = source.admin_first_name;
        user.last_name = source.admin_last_name;
        user.insert();

    } else {
        while (user.next()) {
            user.email = source.admin_email;
			user.user_name = source.admin_email;
            user.company = target.sys_id;
            user.first_name = source.admin_first_name;
            user.last_name = source.admin_last_name;
            user.update();
        }
    }

    
    
    
    
//
// --- FINAL TRANSFORM SCRIPT w/DEBUG ---
//
// CREATE NEW SUBSCRIPTION RECORD
// Determine Service Offering from lookup table 
try{
var pc = source.product_code;
var co_import = new GlideRecord('x_datrp_company_in_company_import_lookup');
co_import.addQuery('product_code', pc);
co_import.query();

// --> DEBUG <---
log.info('Running script', 'J$M');
log.info('Source Product Code: ' + pc, 'J$M');

// Determine if subscription already exists
// if(co_import != '')
if(co_import.next()) {

    // --> DEBUG <---
    log.info('Running 1st IF looop','J$M');
    log.info('Offering Name: ' + co_import.service_offering.name, 'J$M');
    log.info('Offering Value: ' + co_import.getValue('service_offering'),'J$M');

    var sub_co = new GlideRecord('service_subscribe_company');
    sub_co.addQuery('core_company', target.sys_id);
    sub_co.addQuery('service_offering', co_import.getValue('service_offering'));
    sub_co.query();

    // Create Subscription if not found
    if (sub_co.getRowCount() == 0) {

        // --> DEBUG <---
        log.info('Running 2nd IF looop','J$M');

        sub_co.initialize();
        sub_co.core_company = target.sys_id;
        sub_co.service_offering = co_import.getValue('service_offering');
        sub_co.insert();
    }
}
}
catch(e){
    log.error(e.message,'J$M');
}

})(source, map, log, target);





// Email Script - cta_task_link

(function runMailScript(current, template, email, email_action, event) {
  var link = gs.getProperty('glide.servlet.uri') + "nav_to.do?uri=" + gs.generateURL(current.sys_class_name, current.sys_id);
  var type = current.getClassDisplayValue();

  template.print('<h3>');
  template.print(gs.getMessage('You can view all the details of the ' + type.toLowerCase() + ' by following the link below:'));
  template.print('</h3>');
  template.print('<div id="action">');
  //template.print('<center>');
  template.print('<a href="' + link + '" class="button" target="_blank">Take me to the ' + type + '</a>');
  //template.print('</center>');
  template.print('</div>');
  template.print('</div>');
})(current, template, email, email_action, event);





// --- NEW SAVE --->
(function runMailScript(current, template, email, email_action, event) {
    var link = gs.getProperty('glide.servlet.uri') + "nav_to.do?uri=" + gs.generateURL(current.sys_class_name, current.sys_id);
    var type = current.getClassDisplayValue();
	
    template.print('<h3>');
    template.print(gs.getMessage('You can view all the details of the ' + type.toLowerCase() + ' by following the link below:'));
    template.print('</h3>');
    template.print('<div id="action">');
    template.print('<a style="margin-left:100px" href=' + link + ' class="button" target="_blank"> Take me to the ' + type + ' </a>');
    template.print('</div>');
    template.print('</div>');
	
})(current, template, email, email_action, event);




// VARS
var value = false;
var updatedBy = current.sys_updated_by; // Use glide to access user's company here

// If user is part of the Service Desk group set variable "value" to "true"
if (updatedBy.assingment_group == "Service Desk group sys_id") { // Service Desk group sys_id
    value = true;
}

// CALL - Create
createMetric(value);

// FUNCTION
function createMetric(value) {
    var mi = new MetricInstance(definition, current);

    // check if metric exists
    var gr = new GlideRecord('metric_instance');
    gr.addQuery("id", current.sys_id);
    gr.addQuery("definition", definition.sys_id);
    gr.query();
    if (gr.next()) {
        // check if the metric has already failed
        gr.field_value = value;
        gr.calculation_complete = value;
		// ADD LOGIC: If inc closes, metric be complete (true)
        gr.update();

}
// Create new metric instance since none exist
else {
    var newrec = mi.getNewRecord();
    newrec.field_value = value;
    newrec.field = null;
    newrec.calculation_complete = value;
    newrec.insert();
}
}







// ------- NEWEST -------

(function executeRule(current, previous /*null when async*/ ) {

    gs.info('J$ - LOG #1: \'Tag Lvl-1 Service Desk First Responders\' running...');

    // VARS
    var value = false;
    var user_co = gs.getUser().getCompanyID();
    var metric_def = 'ab681dbedb81e4505d78034b8a9619b7'; // Metric: MTRC0010014
	gs.info('J$ - LOG #2: \'Tag Lvl-1 Service Desk First Responders\' user_co: ' + user_co);

    // Set value to true, if current user company is MSP, and is a member of either one of the following Tier 1 Groups:
	// Ascensus L1 ('b7a4e8914f88ff001d96aeee0210c72e')
	// CSP Tech L1 ('48d3641d4f48ff001d96aeee0210c7ab')
	// Data Operations ('4a60beb9db804c90ee4c88805b961914')
	// Service Desk ('d625dccec0a8016700a222a0f7900d06')
    if (user_co == 'c94993314a362312005cfc20c1aa15d2'&& gs.getUser().isMemberOf('b7a4e8914f88ff001d96aeee0210c72e') || gs.getUser().isMemberOf('48d3641d4f48ff001d96aeee0210c7ab') || gs.getUser().isMemberOf('4a60beb9db804c90ee4c88805b961914') || gs.getUser().isMemberOf('d625dccec0a8016700a222a0f7900d06')) 
	{
        value = true;
		gs.info('J$ - LOG #3: Setting \'Tag Lvl-1 Service Desk First Responders\' value to: ' + value);

    }
	
	gs.info('J$ - LOG #4:\'Tag Lvl-1 Service Desk First Responders\' Value: ' + value);


    // CALL - Create new metric
    createMetric(value);

    // FUNCTION
    function createMetric(value) {
        var mi = new MetricInstance(metric_def, current);

        // check if metric exists
        var gr = new GlideRecord('metric_instance');
        gr.addQuery('id', current.sys_id);
        gr.addQuery('definition', metric_def);
        gr.query();
		
		// If metric is pre-existing, change nothing and do nothing
        if (gr.next()) {
			gs.info('J$ - LOG #5: New \'Tag Lvl-1 Service Desk First Responders\' metric already exist');
			return;
        }
		
        // Create new metric instance since none exist
        else if (value == true && current.u_last_comment != '' && previous.u_last_comment == ''|| current.state.changesFrom('New') || current.assigned_to.changesFrom(null)) 
		{
            var newrec = mi.getNewRecord();
            newrec.definition = metric_def;
            newrec.field_value = value;
            newrec.field = null;
            newrec.calculation_complete = value;
            gs.info('J$ - LOG #6: New \'Tag Lvl-1 Service Desk First Responders\' metric created by: ' + current.sys_updated_by);
            newrec.insert();
			
		// If neither, log this:
		}else{
			gs.info('Else statement ran.');
		}
        
    }
})(current, previous);





// THE FINAL DRAFT
(function executeRule(current, previous /*null when async*/ ) {

    gs.info('J$ - LOG #1: \'Tag Lvl-1 Service Desk First Responders\' running...');

    // VARS
    var value = false;
    var user_co = gs.getUser().getCompanyID();
    var metric_def = 'ab681dbedb81e4505d78034b8a9619b7'; // Metric: MTRC0010014
	gs.info('J$ - LOG #2: \'Tag Lvl-1 Service Desk First Responders\' user_co: ' + user_co);

    // Set value to true, if current user company is MSP, and is a member of either one of the following Tier 1 Groups:
	// Ascensus L1 ('b7a4e8914f88ff001d96aeee0210c72e')
	// CSP Tech L1 ('48d3641d4f48ff001d96aeee0210c7ab')
	// Data Operations ('4a60beb9db804c90ee4c88805b961914')
	// Service Desk ('d625dccec0a8016700a222a0f7900d06')
    if (user_co == 'c94993314a362312005cfc20c1aa15d2'&& gs.getUser().isMemberOf('b7a4e8914f88ff001d96aeee0210c72e') || gs.getUser().isMemberOf('48d3641d4f48ff001d96aeee0210c7ab') || gs.getUser().isMemberOf('4a60beb9db804c90ee4c88805b961914') || gs.getUser().isMemberOf('d625dccec0a8016700a222a0f7900d06')) 
	{
        value = true;
		gs.info('J$ - LOG #3: Setting \'Tag Lvl-1 Service Desk First Responders\' value to: ' + value);
        
    }
    
    // If updated by matches caller, exit function
    if (sys_updated_by == current.caller_id) {
        return;
    }
    else if (sys_updated_by != current.caller_id && state != 1 && assigned_to != '') 
    {
        // CALL
        createMetric(value);
    }
    else
    {
        gs.info('J$ - LOG #4: \'Tag Lvl-1 Service Desk First Responders\' - neither ran.');
    }
    
    // FUNCTION createMetric START
    function createMetric(value) {
        var mi = new MetricInstance(metric_def, current);
        // check if metric exists
        var gr = new GlideRecord('metric_instance');
        gr.addQuery('id', current.sys_id);
        gr.addQuery('definition', metric_def);
        gr.query();
		
		// If metric is pre-existing, change nothing and do nothing
        if (gr.next()) {
			gs.info('J$ - LOG #5: New \'Tag Lvl-1 Service Desk First Responders\' metric already exist');
			return;
        }
		
        // Create new metric instance since none exist
        else {
            // INSERT
            var newrec = mi.getNewRecord();
            newrec.definition = metric_def;
            newrec.field_value = value;
            newrec.field = null;
            newrec.calculation_complete = value;
            gs.info('J$ - LOG #6: New \'Tag Lvl-1 Service Desk First Responders\' metric created by: ' + current.sys_updated_by);
            newrec.insert();
        }
    }
})(current, previous);





    // Get current user
    var currentUser = g_form.getUserID();

    // Pull user's record
    var UserGR = new GlideRecord('sys_user');
    UserGR.addQuery('sys_id', currentUser);
    UserGR.query();


    // Auto-fill fields with values
    if (UserGR.next()) {
        var userEmail = UserGr.getValue('email');
        g_form.setValue('call_center_email', userEmail);
    }

