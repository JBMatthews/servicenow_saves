// ServiceNow - Set Delivery Date Based On Time
//
// Explaination: The ship_date field is set provided the time. 
// If after 2pm EST set date to tomorrow, 
// else if before 2pm EST set date to today.

//
// SCRIPT INCLUDE - x_datrp_sco_catalo.SCOUtil.autoSetShipDate
//
autoSetShipDate: function() {
    gs.info("J$- START - autoSetShipDate SI triggered"); // DEBUG
    
    // Today
    var gd = new GlideDate();
    var today = gd.getByFormat('yyyy-MM-dd');

    // Current Time
    var ctime = new GlideTime();
    var ct = ctime.getDisplayValue();

    // Current Date & Time
    var now = new GlideDateTime(today + ' ' + ct);
    gs.info("J$- 1 - Now: " + now); // DEBUG

    // Tomorrow
    var tmrrw = new GlideDate();
    tmrrw.addDaysUTC(1);

    // 2pm/14:00 
    var twopm = new GlideTime();
    twopm.setValue('14:00:00');
    twopm = twopm.getByFormat("HH:mm:ss");
    var delivery_cutoff = new GlideDateTime(today + ' ' + twopm);
    gs.info("J$- 2 - Delivery Cutoff: " + delivery_cutoff); // DEBUG

    // Day of the Week
    var gdt = new GlideDateTime();
    var dotw = gdt.getDayOfWeekLocalTime();

    // Logic - If it's Friday after the delivery cutoff cutoff ship it Monday
    if (dotw == 5 && now.after(delivery_cutoff)) {
        gdt.addDaysUTC(2);
        var monday = gdt.getDate();
        return monday;
        gs.info("J$- 3 - Friday after 2, set to: " + monday); // DEBUG
    
    // Logic - Else if it's before the delivery cutoff ship it today
    } else if (now.before(delivery_cutoff)) {
        return today;
        gs.info("J$- 4 - M-F before 2, set to: " + today); // DEBUG

    // Logic - Else ship it tomorrow	
    } else {
        return tmrrw;
        gs.info("J$- 5 - M-F after 2, set to: " + tmrrw); // DEBUG
    }

}

//
// CLIENT SCRIPT - Auto set ship_date
//
function onLoad() {
    var ga = new GlideAjax('SCOUtil');
    ga.addParam('sysparm_name', 'autoSetShipDate');
    ga.getXMLAnswer(getResponse);

    function getResponse(response) {
        g_form.setValue('ship_date', response);
		if (response != '') {
			g_form.showFieldMsg('ship_date','Requests made after 2pm EST ship the following day.','info');
		}
    }
   
}

//
//
// Resources
// https://docs.servicenow.com/bundle/kingston-application-development/page/app-store/dev_portal/API_reference/GlideDateTime/concept/c_GlideDateTimeAPI.html#ariaid-title19
// https://community.servicenow.com/community?id=community_article&sys_id=0b231b4bdb9c7308fff8a345ca961953
//
//
//
//
// BACKGROUND SCRIPT
//
// Today
var gd = new GlideDate();
var today = gd.getByFormat('yyyy-MM-dd');
//
// Current Time
var ctime = new GlideTime(); 
var ct = ctime.getDisplayValue();
//
// Current Date & Time
var now = new GlideDateTime(today + ' ' + ct);
//
// Tomorrow
var tmrrw = new GlideDate(); 
tmrrw.addDaysUTC(1);
//
// 2pm/14:00 
var twopm = new GlideTime(); 
twopm.setValue('02:00:00');
twopm = twopm.getByFormat("HH:mm:ss");
var delivery_cutoff = new GlideDateTime(today + ' ' + twopm);
//
// Day of the Week
var gdt = new GlideDateTime();
var dtw = gdt.getDayOfWeekLocalTime();
//
// Logic
if(now.before(delivery_cutoff)) { 

    if(dtw == 5 && now.after(delivery_cutoff)){
        var date = now.addDaysUTC(1);
        gs.info(date);
        
        gdt.addDaysUTC(1);
        gs.info(gdt.getDate());
    }

}
//
// Logs
gs.info(now);
gs.info(delivery_cutoff);
gs.info(now.before(delivery_cutoff));