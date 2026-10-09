/**
 * Runs in <head> before the first paint: writes the operating system on <html> for CSS to show the
 * right download. The language comes from the URL; a choice saved before that (localStorage only)
 * becomes the cookie next.config.ts redirects by, once.
 */
export const BOOT_SCRIPT = `(function(){var d=document.documentElement;
try{if(!/(^|; )oc-lang=/.test(document.cookie)){var l=localStorage.getItem("oc-lang");if(l==="en"||l==="pt"){document.cookie="oc-lang="+l+"; path=/; max-age=31536000; samesite=lax";var p=location.pathname,pt=p==="/pt"||p.indexOf("/pt/")===0;if(l==="pt"&&!pt)location.replace((p==="/"?"/pt":"/pt"+p)+location.hash)}}}catch(e){}
var ua=navigator.userAgent||"",uad=navigator.userAgentData,p=(uad&&uad.platform)||navigator.platform||"",os="other";
if((uad&&uad.mobile)||/Android|iPhone|iPad|iPod/i.test(ua))os="mobile";
else if(/win/i.test(p)||/Windows/.test(ua))os="windows";
else if(/mac/i.test(p)||/Macintosh|Mac OS X/.test(ua))os=navigator.maxTouchPoints>1?"mobile":"mac";
else if(/CrOS/.test(ua)||/chrome os/i.test(p))os="other";
else if(/linux/i.test(p)||/Linux|X11/.test(ua))os="linux";
d.setAttribute("data-os",os);d.setAttribute("data-arch","arm64");})();`;
