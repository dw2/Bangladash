(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects

// app.jade compiled template
exports.app = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<menu>\n  <button class="settings">Settings</button>\n  <button class="attacks">Attacks</button>\n</menu>\n<aside id="chat">\n  <ol class="chat"></ol>\n  <textarea></textarea>\n</aside>\n<aside id="tasks"></aside>\n<aside id="boss"></aside>\n<section id="people">\n  <ol class="people"></ol>\n</section>');
    }
    return buf.join("");
};

// boss.jade compiled template
exports.boss = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<div class="boss">\n  <div class="userImage"><img src="/img/boss-vegeta.jpg"/></div>\n  <h2>Super Sayan</h2>\n  <div class="stats">36 - Fighter</div>\n  <div class="name">Menacing Projects</div>\n  <div class="healthPerc">\n    <div class="label">' + escape((interp = locals.healthPerc || 0) == null ? "" : interp) + '%</div>\n    <div class="mask"></div>\n  </div>\n  <div class="attackPerc fighter">\n    <div class="label">' + escape((interp = locals.attackPerc || 0) == null ? "" : interp) + '%</div>\n    <div class="mask"></div>\n  </div>\n</div>');
    }
    return buf.join("");
};

// member.jade compiled template
exports.member = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push("\n<li");
        buf.push(attrs({
            "data-id": locals.member.id,
            "data-name": locals.member.fullName(),
            "class": "member"
        }, {
            "data-id": true,
            "data-name": true
        }));
        buf.push('>\n  <div class="userImage"><img');
        buf.push(attrs({
            src: locals.member.picUrl() + "?s=180"
        }, {
            src: true
        }));
        buf.push("/></div>\n  <h2>" + escape((interp = locals.member.character.name) == null ? "" : interp) + '</h2>\n  <div class="stats">');
        if (!!locals.member.character.level && !!locals.member.character.spec) {
            buf.push("\n    <" + locals.member.character.level + ">- " + escape((interp = locals.member.character.spec) == null ? "" : interp) + "</" + locals.member.character.level + ">");
        } else {
            buf.push("?");
        }
        buf.push('\n  </div>\n  <div class="name">');
        var __val__ = locals.member.fullName();
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</div>\n  <div class="activeTask">');
        var __val__ = locals.activeTaskTitle || "No active task.";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</div>\n  <div class="healthPerc">\n    <div class="label">' + escape((interp = locals.healthPerc || 0) == null ? "" : interp) + '%</div>\n    <div class="mask"></div>\n  </div>\n  <div');
        buf.push(attrs({
            "class": "attackPerc" + " " + locals.member.character.spec.toLowerCase()
        }, {
            "class": true
        }));
        buf.push('>\n    <div class="label">' + escape((interp = locals.attackPerc || 0) == null ? "" : interp) + '%</div>\n    <div class="mask"></div>\n  </div>\n</li>');
    }
    return buf.join("");
};

// message.jade compiled template
exports.message = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<li class="message">\n  <div class="userImage"><img');
        buf.push(attrs({
            src: locals.picUrl
        }, {
            src: true
        }));
        buf.push("/></div>\n  <q>");
        var __val__ = locals.message.attributes.message;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</q>\n</li>");
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();