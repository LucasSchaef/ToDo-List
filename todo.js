var TODO=function(id,data,settings) {
	this.id = id;
	this.data = data;
	var newSettings = settings;
	var tasks_num = this.data.length+1;
	
	var settings = {
		warning_time_left: 1000*60*60*24*14,
		danger_time_left: 0,
		default_style: "progress-bar-info",
		warning_style: "progress-bar-warning",
		danger_style: "progress-bar-danger",
		show_text: false
	};
	
	var now = new Date(Date.now());

	this.setup = function() {
		this.Settings();
		$('#'+this.id).html(this.createHTML());	
	}
	
	this.Settings = function() {
		for(var key in newSettings) {
			if(key in settings) {
				settings[key] = newSettings[key];
			}
		}
	}
	
	this.createHTML = function() {
		var html = "";
		this.data.forEach(function (v, i) {
			html += '<tr>';
			html += '<td>'+(i+1)+'</td>';
			html += '<td><strong>'+v.name+'</strong></td>';
			html += '<td>'+v.desc+'</td>';
			html += '<td>'+v.start.toLocaleDateString()+'</td>';
			html += '<td>'+v.end.toLocaleDateString()+'</td>';
			html += '<td style="width:50%">';
			html += createProgressBar(v);
			html += '</td>';
			html += '</tr>';
		});
		return html;
	}
	
	this.addTask = function(task) {
		var html = '<tr>';
		html += '<td>'+(tasks_num)+'</td>';
		html += '<td><strong>'+task.name+'</strong></td>';
		html += '<td>'+task.desc+'</td>';
		html += '<td>'+task.start+'</td>';
		html += '<td>'+task.end+'</td>';
		html += '<td style="width:50%">';
		html += createProgressBar(task);
		html += '</td>';
		html += '</tr>';
		
		$("#"+this.id).append(html);
	}
	
	function createProgressBar(task) {
		var style = settings.default_style;
		
		if((task.end - now) <= settings.warning_time_left) {
			style = settings.warning_style;
		} else if((task.end - now) <= settings.danger_time_left) {
			style = settings.danger_style;
		}
		
		return	'<div class="progress">'+
					'<div '+
					'class="progress-bar '+style+'" '+ 
					'role="progressbar" '+
					'aria-valuenow="'+task.status+'" '+
					'aria-valuemin="0" '+
					'aria-valuemax="100" '+
					'style="width:'+task.status+'%">'+
					(settings.show_text ? task.status+"%" : "")+
					'</div></div>';
	}
	

}