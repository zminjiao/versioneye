window.CanvasRenderingContext2D||!function(){function e(e){var t=e.srcElement;switch(e.propertyName){case"width":t.style.width=t.attributes.width.nodeValue+"px",t.getContext().clearRect();break;case"height":t.style.height=t.attributes.height.nodeValue+"px",t.getContext().clearRect()}}function t(e){var t=e.srcElement;t.firstChild&&(t.firstChild.style.width=t.clientWidth+"px",t.firstChild.style.height=t.clientHeight+"px")}function n(){return[[1,0,0],[0,1,0],[0,0,1]]}function r(e,t){for(var r=n(),i=0;3>i;i++)for(var o=0;3>o;o++){for(var a=0,s=0;3>s;s++)a+=e[i][s]*t[s][o];r[i][o]=a}return r}function i(e,t){t.fillStyle=e.fillStyle,t.lineCap=e.lineCap,t.lineJoin=e.lineJoin,t.lineWidth=e.lineWidth,t.miterLimit=e.miterLimit,t.shadowBlur=e.shadowBlur,t.shadowColor=e.shadowColor,t.shadowOffsetX=e.shadowOffsetX,t.shadowOffsetY=e.shadowOffsetY,t.strokeStyle=e.strokeStyle,t.arcScaleX_=e.arcScaleX_,t.arcScaleY_=e.arcScaleY_}function o(e){var t,n=1;if(e=String(e),"rgb"==e.substring(0,3)){var r=e.indexOf("(",3),i=e.indexOf(")",r+1),o=e.substring(r+1,i).split(",");t="#";for(var a=0;3>a;a++)t+=v[Number(o[a])];4==o.length&&"a"==e.substr(3,1)&&(n=o[3])}else t=e;return[t,n]}function a(e){switch(e){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}function s(e){this.m_=n(),this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=1*f,this.globalAlpha=1,this.canvas=e;var t=e.ownerDocument.createElement("div");t.style.width=e.clientWidth+"px",t.style.height=e.clientHeight+"px",t.style.overflow="hidden",t.style.position="absolute",e.appendChild(t),this.element_=t,this.arcScaleX_=1,this.arcScaleY_=1}function u(e){this.type_=e,this.radius1_=0,this.radius2_=0,this.colors_=[],this.focus_={x:0,y:0}}function c(){}var l=Math,p=l.round,d=l.sin,h=l.cos,f=10,m=f/2,g={init:function(e){var t=e||document;if(/MSIE/.test(navigator.userAgent)&&!window.opera){var n=this;t.attachEvent("onreadystatechange",function(){n.init_(t)})}},init_:function(e){if("complete"==e.readyState){e.namespaces.g_vml_||e.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml");var t=e.createStyleSheet();t.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}";for(var n=e.getElementsByTagName("canvas"),r=0;r<n.length;r++)n[r].getContext||this.initElement(n[r])}},fixElement_:function(e){var t=e.outerHTML,n=e.ownerDocument.createElement(t);if("/>"!=t.slice(-2)){for(var r,i="/"+e.tagName;(r=e.nextSibling)&&r.tagName!=i;)r.removeNode();r&&r.removeNode()}return e.parentNode.replaceChild(n,e),n},initElement:function(n){n=this.fixElement_(n),n.getContext=function(){return this.context_?this.context_:this.context_=new s(this)},n.attachEvent("onpropertychange",e),n.attachEvent("onresize",t);var r=n.attributes;return r.width&&r.width.specified?n.style.width=r.width.nodeValue:n.width=n.clientWidth,r.height&&r.height.specified?n.style.height=r.height.nodeValue:n.height=n.clientHeight,n}};g.init();for(var v=[],y=0;16>y;y++)for(var b=0;16>b;b++)v[16*y+b]=y.toString(16)+b.toString(16);var w=s.prototype;w.clearRect=function(){this.element_.innerHTML="",this.currentPath_=[]},w.beginPath=function(){this.currentPath_=[]},w.moveTo=function(e,t){this.currentPath_.push({type:"moveTo",x:e,y:t}),this.currentX_=e,this.currentY_=t},w.lineTo=function(e,t){this.currentPath_.push({type:"lineTo",x:e,y:t}),this.currentX_=e,this.currentY_=t},w.bezierCurveTo=function(e,t,n,r,i,o){this.currentPath_.push({type:"bezierCurveTo",cp1x:e,cp1y:t,cp2x:n,cp2y:r,x:i,y:o}),this.currentX_=i,this.currentY_=o},w.quadraticCurveTo=function(e,t,n,r){var i=this.currentX_+2/3*(e-this.currentX_),o=this.currentY_+2/3*(t-this.currentY_),a=i+(n-this.currentX_)/3,s=o+(r-this.currentY_)/3;this.bezierCurveTo(i,o,a,s,n,r)},w.arc=function(e,t,n,r,i,o){n*=f;var a=o?"at":"wa",s=e+h(r)*n-m,u=t+d(r)*n-m,c=e+h(i)*n-m,l=t+d(i)*n-m;s!=c||o||(s+=.125),this.currentPath_.push({type:a,x:e,y:t,radius:n,xStart:s,yStart:u,xEnd:c,yEnd:l})},w.rect=function(e,t,n,r){this.moveTo(e,t),this.lineTo(e+n,t),this.lineTo(e+n,t+r),this.lineTo(e,t+r),this.closePath()},w.strokeRect=function(e,t,n,r){this.beginPath(),this.moveTo(e,t),this.lineTo(e+n,t),this.lineTo(e+n,t+r),this.lineTo(e,t+r),this.closePath(),this.stroke()},w.fillRect=function(e,t,n,r){this.beginPath(),this.moveTo(e,t),this.lineTo(e+n,t),this.lineTo(e+n,t+r),this.lineTo(e,t+r),this.closePath(),this.fill()},w.createLinearGradient=function(){var e=new u("gradient");return e},w.createRadialGradient=function(e,t,n,r,i,o){var a=new u("gradientradial");return a.radius1_=n,a.radius2_=o,a.focus_.x=e,a.focus_.y=t,a},w.drawImage=function(e){var t,n,r,i,o,a,s,u,c=e.runtimeStyle.width,l=e.runtimeStyle.height;e.runtimeStyle.width="auto",e.runtimeStyle.height="auto";var d=e.width,h=e.height;if(e.runtimeStyle.width=c,e.runtimeStyle.height=l,3==arguments.length)t=arguments[1],n=arguments[2],o=a=0,s=r=d,u=i=h;else if(5==arguments.length)t=arguments[1],n=arguments[2],r=arguments[3],i=arguments[4],o=a=0,s=d,u=h;else{if(9!=arguments.length)throw"Invalid number of arguments";o=arguments[1],a=arguments[2],s=arguments[3],u=arguments[4],t=arguments[5],n=arguments[6],r=arguments[7],i=arguments[8]}var m=this.getCoords_(t,n),g=[],v=10,y=10;if(g.push(" <g_vml_:group",' coordsize="',f*v,",",f*y,'"',' coordorigin="0,0"',' style="width:',v,";height:",y,";position:absolute;"),1!=this.m_[0][0]||this.m_[0][1]){var b=[];b.push("M11='",this.m_[0][0],"',","M12='",this.m_[1][0],"',","M21='",this.m_[0][1],"',","M22='",this.m_[1][1],"',","Dx='",p(m.x/f),"',","Dy='",p(m.y/f),"'");var w=m,x=this.getCoords_(t+r,n),C=this.getCoords_(t,n+i),_=this.getCoords_(t+r,n+i);w.x=Math.max(w.x,x.x,C.x,_.x),w.y=Math.max(w.y,x.y,C.y,_.y),g.push("padding:0 ",p(w.x/f),"px ",p(w.y/f),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",b.join(""),", sizingmethod='clip');")}else g.push("top:",p(m.y/f),"px;left:",p(m.x/f),"px;");g.push(' ">','<g_vml_:image src="',e.src,'"',' style="width:',f*r,";"," height:",f*i,';"',' cropleft="',o/d,'"',' croptop="',a/h,'"',' cropright="',(d-o-s)/d,'"',' cropbottom="',(h-a-u)/h,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",g.join(""))},w.stroke=function(e){var t=[],n=o(e?this.fillStyle:this.strokeStyle),r=n[0],i=n[1]*this.globalAlpha,s=10,u=10;t.push("<g_vml_:shape",' fillcolor="',r,'"',' filled="',Boolean(e),'"',' style="position:absolute;width:',s,";height:",u,';"',' coordorigin="0 0" coordsize="',f*s," ",f*u,'"',' stroked="',!e,'"',' strokeweight="',this.lineWidth,'"',' strokecolor="',r,'"',' path="');for(var c={x:null,y:null},l={x:null,y:null},d=0;d<this.currentPath_.length;d++){var h=this.currentPath_[d];if("moveTo"==h.type){t.push(" m ");var m=this.getCoords_(h.x,h.y);t.push(p(m.x),",",p(m.y))}else if("lineTo"==h.type){t.push(" l ");var m=this.getCoords_(h.x,h.y);t.push(p(m.x),",",p(m.y))}else if("close"==h.type)t.push(" x ");else if("bezierCurveTo"==h.type){t.push(" c ");var m=this.getCoords_(h.x,h.y),g=this.getCoords_(h.cp1x,h.cp1y),v=this.getCoords_(h.cp2x,h.cp2y);t.push(p(g.x),",",p(g.y),",",p(v.x),",",p(v.y),",",p(m.x),",",p(m.y))}else if("at"==h.type||"wa"==h.type){t.push(" ",h.type," ");var m=this.getCoords_(h.x,h.y),y=this.getCoords_(h.xStart,h.yStart),b=this.getCoords_(h.xEnd,h.yEnd);t.push(p(m.x-this.arcScaleX_*h.radius),",",p(m.y-this.arcScaleY_*h.radius)," ",p(m.x+this.arcScaleX_*h.radius),",",p(m.y+this.arcScaleY_*h.radius)," ",p(y.x),",",p(y.y)," ",p(b.x),",",p(b.y))}m&&((null==c.x||m.x<c.x)&&(c.x=m.x),(null==l.x||m.x>l.x)&&(l.x=m.x),(null==c.y||m.y<c.y)&&(c.y=m.y),(null==l.y||m.y>l.y)&&(l.y=m.y))}if(t.push(' ">'),"object"==typeof this.fillStyle){var w={x:"50%",y:"50%"},x=l.x-c.x,C=l.y-c.y,_=x>C?x:C;w.x=p(this.fillStyle.focus_.x/x*100+50)+"%",w.y=p(this.fillStyle.focus_.y/C*100+50)+"%";var E=[];if("gradientradial"==this.fillStyle.type_)var S=this.fillStyle.radius1_/_*100,T=this.fillStyle.radius2_/_*100-S;else var S=0,T=100;var k={offset:null,color:null},M={offset:null,color:null};this.fillStyle.colors_.sort(function(e,t){return e.offset-t.offset});for(var d=0;d<this.fillStyle.colors_.length;d++){var R=this.fillStyle.colors_[d];E.push(R.offset*T+S,"% ",R.color,","),(R.offset>k.offset||null==k.offset)&&(k.offset=R.offset,k.color=R.color),(R.offset<M.offset||null==M.offset)&&(M.offset=R.offset,M.color=R.color)}E.pop(),t.push("<g_vml_:fill",' color="',M.color,'"',' color2="',k.color,'"',' type="',this.fillStyle.type_,'"',' focusposition="',w.x,", ",w.y,'"',' colors="',E.join(""),'"',' opacity="',i,'" />')}else e?t.push('<g_vml_:fill color="',r,'" opacity="',i,'" />'):t.push("<g_vml_:stroke",' opacity="',i,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',a(this.lineCap),'"',' weight="',this.lineWidth,'px"',' color="',r,'" />');t.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",t.join("")),this.currentPath_=[]},w.fill=function(){this.stroke(!0)},w.closePath=function(){this.currentPath_.push({type:"close"})},w.getCoords_=function(e,t){return{x:f*(e*this.m_[0][0]+t*this.m_[1][0]+this.m_[2][0])-m,y:f*(e*this.m_[0][1]+t*this.m_[1][1]+this.m_[2][1])-m}},w.save=function(){var e={};i(this,e),this.aStack_.push(e),this.mStack_.push(this.m_),this.m_=r(n(),this.m_)},w.restore=function(){i(this.aStack_.pop(),this),this.m_=this.mStack_.pop()},w.translate=function(e,t){var n=[[1,0,0],[0,1,0],[e,t,1]];this.m_=r(n,this.m_)},w.rotate=function(e){var t=h(e),n=d(e),i=[[t,n,0],[-n,t,0],[0,0,1]];this.m_=r(i,this.m_)},w.scale=function(e,t){this.arcScaleX_*=e,this.arcScaleY_*=t;var n=[[e,0,0],[0,t,0],[0,0,1]];this.m_=r(n,this.m_)},w.clip=function(){},w.arcTo=function(){},w.createPattern=function(){return new c},u.prototype.addColorStop=function(e,t){t=o(t),this.colors_.push({offset:1-e,color:t})},G_vmlCanvasManager=g,CanvasRenderingContext2D=s,CanvasGradient=u,CanvasPattern=c}();