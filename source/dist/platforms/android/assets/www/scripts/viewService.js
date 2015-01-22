function ViewService(){
    var self = this;

    self.fetchData = function(viewModel, canDisplayMessage){
		var networkStatus = self.isNetworkAvailable();
		
		if(networkStatus){
			$.ajax({
				url : "http://stoneagetechnologies.com/eskomloadshed/status/?jsoncallback=?",
				dataType : "jsonp",
				crossDomain : true,
				async: false,
				timeout: 1500, // in milliseconds
				success : function(data){
					viewModel.setMessageFromStatus(data);
					
					// if i can and it changed, display it ;)
					if(canDisplayMessage && viewModel.didStatusChange()){
						window.plugin.notification.local.add({ message: viewModel.message() });
					}
					//else{
					//	alert("Can Display " + canDisplayMessage + " Status Changed " + viewModel.didStatusChange());
					//}
					
					//viewModel.setMessageFromStatus({"level":3});
					//viewModel.setError();
				},
				error : function(){
					viewModel.setError();
				}
			}); 
		}else{
			viewModel.setError();
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

		return networkState;

	};
}
