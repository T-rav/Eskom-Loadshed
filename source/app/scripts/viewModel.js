	function ViewModel(){
		var self = this;
	
		self.messageStatus = ko.observable(0);
		self.message = ko.observable("Checking....");

		self.isLvl0 =  ko.computed(function () {
	        return self.messageStatus === 0;
	    }, self);

	    self.isLvl1 =  ko.computed(function () {
	        return self.messageStatus === 1;
	    }, self);

		self.setMessageFromStatus = function(model){

			var status = model.level;

			if(status === 0){
				self.message("No load shedding.");
				self.messageStatus(0);
			}else if(status === 1){
				self.message("Stage 1 load shedding.");
				self.messageStatus(1);
			}else if(status === 2){
				self.message("Stage 2 load shedding.");
				self.messageStatus(2);
			}else if(status === 3){
				self.message("Stage 3 load shedding.");
				self.messageStatus(4);
			}else{
				self.message("Unknown status?!");
				self.messageStatus(5);
			}
		};

		self.setError = function(){
			self.message("Ensure your data is on.");
			self.messageStatus(5);
		};

	}
		