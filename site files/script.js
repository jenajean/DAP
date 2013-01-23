$(function() {

	//call tab hider
	//hide the extra tabbed content
	hideTabs();

	//function to switch out all hrefs in the specified (string of class/id for nav container) container with "#"
	function sanitizeLinks(container){
	$container = $(container);
	//console.log($container.html());
	//first check to make sure the container hasn't already been sanitized so the rel values aren't also overwritten with "#"
		//if ($container.hasClass("sanitized")){
		//	return;//do nothing
		//}
		//else{
			$(container + ' a').each(function(){
				$cur_link = $(this);
				var href = $cur_link.attr('href');
				//console.log("href: " + href);//test code
				$cur_link.attr('rel', href);
				//console.log("rel: " + $cur_link.attr('rel'));//test code
				$cur_link.attr('href', '#');
				//console.log("final href: " + $cur_link.attr('href'));//test code
				$container.addClass("sanitized");
				console.log("Links are sanitized");	
			});
		//console.log($container.html());
		//return;
		//}
	}


//VVV----- Code for dynamic page content replacement -----VVV (thanks to Jesse Shawl and CSS Tricks for the example code)
	
	if(Modernizr.history){
	
		
		
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
	        loadContent(_link);
	        loadSubNav(_link2);
	        history.pushState(null, null, _link);
	        return false;
	    });
	    
	    //when a sub navigation link is clicked, give it the 'selected' class and run the loadContent function
	    $('#sub-nav-wrap').delegate(".sub-nav a", "click", function() {
	        $('.sub-nav a').removeClass("selected");//un-select the currently selected link
	        $(this).addClass("selected"); //add selected class to the current
	        var _link = $(this).attr("rel");
	        console.log("subLINK: "+_link);//test code
	        loadContent(_link);
	        history.pushState(null, null, _link);
	        return false;
	    });;
	    
	    
  
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
	                            //hide the extra tabbed content
	    						hideTabs();
	                        });//end fadeIn
	                    });//end load
	                });//end fadeOut
	            console.log("end of loadContent fx");
	    }//end loadContent definition
	    
	    

	    //function to dynamically replace sub-nav content
	    function loadSubNav(href){
	    	console.log("argument subnav: "+ href);//test code
	    	//replace sub-nav
	    	$subNav.find(".sub-nav").fadeOut(100, function(){
	    		$subNav.hide().load(href + " .sub-nav", function(){
	    			$subNav.fadeIn(100, function(){
	    				//nothing special animated here for the time being
	    				//hide the extra tabbed content
	    				//hideTabs();
	    			});
	    			sanitizeLinks('.sub-nav');
	    		});//end load f(x)
	    	});//end fadeOut f(x)	
	    	console.log("end of loadsubnav fx");
	    }//end loadSubNav definition
	    
	    
	    
//**temporarily disable pop-state stuff**
//		   $(window).bind('popstate', function(){
// 	       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
// 	       loadContent(_link);
//	    });
	
	
	
	
	} // otherwise, history is not supported, so nothing fancy here. - end of if(Modernizr.history..)

//^^^----- Code for dynamic page content replacement -----^^^



//VVV----- Code for tabbed content within pages -----VVV

	//assign a click-function for the side-navigation
	$("#dynamic-content-wrap").delegate(".side-nav a", "click", function(){
		$(".side-nav a").removeClass("selected");
		$(this).addClass("selected");
		var link = $(this).attr("rel");
		console.log("side-link "+link);//test code
		swapTabs(link);
	})
	


	//define function to hide tabs when tabbed content is loaded
	function hideTabs(){
		sanitizeLinks(".side-nav");
		$('.changing-content > div').each(function(){
		//	if($(this).hasClass("selected") || $(this).hasClass("hiding")){
		//		//do nothing
		//	}
		//	else{
				$(this).addClass("hiding");
				console.log($(this).attr("id")+ " has classes " + $(this).attr("class"))
		//	}
		});
		console.log("unhidden, unselected tabs are now hidden");
	}
	
	
	//define function to swap tab content when side-nav is clicked
	function swapTabs(tabID){
		var $thisTab = $(tabID);
		console.log("thistab.html:" +$thisTab.html());
		$('.changing-content > div').removeClass("selected");
		$thisTab.addClass("selected");
	}
	
	
	

//^^^----- code for tabbed content within pages -----^^^



    
}); //end $ f(x)


