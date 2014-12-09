function ViewService(){
    var self = this;

    self.fetchData = function(viewModel){
        $.ajax({
            url : "http://stoneagetechnologies.com/eskomloadshed/status/?jsoncallback=?",
            dataType : "jsonp",
            crossDomain : true,
            async: false,
            success : function(data){
                viewModel.setMessageFromStatus(data);
                //viewModel.setMessageFromStatus({"level":0});
                //viewModel.setError();
            },
            error : function(){
                viewModel.setError();
            }
        }); 
    }; 
}
