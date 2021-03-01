// Field
// Added field to the Incident table (Call BackCount)

// Macro UI
// Put a (+) beside Call Back field, which increments count by one and changes into a check once clicked. Then, if users click it again, it doesn't add to the count, just gives an error meessage below field.
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
	<j:set var="jvar_n" value="getCallContact_${ref}"/>
	<a id="${jvar_n}" onclick="callBackIncrementFunction()" title="Call back count incrementor" class="icon ref-button icon-add btn btn-default btn-ref"></a>
	<script>
		function callBackIncrementFunction() {
			if (g_scratchpad.clicked !== "false") {
				if (g_form.getValue("u_call_back_count") == "0") {
					g_form.setValue("u_call_back_count", 1);
				} 
				else {
					g_form.setValue("u_call_back_count", (parseInt(g_form.getValue("u_call_back_count")) + 1));
				}
				var macro = gel("${jvar_n}"); //References the set id of the macro button for DOM manipulation
				macro.classList.remove('icon-add');
				macro.classList.add('icon-check');
				g_form.setValue('work_notes',"Chase call received from Customer"); //Sets the work note client side so agent can manually save
			} 
			else {
				g_form.showFieldMsg("u_call_back_count","Increment count by 1 only, before saving.", "error");
			}
			g_scratchpad.clicked = "false";
		}
	</script>
</j:jelly>
