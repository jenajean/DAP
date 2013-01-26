

$(function() {
	var temperPopState = false;

	//hide the extra tabbed content
	hideTabs();

	//function to switch out all hrefs in the specified (string of class/id for nav container) container with "#"
	function sanitizeLinks(container){
	$container = $(container);
			$(container + ' a').each(function(){
				$cur_link = $(this);
				var href = $cur_link.attr('href');
				//console.log("href: " + href);//test code
				$cur_link.attr('rel', href);
				//console.log("rel: " + $cur_link.attr('rel'));//test code
				$cur_link.attr('href', '#');
				//console.log("final href: " + $cur_link.attr('href'));//test code
				$container.addClass("sanitized");
				//console.log("Links are sanitized");//test code	
			});
	}

		//run link sanitizer to prevent actual navigation off the page, only if we have access to history
		sanitizeLinks('.main-nav');
		sanitizeLinks('.sub-nav');
		

//VVV----- Code for dynamic page content replacement -----VVV (thanks to Jesse Shawl and CSS Tricks for the example code)		
		
	    //setup variables for dynamic content replacement
	    var $dynamicContentWrap = $("#dynamic-content-wrap"),
	        $pageWrap    = $("body"), 
	        baseHeight   = 0;
	        
	        var $subNav = $("#sub-nav-wrap");//for sub-nav replacement
	        
	        
	    // calculate wrapper heights to prevent jumping when loading new content    
	    $pageWrap.height($pageWrap.height());
	    baseHeight = $pageWrap.height() - $dynamicContentWrap.height();
	    //console.log("baseheight: " + baseHeight);//test code
	    
	    
	    
	    //when a main navigation link is clicked, give it the 'selected' class and run the loadContent and loadSubNav functions
	    $('.main-nav a').click(function() {
	        $('.main-nav a').removeClass("selected");//un-select the currently selected link
	        $(this).addClass("selected"); //add selected class to the current
	        var _link = $(this).attr("rel");
	        var _link2 = _link;
	        loadContent(_link);
	        loadSubNav(_link2);
	        if(Modernizr.history){
	       		 history.pushState(null, null, _link);
	       		 $("body").addClass("historypushed");
	       	}
	        return false;
	    });
	    
	    //when a sub navigation link is clicked, give it the 'selected' class and run the loadContent function
	    $('#sub-nav-wrap').delegate(".sub-nav a", "click", function() {
	        //console.log("clicked sub nav");
	        $('.sub-nav a').removeClass("selected");//un-select the currently selected link
	        $(this).addClass("selected"); //add selected class to the current
	        var _link = $(this).attr("rel");
	        //console.log("subLINK: "+_link);//test code
	        loadContent(_link);
	        if(Modernizr.history){
	       		 history.pushState(null, null, _link);
	       		 $("body").addClass("historypushed");
	       	}
	        return false;
	    });;
	    
	    
  
	    //function to dynamically replace page content
	    function loadContent(href){
	       	//console.log("argument: "+	href);//test code
	        //replace the dynamic content section of the page
	        $dynamicContentWrap
	                .find("#dynamic-content")
	                .fadeOut(100, function() { // fade out the content of the current page
	                    $dynamicContentWrap.hide().load(href + " #dynamic-content", function() { // load the contents of whatever href is
	                        $dynamicContentWrap.fadeIn(100, function() {
	                            //hide the extra tabbed content
	    						hideTabs();
	                        });//end fadeIn
	                    });//end load
	                });//end fadeOut
	            //console.log("end of loadContent fx");//testcode
	    }//end loadContent definition
	    
	    

	    //function to dynamically replace sub-nav content
	    function loadSubNav(href){
	    	//console.log("argument subnav: "+ href);//test code
	    	$subNav.find(".sub-nav").fadeOut(100, function(){//replace sub-nav
	    		$subNav.hide().load(href + " .sub-nav", function(){
	    			$subNav.fadeIn(100, function(){
	    				//nothing special animated here for the time being
	    			});
	    			sanitizeLinks('.sub-nav');
	    		});//end load f(x)
	    	});//end fadeOut f(x)	
	    	//console.log("end of loadsubnav fx");//test code
	    }//end loadSubNav definition
	    
	    
	    
		//if History API is available, bind the popstate to load the history, only if the history has been previously pushed
		if(Modernizr.history){
		   $(window).bind('popstate', function(){
		   		if ($('body').hasClass("historypushed") && temperPopState === false){
		   				//console.log("popstate event fired and tripped loadContent");//test code
 	       				_link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
 	       				loadContent(_link);
 	       				loadSubNav(_link);
 	       		}
 	       		else{
 	       			if (temperPopState === true){
 	       				temperPopState = false;
 	       			}
 	       		}
 	       		
	       });
		}
		
	

//^^^----- Code for dynamic page content replacement -----^^^



//VVV----- Code for tabbed content within pages -----VVV

	

	//assign a click-function for the side-navigation
	$("#dynamic-content-wrap").delegate(".side-nav a", "click", function(){
		//console.log("clicked side-nav");//test code
		$(".side-nav a").removeClass("selected");
		$(this).addClass("selected");
		var link = $(this).attr("rel");
		//console.log("side-link "+link);//test code
		swapTabs(link);
		temperPopState = true;
	});
	


	//define function to hide tabs when tabbed content is loaded
	function hideTabs(){
		sanitizeLinks(".side-nav");
		$('.changing-content > div').each(function(){
			$(this).addClass("hiding");
			//console.log($(this).attr("id")+ " has classes " + $(this).attr("class"))//test code
		});
		//console.log("unhidden, unselected tabs are now hidden");//test code
	}
	
	
	
	//define function to swap tab content when side-nav is clicked
	function swapTabs(tabID){
		var $thisTab = $(tabID);
		//console.log("thistab.html:" +$thisTab.html());//test code
		$('.changing-content > div').removeClass("selected");
		$thisTab.addClass("selected");
	}
	
	
	

//^^^----- code for tabbed content within pages -----^^^



    
}); //end $ f(x)


