'use strict';
(function() {
    
    // example usage:
    // webHelper.openUrl("http://www.google.com")

    var app = {
        init: function() {

            // swap to false to show splash screen
            var isDevEnv = true;
            var loadScreenTTL = 4500;
            var loadScreenInterval = 500;

            this.fixBottomMenuItemsForSmallerScreens();
            this.slashScreen(isDevEnv,loadScreenTTL, loadScreenInterval);
		    this.bootstrap();	
            // register routing engine ;)
			//var self = this;
			//document.addEventListener('click', function(){self.routingEngine(event);}, false);
            //self.handleBackButton();
        },
        bootstrap : function(){
            
            var message = new MessageModel();
            var loadViewModel = new UpdateProgress(10, 10.5);
            var viewModel = new ViewModel();
            
            // -- load screen
            this.bindLoader(message, loadViewModel);
    
            // bind the ui
            this.bindApp(viewModel);

        },
        bindLoader:function(message, loadViewModel){
            setInterval(function(){loadViewModel.update(message);}, 400);
            ko.applyBindings(message, document.getElementById("load"));
        },
        bindApp:function(viewModel){
            
            // settings
            //ko.applyBindings(settingsViewModel, document.getElementById("defaults"));
    
            // -- main
           
            ko.applyBindings(viewModel, document.getElementById("main"));
            
            // -- news
            //ko.applyBindings(newsViewModel, document.getElementById("newsRegion"));
            
        },
        slashScreen: function(isDevEnv, loadScreenTTL, loadScreenInterval) {
            // define splash and content -id elements for this functionality
            if(isDevEnv){
                this.showMain();
            }else{
                this.showSplash();
                setTimeout(function(){$('#load').collapse('hide'); 
                    setTimeout(function(){$('#main').show();},loadScreenInterval);}
                    ,loadScreenTTL);    
            }
        },
        showSplash: function(){
            $('#load').collapse('show');
        },
        showMain: function(){
            $('#main').show();
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
        handleBackButton : function(){
            document.addEventListener("backbutton", function(e){
               //if($.mobile.activePage.is('#market')){
                   // exit if home page
                   //e.preventDefault();
                   //navigator.app.exitApp();
               //}
               //else {
                   e.preventDefault();
                   navigator.app.backHistory()
               //}
            }, false);
        },
		routingEngine:function(event){
			// now we just need to handle routes and inject html fragments; )
			var target = event.target;
			//#/path/to/resource.html
			if(!(target === undefined) && target.tagName.toLowerCase() === "a"){
				console.log("TARGET->"+target.href);
			}
		}
    };

    document.addEventListener('deviceready', function() {
       app.init();
    }, false);
})();
