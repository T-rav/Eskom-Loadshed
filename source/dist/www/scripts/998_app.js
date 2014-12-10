'use strict';
(function() {
    
    // example usage:
    // webHelper.openUrl("http://www.google.com")

    var app = {
        init: function() {

            this.fixBottomMenuItemsForSmallerScreens();
            var viewService = new ViewService();
            var viewModel = new ViewModel(viewService);

            this.fetchStatus(viewService, viewModel);
            this.bindApp(viewModel);
        },
        fetchStatus:function(viewService, viewModel){
            viewService.fetchData(viewModel);
        },
        bindApp:function(viewModel){
            
            // -- main
            ko.applyBindings(viewModel, document.getElementById("main"));
            
			// https://github.com/katzer/cordova-plugin-local-notifications/#schedule-local-notifications
			// playing around with notifications again ;)
			/*
			try{
				window.plugin.notification.local.add({ message: 'Great app!' });
			}catch(e){
				alert(e);
			}*/
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
        }
		/*
		registerPushNotificationHandler: function(){
			try{
				var pushNotification window.plugins.pushNotification; 
				pushNotification.register(
					function(result){
						window.plugin.notification.local.add({ message: 'Great app! '+result});
					},
					function(error){
						alert('error='+error);
					},
					{
						"senderID":"wise-program-789",
						"ecb":"onNotification"
					}
				);
			}catch(e){
				alert(e);
			}
		}*/
    };

    document.addEventListener('deviceready', function() {
       app.init();
    }, false);
})();
