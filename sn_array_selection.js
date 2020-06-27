//
//
//

// --- Glide Record
var arrUsers = [];
var gr = new GlideRecord('service_subscribe_company'); //Service Offerings selected
gr.query(); // Query
while (gr.next()) { // Cycle through and push into Array "arrUsers"
    arrUsers.push(gr.user.toString());
}	
gs.print('sys_idIN' + arrUsers);

// --- Select and print
var offs = [];
var gr = new GlideRecord('sc_cat_item');
gr.addQuery('active',true);
gr.query();
while(gr.next()){
    offs.push(gr.getValue('sys_id'));
}    
for(var a=0; a< offs.length; a++){
    gs.print(offs[a]);
}


//
// --- Glide Form
var servOffsArry = []; // New Array to story ServiceOfferings selected
var servoffs = g_form.getValue('u_service_offerings'); // Get objects from field
var str = servoffs.toString(); // toString
var splt = str.split(','); // split
servOffsArry.push(splt);// Push into Array
