//>>built
define(["dojo/_base/connect","dojo/_base/fx","dojo/_base/lang","dojo/dom","dojo/dom-geometry","dojo/dom-style","dojo/fx","dojo/has","esri/kernel"],function(n,f,g,k,l,m,p,q,r){return{animateRange:function(a){var b=a.range;return new f.Animation(g.mixin({curve:new f._Line(b.start,b.end)},a))},resize:function(a){var b=a.node=k.byId(a.node),c=a.start,d=a.end;c||(c=l.getMarginBox(b),b=l.getPadBorderExtents(b),c=a.start={left:c.l+b.l,top:c.t+b.t,width:c.w-b.w,height:c.h-b.h});d||(d=a.anchor?a.anchor:{x:c.left,
y:c.top},b=a.size,d=a.end={left:c.left-(b.width-c.width)*(d.x-c.left)/c.width,top:c.top-(b.height-c.height)*(d.y-c.top)/c.height,width:b.width,height:b.height});return f.animateProperty(g.mixin({properties:{left:{start:c.left,end:d.left},top:{start:c.top,end:d.top},width:{start:c.width,end:d.width},height:{start:c.height,end:d.height}}},a))},slideTo:function(a){var b=a.node=k.byId(a.node),c=m.getComputedStyle,d=null,e=null,h=function(){return function(){var a="absolute"==b.style.position?"absolute":
"relative";d="absolute"==a?b.offsetTop:parseInt(c(b).top)||0;e="absolute"==a?b.offsetLeft:parseInt(c(b).left)||0;"absolute"!=a&&"relative"!=a&&(a=l.position(b,!0),d=a.y,e=a.x,b.style.position="absolute",b.style.top=d+"px",b.style.left=e+"px")}}();h();a=f.animateProperty(g.mixin({properties:{top:{start:d,end:a.top||0},left:{start:e,end:a.left||0}}},a));n.connect(a,"beforeBegin",a,h);return a},flash:function(a){a=g.mixin({end:"#f00",duration:500,count:1},a);a.duration/=2*a.count;var b=k.byId(a.node),
c=a.start;c||(c=m.getComputedStyle(b).backgroundColor);var d=a.end,e=[],h=a.count,b={node:b,duration:a.duration};for(a=0;a<h;a++)e.push(f.animateProperty(g.mixin({properties:{backgroundColor:{start:c,end:d}}},b))),e.push(f.animateProperty(g.mixin({properties:{backgroundColor:{start:d,end:c}}},b)));return p.chain(e)}}});