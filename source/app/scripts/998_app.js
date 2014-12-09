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
    };

    document.addEventListener('deviceready', function() {
       app.init();
    }, false);
})();
