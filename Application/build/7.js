(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{779:function(e,t,a){"use strict";a.r(t);var n=a(11),r=a.n(n),c=a(193),l=a.n(c),i=a(0),o=a.n(i),s=a(50),d=a(750),u=a(109),m=a(106),p=a(773),f=a(746),h=a(748),b=a(749),y=a(756),E=a(774),O=a(250),k=a.n(O),g=a(752),j=a(751),v=a(775),w=a(1),x=a.n(w),T=a(124),C=a.n(T),P=a(249);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function S(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var B={isOpen:x.a.bool.isRequired,toggleModal:x.a.func.isRequired,blockEdited:x.a.object},H=(d.a.Text,d.a.Title,g.a.TextArea),D=function(e){var t=j.a.useForm(),a=l()(t,1)[0],n=e.isOpen,r=e.toggleModal,c=(e.title,e.type,e.userLogin),s=e.blockEdited,d=Object(i.useState)(!1),u=l()(d,2),p=u[0],h=u[1];Object(i.useEffect)((function(){C.a.isEmpty(s)?a.setFieldsValue({nameBlock:"",address:"",description:""}):a.setFieldsValue({nameBlock:s.nameBlock,address:s.address,description:s.desc})}),[n,s]);var b=function(t){h(!0);var a=P.e(S({id:s.key},t));a&&a.then((function(t){t.data&&t.data.data?(f.a.success("Cập nhật thành công!"),r(),e.callback()):f.a.error("Cập nhật thất bại!"),h(!1)}))},y=function(t){if(c.id){h(!0);var a=P.a(S({},t,{idOwner:c.id}));a&&a.then((function(t){t.data&&t.data.data?(f.a.success("Tạo khu trọ thành công!"),r(),e.callback()):f.a.error("Tạo khu trọ thất bại! Xin vui lòng thử lại"),h(!1)}))}};return o.a.createElement(v.a,{width:700,title:o.a.createElement("div",{className:"flex-row",style:{fontSize:20,color:"#08979c"}},o.a.createElement("i",{className:C.a.isEmpty(s)?"icon-add":"icon-createmode_editedit"}),"  ",o.a.createElement("strong",null,C.a.isEmpty(s)?"Thêm mới":"Chỉnh sửa")),forceRender:!0,destroyOnClose:!1,getContainer:!1,visible:n,onOk:function(){r()},onCancel:function(){r()},footer:null},o.a.createElement(j.a,k()({},{labelCol:{xs:{span:24},md:{span:6}},wrapperCol:{xs:{span:24},md:{span:18}}},{form:a,name:"form-block",onFinish:function(e){C.a.isEmpty(s)?y(e):b(e)}}),o.a.createElement(j.a.Item,{label:"Tên khu/Tòa nhà",name:"nameBlock",rules:[{required:!0,message:"Hãy nhập tên khu trọ/căn hộ"}]},o.a.createElement(g.a,{placeholder:"Nhập tên khu trọ/căn hộ"})),o.a.createElement(j.a.Item,{label:"Địa chỉ",name:"address",rules:[{required:!0,message:"Hãy nhập Địa chỉ khu trọ/căn hộ"}]},o.a.createElement(H,{placeholder:"Hãy nhập Địa chỉ khu trọ/căn hộ"})),o.a.createElement(j.a.Item,{label:"Mô tả",name:"description"},o.a.createElement(H,{placeholder:"Hãy nhập mô tả"})),o.a.createElement(j.a.Item,{wrapperCol:{md:{span:8,offset:16}}},o.a.createElement("div",{className:"flex-row",style:{justifyContent:"flex-end"}},o.a.createElement(m.a,{onClick:function(){r()}},"Hủy bỏ")," ",o.a.createElement(m.a,{htmlType:"submit",type:"primary",loading:p},"Lưu lại")))))};D.propTypes=B,D.defaultProps={title:"Thêm mới",type:"create",blockEdited:{}};var I=Object(s.b)((function(e){return{userLogin:e.Layouts.layoutReducer.userLogin}}))(D),X=a(21);function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function R(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var _=d.a.Title,F=(d.a.Text,{layout:X.c});t.default=Object(s.b)(null,F)((function(e){var t=Object(i.useState)([]),a=l()(t,2),n=a[0],r=a[1],c=Object(i.useState)({isOpen:!1,blockEdited:{}}),s=l()(c,2),d=s[0],O=s[1],k=Object(i.useState)(!1),g=l()(k,2),j=g[0],v=g[1],w=Object(i.useState)([]),x=l()(w,2),T=x[0],C=x[1],N={selectedRowKeys:T,onChange:function(e){C(e)}},S=[{title:"",dataIndex:"edit",key:"edit",width:100,render:function(e){return o.a.createElement("div",{className:"flex-row-center"},o.a.createElement(u.a,{title:"Sửa"},o.a.createElement(m.a,{onClick:function(){return D(e)},className:"flex-row-center",size:"small",shape:"circle"},o.a.createElement("i",{className:"icon-createmode_editedit"}))),"  ",o.a.createElement(u.a,{title:"Xóa"},o.a.createElement(p.a,{title:"Bạn muốn xóa khu trọ/căn hộ này?",onConfirm:function(){return B(e)},okText:"Xóa",cancelText:"Hủy"},o.a.createElement(m.a,{className:"flex-row-center",size:"small",type:"danger",shape:"circle"},o.a.createElement("i",{className:"icon-highlight_remove"})))))}},{title:"Tên khu/Tòa nhà",dataIndex:"nameBlock",key:"nameBlock"},{title:"Địa chỉ",dataIndex:"address",key:"address"},{title:"Mô tả",dataIndex:"desc",key:"desc"}];Object(i.useEffect)((function(){e.layout({type:"path",value:"blocks"}),H()}),[]);var B=function(e){var t=P.b({id:e});t&&t.then((function(e){e.data&&e.data.data?(f.a.success("Xóa khu trọ/căn hộ thành công"),H()):f.a.error("Xóa khu trọ/căn hộ thất bại!")}))},H=function(){var t=P.d();v(!0),t&&t.then((function(t){if(t.data&&t.data.data){var a=t.data.data.blocks,n=a.map((function(e){return{key:e.id,edit:e.id,nameBlock:e.nameBlock,address:e.address,desc:e.description}}));r(n),e.layout({type:"getBlocks",value:a||[]})}v(!1)}))},D=function(e){var t=n.find((function(t){return t.key===e}));O(R({},d,{isOpen:!0,blockEdited:t}))};return o.a.createElement(o.a.Fragment,null,o.a.createElement(h.a,{style:{padding:10}},o.a.createElement(b.a,{xs:{span:24,offset:0},md:{span:12,offset:0}},o.a.createElement(_,{level:4},"QUẢN LÝ DANH SÁCH NHÀ TRỌ")),o.a.createElement(b.a,{xs:{span:24,offset:0},md:{span:12,offset:0},style:{display:"flex",justifyContent:"flex-end"}},o.a.createElement(m.a,{type:"primary",className:"flex-row",onClick:function(){O(R({},d,{blockEdited:{},isOpen:!0}))}},o.a.createElement("i",{className:"icon-add_circle_outlinecontrol_point"}),"   Thêm mới"),"  ",o.a.createElement(p.a,{disabled:!(T.length>0),placement:"bottom",title:"Bạn có muốn xóa ".concat(T.length," khu trọ/căn hộ này?"),onConfirm:function(){var e=P.c({blocksId:T});e&&e.then((function(e){e.data&&e.data.data?(f.a.success("Xóa thành công!"),C([]),H()):f.a.error("Xóa không thành công!")}))},okText:"Xóa",cancelText:"Hủy"},o.a.createElement(m.a,{type:"danger",disabled:!(T.length>0)},o.a.createElement("i",{className:"icon-delete"}),"   Xóa nhiều")))),o.a.createElement(y.a,{spinning:j,tip:"Loading..."},o.a.createElement(h.a,{style:{padding:10}},o.a.createElement(E.a,{size:"small",rowSelection:N,style:{width:"100%"},columns:S,dataSource:n}))),o.a.createElement(I,{blockEdited:d.blockEdited,isOpen:d.isOpen,toggleModal:function(){O(R({},d,{isOpen:!d.isOpen}))},callback:function(){H()}}))}))}}]);
//# sourceMappingURL=7.js.map