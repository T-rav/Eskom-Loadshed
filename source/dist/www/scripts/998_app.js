'use strict';
(function() {

    var app = {
        init: function() {

            this.fixBottomMenuItemsForSmallerScreens();
            var viewService = new ViewService();
            var viewModel = new ViewModel(viewService);

            this.fetchStatus(viewService, viewModel);
            this.bindApp(viewModel);
			this.addSleepHandler();
			
			this.initGCM();
        },
		addSleepHandler:function(){
			 // add additional event handlers here ;)
		   document.addEventListener("resume", function() {
				app.refeshFromSleep();
			},false);
		},
		refeshFromSleep:function(){
			viewModel.polledRefresh();
		},
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
		initGCM:function()
		{
			// OLD
			//var GOOGLE_PROJECT_ID = "574090421044";
			//var PUSHAPPS_APP_TOKEN = "171dbd2a-7ae1-47b0-a7cd-a5c001d958a1";
			
			var GOOGLE_PROJECT_ID = "946436675908";
			var PUSHAPPS_APP_TOKEN = "ae5d7ad2-6e9f-4fde-b8a8-689605f11636";
		
			PushNotification.registerDevice(GOOGLE_PROJECT_ID, PUSHAPPS_APP_TOKEN, function (pushToken) {
												console.log('registerDevice, push token' + pushToken);
											}, function (error) {
												alert(error);
											});
		
			document.removeEventListener('pushapps.message-received');
			document.addEventListener('pushapps.message-received', function(event) {
										  var notification = event.notification;
										  
										  var devicePlatform = device.platform;
										  if (devicePlatform === "iOS") {
											console.log("message-received, Message: " + notification.aps.alert + " , D: " + notification.D);
										  } else {
											console.log("message-received, Message: " + notification.Message + " , Title: " + notification.Title + " , D: " + notification.D);
										  }
									  });
		
		}
    };

    document.addEventListener('deviceready', function() {
	   app.init();
    }, false);
	
})();


