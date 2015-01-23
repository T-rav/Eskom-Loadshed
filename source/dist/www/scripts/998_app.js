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
			//this.deinitGCM();
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
			var GOOGLE_PROJECT_ID = "574090421044";
			var PUSHAPPS_APP_TOKEN = "171dbd2a-7ae1-47b0-a7cd-a5c001d958a1";
			var push = new PushNotification();
			
			try{ 
				push.registerDevice(GOOGLE_PROJECT_ID, PUSHAPPS_APP_TOKEN, function (pushToken) {
											alert('registerDevice, push token' + pushToken);
										}, function (error) {
											alert(error);
										});
		
				document.removeEventListener('pushapps.message-received');
				document.addEventListener('pushapps.message-received', function(event) { 
											  var notification = event.notification;
											  
											  var devicePlatform = device.platform;
											  if (devicePlatform === "iOS") {
												alert("message-received, Message: " + notification.aps.alert + " , D: " + notification.D);
											  } else {
												alert("message-received, Message: " + notification.Message + " , Title: " + notification.Title + " , D: " + notification.D);
											  }
										  });
			}catch(e){
				alert(e);
			}
    
		},
		deinitGCM:function(){
			document.addEventListener("backbutton", function(e){
				document.removeEventListener('pushapps.message-received');
				PushNotification.unRegisterDevice(function () {
													alert("Your device was unregistered from PushApps");
												  }, function () {
													console.log("error");
													alert("Error unregistering your device");
												  });
			//e.preventDefault();
			//navigator.app.exitApp();
			}, false);
		}
    };

    document.addEventListener('deviceready', function() {
	   app.init();
    }, false);
	
})();


