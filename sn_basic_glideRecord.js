//
// Baasic Glide Record Statements
//

// --- Return records in a table based on query conditions
var target = new GlideRecord('incident'); 
target.addQuery('priority',1);
target.query(); // Issue the query to the database to get relevant records 
while (target.next()) { 
  // add code here to process the incident record 
}


// --- Query
var rec = new GlideRecord('incident');
rec.query(); 
while(rec.next()) { 
  gs.print(rec.number + ' exists'); }



// --- Update
var rec = new GlideRecord('incident');
rec.addQuery('active',true);
rec.query(); 
while(rec.next()) { 
  rec.active = false;
  gs.print('Active incident ' + rec.number = ' closed');
  rec.update(); }



// --- Insert
var rec = new GlideRecord('incident');
rec.initialize();
rec.short_description = 'Network problem'; 
rec.caller_id.setDisplayValue('Joe Employee'); 
rec.insert();



// --- Delete
var rec = new GlideRecord('incident');
rec.addQuery('active',false);
rec.query(); 
while(rec.next()) { 
  gs.print('Inactive incident ' + rec.number + ' deleted');
  rec.deleteRecord(); }



// --- get(Object name, Object value)
// Returns the specified record in an instantiated GlideRecord object.
var grIncident = new GlideRecord('incident');
var returnValue = grIncident.get('sys_id','99ebb4156fa831005be8883e6b3ee4b9');
gs.info(returnValue); // logs true or false
gs.info(grIncident.number); // logs Incident Number




// --- getDisplayValue()
// Retrieves the display value for the current record.
var gr = new GlideRecord('incident');
gr.get('sys_id','ef43c6d40a0a0b5700c77f9bf387afe3');
gs.info(gr.getDisplayValue());



source_link: "https://docs.servicenow.com/bundle/orlando-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html"