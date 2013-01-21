$(function() {



	//function to switch out all hrefs in the specified container with "#"
	function sanitizeLinks(container){
	$container = $(container);
	console.log($container.html());
	//first check to make sure the container hasn't already been sanitized so the rel values aren't also overwritten with "#"
		if ($container.hasClass("sanitized")){
			return;//do nothing
		}
		else{
			$(container + ' a').each(function(){
				$cur_link = $(this);
				var href = $cur_link.attr('href');
				//console.log("href: " + href);//test code
				$cur_link.attr('rel', href);
				//console.log("rel: " + $cur_link.attr('rel'));//test code
				$cur_link.attr('href', '#');
				//console.log("final href: " + $cur_link.attr('href'));//test code
				$container.addClass("sanitized");
			});
			
		console.log("Links are sanitized");	
		console.log($container.html());
		return;
		}
	}


//VVV----- Code for dynamic page content replacement -----VVV (thanks to Jesse Shawl and CSS Tricks for the example code)
	
	var hasHistory = false;
	if(Modernizr.history){
		hasHistory = true;
	}
	
	if(hasHistory){
	
		
		
		//run link sanitizer to prevent actual navigation off the page, only if we have access to history
		sanitizeLinks('.main-nav');
		sanitizeLinks('.sub-nav');
		
		
	    //setup variables for dynamic content replacement
	    var $dynamicContentWrap = $("#dynamic-content-wrap"),
	        $pageWrap    = $("body"), 
	        baseHeight   = 0;
	        
	        var $subNav = $("#sub-nav-wrap");//for sub-nav replacement
	        
	        
	    // calculate wrapper heights to prevent jumping when loading new content    
	    $pageWrap.height($pageWrap.height());
	    baseHeight = $pageWrap.height() - $dynamicContentWrap.height();
	    console.log("baseheight: " + baseHeight);
	    
	    
	    
	    //when a main navigation link is clicked, give it the 'selected' class and run the loadContent and loadSubNav functions
	    $('.main-nav a').click(function() {
	        $('.main-nav a').removeClass("selected");//un-select the currently selected link
	        $(this).addClass("selected"); //add selected class to the current
	        var _link = $(this).attr("rel");
	        var _link2 = _link;
	        //console.log("LINK: "+_link);//test code
	        //console.log("LINK2: "+_link2);//test code
	        loadContent(_link);
	        loadSubNav(_link2);
	        history.pushState(null, null, _link);
	        return false;
	    });
	    
	    //when a sub navigation link is clicked, give it the 'selected' class and run the loadContent function
	    $('.sub-nav a').click(function() {
	        $('.sub-nav a').removeClass("selected");//un-select the currently selected link
	        $(this).addClass("selected"); //add selected class to the current
	        var _link = $(this).attr("rel");
	        console.log("subLINK: "+_link);//test code
	        loadContent(_link);
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
	                    });//end load
	                });//end fadeOut
	    }//end loadContent definition
	    
	    
	    
	    //function to dynamically replace sub-nav content
	    function loadSubNav(href){
	    	console.log("argument subnav: "+ href);//test code
	    	//replace sub-nav
	    	$subNav.find(".sub-nav").fadeOut(100, function(){
	    		$subNav.hide().load(href + " .sub-nav", function(){
	    			$subNav.fadeIn(100, function(){
	    				//nothing special animated here for the time being
	    			});
	    		});//end load f(x)
	    	});//end fadeOut f(x)	
	    }//end loadSubNav definition
	    
	    
	    
//**temporarily disable pop-state stuff**
//		   $(window).bind('popstate', function(){
// 	       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
// 	       loadContent(_link);
//	    });
	
	
	
	
	} // otherwise, history is not supported, so nothing fancy here. - end of if(Modernizr.history..)

//^^^----- Code for dynamic page content replacement -----^^^




    
}); //end $(function(){})