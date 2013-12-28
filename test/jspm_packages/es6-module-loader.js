/*!
*  es6-module-loader - v0.3.3 - 12/2/2013
*  https://github.com/ModuleLoader/es6-module-loader
*  Copyright (c) 2013 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
*/
!function(){!function(){function a(a){this.global=a.global||window,this.strict=!!a.strict,this.normalize=a.normalize||d.System.normalize,this.resolve=a.resolve||d.System.resolve,this.fetch=a.fetch||d.System.fetch,this.translate=a.translate||d.System.translate,this.link=a.link||d.System.link,this._mios={},this._sloaded={},this._mloads={},this._sloads={}}function b(a){if("object"!=typeof a)throw new TypeError("Expected object");if(a instanceof b)return a;var c=this;for(var d in a)!function(b){e(c,b,{configurable:!1,enumerable:!0,get:function(){return a[b]}})}(d)}var c="undefined"!=typeof window,d=c?window:exports,e=function(a,b,c){Object.defineProperty?Object.defineProperty(a,b,c):a[b]=c.value||c.get.call(a)},f=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1};a.prototype.load=function(a,b,c){var d=this;if(a instanceof Array)for(var e=0,f=0;f<a.length;f++)!function(f){d.load(a[f],function(){e++,e==a.length&&b&&b()},c)}(f);else{if(this._sloaded[a])return b&&b(),void 0;if(this._sloads[a])return this._sloads[a].push({callback:b,errback:c}),void 0;this._sloads[a]=[{callback:b,errback:c}];var g=function(){for(var b=0;b<d._sloads[a].length;b++)d._sloads[a][b].callback&&d._sloads[a][b].callback();delete d._sloads[a]},h=function(b){for(var c=!0,e=0;e<d._sloads[a].length;e++)d._sloads[a][e].errback?d._sloads[a][e].errback(b):c=!1;if(delete d._sloads[a],!c)throw b};this.fetch(a,function(b){var c={address:a,type:"script"};b=d.translate(b,c),d._linkExecute(a,b,c,g,h,!0)},h)}},a.prototype["import"]=function(b,c,d,e){var f=this;if(b instanceof Array)for(var g=[],h=0,f=this,i=0;i<b.length;i++)!function(i){a.prototype["import"].call(f,b[i],function(a){g[i]=a,h++,h==b.length&&c&&c.apply(null,g)},d,e)}(i);else{b=this.normalize(b,e);var j={referer:e,metadata:"object"==typeof b?b.metadata:null};if("string"!=typeof b&&(b=b.normalized),this._mios[b])return c&&c(this._mios[b]);if(this._mloads[b])return this._mloads[b].push({callback:c,errback:d}),void 0;this._mloads[b]=[{callback:c,errback:d}];var k=function(a){f._mios[b]=a;for(var c=0;c<f._mloads[b].length;c++)f._mloads[b][c].callback&&f._mloads[b][c].callback(a);delete f._mloads[b]},l=function(a){var c=!0;if(!f._mloads[b])throw a;for(var d=0;d<f._mloads[b].length;d++)f._mloads[b][d].errback?f._mloads[b][d].errback(a):c=!1;if(delete f._mloads[b],!c)throw a},m=this.resolve(b,j);"string"!=typeof m&&(m=m.address),j.normalized=b,this.fetch(m,function(a){j.address=m,j.type="module",a=f.translate(a,j),f._linkExecute(b,a,j,k,l)},l,j)}};var g=0;a.prototype._linkExecute=function(c,d,e,f,g){var h="script"==e.type,i=this.link(d,e);if(i instanceof b&&!h)return f(i);var j=this,k="object"==typeof i&&!h;(k?function(a,b,c){c()}:o.loadTraceur).call(o,c,d,function(){var b,h;if(k)b=i.imports,h=i.execute;else{var l=j._link(d,e);b=l.imports,h=l.execute}if(!g.called){if(!b.length)return f(h.call(j));e.normalizeMap={};for(var m=[],n=0,o=0;o<b.length;o++)!function(d){var i={name:c,address:e.address},k=j.normalize(b[d],i);"object"==typeof k&&(k=k.normalized),e.normalizeMap[b[d]]=k,a.prototype["import"].call(j,b[d],function(a){if(n++,m[d]=a,n==b.length){var c=h.apply(j,m);f(c)}},g,i)}(o)}},g)},a.prototype._link=function(a,d){c||o.loadTraceur(d.normalized,a,function(){},function(){});var e=this;return{imports:o.parseImports(a,d),execute:function(){var c;return c=o.parseEval(a,e,{name:d.normalized,sourceURL:d.address,isEval:"script"==d.type,normalizeMap:d.normalizeMap}),d.normalized&&"script"!=d.type?new b(c||{}):void 0}}},a.prototype.eval=function(a){o.parseEval(a,this,{isEval:!0})},a.prototype.evalAsync=function(a,b,c){var d="__eval"+g++;o.parseNames[d]=!0;var e=this;o.loadTraceur(d,a,function(){e._linkExecute(null,a,{type:"script",address:d,normalized:d},b||function(){},c||function(){})},c)},a.prototype.get=function(a){return this._mios[a]||null},a.prototype.set=function(a,c){this._mios[a]=new b(c)},a.prototype.has=function(a){return!!this._mios[a]},a.prototype["delete"]=function(a){delete this._mios[a]},a.prototype.defineBuiltins=function(a){for(var b in a)a.hasOwnProperty(b)&&(this.global[b]=a[b])};var h,i=/^\/|([^\:\/]*:\/\/)/,j=function(a){return a.match(i)};if(c)h=function(a,b,c){var d=new XMLHttpRequest;if(!("withCredentials"in d)){var e=!0,f=/^(\w+:)?\/\/([^\/]+)/.exec(a);f&&(e=f[2]===window.location.host,f[1]&&(e&=f[1]===window.location.protocol)),e||(d=new XDomainRequest)}d.onreadystatechange=function(){4===d.readyState&&(200===d.status||0==d.status&&d.responseText?b(d.responseText):c(d.statusText+": "+a||"XHR error"))},d.open("GET",a,!0),d.send(null)};else{var k=require("fs");h=function(a,b,c){return k.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var l=function(a,b){if(!b)return a;"./"==a.substr(0,2)&&(a=a.substr(2));var c=b.lastIndexOf("/");if(-1==c)return a;if(c!=b.length-1&&(b=b.substr(0,c+1)),"."!=a.substr(0,1))return b+a;var d=b.split("/"),e=a.split("/");d.pop();for(var f;".."==e[0];)f=e.shift(),d.length&&".."!=d[d.length-1]?d.pop():d.push("..");return d.join("/")+(d.length?"/":"")+e.join("/")},m=new a({global:c?window:d,strict:!0,normalize:function(a,b){return j(a)?a:"."==a.substr(0,1)?l(a,b&&b.name):a},resolve:function(a){for(var b in this.ondemandTable)if(-1!=f.call(this.ondemandTable[b],a))return b;return j(a)?a:l(a+".js",this.baseURL+("/"!=this.baseURL.charAt(this.baseURL.length-1)?"/":""))},fetch:h,translate:function(a){return a},link:function(){}});m.baseURL=c?window.location.href.substring(0,window.location.href.lastIndexOf("/")+1):"./",m.ondemandTable={},m.ondemand=function(a){for(var b in a)this.ondemandTable[b]=this.ondemandTable[b]||[],a[b]instanceof Array?this.ondemandTable[b]=this.ondemandTable[b].concat(a[b]):this.ondemandTable[b].push(a[b])};var n,o={traverse:function(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&this.traverse(f,b,a,e))},es6RegEx:/(?:^\s*|[}{\(\);,\n]\s*)((import|module)\s+[^"']+\s+from\s+['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/,checkModuleSyntax:function(a,b){return(null==a||void 0===this.parseNames[a])&&(this.parseNames[a]=b&&!!b.match(this.es6RegEx)),this.parseNames[a]},loadTraceur:function(a,b,e){if(this.traceur)return e();if(!this.checkModuleSyntax(a,b))return e();if(c)for(var f,g=document.getElementsByTagName("script"),h=0;h<g.length&&(f=g[h],!(n=f.src.match(/es6-module-loader(\.min)?\.js/)?f.src.substr(0,f.src.lastIndexOf("/")+1)+"traceur.js":f.getAttribute("data-traceur-src")));h++);var i=this,j=d.System;(c?d.System.load:function(a,b){i.traceur=require("traceur"),b()}).call(d.System,n,function(){if(c){if(i.traceur)return e();i.traceur=d.System.get("../src/traceur.js")}i.traceur.options.sourceMaps=!0,i.traceur.options.modules="parse",i.reporter=new i.traceur.util.ErrorReporter,i.reporter.reportMessageInternal=function(a,b){throw b+"\n"+a},i.createModuleLoaderTransformer(i.traceur.codegeneration.ParseTreeFactory,i.traceur.codegeneration.ParseTreeTransformer),d.System=j,e()})},createModuleLoaderTransformer:function(a,b){var c=a.createAssignmentExpression,d=a.createVariableDeclaration,e=a.createMemberExpression,f=a.createCallExpression,g=a.createVariableDeclarationList,h=a.createArgumentList,i=a.createStringLiteral,j=a.createIdentifierExpression,k=a.createMemberLookupExpression,l=a.createCommaExpression,m=a.createVariableStatement,n=a.createAssignmentStatement,o=a.createExpressionStatement,p=function(a,b,c,e){var f=b.map(function(b,e){return d(b,q(a,c[e]))}),h=g("var",f);return h.location=e,m(h)},q=function(a,b){var c=f(e("__Loader","get"),h([i(a)]));return b?k(c,i(b)):c},r=function(a){return k(j("__exports"),i(a))},s=function(a){this.nMap=a};s.prototype=Object.create(b.prototype),s.prototype.transformImportDeclaration=function(a){var b=a.moduleSpecifier.token.processedValue;b=this.nMap[b]||b;var c=[],d=[];if(a.importClause.binding)c.push(a.importClause.binding.identifierToken),d.push("default");else for(var e=a.importClause.specifiers,f=0;f<e.length;f++){var g=e[f];c.push(g.rhs?g.rhs.value:g.lhs.value),d.push(g.lhs.value)}return p(b,c,d,a.location)},s.prototype.transformModuleDeclaration=function(a){var b=a.expression.token.processedValue;return b=this.nMap[b]||b,p(b,[a.identifier],[null],a.location)},s.prototype.transformExportDeclaration=function(a){var b=a.declaration;if("NAMED_EXPORT"==b.type){var e=b.moduleSpecifier&&b.moduleSpecifier.token.processedValue;if(e&&(e=this.nMap[e]||e),"EXPORT_STAR"!=b.specifierSet.type){for(var f=[],h=b.specifierSet.specifiers,i=0;i<h.length;i++){var k=h[i];f.push(c(r(k.rhs?k.rhs.value:k.lhs.value),e?q(e,k.lhs.value):j(k.lhs.value)))}var m=o(l(f));return m.location=a.location,m}var p=n(j("__exports"),q(e));return p.location=a.location,p}if("VARIABLE_STATEMENT"==b.type){var s=b.declarations.declarations[0];return s.initializer=c(r(s.lvalue.identifierToken.value),this.transformAny(s.initializer)),b}if("FUNCTION_DECLARATION"==b.type){var s=d(b.name.identifierToken.value,n(r(b.name.identifierToken.value),this.transformAny(b)));return s.location=a.location,g("var",[s])}return"EXPORT_DEFAULT"==b.type?n(r("default"),this.transformAny(b.expression)):a},this.ModuleTransformer=s},parseNames:{},treeCache:{},getSyntaxTree:function(a,b){var c=b.normalized||b.address;if(this.treeCache[c])return this.treeCache[c];var d=new this.traceur.syntax.Parser(this.reporter,new this.traceur.syntax.SourceFile(b.address,a)),e="module"==b.type?d.parseModule():d.parseScript();return this.treeCache[c]=e},getTransformedSyntaxTree:function(a,b){var c=this.getSyntaxTree(a,b);if(b.es6){var d=new this.traceur.semantics.symbols.Project(b.address),e=new this.traceur.codegeneration.ProgramTransformer(this.reporter,d);c=e.transform(c)}return new this.ModuleTransformer(b.normalizeMap||{}).transformAny(c)},parseImports:function(a,b){if(!this.checkModuleSyntax(b.normalized||b.address,a))return[];var c=this.getSyntaxTree(a,b),d=[];return this.traverse(c,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&d.push(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?d.push(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&d.push(a.expression.token.processedValue)}),d},parseEval:function(a,b,d){if(!this.checkModuleSyntax(d.name,a))return b.global.__Loader=b,__scopedEval((b.strict?'"use strict";\n':"")+a,b.global,d.sourceURL),delete b.global.__Loader,void 0;var e=this.getTransformedSyntaxTree(a,{es6:!0,normalized:d.name,address:d.sourceURL,normalizeMap:d.normalizeMap});delete this.treeCache[d.name||d.address];var f=new this.traceur.outputgeneration.SourceMapGenerator({file:d.sourceURL}),g={sourceMapGenerator:f};a=this.traceur.outputgeneration.TreeWriter.write(e,g),c&&(a+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(g.sourceMap)+"\n"),b.global.__Loader=b,b.global.__exports={},__scopedEval((b.strict?'"use strict";\n':"")+a,b.global,d.sourceURL),delete b.global.__Loader;var h=b.global.__exports;if(delete b.global.__exports,d.isEval)for(var i in h)throw"Exports only supported for modules, not script evaluation.";return h}};d.Loader=a,d.Module=b,d.System=m}();var __scopedEval=function(__source,global,__sourceURL){eval("with(global) { (function() { "+__source+" \n }).call(global); }"+(__sourceURL&&!__source.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=(.+)/)?"\n//# sourceURL="+__sourceURL:""))}}(),function(){if("undefined"!=typeof window){var a=document.getElementsByTagName("script");a=a[a.length-1],a.getAttribute("data-init")&&window[a.getAttribute("data-init")](),document.onreadystatechange=function(){if("interactive"==document.readyState)for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++)"module"==a[b].type&&System.evalAsync(a[b].innerHTML)}}}();