(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{134:function(e,t,a){},138:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){},143:function(e,t,a){},144:function(e,t,a){},145:function(e,t,a){},146:function(e,t,a){},147:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(30),r=a.n(s),i=(a(109),a(7)),l=a.n(i),o=a(11),j=a(4),u=a(8),d=a(40),b=a(95),h=a.n(b),O=(a(93),h.a.create({baseURL:"https://tractian-guilfer.herokuapp.com"}));O.interceptors.request.use((function(e){var t=localStorage.getItem("token");return t&&(e.headers.Authorization="Bearer ".concat(t)),e}));var x=O,p=a(153),m=a(163),f=a(160),v=a(154),w=a(98),g=(a(134),a(1));var y=function(){var e=Object(u.g)(),t=Object(n.useState)(""),a=Object(j.a)(t,2),c=a[0],s=a[1],r=Object(n.useState)(""),i=Object(j.a)(r,2),d=i[0],b=i[1];function h(){return(h=Object(o.a)(l.a.mark((function t(a){var n,s,r,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,t.next=4,x.post("/login",{loginID:c});case 4:n=t.sent,s=n.data,r=s.token,i=s.company,localStorage.setItem("company",JSON.stringify(i)),localStorage.setItem("token",r),e("/"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(1),b("Login failed");case 16:case"end":return t.stop()}}),t,null,[[1,13]])})))).apply(this,arguments)}return Object(n.useEffect)((function(){Object(o.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.get("/me");case 2:a=t.sent,200===a.status&&e("/");case 5:case"end":return t.stop()}}),t)})))()}),[e]),Object(g.jsx)(p.a,{className:"container-login",children:Object(g.jsx)(m.a,{className:"login-form",children:Object(g.jsxs)(m.a.Body,{children:[Object(g.jsxs)(m.a.Title,{className:"fs-4 text-center",children:["Wellcome to ",Object(g.jsx)("br",{}),"Assets Manager"]}),Object(g.jsxs)(f.a,{onSubmit:function(e){return h.apply(this,arguments)},children:[Object(g.jsx)(f.a.Group,{className:"mb-3",children:Object(g.jsx)(f.a.Control,{type:"text",placeholder:"Login ID",onChange:function(e){return s(e.target.value)}})}),d&&Object(g.jsx)(v.a,{variant:"danger",className:"error",children:d}),Object(g.jsx)(w.a,{variant:"primary",type:"submit",className:"login-form-btn",children:"Enter"})]})]})})})},N=a(56),k=a.n(N),S=a(84),C=a.n(S),D=a(99),M=a.n(D),T=a(156),L=a(164),I=a(157),A=a(96),E={chart:{type:"pie",options3d:{enabled:!0,alpha:45}},plotOptions:{pie:{innerSize:100,depth:45}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{enabled:!1}}}]},title:{text:"Assets Status"},series:[{data:[1,2,3]}]},_={chart:{type:"pie",options3d:{enabled:!0,alpha:45}},plotOptions:{pie:{innerSize:100,depth:45}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{enabled:!1}}}]},title:{text:"Health Level"},series:[{data:[1,2,3]}]},q=a(161),U=a(101),B=a(159);a(138);var F=function(e){var t=e.states,a=Object(u.g)();function n(){return(n=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("/logout").finally((function(){localStorage.clear(),a("/login")}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(g.jsx)(q.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:Object(g.jsxs)(p.a,{className:"nav-bar",fluid:!0,children:[Object(g.jsx)(d.b,{to:"/",className:"brand-link",children:Object(g.jsx)(q.a.Brand,{children:"Assets Manager"})}),Object(g.jsx)(q.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(g.jsxs)(q.a.Collapse,{id:"basic-navbar-nav",children:[Object(g.jsx)(U.a,{children:Object(g.jsx)(q.a.Text,{className:"me-3 company-name",children:"".concat(t.companyName)})}),Object(g.jsxs)(U.a,{className:"navbar-unit",children:[Object(g.jsx)(q.a.Text,{className:"me-1 ",children:"Unit(s):"}),Object(g.jsxs)(B.a,{className:"p-0",title:t.unitView.name||"All",id:"collasible-nav-dropdown",onSelect:function(e){return"all"===e?t.setUnitView("all"):t.setUnitView(t.units[e])},children:[Object(g.jsx)(B.a.Item,{eventKey:"all",children:"ALL"}),t.units.map((function(e,t){return Object(g.jsx)(B.a.Item,{className:"unit-name",eventKey:t,children:e.name},t)}))]})]}),Object(g.jsx)(U.a,{className:"ms-auto",children:Object(g.jsx)(U.a.Link,{onClick:function(){return n.apply(this,arguments)},children:"Exit"})})]})]})})},H=a(155);a(141);var P=function(e){var t=e.states,a=t.data,n=t.index,c=t.handleDelete,s=t.handleModify;return Object(g.jsx)(p.a,{children:Object(g.jsxs)(m.a,{className:"asset-card",children:[Object(g.jsx)(m.a.Img,{className:"card-img",variant:"top",src:"".concat("https://tractian-challange.s3.sa-east-1.amazonaws.com","/").concat(a.image)}),Object(g.jsxs)(m.a.Body,{children:[Object(g.jsxs)(m.a.Title,{className:"fs-4 text-center card-title",children:[a.name,Object(g.jsx)(H.a,{pill:!0,bg:function(e){switch(e){case"running":return"success";case"alerting":return"warning";case"stopped":return"danger"}}(a.status),text:"dark",className:"asset-card-subtitle",children:a.status.toUpperCase()})]}),Object(g.jsxs)(m.a.Text,{children:[Object(g.jsx)("span",{className:"fw-bold",children:"Model:"})," ".concat(a.model)]}),Object(g.jsxs)(m.a.Text,{children:[Object(g.jsx)("span",{className:"fw-bold",children:"Owner:"})," ".concat(a.owner)]}),Object(g.jsxs)(m.a.Text,{children:[Object(g.jsx)("span",{className:"fw-bold",children:"Description:"})," ".concat(a.description)]}),Object(g.jsxs)(m.a.Text,{children:[Object(g.jsx)("span",{className:"fw-bold",children:"Health level:"}),Object(g.jsx)("input",{type:"range",className:"fw-bold slider",value:a.healthLevel,readOnly:!0})]}),Object(g.jsxs)("div",{className:"d-flex justify-content-evenly",children:[Object(g.jsx)(w.a,{variant:"primary",onClick:function(){return s(n)},children:"Modify"}),Object(g.jsx)(w.a,{variant:"danger",onClick:function(){return c(n)},children:"Delete"})]})]})]})})},G=a(162);a(142);var K=function(e){var t=e.states,a=t.showModal,c=t.setShowModal,s=t.assetData,r=t.setAssetData,i=t.setAssets,u=t.unitView,d=Object(n.useState)(""),b=Object(j.a)(d,2),h=b[0],O=b[1],p=Object(n.useState)(""),m=Object(j.a)(p,2),y=m[0],N=m[1],k=Object(n.useState)(""),S=Object(j.a)(k,2),C=S[0],D=S[1],M=Object(n.useState)(""),T=Object(j.a)(M,2),L=T[0],I=T[1],A=Object(n.useState)(""),E=Object(j.a)(A,2),_=E[0],q=E[1],U=Object(n.useState)(""),B=Object(j.a)(U,2),F=B[0],H=B[1],P=Object(n.useState)(0),K=Object(j.a)(P,2),V=K[0],z=K[1],J=Object(n.useState)({}),W=Object(j.a)(J,2),R=W[0],Q=W[1];function X(e){return Y.apply(this,arguments)}function Y(){return(Y=Object(o.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O(""),r({}),Q({}),c(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(){return(Z=Object(o.a)(l.a.mark((function e(t){var a,n,o,j,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(o in t.preventDefault(),a=new FormData,n={name:y,owner:C,model:L,status:_,description:F,healthLevel:V})n[o]!==s[o]&&a.append(o,n[o]);if(R.name&&a.append("image",R),e.prev=5,!s._id){e.next=11;break}return e.next=9,x.put("/assets/".concat(s._id),a);case 9:e.next=13;break;case 11:return e.next=13,x.post("/units/".concat(u._id),a);case 13:return e.next=15,x.get("/units/".concat(u._id,"/assets"));case 15:j=e.sent,d=j.data,i(d),O(""),r({}),Q({}),c(!1),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(5),O("Unable to save changes to the asset");case 27:case"end":return e.stop()}}),e,null,[[5,24]])})))).apply(this,arguments)}return Object(n.useEffect)((function(){N(s.name||""),D(s.owner||""),I(s.model||""),q(s.status||""),H(s.description||""),z(s.healthLevel||0)}),[s]),Object(g.jsxs)(G.a,{show:a,onHide:X,children:[Object(g.jsx)(G.a.Header,{closeButton:!0,children:Object(g.jsx)(G.a.Title,{children:s?"Modify asset":"New asset"})}),Object(g.jsxs)(G.a.Body,{children:[Object(g.jsxs)(f.a,{onSubmit:function(e){return Z.apply(this,arguments)},id:"asset",children:[Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Name"}),Object(g.jsx)(f.a.Control,{required:!s,className:"w-50",type:"text",value:y,onChange:function(e){return N(e.target.value)}})]}),Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Owner"}),Object(g.jsx)(f.a.Control,{required:!s,className:"w-50",type:"text",value:C,onChange:function(e){return D(e.target.value)}})]}),Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Model"}),Object(g.jsx)(f.a.Control,{required:!s,className:"w-50",type:"text",value:L,onChange:function(e){return I(e.target.value)}})]}),Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Status"}),Object(g.jsx)(f.a.Select,{required:!s,className:"w-50",type:"text",value:_,onChange:function(e){return q(e.target.value)},children:["","running","alerting","stopped"].map((function(e,t){return Object(g.jsx)("option",{value:e,children:e},t)}))})]}),Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Description"}),Object(g.jsx)(f.a.Control,{required:!s,className:"w-50",as:"textarea",value:F,onChange:function(e){return H(e.target.value)}})]}),Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Health level"}),Object(g.jsxs)("div",{className:"w-50 hl-container",children:[Object(g.jsx)(f.a.Control,{required:!s,type:"number",min:"0",max:"100",className:"hl-number-input",value:V,onChange:function(e){return z(e.target.value)}}),Object(g.jsx)("input",{type:"range",className:"fw-bold slider slider-editable",min:"0",max:"100",value:V,onChange:function(e){return z(e.target.value)}})]})]}),Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Image"}),Object(g.jsx)(f.a.Control,{required:!s,className:"w-50",type:"file",onChange:function(e){return Q(e.target.files[0])}})]})]}),h&&Object(g.jsx)(v.a,{variant:"danger",className:"error",children:h})]}),Object(g.jsxs)(G.a.Footer,{children:[Object(g.jsx)(w.a,{variant:"secondary",onClick:X,children:"Close"}),Object(g.jsx)(w.a,{variant:"primary",type:"submit",form:"asset",children:s?"Save Changes":"Create asset"})]})]})};a(143),a(144);var V=function(){M()(k.a);var e=Object(n.useState)([]),t=Object(j.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)("all"),r=Object(j.a)(s,2),i=r[0],u=r[1],d=Object(n.useState)([]),b=Object(j.a)(d,2),h=b[0],O=b[1],m=Object(n.useState)(!1),f=Object(j.a)(m,2),y=f[0],N=f[1],S=Object(n.useState)({}),D=Object(j.a)(S,2),q=D[0],U=D[1],B=JSON.parse(localStorage.getItem("company"));function H(e){return G.apply(this,arguments)}function G(){return(G=Object(o.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Voc\xea tem certeza sobre deletar essa despesa? A a\xe7\xe3o n\xe3o poder\xe1 ser desfeita")){e.next=9;break}return e.next=4,x.delete("/assets/".concat(h[t]._id));case 4:return e.next=6,x.get("/units/".concat(i._id,"/assets"));case 6:a=e.sent,n=a.data,O(n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e){return z.apply(this,arguments)}function z(){return(z=Object(o.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N(!0),U(h[t]);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!B._id){e.next=6;break}return e.next=3,x.get("/companies/".concat(B._id));case 3:t=e.sent,a=t.data.units,c(a);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[B._id]),Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var t,a,n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("all"!==i||!B._id){e.next=8;break}return e.next=3,x.get("/".concat(B._id,"/all-assets"));case 3:t=e.sent,a=t.data,O(a),e.next=14;break;case 8:if(!i._id){e.next=14;break}return e.next=11,x.get("/units/".concat(i._id,"/assets"));case 11:n=e.sent,c=n.data,O(c);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[i,B._id]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(F,{states:{companyName:B.name,companyID:B._id,unitView:i,setUnitView:u,units:a}}),Object(g.jsx)("h1",{className:"display-1 text-center",children:"all"===i?"ALL":i.name.toUpperCase()}),Object(g.jsx)(p.a,{children:Object(g.jsxs)(T.a,{defaultActiveKey:"sumary",children:[Object(g.jsxs)(L.a,{eventKey:"sumary",title:"Sumary",children:[Object(g.jsx)(v.a,{variant:"danger",className:"error",children:"Feature under development: This charts don't represent actual data!"}),Object(g.jsx)(p.a,{children:Object(g.jsxs)(I.a,{className:"justify-content-md-center",children:[Object(g.jsx)(A.a,{md:"auto",children:Object(g.jsx)(C.a,{highcharts:k.a,options:_})}),Object(g.jsx)(A.a,{md:"auto",children:Object(g.jsx)(C.a,{highcharts:k.a,options:E})})]})})]}),Object(g.jsxs)(L.a,{eventKey:"assets",title:"Assets",children:["all"!==i&&Object(g.jsx)(w.a,{className:"add-new-asset-btn",onClick:function(){N(!0),U(!1)},children:"Add new asset"}),Object(g.jsx)(p.a,{className:"cards-container",children:h.length>0?h.map((function(e,t){return Object(g.jsx)(P,{states:{data:e,index:t,handleDelete:H,handleModify:V}},"card-".concat(t))})):"Network failure or there are no assets available for this unit"})]})]})}),Object(g.jsx)(K,{states:{showModal:y,setShowModal:N,assetData:q,setAssetData:U,setAssets:O,unitView:i}})]})},z=a(158);var J=function(e){var t=e.states,a=t.askEditModal,n=t.clearStates,c=t.actionTarget,s=t.askPassword,r=t.setEditionModal,i=t.refreshData;function j(e,t){return u.apply(this,arguments)}function u(){return(u=Object(o.a)(l.a.mark((function e(t,a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.delete("/".concat(t,"/").concat(a));case 2:i(t);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(g.jsxs)(G.a,{show:a,children:[Object(g.jsx)(G.a.Header,{children:Object(g.jsx)(G.a.Title,{children:"ACTION"})}),Object(g.jsxs)(G.a.Footer,{children:[Object(g.jsx)(w.a,{variant:"secondary",onClick:n,children:"Cancel"}),Object(g.jsx)(w.a,{variant:"danger",onClick:function(){return s(j,c)},children:"Delete"}),Object(g.jsx)(w.a,{variant:"primary",onClick:function(){return r(!0)},children:"Edit"})]})]})},W=a(25);var R=function(e){var t=e.states,a=t.newDataModal,c=t.actionTarget,s=t.clearStates,r=t.askPassword,i=t.refreshData,u=Object(n.useState)(""),d=Object(j.a)(u,2),b=d[0],h=d[1],O=Object(n.useState)(""),p=Object(j.a)(O,2),m=p[0],y=p[1],N=Object(n.useState)(""),k=Object(j.a)(N,2),S=k[0],C=k[1],D=Object(n.useState)(""),M=Object(j.a)(D,2),T=M[0],L=M[1];function I(e,t){return A.apply(this,arguments)}function A(){return(A=Object(o.a)(l.a.mark((function e(t,a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/".concat(t),a);case 2:e.t0=t,e.next="new-user"===e.t0?5:"new-company"===e.t0?7:"new-unit"===e.t0?9:11;break;case 5:return t="users",e.abrupt("break",12);case 7:return t="companies",e.abrupt("break",12);case 9:return t="units",e.abrupt("break",12);case 11:return e.abrupt("break",12);case 12:i(t);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){"new-user"!==c[0]&&"new-unit"!==c[0]||Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("/companies");case 2:t=e.sent,a=t.data,console.log(a),L(a);case 6:case"end":return e.stop()}}),e)})))()}),[c]),Object(g.jsxs)(G.a,{show:a,children:[Object(g.jsx)(G.a.Header,{children:Object(g.jsx)(G.a.Title,{children:"".concat(c.length>0&&c[0].toUpperCase())})}),Object(g.jsxs)(G.a.Body,{children:[Object(g.jsxs)(f.a,{onSubmit:function(e){e.preventDefault();try{r(I,[].concat(Object(W.a)(c),[{name:m,company:S}])),y(""),C(""),L("")}catch(t){h("Not able to create item")}},id:"new-data",children:[Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Name"}),Object(g.jsx)(f.a.Control,{required:!0,type:"text",value:m,className:"w-50",onChange:function(e){return y(e.target.value)}})]}),T&&Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)(f.a.Group,{className:"d-flex justify-content-evenly align-items-center mb-2",children:[Object(g.jsx)(f.a.Label,{className:"w-25 fw-bold",children:"Company"}),Object(g.jsxs)(f.a.Select,{required:!0,className:"w-50",type:"text",value:S,onChange:function(e){return C(e.target.value)},children:[Object(g.jsx)("option",{}),T.map((function(e,t){return Object(g.jsx)("option",{value:e.name,children:e.name},t)}))]})]})})]}),b&&Object(g.jsx)(v.a,{variant:"danger",className:"error",children:b})]}),Object(g.jsxs)(G.a.Footer,{children:[Object(g.jsx)(w.a,{variant:"secondary",onClick:function(){s(),y(""),C(""),L("")},children:"Cancel"}),Object(g.jsx)(w.a,{variant:"primary",type:"submit",form:"new-data",children:"Save channges"})]})]})};var Q=function(e){var t=e.states,a=t.editionModal,c=t.actionTarget,s=t.clearStates,r=t.askPassword,i=t.refreshData,u=Object(n.useState)(""),d=Object(j.a)(u,2),b=d[0],h=d[1];function O(e,t,a){return p.apply(this,arguments)}function p(){return(p=Object(o.a)(l.a.mark((function e(t,a,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.put("/".concat(t,"/").concat(a),n);case 2:i(t);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(g.jsxs)(G.a,{show:a,children:[Object(g.jsx)(G.a.Header,{children:Object(g.jsx)(G.a.Title,{children:"EDIT ".concat(c.length>0&&c[0].toUpperCase())})}),Object(g.jsxs)(G.a.Body,{children:[Object(g.jsx)(f.a.Label,{className:"fw-bold",children:"Name"}),Object(g.jsx)(f.a.Control,{required:!0,type:"text",id:"master-password",value:b,onChange:function(e){return h(e.target.value)}}),Object(g.jsx)(v.a,{variant:"danger",className:"error",children:'Due to major implications, only "name" can be updated'})]}),Object(g.jsxs)(G.a.Footer,{children:[Object(g.jsx)(w.a,{variant:"secondary",onClick:s,children:"Cancel"}),Object(g.jsx)(w.a,{variant:"primary",onClick:function(){return r(O,[].concat(Object(W.a)(c),[{name:b}]))},children:"Save channges"})]})]})};var X=function(e){var t=e.states,a=Object(u.g)(),c=Object(n.useState)(""),s=Object(j.a)(c,2),r=s[0],i=s[1],d=Object(n.useState)(""),b=Object(j.a)(d,2),h=b[0],O=b[1];function p(){return(p=Object(o.a)(l.a.mark((function e(){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.post("/master",{password:h});case 3:(a=t.action).fn.apply(a,Object(W.a)(t.action.params)),O(""),i(""),t.clearStates(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),i("Unable to authenticate");case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}return Object(g.jsxs)(G.a,{show:t.pwModal,children:[Object(g.jsxs)(G.a.Body,{children:[Object(g.jsx)(f.a.Label,{className:"fw-bold",children:"Master Password"}),Object(g.jsx)(f.a.Control,{required:!0,type:"password",id:"master-password",value:h,onChange:function(e){return O(e.target.value)}}),Object(g.jsxs)("label",{children:[Object(g.jsx)("input",{type:"checkbox",value:h,onClick:function(){var e=document.getElementById("master-password");"password"===e.type?e.type="text":e.type="password"}})," Show Password"]}),Object(g.jsx)(v.a,{variant:"primary",className:"error",children:"Test PW: tractian-challange"}),r&&Object(g.jsx)(v.a,{variant:"danger",className:"error",children:r})]}),Object(g.jsxs)(G.a.Footer,{children:[Object(g.jsx)(w.a,{variant:"danger",onClick:function(){t.clearStates(),a("/")},children:"Close"}),Object(g.jsx)(w.a,{variant:"primary",onClick:function(){return function(){return p.apply(this,arguments)}()},children:"OK"})]})]})};a(145);var Y=function(){var e=Object(n.useState)(!1),t=Object(j.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(!1),r=Object(j.a)(s,2),i=r[0],u=r[1],d=Object(n.useState)(!1),b=Object(j.a)(d,2),h=b[0],O=b[1],m=Object(n.useState)(!1),f=Object(j.a)(m,2),v=f[0],y=f[1],N=Object(n.useState)(!1),k=Object(j.a)(N,2),S=k[0],C=k[1],D=Object(n.useState)("users"),M=Object(j.a)(D,2),I=M[0],A=M[1],E=Object(n.useState)({}),_=Object(j.a)(E,2),U=_[0],B=_[1],F=Object(n.useState)([]),H=Object(j.a)(F,2),P=H[0],G=H[1],K=Object(n.useState)([]),V=Object(j.a)(K,2),W=V[0],Y=V[1],Z=Object(n.useState)([]),$=Object(j.a)(Z,2),ee=$[0],te=$[1],ae=Object(n.useState)([]),ne=Object(j.a)(ae,2),ce=ne[0],se=ne[1];function re(e){return ie.apply(this,arguments)}function ie(){return(ie=Object(o.a)(l.a.mark((function e(t){var a,n,c,s,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t,e.next="users"===e.t0?3:"companies"===e.t0?9:"units"===e.t0?15:21;break;case 3:return e.next=5,x.get("/users");case 5:return a=e.sent,n=a.data,Y(n),e.abrupt("break",22);case 9:return e.next=11,x.get("/companies");case 11:return c=e.sent,s=c.data,te(s),e.abrupt("break",22);case 15:return e.next=17,x.get("/units");case 17:return r=e.sent,i=r.data,se(i),e.abrupt("break",22);case 21:return e.abrupt("break",22);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function le(e,t){c(!0),B({fn:e,params:t})}function oe(){B({}),G([]),u(!1),c(!1),O(!1),y(!1)}return Object(n.useEffect)((function(){Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return le(C,[!0]),e.next=3,x.get("/users");case 3:t=e.sent,a=t.data,Y(a);case 6:case"end":return e.stop()}}),e)})))()}),[]),Object(n.useEffect)((function(){re(I)}),[I]),Object(g.jsxs)(g.Fragment,{children:[S?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(q.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:Object(g.jsx)(p.a,{className:"nav-bar",fluid:!0,children:Object(g.jsx)(q.a.Brand,{children:"Assets Manager"})})}),Object(g.jsxs)(p.a,{className:"mt-5",children:[Object(g.jsx)("h1",{className:"text-center",children:" ADMINISTRATION PANEL"}),Object(g.jsx)(p.a,{className:"mt-5",children:Object(g.jsxs)(T.a,{activeKey:I,onSelect:function(e){le(A,[e])},children:[Object(g.jsx)(L.a,{eventKey:"users",title:"USERS",children:Object(g.jsxs)(p.a,{children:[Object(g.jsx)(w.a,{className:"add-new-asset-btn",onClick:function(){G(["new-user"]),y(!0)},children:" new user"}),Object(g.jsxs)(z.a,{striped:!0,hover:!0,responsive:!0,className:"mt-2",children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Name"}),Object(g.jsx)("th",{children:"Company"}),Object(g.jsx)("th",{children:"Login ID"}),Object(g.jsx)("th",{children:"ID"})]})}),Object(g.jsx)("tbody",{children:W.length>0&&W.map((function(e,t){return Object(g.jsxs)("tr",{onClick:function(e){var t=e.target.closest("tr").querySelector(".id").innerHTML;G(["users",t]),u(y)},children:[Object(g.jsx)("td",{children:e.name}),Object(g.jsx)("td",{children:e.company.name}),Object(g.jsx)("td",{children:e.loginID}),Object(g.jsx)("td",{className:"id",children:e._id})]},t)}))})]})]})}),Object(g.jsx)(L.a,{eventKey:"companies",title:"COMPANIES",children:Object(g.jsxs)(p.a,{children:[Object(g.jsx)(w.a,{className:"add-new-asset-btn",onClick:function(){G(["new-company"]),y(!0)},children:"Add new company"}),Object(g.jsxs)(z.a,{striped:!0,hover:!0,responsive:!0,className:"mt-2",children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Company"}),Object(g.jsx)("th",{children:"ID"})]})}),Object(g.jsx)("tbody",{children:ee.length>0&&ee.map((function(e,t){return Object(g.jsxs)("tr",{onClick:function(e){var t=e.target.closest("tr").querySelector(".id").innerHTML;G(["companies",t]),u(!0)},children:[Object(g.jsx)("td",{children:e.name}),Object(g.jsx)("td",{className:"id",children:e._id})]},t)}))})]})]})}),Object(g.jsx)(L.a,{eventKey:"units",title:"UNITS",children:Object(g.jsxs)(p.a,{children:[Object(g.jsx)(w.a,{className:"add-new-asset-btn",onClick:function(){G(["new-unit"]),y(!0)},children:"Add new unit"}),Object(g.jsxs)(z.a,{striped:!0,hover:!0,responsive:!0,className:"mt-2",children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Unit"}),Object(g.jsx)("th",{children:"Company"}),Object(g.jsx)("th",{children:"ID"})]})}),Object(g.jsx)("tbody",{children:ce.length>0&&ce.map((function(e,t){return Object(g.jsxs)("tr",{onClick:function(e){var t=e.target.closest("tr").querySelector(".id").innerHTML;G(["units",t]),u(!0)},children:[Object(g.jsx)("td",{children:e.name}),Object(g.jsx)("td",{children:e.company.name}),Object(g.jsx)("td",{className:"id",children:e._id})]},t)}))})]})]})})]})})]})]}):null,Object(g.jsx)(J,{states:{askEditModal:i,setEditionModal:O,actionTarget:P,askPassword:le,clearStates:oe,refreshData:re}}),Object(g.jsx)(Q,{states:{editionModal:h,actionTarget:P,askPassword:le,clearStates:oe,refreshData:re}}),Object(g.jsx)(R,{states:{newDataModal:v,actionTarget:P,askPassword:le,clearStates:oe,refreshData:re}}),Object(g.jsx)(X,{states:{pwModal:a,action:U,clearStates:oe}})]})};var Z=function(){return Object(g.jsx)("h1",{children:"404: Not Found"})},$=(a(146),function(){var e=Object(n.useState)(!1),t=Object(j.a)(e,2),a=t[0],c=t[1];function s(e){var t=e.children,s=Object(u.f)();return Object(n.useEffect)((function(){Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.get("/me");case 3:c(!0),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),c(!1);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()})),a?t:Object(g.jsx)(u.a,{to:"/login",state:{from:s}})}return Object(g.jsx)(d.a,{basename:"/tractian-fullstack-challenge",children:Object(g.jsxs)(u.d,{children:[Object(g.jsx)(u.b,{path:"/login",element:Object(g.jsx)(y,{})}),Object(g.jsx)(u.b,{path:"/admin",element:Object(g.jsx)(Y,{})}),Object(g.jsx)(u.b,{path:"/",element:Object(g.jsx)(s,{children:Object(g.jsx)(V,{})})}),Object(g.jsx)(u.b,{path:"*",element:Object(g.jsx)(Z,{})})]})})});r.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)($,{})}),document.getElementById("root"))}},[[147,1,2]]]);
//# sourceMappingURL=main.733f07bb.chunk.js.map