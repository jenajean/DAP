$(function() {



//switch out all hrefs for "#"
$('.main-nav a').each(function(){
	$cur_link = $(this);
	var href = $cur_link.attr('href');
	console.log("href: " + href);//test code
	$cur_link.attr('rel', href);
	console.log("rel: " + $cur_link.attr('rel'));//test code
	$cur_link.attr('href', '#');
	console.log("final href: " + $cur_link.attr('href'));//test code
	console.log("Links are sanitized");
});



//VVV----- Code for dynamic page content replacement -----VVV (thanks to Jesse Shawl and CSS Tricks for the example code)
	if(Modernizr.history){
	
		//run link sanitizer to prevent actual navigation off the page
		
		
	    //setup variables for dynamic content replacement
	    var newHash      = "",
	        $dynamicContentWrap = $("#dynamic_content_wrap"),
	        $pageWrap    = $("body"), 
	        baseHeight   = 0,
	        $el;
	        
	        var $subNav = $("#sub-nav-wrap");//for sub-nav replacement
	        
	        
	    // calculate wrapper heights to prevent jumping when loading new content    
	    $pageWrap.height($pageWrap.height());
	    baseHeight = $pageWrap.height() - $dynamicContentWrap.height();
	    console.log("baseheight: " + baseHeight);
	    
	    
	    
	    //when a main navigation link is clicked, run the loadContent function
	    $('.main-nav a').click(function() {
	        var _link = $(this).attr("rel");
	        var _link2 = _link;
	        console.log("LINK: "+_link);
	        console.log("LINK2: "+_link2);
	        loadContent(_link);
	        loadSubNav(_link2);
	        history.pushState(null, null, _link);
	        return false;
	    });
	    
	    
  
	    //function to dynamically replace page content
	    function loadContent(href){
	       	console.log("argument: "+	href);//test code
	        //replace the dynamic content section of the page
	        $dynamicContentWrap
	                .find("#dynamic-content")
	                .fadeOut(200, function() { // fade out the content of the current page
	                    $dynamicContentWrap.hide().load(href + " #dynamic-content", function() { // load the contents of whatever href is
	                        $dynamicContentWrap.fadeIn(200, function() {
	                            $pageWrap.animate({
	                                height: baseHeight + $dynamicContentWrap.height() + "px"
	                            });//end animate
	                            
	                        });//end fadeIn
	                        
//**temporarily disable class re-assignment until final classes are decided**
//							$("nav a").removeClass("current");
// 	                        console.log(href);
// 	                        $("nav a[href$="+href+"]").addClass("current");

	                    });//end load
	                    
	                });//end fadeOut
	                
	    }//end loadContent definition
	    
	    //function to dynamically replace sub-nav content
	    function loadSubNav(href){
	    	console.log("argument: "+ href);//test code
	    	
	    	$subNav.find(".sub-nav").fadeOut(100, function(){
	    		$subNav.hide().load(href + " .sub-nav", function(){
	    			$subNav.fadeIn(100, function(){
	    				//nothing special here for the time being
	    			});
	    		});//end load f(x)
	    	});//end fadeOut f(x)
	    	
	    	}//end loadSubNav definition
	    
	    
	    
//**temporarily disable pop-state stuff**
//		   $(window).bind('popstate', function(){
// 	       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
// 	       loadContent(_link);
//	    });
	
	
	
	
	} // otherwise, history is not supported, so nothing fancy here.
	//end of if(Modernizr.history..)

//^^^----- Code for dynamic page content replacement -----^^^




    
}); //end $(function(){})