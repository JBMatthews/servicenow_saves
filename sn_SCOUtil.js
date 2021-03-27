var SCOUtil = Class.create();
SCOUtil.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {


    returnCallCenterUserInfo: function() {
        //gs.info("J$ - returnCallCenterUserInfo triggered");        // DEBUG
        var user = this.getParameter('user_id');
        var gr = new GlideRecord("sys_user");
        gr.get(user);

        // Name, Phone number, Email
        var response = gr.name + "~!~!~!~" + gr.phone + "~!~!~!~" + gr.email;
        //gs.info("J$ - Response Array: " + response.toString());    // DEBUG
        return response;
    },


    returnClientDetails: function() {
        //gs.info("J$ - returnCallCenterUserInfo triggered");        // DEBUG
        var user = this.getParameter('user_id');
        var gr = new GlideRecord("sys_user");
        gr.get(user);

        // Company, Full name, Employee ID, Phone number
        var response = gr.company + "~!~!~!~" + gr.sys_id + "~!~!~!~" + gr.employee_number + "~!~!~!~" + gr.phone;
        //gs.info("J$ - Response Array: " + response.toString());    // DEBUG
        return response;
    },


    autoSetShipDate: function() {
        gs.info("J$- START - autoSetShipDate SI triggered"); // DEBUG
        
		// Today
        var gd = new GlideDate();
        var today = gd.getByFormat('yyyy-MM-dd');

        // Current Time
        var ctime = new GlideTime();
        var ct = ctime.getDisplayValue();

        // Current Date & Time
        var now = new GlideDateTime(today + ' ' + ct);
		gs.info("J$- 1 - Now: " + now); // DEBUG

        // Tomorrow
        var tmrrw = new GlideDate();
        tmrrw.addDaysUTC(1);

        // 2pm/14:00 
        var twopm = new GlideTime();
        twopm.setValue('14:00:00');
        twopm = twopm.getByFormat("HH:mm:ss");
        var delivery_cutoff = new GlideDateTime(today + ' ' + twopm);
		gs.info("J$- 2 - Delivery Cutoff: " + delivery_cutoff); // DEBUG

        // Day of the Week
        var gdt = new GlideDateTime();
        var dotw = gdt.getDayOfWeekLocalTime();

        // Logic - If it's Friday after the delivery cutoff cutoff ship it Monday
        if (dotw == 5 && now.after(delivery_cutoff)) {
            gdt.addDaysUTC(2);
			var monday = gdt.getDate();
			return monday;
			gs.info("J$- 3 - Friday after 2, set to: " + monday); // DEBUG
		
		// Logic - Else if it's before the delivery cutoff ship it today
        } else if (now.before(delivery_cutoff)) {
			return today;
			gs.info("J$- 4 - M-F before 2, set to: " + today); // DEBUG

		// Logic - Else ship it tomorrow	
        } else {
			return tmrrw;
			gs.info("J$- 5 - M-F after 2, set to: " + tmrrw); // DEBUG
        }

    },

    type: 'SCOUtil'
});