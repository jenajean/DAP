$(function() {

//VVV----- Code for dynamic page content replacement -----VVV (thanks to Jesse Shawl and CSS Tricks for the example code)
	if(Modernizr.history){
	
	    //setup variables for dynamic content replacement
	    var newHash      = "",
	        $dynamicContentWrap = $("#dynamic_content_wrap"),
	        $pageWrap    = $("#page-wrap"), // <-- figure out how to handle this with our page structure ***
	        baseHeight   = 0,
	        $el;
	        
	    // calculate wrapper heights to prevent jumping when loading new content    
	    $pageWrap.height($pageWrap.height());
	    baseHeight = $pageWrap.height() - $mainContent.height();
	    
	    
	    //hijack nav link click function to run dynamic replacement function
	    $("nav").delegate("a", "click", function() {
	        _link = $(this).attr("href");
	        history.pushState(null, null, _link);
	        loadContent(_link);
	        return false;
	    });
	
	    
	    //function to dynamically replace page content
	    function loadContent(href){
	        $dynamicContentWrap
	                .find("#dynamic-content")
	                .fadeOut(200, function() { // fade out the content of the current page
	                    $dynamicContentWrap.hide().load(href + " #dynamic-content", function() { // load the contents of whatever href is
	                        $dynamicContentWrap.fadeIn(200, function() {
	                            $pageWrap.animate({
	                                height: baseHeight + $dynamicContentWrap.height() + "px"
	                            });
	                        });
	                        $("nav a").removeClass("current");
	                        console.log(href);
	                        $("nav a[href$="+href+"]").addClass("current");
	                    });
	                });
	    }
	    
	    $(window).bind('popstate', function(){
	       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
	       loadContent(_link);
	    });
	
	} // otherwise, history is not supported, so nothing fancy here.
	//end of if(Modernizr.history..)

//^^^----- Code for dynamic page content replacement -----^^^




    
}); //end $(function(){})