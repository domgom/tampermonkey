// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://streamcloud.eu/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var script = document.getElementsByClassName("standout")[0].getElementsByTagName("script")[2].text;
var url = script.substring(script.indexOf("file: \"")+7);
url = url.substring(0,url.indexOf("\""));
//console.log( "VIDEO URL" );
//console.log(url);
if(url){
	window.open(url);
}