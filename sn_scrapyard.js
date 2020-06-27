//
// SCRAP YARD
//

// BACKGROUND SCRIPTS ----------------------------------
// ---- MY CODE FROM EARLIER -- WORKING --
// Array 1 - Pull sys_ids for Company Subscriptions
var soUtil = new ServiceOfferingUtil();
var subscriptions = soUtil.userAccessPerCompanySubscription();
subs = subscriptions.toString().split(',');


// Array 2 - Pull sys_ids of SC Items
var offs = [];
var gr = new GlideRecord('sc_cat_item');
gr.addQuery('active',true);
gr.query();
while(gr.next()){
    offs.push(gr.u_service_offerings.getValue('sys_id'));
} 
gs.print(offs)


// Calc - Find Intersect
var arrayUtil = new ArrayUtil();
gs.print(arrayUtil.intersect(subs, offs)); 

// ---- EOL ----



// --- DOUG AND I CODE --- NEWEST

// Array 1 - Pull sys_ids for Company Subscriptions
var soUtil = new ServiceOfferingUtil();
var subscriptions = soUtil.userAccessPerCompanySubscription();
//subs = subscriptions.toString().split(',');
gs.print(subscriptions);

// Array 2 - Pull sys_ids of SC Items
var offs = [];
var gr = new GlideRecord('sc_cat_item');
gr.addQuery('active',true);
gr.query();
while(gr.next()){
    var offerings = gr.u_service_offerings;
    offerings = offerings.toString().split(',');
    if(!!offerings){
          offs.push(gr.u_service_offerings.getValue('sys_id'));
    }

} 
gs.print(offs)


// Calc - Find Intersect
var arrayUtil = new ArrayUtil();
gs.print(arrayUtil.intersect(subscriptions, offs)); 
// ---- EOL ---
// END BACKGROUND SCRIPTS ---------------------------------------


// BUSINESS RULE - Suppress Item Visibility by Srv Offering -----------------------
// --- JS-ORIGINAL ---

executeRule(current, previous /*null when async*/) {

// IF USER IS NOT ADMIN
if(!gs.hasRole('admin')){
	
    // ARRAY DECLARATION
	var ids = [];
    
    // ARRAY #1
	var arrayUtil = new ArrayUtil();
	var soUtil = new ServiceOfferingUtil();
	var subscriptions = soUtil.userAccessPerCompanySubscription();
	var subscriptions = subscriptions.toString().split(',');
	// --- debug ---
    gs.log('Sub: ' + subscriptions,'$$$JS');
	

    // ARRAY #2
    var gr = new GlideRecord('sc_cat_item');
gr.addEncodedQuery('type!=bundle^sys_class_name!=sc_cat_item_guide^type!=package^sys_class_name!=sc_cat_item_content');
		gr.addQuery('active',true);
		gr.query();
        // --- 1 Loop - Primary
		while(gr.next()){
			var offerings = gr.u_service_offerings;
			offings = offerings.toString().split(',');
			
            // --- 2 Loop
			if(!!offerings){
				gs.log('offerings: ' + offerings,'$$$JS');
			}
            // -Intersect-
			var ans = arrayUtil.intersect(subscriptions,offerings);
            
            // --- 3 Loop
			if(!!ans){
				gs.log('ans: ' + ans,'$$$JS');
			}
            
            // --- 4 Loop
			if(ans.length > 1 || offerings == ''){
				ids.push(gr.sys_id.toString());
			}
			
			
		}
	//gs.log('ids: ' + ids,'$$$JS');
	//gs.log('subscriptions: ' + subscriptions,'$$$JS');
	
	current.addQuery('sys_id','IN',ids);
	//gs.log(current.getEncodedQuery(),'$$$JS');
}
	
})(current, previous);
// ---------------------------------------------------------------------


// --- JM-ORIGINAL ---
// IF USER IS NOT ADMIN
if(!gs.hasRole('admin')){
	
    // ARRAY DECLARATION
	var ids = [];
    var offs = [];

    // Array 1 - Pull sys_ids for Company Subscriptions
    var soUtil = new ServiceOfferingUtil();
    var subscriptions = soUtil.userAccessPerCompanySubscription();
    var subs = subscriptions.toString().split(',');
	// --- debug ---
    gs.log('Sub: ' + subscriptions,'$$$JM');

    // Array 2 - Pull sys_ids of SC Items
    var arrayUtil = new ArrayUtil();
    var gr = new GlideRecord('sc_cat_item');
    gr.addEncodedQuery('type!=bundle^sys_class_name!=sc_cat_item_guide^type!=package^sys_class_name!=sc_cat_item_content');
    gr.addQuery('active',true);
    gr.query();
    
    // --- 1 Loop - Primary
    while(gr.next()){
        offs.push(gr.u_service_offerings.getValue('sys_id'));

        // --- 2 Loop
        if(!!offerings){
            gs.log('offerings: ' + offerings,'$$$JM');
        }
        // - Calc-Intersect-
        var ans = arrayUtil.intersect(subs,offs);

        // --- 3 Loop
        if(!!ans){
            gs.log('ans: ' + ans,'$$$JM');
        }

        // --- 4 Loop
        if(ans.length > 1 || offerings == ''){
            ids.push(gr.sys_id.toString());
        }
    } 
}
    
// -----------------------------------------------------------    
    

// --- DOUGS-CODE ---
(function executeRule(current, previous /*null when async*/) {
if(!gs.hasRole('admin')){
	// Add your code here
	var ids = [];
	// Array 1
	var arrayUtil = new ArrayUtil();
	var soUtil = new ServiceOfferingUtil();
	var subscriptions = soUtil.userAccessPerCompanySubscription();
	subscriptions = subscriptions.toString().split(',');
	gs.log('Sub: ' + subscriptions,'$$$JS');
	
	// Array 2
	var gr = new GlideRecord('sc_cat_item');
gr.addEncodedQuery('type!=bundle^sys_class_name!=sc_cat_item_guide^type!=package^sys_class_name!=sc_cat_item_content');
		gr.addQuery('active',true);
		gr.query();
		while(gr.next()){
			var offs = [];
			var offerings = gr.u_service_offerings;
			offerings = offerings.toString().split(',');
			
			if(!!offerings){
				offs.push(gr.u_service_offerings.getValue('sys_id'));
				gs.log('offerings: ' + offerings,'$$$JS');
			}
			// Intersect
			var ans = arrayUtil.intersect(subscriptions,offs);
			
			// The answer Array - Array 3
			if(!!ans){
				gs.log('ans: ' + ans,'$$$JS');
			}
			if(ans.length > 1 || offerings == ''){
				ids.push(gr.sys_id.toString());
			}
			
			
		}
	//gs.log('ids: ' + ids,'$$$JS');
	//gs.log('subscriptions: ' + subscriptions,'$$$JS');
	
	current.addQuery('sys_id','IN',ids);
	//gs.log(current.getEncodedQuery(),'$$$JS');
}
	
})(current, previous);


// --- Fri, June 12 --- Save ---
(function executeRule(current, previous /*null when async*/) {
// --- JM-ORIGINAL ---
// IF USER IS NOT ADMIN
//if(!gs.hasRole('admin')){
	
    // ARRAY DECLARATION
	var ids = [];
    var offs = [];

    // ARRAY 1 - subs - Pull sys_ids for Company Subscriptions
    var soUtil = new ServiceOfferingUtil();
    var subscriptions = soUtil.userAccessPerCompanySubscription();
    var subs = subscriptions.toString().split(',');
	// --- debug ---
    gs.log('User: ' + gs.getUser().name,'$$$JM');
	gs.log('Sub: ' + subs,'$$$JM');

    // ARRAY 2 - offs - Pull sys_ids of SC Items
    var arrayUtil = new ArrayUtil();
    var gr = new GlideRecord('sc_cat_item');
//gr.addEncodedQuery('type!=bundle^sys_class_name!=sc_cat_item_guide^type!=package^sys_class_name!=sc_cat_item_content');
    gr.addQuery('active',true);
    gr.query();
    // --- 1 Loop - Primary
    while(gr.next()){
        offs.push(gr.u_service_offerings.getValue('sys_id'));
		// -Calc-Intersect-
        var ans = arrayUtil.intersect(subs,offs);
	}
	gs.log("Offerings: " + offs, '$$$JM');
	gs.log("Answer: " + ans, '$$$JM');
	
		// DEBUG LOOPS ---
		// --- 2 Loop
//         if(!offerings){
//             gs.log('first log offerings: ' + offs,'$$$JM');
//         } else {
// 			gs.log('second log offerings: ' + offs,'$$$JM');
// 		}
//         // --- 3 Loop
//         if(!ans){
//             gs.log('first log answers: ' + ans,'$$$JM');
// 		} else {
// 			gs.log('second log answers: ' + ans,'$$$JM');
// 		}
		
		//ARRAY 3 - Answer collection -
        //--- 4 Loop
//         if(ans.length > 1 || offerings == ''){
//             ids.push(gr.sys_id.toString());
//         }
//     } 
	
    //gs.log('ids: ' + ids,'$$$JM');
	//gs.log('subscriptions: ' + subscriptions,'$$$JS');
	
	current.addQuery('sys_idIN' + ans);
	//gs.log(current.getEncodedQuery(),'$$$JS');
}
	
//}
)(current, previous);
// --- EOL ---
