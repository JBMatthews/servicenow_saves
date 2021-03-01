//
// ServiceNow UI Actions
//
//
//
// UI AACTION - When clicked, adds 1 to count field
//
// onClick: callBackFunction()
//
//
function callBackFunction() {

    if (g_scratchpad.clicked !== "false") {
        if (g_form.getValue("u_call_back_count") == "0") {
            g_form.setValue("u_call_back_count", 1);
        } else {
            g_form.setValue("u_call_back_count", (parseInt(g_form.getValue("u_call_back_count")) + 1));
        }
    } else {
		g_form.showFieldMsg("u_call_back_count","Increment count by 1 only, before saving.", "error");
    }
	
    g_scratchpad.clicked = "false";
}
//
//
//
// UI MACRO - adds a plus sign button beside the "Call Back Counter" field to increment by 1 when clicked and then not work again until user has saved
//
//
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
	<j:set var="jvar_n" value="getCallContact_${ref}"/>
	<a id="${jvar_n}" onclick="callBackFunction1('${ref}')" title="Call back count incrementor" class="icon ref-button icon-add btn btn-default btn-ref"></a>
	<script>
		function callBackFunction1() {
			if (g_scratchpad.clicked !== "false") {
				if (g_form.getValue("u_call_back_count") == "0") {
					g_form.setValue("u_call_back_count", 1);
				} else {
					g_form.setValue("u_call_back_count", (parseInt(g_form.getValue("u_call_back_count")) + 1));
					var macro = gel("getCallContact_incident.u_call_back_count");
					//macro.style.visibility = 'hidden';
					macro.classList.remove('icon-add');
					macro.classList.add('icon-check');
				}
				} else {
					g_form.showFieldMsg("u_call_back_count","Increment count by 1 only, before saving.", "error");
				}
			g_scratchpad.clicked = "false";
		}
	</script>
</j:jelly>
