//
// Return users to field selection that are apart of specified group
//
getUsers: function() {
var arrUsers  = [];
var gr = new GlideRecord('sys_user_grmember');
gr.addEncodedQuery('group=2421020b1b059c505b34c99f1d4bcbba');
gr.query();
while (gr.next()) {
    arrUsers.push(gr.user.toString());
}			
return 'sys_idIN' + arrUsers;