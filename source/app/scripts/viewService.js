function ViewService(){
    var self = this;

    self.fetchData = function(viewModel, canDisplayMessage){
		if(self.isNetworkAvailable()){
			$.ajax({
				url : "http://stoneagetechnologies.com/eskomloadshed/status2/?jsoncallback=?",
				dataType : "jsonp",
				crossDomain : true,
				async: false,
				timeout: 1500, // in milliseconds
				success : function(data){
					viewModel.setMessageFromStatus(data);
					
					// if i can and it changed, display it ;)
					if(canDisplayMessage && viewModel.didStatusChange()){
						window.plugin.notification.local.add({ message: viewModel.message() });
					}else{
						alert("Can Display " + canDisplayMessage + " Status Changed " + viewModel.didStatusChange());
					}
					
					//viewModel.setMessageFromStatus({"level":3});
					//viewModel.setError();
				},
				error : function(){
					viewModel.setError();
				}
			}); 
		}
    };
	
	self.isNetworkAvailable = function(){
		var state = self.networkState();
		
		if(state === "none" || state === "unknown"){
			return false;
		}
		
		return true;
	};
	
	self.networkState = function(){
		var networkState = navigator.connection.type;

		/*
		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
		*/

		return networkState;

	};
}
