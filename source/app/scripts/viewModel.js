	function ViewModel(viewService){
		var self = this;
		self.viewService = viewService;
		
		self.message = ko.observable("Checking....");
		self.color = ko.observable("alert alert-success");
		
		self.setMessageFromStatus = function(model){

			var status = model.level;

			if(status === 0){
				self.message("No load shedding.");
				self.color("alert alert-success");
			}else if(status === 1){
				self.message("Stage 1 load shedding.");
				self.color("alert alert-info");
			}else if(status === 2){
				self.message("Stage 2 load shedding.");
				self.color("alert alert-warning");
			}else if(status === 3){
				self.message("Stage 3 load shedding.");
				self.color("alert alert-danger");
			}else{
				self.message("Unknown status?!");
				self.color("alert alert-warning");
			}
		};

		self.setError = function(){
			self.message("Please ensure your data is on.");
			self.color("alert alert-danger");
		};

		self.refresh = function(){
			self.message("Checking...");
			self.viewService.fetchData(self);
		};

		self.bugReport = function(){
			closeMenu();
			var link = "http://goo.gl/forms/wrnDilSAOo";
			webHelper.openUrl(link);
		};

		self.showAbout = function(){
			closeMenu();
			alert("This application monitors Eskom's load shedding status.\nIt is developed by StoneAge technologies.");
		};

		// Feedback form ;)
		// http://goo.gl/forms/wrnDilSAOo
	}
		