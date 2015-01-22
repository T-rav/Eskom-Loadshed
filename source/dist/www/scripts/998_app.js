'use strict';
(function() {
    
    // example usage:
    // webHelper.openUrl("http://www.google.com")

	var currentStatus = 0;
	
    var app = {
        init: function() {

			//var waitTime = 600000; // 10 minnutes
			//var waitTime = 300000; // 5 minutes
            //var waitTime = 10000;
		
            this.fixBottomMenuItemsForSmallerScreens();
            var viewService = new ViewService();
            var viewModel = new ViewModel(viewService);

            this.fetchStatus(viewService, viewModel);
            this.bindApp(viewModel);
			this.initPushwoosh();
			
			//this.activateMonitor(viewModel, waitTime);
        },
		//activateMonitor: function(viewModel, waitTime){
			// refresh status
		//	setInterval(function(){viewModel.polledRefresh();}, waitTime);
		//},
        fetchStatus:function(viewService, viewModel){
            viewService.fetchData(viewModel, false);
        },
        bindApp:function(viewModel){
            
            // -- main
            ko.applyBindings(viewModel, document.getElementById("main"));
            ko.applyBindings(viewModel, document.getElementById("aboutApp"));
        },
        fixBottomMenuItemsForSmallerScreens: function() {
            // if you have a ul.bottom, this helps to place it on smaller screens
            var bottomList = $("ul.bottom");
            if (bottomList.length === 0) {
                return;
            }
            var bottomListTop = bottomList.position().top;
            var lastItem = $("ul.top li:last-child()");
            var lastItemBottom = lastItem.position().top + lastItem.height();
            if (bottomListTop <= lastItemBottom) {
                bottomList.css("position", "relative");
            }
        },
		initPushwoosh:function()
		{
			var pushNotification = window.plugins.pushNotification;
		 
			//set push notifications handler
			document.addEventListener('push-notification', function(event) {
				var title = event.notification.title;
				var userData = event.notification.userdata;
				
				// TODO : Display title in local notification ;)
				
				if(typeof(userData) != "undefined") {
					console.warn('user data: ' + JSON.stringify(userData));
				}
											 
				alert(title);
			});
		 
			//initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
			pushNotification.onDeviceReady({ projectid: "574090421044", appid : "3C3CE-832D1" });
		 
			//register for pushes
			pushNotification.registerDevice(
				function(status) {
					var pushToken = status;
					console.warn('push token: ' + pushToken);
				},
				function(status) {
					console.warn(JSON.stringify(['failed to register ', status]));
				}
			);
		}
    };

    document.addEventListener('deviceready', function() {
       app.init();
    }, false);
})();
