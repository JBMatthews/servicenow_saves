//
// Basic Glide User Scripts
//

// Returns the current user's company sys_id.
var currentUser = gs.getUser(); 
gs.info(currentUser.getCompanyID());



// Returns the current user's display name.
var currentUser = gs.getUser(); 
gs.info(currentUser.getDisplayName());




// Link: https://docs.servicenow.com/bundle/orlando-application-development/page/app-store/dev_portal/API_reference/GlideUser_global/concept/GUserAPI.html