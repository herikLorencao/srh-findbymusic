(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"22bb":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{staticClass:"flex column flex-center dark-page"},[t.evaluationIsFinish?s("div",{staticClass:"evaluation-success flex column items-center"},[s("h1",[t._v("Avaliação concluída com sucesso!")]),s("p",[t._v("Esses dados serão de extrema importância para meu estudo de Sistemas de Recomendação")]),s("p",[t._v("Obrigado pela ajuda, agora você pode sair do sistema ou refazer a avaliação")]),s("q-icon",{staticClass:"success-icon",attrs:{name:"fas fa-check-circle"}})],1):s("MusicScore",{on:{evaluationFinish:t.evaluationFinish}})],1)},i=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.selectedItem&&!t.loading?a("div",{staticClass:"flex column items-center"},[t.pagination&&t.pagination.totalElements?a("span",{staticClass:"rating-progress"},[t._v("\n    Itens: "+t._s(t.itemIdx+1)+" / "+t._s(t.pagination.totalElements)+"\n  ")]):t._e(),t.selectedItem.attributes.length>0?a("img",{staticClass:"music-album",attrs:{src:t.selectedItem.attributes[0].value,alt:"Capa Álbum"}}):a("img",{staticClass:"music-album",attrs:{src:s("555a"),alt:"Capa Álbum"}}),a("span",{staticClass:"music-title"},[t._v(t._s(t.selectedItem.name))]),t.selectedItem?a("q-rating",{attrs:{size:"2.5em",max:5,"icon-selected":"star",icon:"star_border","icon-half":"star_half",color:"secondary"},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}}):t._e(),a("div",{staticClass:"flex justify-around music-actions"},[a("q-btn",{attrs:{icon:"fas fa-backward"},on:{click:t.backward}}),a("q-btn",{attrs:{icon:"fas fa-question"},on:{click:t.toggleVisiblePlaylist}}),a("q-btn",{class:t.forwardClass,attrs:{icon:"fas fa-forward"},on:{click:t.forward}})],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.visiblePlaylist,callback:function(e){t.visiblePlaylist=e},expression:"visiblePlaylist"}},[a("q-card",{staticClass:"playlist flex column dark-page"},[a("iframe",{attrs:{src:"https://open.spotify.com/embed/playlist/37i9dQZF1DWWrDntpgyzu9",width:"300",height:"380",frameborder:"0",allowtransparency:"true",allow:"encrypted-media"}}),a("q-btn",{attrs:{label:"Voltar para avaliações"},on:{click:t.toggleVisiblePlaylist}})],1)],1)],1):a("q-circular-progress",{staticClass:"q-ma-md",attrs:{indeterminate:"",size:"150px",color:"secondary"}})},n=[],o=(s("e6cf"),s("ddb0"),s("dba7")),c=s("4427"),l=s("eff5"),u=s("7b5e"),d={name:"MusicScore",computed:{selectedItem(){return this.items.length>=0?this.items[this.itemIdx]:null},forwardClass(){const t=this.itemIdx+1;return this.pagination.totalElements===t?(Object(u["a"])("custom-warning","Clique no botão de avançar para finalizar a avaliação"),"forward-finish"):""}},data(){return{itemIdx:0,items:[],itemsRatings:[],pagination:{perPage:0,pageNumber:0,totalPages:0,totalElements:0},score:0,loading:!1,visiblePlaylist:!1}},methods:{toggleVisiblePlaylist(){this.visiblePlaylist=!this.visiblePlaylist},backward(){this.saveItemRating();const t=this.itemIdx-1;t>=0&&(this.itemIdx=t),this.selectedItem.score?this.score=this.selectedItem.score:this.score=0},async forward(){this.saveItemRating();const t=this.itemIdx+1;if(t>=this.items.length&&t<this.pagination.totalElements){const t=this.pagination.pageNumber+1;await this.loadItems(t)}t===this.pagination.totalElements?await this.$emit("evaluationFinish",this.items):this.itemIdx=t,this.selectedItem.score?this.score=this.selectedItem.score:this.score=0},saveItemRating(){const t=new c["a"],e=this.selectedItem,s=this.$store.getters["user/getUserId"],a={score:this.score,itemId:e.id,evaluatorId:s};t.create(a)},async loadAttributes(t){const e=new l["a"],s=await e.listAttributes(t);return s&&s["_embedded"].attributes?s["_embedded"].attributes:[]},async loadItems(t=0){this.loading=!0;const e=new o["a"],s=await e.listItens(t);s&&s.page&&(this.pagination.totalPages=s.page.totalPages,this.pagination.totalElements=s.page.totalElements,this.pagination.perPage=s.page.size),s&&s["_embedded"].itens&&this.items.push(...s["_embedded"].itens);const a=this.items.map((async t=>(t.attributes=await this.loadAttributes(t.id),t)));this.items=await Promise.all(a),this.loading=!1}},watch:{score(t){this.items.length>0&&(this.items[this.itemIdx].score=t)}},async mounted(){await this.loadItems()}},m=d,h=s("2877"),p=s("daf4"),g=s("9c40"),b=s("24e8"),f=s("f09f"),v=s("58ea"),I=s("eebe"),w=s.n(I),y=Object(h["a"])(m,r,n,!1,null,"54529e40",null),x=y.exports;w()(y,"components",{QRating:p["a"],QBtn:g["a"],QDialog:b["a"],QCard:f["a"],QCircularProgress:v["a"]});var _={name:"CreateRatings",components:{MusicScore:x},data(){return{evaluationIsFinish:!1}},methods:{evaluationFinish(){this.evaluationIsFinish=!0}}},C=_,P=s("9989"),U=s("0016"),j=Object(h["a"])(C,a,i,!1,null,"77e91658",null);e["default"]=j.exports;w()(j,"components",{QPage:P["a"],QIcon:U["a"]})},4427:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));s("e6cf");var a=s("043f");class i{constructor(){this.client=new a["a"],this.resourceUrl="/itemratings"}async listByProject(t){const e=1;return this.client.getAll(`${this.resourceUrl}/projects/${e}`,t)}async listByEvaluator(t,e){return this.client.getAll(`${this.resourceUrl}/evaluators/${t}`,e)}create(t){return this.client.post(this.resourceUrl,t)}}},"555a":function(t,e,s){t.exports=s.p+"img/icon.7e3d3f43.png"},dba7:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));s("e6cf");var a=s("043f"),i=s("7b5e");class r{constructor(){this.client=new a["a"],this.resourceUrl="/projects"}async listItens(t){const e=1;return this.client.getAll(`${this.resourceUrl}/${e}/itens`,t)}async addUser(t,e){const s={projectId:t,evaluatorId:e},a=await this.client.post(`${this.resourceUrl}/${t}/evaluators`,s);return a&&Object(i["a"])("positive","Login realizado com sucesso"),a}}},eff5:function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));s("e6cf");var a=s("043f"),i=s("7b5e");class r{constructor(){this.client=new a["a"],this.resourceUrl="/itens"}async find(t){return this.client.get(this.resourceUrl,t)}async list(){return this.client.getAll(this.resourceUrl)}async create(t){const e=await this.client.post(this.resourceUrl,t);return e&&Object(i["a"])("positive","Item criado com sucesso"),e}async update(t){const e=await this.client.put(this.resourceUrl,t.id,t);return e&&Object(i["a"])("positive","Item editado com sucesso"),e}async remove(t){const e=await this.client.delete(this.resourceUrl,t);e?Object(i["a"])("positive","Item removido com sucesso"):Object(i["a"])("negative","Verifique se o item não esta sendo usado em um projeto")}async listAttributes(t){return this.client.getAll(`${this.resourceUrl}/${t}/attributes`)}}}}]);