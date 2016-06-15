/*
	Initial Author: Shryder
	Started Date : 23/05/1016 - not sure =P
	Note: This code looks quite ugly, since i'm not using an API to get some informations... 
*/

$(function(){
	
	var gui = require('nw.gui');
	var menu = new gui.Menu();

	// Add some items
	var copy = new gui.MenuItem({ label: 'Copy' });
	var paste = new gui.MenuItem({ label: 'Paste' });
	var refresh = new gui.MenuItem({ label: 'Refresh' });
	var separator = new gui.MenuItem({ type: 'separator' });
	menu.append(copy);
	menu.append(paste);
	menu.append(separator);
	menu.append(refresh);
	copy.click = function() { 
	   document.execCommand("copy");
	};
	
	$(document).on('contextmenu', function (e) {
		menu.popup(e.pageX, e.pageY); //dunno why it doesn't work automaticly, but whatever.
    });

	
	$('#options').bind('click', function(e) {
        e.preventDefault();
        $.Zebra_Dialog('This Popubox is used to change your options', 
        {
            'title':    'Options'
        });
    });

	$('.toprightcorner img').on('dragstart', function(event) { event.preventDefault(); }); //because it'll look ugly .-.
	$("#closewindow").click(function(){ // umm i'll have to find out how i can close a window , not the whole app...
		gui.App.close();
	});
	$("#quit").click(function(){
		gui.App.quit();
	});
	$("#minimize").click(function(){
		gui.Window.get().minimize();
	});
	$("#maximize").click(function(){
		gui.Window.get().maximize();
	});
	
	$("#friends").click(function(){
		var win = gui.Window.open ('friends.html', {
		  position: 'center',
		  width: 300,
		  height: 500,
		  frame:false
		});
		win.on ('loaded', function(){
		  // the native onload event has just occurred
		  var document = win.window.document;
		});
	});
	
	$("#library").click(function(){
		loadintomain("./library.html");
	});
	
	$('#Sidebarlist').resizable({ // Resize the sidebar.
		start: function( event, ui ) {},
		stop: function( event, ui ) {},
	    handles: 'n,w,s,e',minWidth: 200,
	    maxWidth: 400
	});
	$("#Sidebarlist").on( "resizestart", function( event, ui ) { //on resize start.
		$('#Content').css('margin-left',$("#Sidebarlist").css('width'));
	});
	$("#Sidebarlist").on( "resizestop", function( event, ui ) { //on resize stop.
		$('#Content').css('margin-left',$("#Sidebarlist").css('width'));
	});
	

	var GamesList = {"Modification 1" : 1, "Modification 2" : 2, "Modification 3" : 3, "Modification 4" : 4,"Modification 5" : 5}; 
	var GamesName = [];
	var GamesID = []; 
	for (var key in GamesList){
		GamesName.push(key);
		GamesID.push(GamesList[key]);
	}
	var listLength = GamesName.length;
	for (var s = 0; s < listLength; s++) {
		debug("Games count: "+ s ); //just for debugin purposes.
		debug("Games: " + GamesName[s]);
		$('#Sidebarlist').append("<li class='sidebaritem'><a href='#' gameid='"+ GamesID[s] +"' title='"+ GamesName[s] +"' gamename='"+ GamesName[s] +"' > "+ GamesName[s] + "</a></li>"); //Append the current Mod to the list.
	}

	$(".sidebaritem").click(function(){
		var CurrentGameID = $(this).children('a').attr("gameid");
		ShowGame(CurrentGameID);
	});

});