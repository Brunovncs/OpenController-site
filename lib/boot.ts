/**
 * Runs in <head> before the first paint: picks the language (stored choice, then the browser's)
 * and the operating system, and writes them on <html> for CSS to show the right text and download.
 */
export const BOOT_SCRIPT = `(function(){var d=document.documentElement,l=null;
try{l=localStorage.getItem("oc-lang")}catch(e){}
if(l!=="en"&&l!=="pt"){var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];l=/^pt\\b/i.test(ls[0]||"")?"pt":"en"}
d.setAttribute("data-lang",l);d.lang=l==="pt"?"pt-BR":"en";
var ua=navigator.userAgent||"",uad=navigator.userAgentData,p=(uad&&uad.platform)||navigator.platform||"",os="other";
if((uad&&uad.mobile)||/Android|iPhone|iPad|iPod/i.test(ua))os="mobile";
else if(/win/i.test(p)||/Windows/.test(ua))os="windows";
else if(/mac/i.test(p)||/Macintosh|Mac OS X/.test(ua))os=navigator.maxTouchPoints>1?"mobile":"mac";
else if(/CrOS/.test(ua)||/chrome os/i.test(p))os="other";
else if(/linux/i.test(p)||/Linux|X11/.test(ua))os="linux";
d.setAttribute("data-os",os);d.setAttribute("data-arch","arm64");})();`;
