'use strict';
(function() {
    
    // example usage:
    // webHelper.openUrl("http://www.google.com")

	var currentStatus = 0;
	
    var app = {
        init: function() {

			//var waitTime = 600000; // 10 minnutes
			var waitTime = 300000; // 5 minutes
            //var waitTime = 10000;
		
            this.fixBottomMenuItemsForSmallerScreens();
            var viewService = new ViewService();
            var viewModel = new ViewModel(viewService);

            this.fetchStatus(viewService, viewModel);
            this.bindApp(viewModel);
			
			this.activateMonitor(viewModel, waitTime);
        },
		activateMonitor: function(viewModel, waitTime){
			// refresh status
			setInterval(function(){viewModel.polledRefresh();}, waitTime);
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
		registerPushNotificationHandler: function(){
			try { 
                	pushNotification = window.plugins.pushNotification;
					$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                	if (device.platform == 'android' || device.platform == 'Android' ||
                        device.platform == 'amazon-fireos' ) {
						pushNotification.register(successHandler, errorHandler, {"senderID":"661780372179","ecb":"onNotification"});		// required!
					}
                }catch(err){ 
					txt="There was an error on this page.\n\n"; 
					txt+="Error description: " + err.message + "\n\n"; 
					alert(txt); 
				} 
            }

            
            // handle GCM notifications for Android
            function onNotification(e) {
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						console.log("regID = " + e.regid);
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							// DO SOMETHING
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else
							$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
							
						$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                        //android only
						$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                        //amazon-fireos only
                        $("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                    break;
                    
                    case 'error':
						$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
			
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
		}
    };

    document.addEventListener('deviceready', function() {
       app.init();
    }, false);
})();
