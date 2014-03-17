function sgplus(){
	var self = {};
		self.init = function(){		
			var script = content.document.getElementById("sgplus-script");
			
			if(script) self.addScript();			
			else gBrowser.addEventListener("DOMContentLoaded", function(aEvent){
					var browser = gBrowser.getBrowserForDocument(aEvent.target);
					var pageIsFrame = (browser == null || (aEvent.target instanceof Ci.nsIDOMHTMLDocument && aEvent.target != browser.contentDocument));
					if(pageIsFrame) return;
					self.addScript();
			}, false);
		};
			
		self.addScript = function(){
			if(self.isSG() == 0) return;
			
			var head = content.document.getElementsByTagName("head")[0];
			var body = content.document.getElementsByTagName("body")[0];
			var script = content.document.getElementById("sgplus-script");
			
			if(!script){
				script = content.document.createElement("script");
				script.id = "sgplus-script";
				script.type = "text/javascript";
				script.src = "chrome://steamgifts_plus_v2/content/script.js";
				head.appendChild(script);
			} else return;
		};
		
		self.isSG = function(){
			var currWin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
			var currBro = currWin.getBrowser();
			var currUrl = currBro.currentURI.spec;
			return currUrl.match(/^http:\/\/([^\.]*)\.?steamsocial.com/gi).length;
		};
	
	return self;
}
	
window.addEventListener("load", function load(event){  
	window.removeEventListener("load", load, false); 
	sgplus().init();    
}, false);