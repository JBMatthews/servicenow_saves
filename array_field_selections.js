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


// --- g_form
var servOffsArry = []; // New Array to story ServiceOfferings selected
var servoffs = g_form.getValue('u_service_offerings'); // Get objects from field
var str = servoffs.toString(); // toString
var splt = str.split(','); // split
servOffsArry.push(splt);// Push into Array
