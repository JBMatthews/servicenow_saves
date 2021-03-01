//
//
//


// Basic onChange Script - If checkbox(recurring) is/isn't click, do something to field (interval_frequency)
// onChange, field: recurring

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
	
var interval_frequency = g_form.getValue('interval_frequency');
//If Recurring == false, Interval is always set to Manual, read only, and hidden
if(newValue == 'false'){
    g_form.setValue('interval_frequency', 'Manual');
    g_form.setDisplay('interval_frequency',false);
    g_form.setReadOnly('interval_frequency',true);
 }
 //If Recurrent == true, inverval is mandatory and shown on form
 else {
    g_form.setDisplay('interval_frequency',true);
    g_form.setReadOnly('interval_frequency',false);
	g_form.setMandatory('interval_frequency', true);
  }
   
}





// setValue API
g_form.setValue('field_name',value);



// To get form section names - place in onLoad Client Script and load form
var sections = g_form.getSectionNames();
alert(sections);



//
// JAVASCRIPT EXECUTOR
//
// To actiate JavaScript Executor - hold( shift + ctrl + alt + J )
//