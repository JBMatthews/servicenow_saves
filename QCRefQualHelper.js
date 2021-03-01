var QCRefQualHelper = Class.create();
QCRefQualHelper.prototype = {
	initialize: function() {
	},
	
	/*
	Function getTask User
	Will return a list of all users who have an entry in the task's activity history
 	*/
	
	getTaskUser: function(task){
		// If there is no task, return nothing
		if (!!task){
			// Get distinct list of IDs from sys_history_line for this task
			// Limit to users with a role specified in a system property. Default is itil if property is not specified.
			var rList = gs.getProperty('x_pcm3_fulfiller_q.fqc.can_be_coached','itil');	
			var qry = '';
			if (!!rList){
				qry = '^sys_idINjavascript:getRoledUsers("IN","' + rList + '")';
			}
			var users = [];
			var usr = new GlideAggregate('sys_history_line');
			usr.addAggregate('COUNT','user');
			usr.addQuery('set.id',task);
			usr.query();
			while(usr.next()){
				users.push(usr.getValue('user'));
			}
			if (users.length > 0)
				return 'sys_idIN' + users.join(',') + qry;
		}
		return '';
	},
    
	showAction: function(tbl){
		// Default is incident if property is not supplied.
		var applyTbls = gs.getProperty('x_pcm3_fulfiller_q.coaching_tables','incident');
		if (!!applyTbls){
			applyTbls = applyTbls.split(',');
			return applyTbls.indexOf(tbl) > -1;
		}
		return false;
	},
		
	checkAdditionalCoachList: function() {
		var table = "x_pcm3_fulfiller_q_quality_feedback";
		var usr = gs.getUserID();
		var enc = 'active=true^additional_assignee_listLIKE' + usr;
		var arr = [];
		var gr = new GlideRecord(table);
		gr.addEncodedQuery(enc);
		gr.query();
		while(gr.next()){
			arr.push(gr.getUniqueValue());
		}
		return arr.toString();
	},
	
	// Returns true if the user is a coach or is in the additional coaches field.
	isCoach: function(rec,usr){
		var qry = 'coach=' + usr + '^ORadditional_assignee_listLIKE' + usr;
		return GlideFilter.checkRecord(rec,qry,true);
	},
	
	type: 'QCRefQualHelper'
};