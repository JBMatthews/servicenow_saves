//
// Basic GlideSPScriptable
//


// --- getDisplayValue(String fieldName) ---
// Returns the display value of the specified field (if it exists and has a value) from either the widget's sp_instance or the sp_portal record.

//Server script
(function() {
    data.title = $sp.getDisplayValue("title");
    data.catalog = $sp.getDisplayValue("sc_catalog");
})();

//HTML template
<div>
    <h1>sp_instance.title: {{::data.title}}</h1>
    <h1>sp_portal.sc_catalog: {{::data.catalog}}</h1>
</div>
// --- END ---







// --- getRecord(String table, String sys_id) ---
// If parameters are provided, returns the GlideRecord identified by the provided table and Sys ID. If no parameters are provided, returns the record identified by the current URL.
//Server script 
(function(){ 
var gr = $sp.getRecord(); 
data.tableLabel = gr.getLabel(); 
})(); 

//HTML template 
<div class="panel-heading"> 
<h4 class="panel-title">${{{data.tableLabel}} details}</h4> 
</div>