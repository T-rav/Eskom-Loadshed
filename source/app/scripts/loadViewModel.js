	function MessageModel(){
		var self = this;
		
		self.message = ko.observable("Lighting a candle.");
	}

	function UpdateProgress(initProgress, incAmount){
		var self = this;
		
		self.progress = initProgress;
		self.incAmount = incAmount;
		self.incCount = 0;
		self.messageCount = 0;
		self.messages = ['Lighting some more candles.','Eish.'];
		
		self.update = function(messageModel){
			self.progress = self.progress + self.incAmount;
			self.incCount++;
			$(".progress-bar").css( "width", self.progress + "%" );
			if((self.incCount % 4) == 0 && self.messageCount < self.messages.length){
				// pick a new message
				messageModel.message(self.messages[self.messageCount]);
				self.messageCount++;
			}
		};
	}
		