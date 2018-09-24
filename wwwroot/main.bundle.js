webpackJsonp([1,4],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_model__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(userservice, hubService, route) {
        this.userservice = userservice;
        this.hubService = hubService;
        this.route = route;
        this.conversations = [];
        this.messages = [];
        this.userId = 1;
        this.audio = new Audio("assets/audio/facebook.mp3");
        this.audio.load();
    }
    HomeComponent.prototype.playAudio = function () {
        this.audio.play();
    };
    HomeComponent.prototype.afterConnectionEstablished = function () {
        var _this = this;
        this.hubService.invoke('GetConversations', this.userId).then(function (conversations) {
            var allConversation = [];
            for (var i = 0; i < conversations.length; i++) {
                var cnvs = new __WEBPACK_IMPORTED_MODULE_3__shared_model__["b" /* Conversation */]();
                cnvs.mapData(conversations[i], _this.userId);
                allConversation.push(cnvs);
            }
            (_a = _this.conversations).push.apply(_a, allConversation);
            _this.currentConversation = _this.conversations[0];
            _this.mainUser = _this.conversations[0].getHomeUser();
            var _a;
        });
        this.hubService.sub("receiveMessage", function (message) {
            if (message.userId != _this.mainUser.id) {
                _this.playAudio();
            }
            var cnvs = _this.conversations.filter(function (c) { return c.id == message.conversationId; })[0];
            if (_this.currentConversation.id != cnvs.id) {
                cnvs.hasUnreadMessages = true;
            }
            if (cnvs == null) {
                _this.hubService.invoke('GetConversationById', message.conversationId).then(function (conversation) {
                    conversation.homeUserId = _this.userId;
                    _this.conversations.push(conversation);
                });
            }
            else {
                cnvs.messages.push(message);
            }
        });
        this.hubService.sub("statusChanged", function (status) {
            var cnvs = _this.getConversationByUserId(status.userId);
            cnvs.getAwayUser().isOnline = status.connectedStatus;
            cnvs.getAwayUser().customStatus = status.customStatus;
        });
        this.hubService.onClose(function (e) { _this.connectionLost(); });
        this.hubService.sub("isTyping", function (typingModel) {
            var cnvs = _this.getConversationById(typingModel.conversationId);
            cnvs.isTyping = typingModel.isTyping;
        });
    };
    HomeComponent.prototype.getConversationById = function (id) {
        return this.conversations.filter(function (c) { return c.id == id; })[0];
    };
    HomeComponent.prototype.connectionLost = function () {
        this.lostConnection = true;
    };
    HomeComponent.prototype.reconnect = function () {
        var _this = this;
        this.hubService.initialize(this.userId).then(function () { _this.lostConnection = false; }).catch(function () { alert("could not establish connection"); });
    };
    HomeComponent.prototype.getConversationByUserId = function (uid) {
        return this.conversations.filter(function (c) { return (c.homeUserId == c.user1Id) ? c.user2Id == uid : c.user1Id == uid; })[0];
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = this.route.snapshot.params['id'];
        this.hubService.initialize(this.userId).then(function () { _this.afterConnectionEstablished(); });
    };
    HomeComponent.prototype.switchChat = function (conversationId) {
        var _this = this;
        var existingConversation = this.conversations.filter(function (c) { return c.id == conversationId; })[0];
        existingConversation.hasUnreadMessages = false;
        if (existingConversation == null) {
            this.hubService.invoke('GetConversationById', conversationId).then(function (conversation) {
                conversation.homeUserId = _this.userId;
                _this.conversations.push(conversation);
                _this.currentConversation = conversation;
            });
        }
        else {
            this.currentConversation = existingConversation;
        }
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home-component',
        template: __webpack_require__(268),
        styles: [__webpack_require__(254)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services__["b" /* HubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services__["b" /* HubService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 148;


/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(193);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(266),
        styles: [__webpack_require__(252)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Configuration; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Configuration = (function () {
    function Configuration() {
        this.Server = 'http://localhost:5000/';
    }
    return Configuration;
}());
Configuration = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Configuration);

//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routes__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_core_module__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home_module__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_app_config__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routes__["a" /* AppRoutes */],
            __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__core_core_module__["a" /* CoreModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6__home_home_module__["a" /* HomeModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_8__shared_app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_8__shared_app_config__["b" /* APP_DI_CONFIG */] }, __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__shared_services__["b" /* HubService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]],
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(45);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutes; });

var routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];
var AppRoutes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_model__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_font_awesome_filetypes__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_font_awesome_filetypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_font_awesome_filetypes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_app_config__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_lightbox__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttachmentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var AttachmentComponent = (function () {
    function AttachmentComponent(config, _lightbox) {
        this.config = config;
        this._lightbox = _lightbox;
        this.attachments = [];
        this.images = [];
        this.videos = [];
        this.audios = [];
        this.others = [];
        this.AtachmentContentType = __WEBPACK_IMPORTED_MODULE_1__shared_model__["c" /* AtachmentContentType */];
        this.apiUrl = config.apiEndpoint + "/chat/attachments";
    }
    AttachmentComponent.prototype.open = function (index) {
        // open lightbox
        this._lightbox.open(this.images, index);
    };
    AttachmentComponent.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.attachments; _i < _a.length; _i++) {
            var attachment = _a[_i];
            if (attachment.attachmentType == __WEBPACK_IMPORTED_MODULE_1__shared_model__["c" /* AtachmentContentType */].Image) {
                var src = this.apiUrl + "/" + attachment.id;
                var caption = attachment.fileName;
                var thumb = this.apiUrl + "/" + attachment.id;
                var album = {
                    src: src,
                    caption: caption,
                    thumb: thumb
                };
                this.images.push(album);
            }
            else if (attachment.attachmentType == __WEBPACK_IMPORTED_MODULE_1__shared_model__["c" /* AtachmentContentType */].Video) {
                this.videos.push(attachment);
            }
            else if (attachment.attachmentType == __WEBPACK_IMPORTED_MODULE_1__shared_model__["c" /* AtachmentContentType */].Audio) {
                this.audios.push(attachment);
            }
            else if (attachment.attachmentType == __WEBPACK_IMPORTED_MODULE_1__shared_model__["c" /* AtachmentContentType */].Other) {
                this.others.push(attachment);
            }
        }
    };
    AttachmentComponent.prototype.checkType = function (shouldbe, is) {
        return shouldbe == is;
    };
    AttachmentComponent.prototype.fileIcon = function (filename) {
        var extension = filename.split('.').pop();
        var icon = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_font_awesome_filetypes__["getIconForExtension"])(extension);
        return icon;
    };
    return AttachmentComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AttachmentComponent.prototype, "attachments", void 0);
AttachmentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-attachment',
        template: __webpack_require__(267),
        styles: [__webpack_require__(253)]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__shared_app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_app_config__["c" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_app_config__["c" /* AppConfig */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_lightbox__["b" /* Lightbox */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_lightbox__["b" /* Lightbox */]) === "function" && _b || Object])
], AttachmentComponent);

var _a, _b;
//# sourceMappingURL=attachment.component.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__(164);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CoreModule = CoreModule_1 = (function () {
    function CoreModule() {
    }
    CoreModule.forRoot = function () {
        return {
            ngModule: CoreModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__app_constants__["a" /* Configuration */]
            ]
        };
    };
    return CoreModule;
}());
CoreModule = CoreModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]
        ]
    })
], CoreModule);

var CoreModule_1;
//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_home_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users_users_component__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messages_messages_component__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_routes__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_pipes__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular_linky__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular_linky___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular_linky__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__link_preview_link_preview_component__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__attachment_attachment_component__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_videogular2_core__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_videogular2_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_videogular2_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_videogular2_controls__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_videogular2_controls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_videogular2_controls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_videogular2_overlay_play__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_videogular2_overlay_play___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_videogular2_overlay_play__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_videogular2_buffering__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_videogular2_buffering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_videogular2_buffering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_hammerjs__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_lightbox__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_7__home_routes__["a" /* HomeRoutes */],
            __WEBPACK_IMPORTED_MODULE_9_angular_linky__["LinkyModule"],
            __WEBPACK_IMPORTED_MODULE_12_videogular2_core__["VgCoreModule"],
            __WEBPACK_IMPORTED_MODULE_13_videogular2_controls__["VgControlsModule"],
            __WEBPACK_IMPORTED_MODULE_14_videogular2_overlay_play__["VgOverlayPlayModule"],
            __WEBPACK_IMPORTED_MODULE_15_videogular2_buffering__["VgBufferingModule"],
            __WEBPACK_IMPORTED_MODULE_17_angular2_lightbox__["a" /* LightboxModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__components_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_5__users_users_component__["a" /* UsersComponent */],
            __WEBPACK_IMPORTED_MODULE_10__link_preview_link_preview_component__["a" /* LinkPreviewComponent */], __WEBPACK_IMPORTED_MODULE_11__attachment_attachment_component__["a" /* AttachmentComponent */],
            __WEBPACK_IMPORTED_MODULE_6__messages_messages_component__["a" /* MessagesComponent */], __WEBPACK_IMPORTED_MODULE_8__shared_pipes__["a" /* FirstLetterPipe */], __WEBPACK_IMPORTED_MODULE_8__shared_pipes__["b" /* LinkPreviewPipe */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__components_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_5__users_users_component__["a" /* UsersComponent */]
        ]
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_home_component__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeRoutes; });


var routes = [
    { path: 'home/:id', component: __WEBPACK_IMPORTED_MODULE_1__components_home_component__["a" /* HomeComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_1__components_home_component__["a" /* HomeComponent */] }
];
var HomeRoutes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=home.routes.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_app_config__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkPreviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var LinkPreviewComponent = (function () {
    function LinkPreviewComponent(http, config) {
        this.http = http;
        this.config = config;
        this.metadatas = [];
    }
    LinkPreviewComponent.prototype.ngOnInit = function () {
        if (!this.message)
            return;
        var links = this.linkify(this.message);
        if (links) {
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                this.getUrlData(link);
            }
        }
    };
    LinkPreviewComponent.prototype.getUrlData = function (url) {
        var _this = this;
        this.http.get(this.config.apiEndpoint + "/chat/preview?url=" + url)
            .subscribe(function (data) {
            var metadata = data.json();
            if (!metadata.hasData) {
                metadata.description = metadata.url;
            }
            if (!metadata.imageUrl) {
                metadata.imageUrl = "http://icons.iconarchive.com/icons/iconsmind/outline/512/Internet-icon.png";
            }
            _this.metadatas.push(metadata);
        }, function (err) {
            console.log('Something went wrong!');
        });
    };
    LinkPreviewComponent.prototype.linkify = function (text) {
        var regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/?)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\)){0,}(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s\!()\[\]{};:\'\"\.\,<>?«»“”‘’]){0,})\b/gmi;
        var result = text.match(regexp);
        return result;
    };
    return LinkPreviewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LinkPreviewComponent.prototype, "message", void 0);
LinkPreviewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-link-preview',
        template: __webpack_require__(269),
        styles: [__webpack_require__(255)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].Native
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__shared_app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_app_config__["c" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_app_config__["c" /* AppConfig */]) === "function" && _b || Object])
], LinkPreviewComponent);

var _a, _b;
//# sourceMappingURL=link-preview.component.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_model__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_app_config__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var MessagesComponent = (function () {
    function MessagesComponent(hubService, http, config) {
        this.hubService = hubService;
        this.http = http;
        this.config = config;
        this.sending = [];
    }
    Object.defineProperty(MessagesComponent.prototype, "conversation", {
        get: function () {
            return this._conversation;
        },
        set: function (conv) {
            this._conversation = conv;
            this.parseConversationData();
        },
        enumerable: true,
        configurable: true
    });
    MessagesComponent.prototype.isMessage = function (message) {
        if (message.userId)
            return true;
        return false;
    };
    MessagesComponent.prototype.isSending = function (message) {
        if (message.userId)
            return false;
        return true;
    };
    MessagesComponent.prototype.uploadPercentageClass = function (percentage) {
        return "p" + percentage;
    };
    MessagesComponent.prototype.upload = function (files) {
        var _this = this;
        console.log(files);
        if (files.length == 0)
            return;
        var filenames = Array.from(files).map(function (file) { return file.name; }).join(", ");
        var sModel = new __WEBPACK_IMPORTED_MODULE_2__shared_model__["a" /* SendingModel */]();
        sModel.fileName = filenames;
        this.messages.push(sModel);
        console.log(this.sending);
        if (files.length === 0)
            return;
        var formData = new FormData();
        for (var i = 0; i < files.length; i++)
            formData.append(files[i].name, files[i]);
        var req = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpRequest */]('POST', this.config.apiEndpoint + "/chat/files/" + this.conversation.id + "/" + this.homeUser.id, formData, {
            reportProgress: true,
        });
        var uploadRequest = this.http.request(req).subscribe(function (event) {
            if (event.type === __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpEventType */].UploadProgress) {
                var uploadProgress = Math.round(100 * event.loaded / event.total);
                sModel.progress = uploadProgress.toString();
            }
            else if (event.type === __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpEventType */].Response) {
                var index = _this.messages.indexOf(sModel);
                _this.messages.splice(index, 1);
            }
        }, function (err) { sModel.failed = true; console.log(sModel.failed); });
        sModel.cancelRequest = function () {
            console.log("cancel request called");
            uploadRequest.unsubscribe();
            var index = _this.messages.indexOf(sModel);
            _this.messages.splice(index, 1);
        };
    };
    MessagesComponent.prototype.typing = function (isTyping) {
        this.hubService.invoke('TypingStatus', this.conversation.id, this.homeUser.id, isTyping);
    };
    MessagesComponent.prototype.scrolling = function (event) {
        //           let height=event.srcElement.scrollHeight;
        //         let scroll=event.srcElement.scrollTop +event.srcElement.offsetHeight;
        //         if(height<=scroll +5 && height>=scroll-5)
        //         {
        //  this.userScrolling=true;
        //         }
        //         else{
        //              this.userScrolling=false;
        //         }
    };
    MessagesComponent.prototype.scrollToBottom = function () {
        try {
            //           let height=event.srcElement.scrollHeight;
            //         let scroll=event.srcElement.scrollTop +event.srcElement.offsetHeight;
            //         if(height<=scroll +5 && height>=scroll-5)
            //         {
            //  this.userScrolling=true;
            //         }
            //         else{
            //              this.userScrolling=false;
            //         }
            //   let height=   this.mList.nativeElement.scrollHeight;
            //   let scroll=this.mList.nativeElement.scrollTop +this.mList.nativeElement.offsetHeight;
            //   console.log(scroll);
            //   console.log(height);
            //        if(scroll +10<height)
            // {
            //     console.log("should not ");
            //       this.mList.nativeElement.scrollTop = this.mList.nativeElement.scrollHeight ;
            // }
            // else{
            // }
        }
        catch (err) {
            console.log(err);
        }
    };
    MessagesComponent.prototype.isMe = function (message) {
        return message.userId == this.homeUser.id;
    };
    MessagesComponent.prototype.sendMessage = function () {
        if (!this.message)
            return;
        this.hubService.invoke('SendMessage', this.message, this.conversation.id, this.homeUser.id);
        this.message = "";
    };
    MessagesComponent.prototype.onEnter = function () {
        this.sendMessage();
    };
    MessagesComponent.prototype.ngOnInit = function () {
        this.parseConversationData();
    };
    MessagesComponent.prototype.parseConversationData = function () {
        this.messages = this.conversation.messages;
        this.homeUser = this.conversation.getHomeUser();
        this.awayUser = this.conversation.getAwayUser();
    };
    return MessagesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('messagelist'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], MessagesComponent.prototype, "mList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_model__["b" /* Conversation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_model__["b" /* Conversation */]) === "function" && _b || Object),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_model__["b" /* Conversation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_model__["b" /* Conversation */]) === "function" && _c || Object])
], MessagesComponent.prototype, "conversation", null);
MessagesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-messages-component',
        template: __webpack_require__(270),
        styles: [__webpack_require__(256)]
    }),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__shared_app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services__["b" /* HubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services__["b" /* HubService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__shared_app_config__["c" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_app_config__["c" /* AppConfig */]) === "function" && _f || Object])
], MessagesComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=messages.component.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomFooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CustomFooterComponent = (function () {
    function CustomFooterComponent() {
        this.currentYear = new Date().getFullYear();
    }
    return CustomFooterComponent;
}());
CustomFooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-custom-footer',
        template: __webpack_require__(271)
    })
], CustomFooterComponent);

//# sourceMappingURL=customfooter.component.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NavigationComponent = (function () {
    function NavigationComponent() {
    }
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navigation',
        template: __webpack_require__(272)
    })
], NavigationComponent);

//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtachmentContentType; });
var AtachmentContentType;
(function (AtachmentContentType) {
    AtachmentContentType[AtachmentContentType["Image"] = 0] = "Image";
    AtachmentContentType[AtachmentContentType["Video"] = 1] = "Video";
    AtachmentContentType[AtachmentContentType["Audio"] = 2] = "Audio";
    AtachmentContentType[AtachmentContentType["Other"] = 3] = "Other";
})(AtachmentContentType || (AtachmentContentType = {}));
//# sourceMappingURL=atachmentContentType.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Attachment */
var Attachment = (function () {
    function Attachment() {
    }
    return Attachment;
}());

//# sourceMappingURL=attachment.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Conversation; });
var Conversation = (function () {
    function Conversation() {
    }
    Conversation.prototype.getHomeUser = function () {
        return (this.user1Id == this.homeUserId) ? this.user1 : this.user2;
    };
    Conversation.prototype.getAwayUser = function () {
        return (this.user1Id == this.homeUserId) ? this.user2 : this.user1;
    };
    Conversation.prototype.mapData = function (conversation, homeUserId) {
        this.id = conversation.id;
        this.user1Id = conversation.user1Id;
        this.user2Id = conversation.user2Id;
        this.user1 = conversation.user1;
        this.user2 = conversation.user2;
        this.homeUserId = homeUserId;
        this.name = (this.user1Id == this.homeUserId) ? this.user2.name : this.user1.name;
        this.hasUnreadMessages = false;
        this.messages = conversation.messages;
        this.id = conversation.id;
    };
    return Conversation;
}());

//# sourceMappingURL=conversation.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CustomStatus */
var CustomStatus;
(function (CustomStatus) {
    CustomStatus[CustomStatus["Online"] = 0] = "Online";
    CustomStatus[CustomStatus["Offline"] = 1] = "Offline";
    CustomStatus[CustomStatus["Busy"] = 2] = "Busy";
    CustomStatus[CustomStatus["Away"] = 3] = "Away";
})(CustomStatus || (CustomStatus = {}));
//# sourceMappingURL=customStatus.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LinkPreview */
var LinkPreview = (function () {
    function LinkPreview() {
    }
    return LinkPreview;
}());

//# sourceMappingURL=linkPreview.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Message */
var Message = (function () {
    function Message() {
    }
    return Message;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendingModel; });
var SendingModel = (function () {
    function SendingModel() {
    }
    return SendingModel;
}());

//# sourceMappingURL=sendingModel.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TypingModel */
var TypingModel = (function () {
    function TypingModel() {
    }
    return TypingModel;
}());

//# sourceMappingURL=typingModel.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UserStatus */
var UserStatus = (function () {
    function UserStatus() {
    }
    return UserStatus;
}());

//# sourceMappingURL=userStatus.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstLetterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FirstLetterPipe = (function () {
    function FirstLetterPipe() {
    }
    FirstLetterPipe.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return value.split(' ').map(function (s) { return s.charAt(0); }).join('');
    };
    return FirstLetterPipe;
}());
FirstLetterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'firstletter' })
], FirstLetterPipe);

//# sourceMappingURL=firstletter.pipe.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__firstletter_pipe__ = __webpack_require__(185);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__firstletter_pipe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linkpreview_pipe__ = __webpack_require__(187);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__linkpreview_pipe__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkPreviewPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LinkPreviewPipe = (function () {
    function LinkPreviewPipe(http) {
        this.http = http;
    }
    LinkPreviewPipe.prototype.extractData = function (res) {
        var body = res;
        return "<app-link-preview> </app-link-preview>";
    };
    LinkPreviewPipe.prototype.transform = function (value, args) {
        return "\n<section class=\"main-section\">\n    <div class=\"one\">   <img class=\"img-responsive\" src=\"http://3.bp.blogspot.com/-IbEOTNtCMyU/TfCAdHaAxEI/AAAAAAAAA8U/EATib38SSAM/s320/joe-mcelderry.jpg\" alt=\"...\">\n</div>\n   \n    <div class=\"two\">\n       <h4>Facebook </h4>\n      <p>\n        asdfasfddsafasfd\n      </p>\n      </div>\n</section>";
        // if (!value) return value;
        //     return value.split(' ').map(function (s) { return s.charAt(0); }).join('');
    };
    return LinkPreviewPipe;
}());
LinkPreviewPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'linkpreview' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]) === "function" && _a || Object])
], LinkPreviewPipe);

var _a;
//# sourceMappingURL=linkpreview.pipe.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aspnet_signalr_client__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aspnet_signalr_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__aspnet_signalr_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(32);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HubService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var HubService = (function () {
    function HubService(config) {
        this.config = config;
        this.isConnectionStarted = false;
    }
    HubService.prototype.onClose = function (method) {
        this.hubConnection.onclose(method);
    };
    HubService.prototype.initialize = function (userid) {
        var _this = this;
        this.hubConnection = new __WEBPACK_IMPORTED_MODULE_1__aspnet_signalr_client__["HubConnection"](this.config.hubEndpoint + "?userId=" + userid);
        return this.hubConnection.start()
            .then(function () {
            _this.isConnectionStarted = true;
        })
            .catch(function (err) {
            console.log('Error while establishing connection : ' + err);
        });
    };
    HubService.prototype.sub = function (eventName, method) {
        // if (!this.isConnectionStarted) {
        //     this.initialize().then(con => {
        //      this.hubConnection.on(eventName,method);
        //     });
        // } else {
        this.hubConnection.on(eventName, method);
        // }
    };
    HubService.prototype.invoke = function (eventName) {
        // return  this.hubConnection.invoke(eventName, ...args);
        // console.log("invokce called");
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //     if (!this.isConnectionStarted) {
        //         return new Promise(resolve => {
        //         this.initialize().then(con => {
        //        return  resolve(this.hubConnection.invoke(eventName, ...args));
        //         });
        //       });
        //     } else {
        return (_a = this.hubConnection).invoke.apply(_a, [eventName].concat(args));
        var _a;
        // }
    };
    return HubService;
}());
HubService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__app_config__["c" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_config__["c" /* AppConfig */]) === "function" && _a || Object])
], HubService);

var _a;
//# sourceMappingURL=hub.service.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* unused harmony export MessageService */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { APP_CONFIG, AppConfig } from "../app.config";
var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
        this.clientsUrl = "";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: this.headers });
        this.clientsUrl = "http://localhost:5000/api/Messages/";
    }
    MessageService.prototype.create = function (user) {
        var _this = this;
        return this.http.post(this.clientsUrl, user, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    MessageService.prototype.single = function (id) {
        var _this = this;
        return this.http.get(this.clientsUrl + id, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    MessageService.prototype.update = function (id, user) {
        var _this = this;
        return this.http.put(this.clientsUrl + id, user, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    MessageService.prototype.delete = function (id) {
        var _this = this;
        return this.http.delete(this.clientsUrl + id, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    MessageService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.clientsUrl, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    MessageService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    MessageService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || "";
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || "") + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return MessageService;
}());
MessageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], MessageService);

var _a;
//# sourceMappingURL=message.service.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { APP_CONFIG, AppConfig } from "../app.config";
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.clientsUrl = "";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: this.headers });
        this.clientsUrl = "http://localhost:5000/api/users/";
    }
    UserService.prototype.create = function (user) {
        var _this = this;
        return this.http.post(this.clientsUrl, user, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    UserService.prototype.single = function (id) {
        var _this = this;
        return this.http.get(this.clientsUrl + id, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    UserService.prototype.update = function (id, user) {
        var _this = this;
        return this.http.put(this.clientsUrl + id, user, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    UserService.prototype.delete = function (id) {
        var _this = this;
        return this.http.delete(this.clientsUrl + id, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    UserService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.clientsUrl, this.options).map(this.extractData).catch(function (err) {
            return _this.handleError(err);
        });
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || "";
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || "") + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_customfooter_customfooter_component__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_navigation_navigation_component__ = __webpack_require__(174);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* HttpModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__components_navigation_navigation_component__["a" /* NavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_customfooter_customfooter_component__["a" /* CustomFooterComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_5__components_navigation_navigation_component__["a" /* NavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_customfooter_customfooter_component__["a" /* CustomFooterComponent */],
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__(47);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UsersComponent = (function () {
    function UsersComponent(hubService) {
        this.hubService = hubService;
        this.switchChat = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.mainUser = this.conversations[0].getHomeUser();
    };
    UsersComponent.prototype.changeStatus = function (status) {
        this.mainUser.customStatus = status;
        this.statusListVisible = false;
        this.hubService.invoke("NotifyStatusChange", this.mainUser.id, status);
    };
    UsersComponent.prototype.customStatusClasses = function (cStatus) {
        var cssClasses;
        switch (cStatus) {
            case 0:
                cssClasses = { 'online': true };
                break;
            case 1:
                cssClasses = { 'offline': true };
                break;
            case 2:
                cssClasses = { 'busy': true };
                break;
            case 3:
                cssClasses = { 'away': true };
                break;
        }
        return cssClasses;
    };
    UsersComponent.prototype.getStatusClasses = function (conversation) {
        var cssClasses;
        var awayUser = conversation.getAwayUser();
        if (!awayUser.isOnline) {
            cssClasses = {
                'offline': true
            };
        }
        else {
            cssClasses = this.customStatusClasses(awayUser.customStatus);
        }
        return cssClasses;
    };
    UsersComponent.prototype.showList = function () {
        this.statusListVisible = !this.statusListVisible;
    };
    UsersComponent.prototype.isActive = function (conversationId) {
        return this.currentConversationId == conversationId;
    };
    UsersComponent.prototype.switch = function (conversationId) {
        this.currentConversationId = conversationId;
        this.switchChat.emit(conversationId);
    };
    return UsersComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], UsersComponent.prototype, "conversations", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], UsersComponent.prototype, "switchChat", void 0);
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users-component',
        template: __webpack_require__(273),
        styles: [__webpack_require__(257)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services__["b" /* HubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services__["b" /* HubService */]) === "function" && _b || Object])
], UsersComponent);

var _a, _b;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "\r\n:host {  width: 100%; margin:0 auto 0 }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ".file{\r\n   background: #435f7a;\r\n  color: #f5f5f5;\r\n  margin:5px;\r\n  padding:5px;\r\n  border-radius: 5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ":host {  width: 100%; margin:0 auto 0 }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ".main-section {\r\n    width: 110%;\r\n    margin: 2px;\r\n    margin-left:-10px;\r\n    border-radius: 5px;\r\n    background: white;\r\n}\r\n.clickeable{\r\n    text-decoration: none;\r\n    \r\n}\r\nh4 {\r\n  margin:0px;\r\n}\r\n.one {\r\n    width: 50px;\r\n    float: left;\r\n    height:50px;\r\n}\r\n.one img{\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n    margin:0 auto;\r\n    \r\n}\r\n.two {\r\n    margin-left: 50px;\r\n    padding: 5px 0px 0px 5px;\r\n    height:50px;\r\n    color:black;\r\n   text-align:center;vertical-align: middle; /* Safari/Chrome, other WebKit */    /* Firefox, other Gecko */\r\nbox-sizing: border-box;         /* Opera/IE 8+ */\r\n    \r\n}\r\n.two hr{\r\n    margin: 2px; \r\n}\r\n.two p{\r\n    margin: 2px; \r\n}\r\n.site-description{\r\n    max-height:25px;\r\n    font-size: 10px;\r\n    line-height: 120%;\r\n    margin:0px;\r\n    \r\n    overflow:hidden; text-align:center;vertical-align: middle;\r\n}\r\n.site-name{\r\n    \r\n    overflow:hidden;\r\n\r\n    line-height: 100%;\r\n    font-size: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "/****************************************************************\r\n *\r\n * CSS Percentage Circle\r\n * Author: Andre Firchow\r\n *\r\n*****************************************************************/\r\n.rect-auto, .c100.p51 .slice, .c100.p52 .slice, .c100.p53 .slice, .c100.p54 .slice, .c100.p55 .slice, .c100.p56 .slice, .c100.p57 .slice, .c100.p58 .slice, .c100.p59 .slice, .c100.p60 .slice, .c100.p61 .slice, .c100.p62 .slice, .c100.p63 .slice, .c100.p64 .slice, .c100.p65 .slice, .c100.p66 .slice, .c100.p67 .slice, .c100.p68 .slice, .c100.p69 .slice, .c100.p70 .slice, .c100.p71 .slice, .c100.p72 .slice, .c100.p73 .slice, .c100.p74 .slice, .c100.p75 .slice, .c100.p76 .slice, .c100.p77 .slice, .c100.p78 .slice, .c100.p79 .slice, .c100.p80 .slice, .c100.p81 .slice, .c100.p82 .slice, .c100.p83 .slice, .c100.p84 .slice, .c100.p85 .slice, .c100.p86 .slice, .c100.p87 .slice, .c100.p88 .slice, .c100.p89 .slice, .c100.p90 .slice, .c100.p91 .slice, .c100.p92 .slice, .c100.p93 .slice, .c100.p94 .slice, .c100.p95 .slice, .c100.p96 .slice, .c100.p97 .slice, .c100.p98 .slice, .c100.p99 .slice, .c100.p100 .slice {\r\n  clip: rect(auto, auto, auto, auto);\r\n}\r\n\r\n.pie, .c100 .bar, .c100.p51 .fill, .c100.p52 .fill, .c100.p53 .fill, .c100.p54 .fill, .c100.p55 .fill, .c100.p56 .fill, .c100.p57 .fill, .c100.p58 .fill, .c100.p59 .fill, .c100.p60 .fill, .c100.p61 .fill, .c100.p62 .fill, .c100.p63 .fill, .c100.p64 .fill, .c100.p65 .fill, .c100.p66 .fill, .c100.p67 .fill, .c100.p68 .fill, .c100.p69 .fill, .c100.p70 .fill, .c100.p71 .fill, .c100.p72 .fill, .c100.p73 .fill, .c100.p74 .fill, .c100.p75 .fill, .c100.p76 .fill, .c100.p77 .fill, .c100.p78 .fill, .c100.p79 .fill, .c100.p80 .fill, .c100.p81 .fill, .c100.p82 .fill, .c100.p83 .fill, .c100.p84 .fill, .c100.p85 .fill, .c100.p86 .fill, .c100.p87 .fill, .c100.p88 .fill, .c100.p89 .fill, .c100.p90 .fill, .c100.p91 .fill, .c100.p92 .fill, .c100.p93 .fill, .c100.p94 .fill, .c100.p95 .fill, .c100.p96 .fill, .c100.p97 .fill, .c100.p98 .fill, .c100.p99 .fill, .c100.p100 .fill {\r\n  position: absolute;\r\n  border: 0.08em solid #307bbb;\r\n  width: 0.84em;\r\n  height: 0.84em;\r\n  clip: rect(0em, 0.5em, 1em, 0em);\r\n  border-radius: 50%;\r\n  -webkit-transform: rotate(0deg);\r\n  transform: rotate(0deg);\r\n}\r\n\r\n.pie-fill, .c100.p51 .bar:after, .c100.p51 .fill, .c100.p52 .bar:after, .c100.p52 .fill, .c100.p53 .bar:after, .c100.p53 .fill, .c100.p54 .bar:after, .c100.p54 .fill, .c100.p55 .bar:after, .c100.p55 .fill, .c100.p56 .bar:after, .c100.p56 .fill, .c100.p57 .bar:after, .c100.p57 .fill, .c100.p58 .bar:after, .c100.p58 .fill, .c100.p59 .bar:after, .c100.p59 .fill, .c100.p60 .bar:after, .c100.p60 .fill, .c100.p61 .bar:after, .c100.p61 .fill, .c100.p62 .bar:after, .c100.p62 .fill, .c100.p63 .bar:after, .c100.p63 .fill, .c100.p64 .bar:after, .c100.p64 .fill, .c100.p65 .bar:after, .c100.p65 .fill, .c100.p66 .bar:after, .c100.p66 .fill, .c100.p67 .bar:after, .c100.p67 .fill, .c100.p68 .bar:after, .c100.p68 .fill, .c100.p69 .bar:after, .c100.p69 .fill, .c100.p70 .bar:after, .c100.p70 .fill, .c100.p71 .bar:after, .c100.p71 .fill, .c100.p72 .bar:after, .c100.p72 .fill, .c100.p73 .bar:after, .c100.p73 .fill, .c100.p74 .bar:after, .c100.p74 .fill, .c100.p75 .bar:after, .c100.p75 .fill, .c100.p76 .bar:after, .c100.p76 .fill, .c100.p77 .bar:after, .c100.p77 .fill, .c100.p78 .bar:after, .c100.p78 .fill, .c100.p79 .bar:after, .c100.p79 .fill, .c100.p80 .bar:after, .c100.p80 .fill, .c100.p81 .bar:after, .c100.p81 .fill, .c100.p82 .bar:after, .c100.p82 .fill, .c100.p83 .bar:after, .c100.p83 .fill, .c100.p84 .bar:after, .c100.p84 .fill, .c100.p85 .bar:after, .c100.p85 .fill, .c100.p86 .bar:after, .c100.p86 .fill, .c100.p87 .bar:after, .c100.p87 .fill, .c100.p88 .bar:after, .c100.p88 .fill, .c100.p89 .bar:after, .c100.p89 .fill, .c100.p90 .bar:after, .c100.p90 .fill, .c100.p91 .bar:after, .c100.p91 .fill, .c100.p92 .bar:after, .c100.p92 .fill, .c100.p93 .bar:after, .c100.p93 .fill, .c100.p94 .bar:after, .c100.p94 .fill, .c100.p95 .bar:after, .c100.p95 .fill, .c100.p96 .bar:after, .c100.p96 .fill, .c100.p97 .bar:after, .c100.p97 .fill, .c100.p98 .bar:after, .c100.p98 .fill, .c100.p99 .bar:after, .c100.p99 .fill, .c100.p100 .bar:after, .c100.p100 .fill {\r\n  -webkit-transform: rotate(180deg);\r\n  transform: rotate(180deg);\r\n}\r\n\r\n.c100 {\r\n  position: relative;\r\n  font-size: 120px;\r\n  width: 1em;\r\n  height: 1em;\r\n  border-radius: 50%;\r\n  float: left;\r\n  margin: 0 auto;\r\n  background-color: #cccccc;\r\n}\r\n.c100 *, .c100 *:before, .c100 *:after {\r\n  box-sizing: content-box;\r\n}\r\n.c100.center {\r\n  float: none;\r\n  margin: 0 auto;\r\n}\r\n.c100.big {\r\n  font-size: 240px;\r\n}\r\n.c100.small {\r\n  font-size: 80px;\r\n}\r\n.c100 > span {\r\n  position: absolute;\r\n  width: 100%;\r\n  z-index: 1;\r\n  left: 0;\r\n  top: 0;\r\n  width: 5em;\r\n  line-height: 5em;\r\n  font-size: 0.2em;\r\n  color: #cccccc;\r\n  display: block;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  transition-property: all;\r\n  transition-duration: 0.2s;\r\n  transition-timing-function: ease-out;\r\n}\r\n.c100:after {\r\n  position: absolute;\r\n  top: 0.08em;\r\n  left: 0.08em;\r\n  display: block;\r\n  content: \" \";\r\n  border-radius: 50%;\r\n  background-color: whitesmoke;\r\n  width: 0.84em;\r\n  height: 0.84em;\r\n  transition-property: all;\r\n  transition-duration: 0.2s;\r\n  transition-timing-function: ease-in;\r\n}\r\n.c100 .slice {\r\n  position: absolute;\r\n  width: 1em;\r\n  height: 1em;\r\n  clip: rect(0em, 1em, 1em, 0.5em);\r\n}\r\n.c100.p1 .bar {\r\n  -webkit-transform: rotate(3.6deg);\r\n  transform: rotate(3.6deg);\r\n}\r\n.c100.p2 .bar {\r\n  -webkit-transform: rotate(7.2deg);\r\n  transform: rotate(7.2deg);\r\n}\r\n.c100.p3 .bar {\r\n  -webkit-transform: rotate(10.8deg);\r\n  transform: rotate(10.8deg);\r\n}\r\n.c100.p4 .bar {\r\n  -webkit-transform: rotate(14.4deg);\r\n  transform: rotate(14.4deg);\r\n}\r\n.c100.p5 .bar {\r\n  -webkit-transform: rotate(18deg);\r\n  transform: rotate(18deg);\r\n}\r\n.c100.p6 .bar {\r\n  -webkit-transform: rotate(21.6deg);\r\n  transform: rotate(21.6deg);\r\n}\r\n.c100.p7 .bar {\r\n  -webkit-transform: rotate(25.2deg);\r\n  transform: rotate(25.2deg);\r\n}\r\n.c100.p8 .bar {\r\n  -webkit-transform: rotate(28.8deg);\r\n  transform: rotate(28.8deg);\r\n}\r\n.c100.p9 .bar {\r\n  -webkit-transform: rotate(32.4deg);\r\n  transform: rotate(32.4deg);\r\n}\r\n.c100.p10 .bar {\r\n  -webkit-transform: rotate(36deg);\r\n  transform: rotate(36deg);\r\n}\r\n.c100.p11 .bar {\r\n  -webkit-transform: rotate(39.6deg);\r\n  transform: rotate(39.6deg);\r\n}\r\n.c100.p12 .bar {\r\n  -webkit-transform: rotate(43.2deg);\r\n  transform: rotate(43.2deg);\r\n}\r\n.c100.p13 .bar {\r\n  -webkit-transform: rotate(46.8deg);\r\n  transform: rotate(46.8deg);\r\n}\r\n.c100.p14 .bar {\r\n  -webkit-transform: rotate(50.4deg);\r\n  transform: rotate(50.4deg);\r\n}\r\n.c100.p15 .bar {\r\n  -webkit-transform: rotate(54deg);\r\n  transform: rotate(54deg);\r\n}\r\n.c100.p16 .bar {\r\n  -webkit-transform: rotate(57.6deg);\r\n  transform: rotate(57.6deg);\r\n}\r\n.c100.p17 .bar {\r\n  -webkit-transform: rotate(61.2deg);\r\n  transform: rotate(61.2deg);\r\n}\r\n.c100.p18 .bar {\r\n  -webkit-transform: rotate(64.8deg);\r\n  transform: rotate(64.8deg);\r\n}\r\n.c100.p19 .bar {\r\n  -webkit-transform: rotate(68.4deg);\r\n  transform: rotate(68.4deg);\r\n}\r\n.c100.p20 .bar {\r\n  -webkit-transform: rotate(72deg);\r\n  transform: rotate(72deg);\r\n}\r\n.c100.p21 .bar {\r\n  -webkit-transform: rotate(75.6deg);\r\n  transform: rotate(75.6deg);\r\n}\r\n.c100.p22 .bar {\r\n  -webkit-transform: rotate(79.2deg);\r\n  transform: rotate(79.2deg);\r\n}\r\n.c100.p23 .bar {\r\n  -webkit-transform: rotate(82.8deg);\r\n  transform: rotate(82.8deg);\r\n}\r\n.c100.p24 .bar {\r\n  -webkit-transform: rotate(86.4deg);\r\n  transform: rotate(86.4deg);\r\n}\r\n.c100.p25 .bar {\r\n  -webkit-transform: rotate(90deg);\r\n  transform: rotate(90deg);\r\n}\r\n.c100.p26 .bar {\r\n  -webkit-transform: rotate(93.6deg);\r\n  transform: rotate(93.6deg);\r\n}\r\n.c100.p27 .bar {\r\n  -webkit-transform: rotate(97.2deg);\r\n  transform: rotate(97.2deg);\r\n}\r\n.c100.p28 .bar {\r\n  -webkit-transform: rotate(100.8deg);\r\n  transform: rotate(100.8deg);\r\n}\r\n.c100.p29 .bar {\r\n  -webkit-transform: rotate(104.4deg);\r\n  transform: rotate(104.4deg);\r\n}\r\n.c100.p30 .bar {\r\n  -webkit-transform: rotate(108deg);\r\n  transform: rotate(108deg);\r\n}\r\n.c100.p31 .bar {\r\n  -webkit-transform: rotate(111.6deg);\r\n  transform: rotate(111.6deg);\r\n}\r\n.c100.p32 .bar {\r\n  -webkit-transform: rotate(115.2deg);\r\n  transform: rotate(115.2deg);\r\n}\r\n.c100.p33 .bar {\r\n  -webkit-transform: rotate(118.8deg);\r\n  transform: rotate(118.8deg);\r\n}\r\n.c100.p34 .bar {\r\n  -webkit-transform: rotate(122.4deg);\r\n  transform: rotate(122.4deg);\r\n}\r\n.c100.p35 .bar {\r\n  -webkit-transform: rotate(126deg);\r\n  transform: rotate(126deg);\r\n}\r\n.c100.p36 .bar {\r\n  -webkit-transform: rotate(129.6deg);\r\n  transform: rotate(129.6deg);\r\n}\r\n.c100.p37 .bar {\r\n  -webkit-transform: rotate(133.2deg);\r\n  transform: rotate(133.2deg);\r\n}\r\n.c100.p38 .bar {\r\n  -webkit-transform: rotate(136.8deg);\r\n  transform: rotate(136.8deg);\r\n}\r\n.c100.p39 .bar {\r\n  -webkit-transform: rotate(140.4deg);\r\n  transform: rotate(140.4deg);\r\n}\r\n.c100.p40 .bar {\r\n  -webkit-transform: rotate(144deg);\r\n  transform: rotate(144deg);\r\n}\r\n.c100.p41 .bar {\r\n  -webkit-transform: rotate(147.6deg);\r\n  transform: rotate(147.6deg);\r\n}\r\n.c100.p42 .bar {\r\n  -webkit-transform: rotate(151.2deg);\r\n  transform: rotate(151.2deg);\r\n}\r\n.c100.p43 .bar {\r\n  -webkit-transform: rotate(154.8deg);\r\n  transform: rotate(154.8deg);\r\n}\r\n.c100.p44 .bar {\r\n  -webkit-transform: rotate(158.4deg);\r\n  transform: rotate(158.4deg);\r\n}\r\n.c100.p45 .bar {\r\n  -webkit-transform: rotate(162deg);\r\n  transform: rotate(162deg);\r\n}\r\n.c100.p46 .bar {\r\n  -webkit-transform: rotate(165.6deg);\r\n  transform: rotate(165.6deg);\r\n}\r\n.c100.p47 .bar {\r\n  -webkit-transform: rotate(169.2deg);\r\n  transform: rotate(169.2deg);\r\n}\r\n.c100.p48 .bar {\r\n  -webkit-transform: rotate(172.8deg);\r\n  transform: rotate(172.8deg);\r\n}\r\n.c100.p49 .bar {\r\n  -webkit-transform: rotate(176.4deg);\r\n  transform: rotate(176.4deg);\r\n}\r\n.c100.p50 .bar {\r\n  -webkit-transform: rotate(180deg);\r\n  transform: rotate(180deg);\r\n}\r\n.c100.p51 .bar {\r\n  -webkit-transform: rotate(183.6deg);\r\n  transform: rotate(183.6deg);\r\n}\r\n.c100.p52 .bar {\r\n  -webkit-transform: rotate(187.2deg);\r\n  transform: rotate(187.2deg);\r\n}\r\n.c100.p53 .bar {\r\n  -webkit-transform: rotate(190.8deg);\r\n  transform: rotate(190.8deg);\r\n}\r\n.c100.p54 .bar {\r\n  -webkit-transform: rotate(194.4deg);\r\n  transform: rotate(194.4deg);\r\n}\r\n.c100.p55 .bar {\r\n  -webkit-transform: rotate(198deg);\r\n  transform: rotate(198deg);\r\n}\r\n.c100.p56 .bar {\r\n  -webkit-transform: rotate(201.6deg);\r\n  transform: rotate(201.6deg);\r\n}\r\n.c100.p57 .bar {\r\n  -webkit-transform: rotate(205.2deg);\r\n  transform: rotate(205.2deg);\r\n}\r\n.c100.p58 .bar {\r\n  -webkit-transform: rotate(208.8deg);\r\n  transform: rotate(208.8deg);\r\n}\r\n.c100.p59 .bar {\r\n  -webkit-transform: rotate(212.4deg);\r\n  transform: rotate(212.4deg);\r\n}\r\n.c100.p60 .bar {\r\n  -webkit-transform: rotate(216deg);\r\n  transform: rotate(216deg);\r\n}\r\n.c100.p61 .bar {\r\n  -webkit-transform: rotate(219.6deg);\r\n  transform: rotate(219.6deg);\r\n}\r\n.c100.p62 .bar {\r\n  -webkit-transform: rotate(223.2deg);\r\n  transform: rotate(223.2deg);\r\n}\r\n.c100.p63 .bar {\r\n  -webkit-transform: rotate(226.8deg);\r\n  transform: rotate(226.8deg);\r\n}\r\n.c100.p64 .bar {\r\n  -webkit-transform: rotate(230.4deg);\r\n  transform: rotate(230.4deg);\r\n}\r\n.c100.p65 .bar {\r\n  -webkit-transform: rotate(234deg);\r\n  transform: rotate(234deg);\r\n}\r\n.c100.p66 .bar {\r\n  -webkit-transform: rotate(237.6deg);\r\n  transform: rotate(237.6deg);\r\n}\r\n.c100.p67 .bar {\r\n  -webkit-transform: rotate(241.2deg);\r\n  transform: rotate(241.2deg);\r\n}\r\n.c100.p68 .bar {\r\n  -webkit-transform: rotate(244.8deg);\r\n  transform: rotate(244.8deg);\r\n}\r\n.c100.p69 .bar {\r\n  -webkit-transform: rotate(248.4deg);\r\n  transform: rotate(248.4deg);\r\n}\r\n.c100.p70 .bar {\r\n  -webkit-transform: rotate(252deg);\r\n  transform: rotate(252deg);\r\n}\r\n.c100.p71 .bar {\r\n  -webkit-transform: rotate(255.6deg);\r\n  transform: rotate(255.6deg);\r\n}\r\n.c100.p72 .bar {\r\n  -webkit-transform: rotate(259.2deg);\r\n  transform: rotate(259.2deg);\r\n}\r\n.c100.p73 .bar {\r\n  -webkit-transform: rotate(262.8deg);\r\n  transform: rotate(262.8deg);\r\n}\r\n.c100.p74 .bar {\r\n  -webkit-transform: rotate(266.4deg);\r\n  transform: rotate(266.4deg);\r\n}\r\n.c100.p75 .bar {\r\n  -webkit-transform: rotate(270deg);\r\n  transform: rotate(270deg);\r\n}\r\n.c100.p76 .bar {\r\n  -webkit-transform: rotate(273.6deg);\r\n  transform: rotate(273.6deg);\r\n}\r\n.c100.p77 .bar {\r\n  -webkit-transform: rotate(277.2deg);\r\n  transform: rotate(277.2deg);\r\n}\r\n.c100.p78 .bar {\r\n  -webkit-transform: rotate(280.8deg);\r\n  transform: rotate(280.8deg);\r\n}\r\n.c100.p79 .bar {\r\n  -webkit-transform: rotate(284.4deg);\r\n  transform: rotate(284.4deg);\r\n}\r\n.c100.p80 .bar {\r\n  -webkit-transform: rotate(288deg);\r\n  transform: rotate(288deg);\r\n}\r\n.c100.p81 .bar {\r\n  -webkit-transform: rotate(291.6deg);\r\n  transform: rotate(291.6deg);\r\n}\r\n.c100.p82 .bar {\r\n  -webkit-transform: rotate(295.2deg);\r\n  transform: rotate(295.2deg);\r\n}\r\n.c100.p83 .bar {\r\n  -webkit-transform: rotate(298.8deg);\r\n  transform: rotate(298.8deg);\r\n}\r\n.c100.p84 .bar {\r\n  -webkit-transform: rotate(302.4deg);\r\n  transform: rotate(302.4deg);\r\n}\r\n.c100.p85 .bar {\r\n  -webkit-transform: rotate(306deg);\r\n  transform: rotate(306deg);\r\n}\r\n.c100.p86 .bar {\r\n  -webkit-transform: rotate(309.6deg);\r\n  transform: rotate(309.6deg);\r\n}\r\n.c100.p87 .bar {\r\n  -webkit-transform: rotate(313.2deg);\r\n  transform: rotate(313.2deg);\r\n}\r\n.c100.p88 .bar {\r\n  -webkit-transform: rotate(316.8deg);\r\n  transform: rotate(316.8deg);\r\n}\r\n.c100.p89 .bar {\r\n  -webkit-transform: rotate(320.4deg);\r\n  transform: rotate(320.4deg);\r\n}\r\n.c100.p90 .bar {\r\n  -webkit-transform: rotate(324deg);\r\n  transform: rotate(324deg);\r\n}\r\n.c100.p91 .bar {\r\n  -webkit-transform: rotate(327.6deg);\r\n  transform: rotate(327.6deg);\r\n}\r\n.c100.p92 .bar {\r\n  -webkit-transform: rotate(331.2deg);\r\n  transform: rotate(331.2deg);\r\n}\r\n.c100.p93 .bar {\r\n  -webkit-transform: rotate(334.8deg);\r\n  transform: rotate(334.8deg);\r\n}\r\n.c100.p94 .bar {\r\n  -webkit-transform: rotate(338.4deg);\r\n  transform: rotate(338.4deg);\r\n}\r\n.c100.p95 .bar {\r\n  -webkit-transform: rotate(342deg);\r\n  transform: rotate(342deg);\r\n}\r\n.c100.p96 .bar {\r\n  -webkit-transform: rotate(345.6deg);\r\n  transform: rotate(345.6deg);\r\n}\r\n.c100.p97 .bar {\r\n  -webkit-transform: rotate(349.2deg);\r\n  transform: rotate(349.2deg);\r\n}\r\n.c100.p98 .bar {\r\n  -webkit-transform: rotate(352.8deg);\r\n  transform: rotate(352.8deg);\r\n}\r\n.c100.p99 .bar {\r\n  -webkit-transform: rotate(356.4deg);\r\n  transform: rotate(356.4deg);\r\n}\r\n.c100.p100 .bar {\r\n  -webkit-transform: rotate(360deg);\r\n  transform: rotate(360deg);\r\n}\r\n.c100:hover {\r\n  cursor: default;\r\n}\r\n.c100:hover > span {\r\n  width: 3.33em;\r\n  line-height: 3.33em;\r\n  font-size: 0.3em;\r\n  color: #307bbb;\r\n}\r\n.c100:hover:after {\r\n  top: 0.04em;\r\n  left: 0.04em;\r\n  width: 0.92em;\r\n  height: 0.92em;\r\n}\r\n.c100.dark {\r\n  background-color: #777777;\r\n}\r\n.c100.dark .bar,\r\n.c100.dark .fill {\r\n  border-color: #c6ff00 !important;\r\n}\r\n.c100.dark > span {\r\n  color: #777777;\r\n}\r\n.c100.dark:after {\r\n  background-color: #666666;\r\n}\r\n.c100.dark:hover > span {\r\n  color: #c6ff00;\r\n}\r\n.c100.green .bar, .c100.green .fill {\r\n  border-color: #4db53c !important;\r\n}\r\n.c100.green:hover > span {\r\n  color: #4db53c;\r\n}\r\n.c100.green.dark .bar, .c100.green.dark .fill {\r\n  border-color: #5fd400 !important;\r\n}\r\n.c100.green.dark:hover > span {\r\n  color: #5fd400;\r\n}\r\n.c100.orange .bar, .c100.orange .fill {\r\n  border-color: #dd9d22 !important;\r\n}\r\n.c100.orange:hover > span {\r\n  color: #dd9d22;\r\n}\r\n.c100.orange.dark .bar, .c100.orange.dark .fill {\r\n  border-color: #e08833 !important;\r\n}\r\n.c100.orange.dark:hover > span {\r\n  color: #e08833;\r\n}\r\n\r\n\r\n/*------Custom--------*/\r\n.upload-progress{\r\n  display: block;\r\n  clear:both;\r\n}\r\n.cancel-button{\r\n  display: none!important;\r\n}\r\n.failed{\r\n  color:red!important;\r\n}\r\n.upload-progress:hover .cancel-button{\r\ndisplay : block!important;;\r\n}\r\n.upload-progress:hover .progress-value{\r\ndisplay : none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 266:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 267:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let image of images; let i=index\">\r\n  <img style=\"max-width: 100%\" [src]=\"image.thumb\" (click)=\"open(i)\" />\r\n</div>\r\n\r\n<div *ngFor=\"let video of videos\">\r\n  <vg-player>\r\n    <vg-overlay-play></vg-overlay-play>\r\n    <vg-buffering></vg-buffering>\r\n\r\n    <vg-scrub-bar>\r\n      <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n      <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n    </vg-scrub-bar>\r\n\r\n    <vg-controls>\r\n      <vg-play-pause></vg-play-pause>\r\n\r\n      <vg-mute></vg-mute>\r\n      <vg-volume></vg-volume>\r\n\r\n      <vg-fullscreen></vg-fullscreen>\r\n    </vg-controls>\r\n\r\n    <video [vgMedia]=\"media\" #media id=\"singleVideo\" preload=\"auto\" crossorigin>\r\n      <source src=\"{{apiUrl}}/{{video.id}}\">\r\n\r\n    </video>\r\n  </vg-player>\r\n</div>\r\n\r\n<div *ngFor=\"let audio of audios\">\r\n  <audio style=\"max-width: 100%\" controls>\r\n    <source src=\"{{apiUrl}}/{{audio.id}}\">\r\n  </audio>\r\n</div>\r\n\r\n<div *ngFor=\"let other of others\">\r\n  <div class=\"file\">\r\n    <a href=\"{{apiUrl}}/{{other.id}}\" target=\"_blank\"> \r\n       <span [innerHtml]=\"fileIcon(other.fileId)\"></span> &nbsp; <span>{{other.fileName}}</span>\r\n       </a>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 268:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"frame\">\r\n\r\n<app-users-component (switchChat)=\"switchChat($event)\" *ngIf=\"conversations.length>0\"  [conversations]=\"conversations\"></app-users-component>\r\n\r\n <app-messages-component *ngIf=\"currentConversation\"  [conversation]=\"currentConversation\"></app-messages-component>\r\n\r\n</div>"

/***/ }),

/***/ 269:
/***/ (function(module, exports) {

module.exports = "<a class=\"clickeable\" *ngFor=\"let metadata of metadatas\" href=\"{{metadata.url}}\" target=\"_blank\" > \r\n<div class=\"main-section\" >\r\n  <div class=\"one\"> <img style=\"border-radius: 5px 0px 0px 5px\" class=\"img-responsive\" src=\"{{metadata.imageUrl}}\"  >\r\n  </div>\r\n\r\n  <div class=\"two\">\r\n    <p class='site-description' [innerHtml]=\"metadata.description\"></p>\r\n    <hr/>\r\n    <p class='site-name'>{{metadata.url}}</p>\r\n\r\n\r\n  </div>\r\n</div>\r\n</a>"

/***/ }),

/***/ 270:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n\t<div class=\"contact-profile\">\r\n\t\t<img src=\"http://placehold.it/50/55C1E7/fff&text={{awayUser.name | firstletter}}\" alt=\"\" />\r\n\t\t<p>{{awayUser.name}}</p>\r\n\t</div>\r\n\t<div class=\"messages\" style=\"display: flex;flex-direction: column-reverse;\" (scroll)=\"scrolling($event)\" #messagelist>\r\n\t\t<ul>\r\n\t\t\t<ng-container *ngFor=\"let message of messages\">\r\n\t\t\t\t<li *ngIf=\"isMessage(message)\" [ngClass]=\"(isMe(message))?'sent':'replies'\">\r\n\t\t\t\t\t<img src=\"http://placehold.it/80/59687f/fff&text={{(isMe(message))? (homeUser.name | firstletter):(awayUser.name | firstletter)}}\"\r\n\t\t\t\t\t alt=\"\" />\r\n\t\t\t\t\t<div class=\"message-content\">\r\n\r\n\t\t\t\t\t\t<p *ngIf=\"message.content\" class=\"round\" [innerHtml]=\"message.content | linky\">\r\n\r\n\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t<app-attachment [attachments]=\"message.attachments\"></app-attachment>\r\n\t\t\t\t\t\t<app-link-preview [message]=\"message.content\"></app-link-preview>\r\n\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</li>\r\n\t\t\t\t<li *ngIf=\"isSending(message)\" class=\"sent\">\r\n\t\t\t\t\t<img src=\"http://placehold.it/80/59687f/fff&text={{homeUser.name | firstletter}}\" alt=\"\" />\r\n\t\t\t\t\t<div class=\"message-content\" [class.failed]=\"message.failed\">\r\n\t\t\t\t\t\t<div *ngIf=\"!message.failed\" class=\"c100  small upload-progress center\" [ngClass]=\"uploadPercentageClass(message.progress)\">\r\n\t\t\t\t\t\t\t<span class='progress-value'>{{message.progress}}</span>\r\n\t\t\t\t\t\t\t<span (click)=\"message.cancelRequest()\" class=\"cancel-button\"><i   class=\"fa fa-times-circle-o\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t<div class=\"slice\">\r\n\t\t\t\t\t\t\t\t<div class=\"bar\"></div>\r\n\t\t\t\t\t\t\t\t<div class=\"fill\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<br/>\r\n\t\t\t\t\t\t<div style=\"display:block\">\r\n\t\t\t\t\t\t\t<p>{{message.fileName}}</p>\r\n\t\t\t\t\t\t\t<hr *ngIf=\"message.failed\"/>\r\n\t\t\t\t\t\t\t<p *ngIf=\"message.failed\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> &nbsp;Failed, please try again!</p>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t</ng-container>\r\n\t\t</ul>\r\n\t</div>\r\n\t<br/>\r\n\t<div class=\"message-input\">\r\n\t\t<input style=\"display:none\" #file type=\"file\" multiple (change)=\"upload(file.files)\" />\r\n\t\t<img src=\"assets/images/typing.gif\" width=\"50\" *ngIf=\"conversation.isTyping\">\r\n\t\t<div class=\"wrap\">\r\n\t\t\t<input type=\"text\" (keyup.enter)=\"onEnter()\" (focus)=\"typing(true)\" (focusout)=\"typing(false)\" [(ngModel)]=\"message\" placeholder=\"Write your message...\"\r\n\t\t\t/>\r\n\t\t\t<i class=\"fa fa-paperclip attachment\" (click)=\"file.click()\" aria-hidden=\"true\"></i>\r\n\t\t\t<button (click)=\"sendMessage()\"><i class=\"fa fa-paper-plane\" aria-hidden=\"true\"></i></button>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 271:
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\r\n    <p>\r\n        &copy; {{currentYear}}\r\n    </p>\r\n</footer>"

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\r\n    <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\r\n                    aria-controls=\"navbar\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\" [routerLink]=\"['/home']\"><em>Angular SignalR ASP.NET Core</em></a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li><a [routerLink]=\"['/home']\">Home</a></li>\r\n                <li><a [routerLink]=\"['/news']\">News</a></li>\r\n            </ul>\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li>\r\n                    <a href=\"https://twitter.com/damien_bod\"><img src=\"assets/damienbod.jpg\" height=\"30\" /></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ 273:
/***/ (function(module, exports) {

module.exports = "\r\n\r\n\r\n  \t<div id=\"sidepanel\">\r\n\t\t<div id=\"profile\">\r\n\t\t\t<div class=\"wrap\">\r\n\t\t\t\t<img  (click)=\"statusListVisible=!statusListVisible\" [ngClass]=\"customStatusClasses(mainUser.customStatus)\"  id=\"profile-img\" src=\"http://placehold.it/50/55C1E7/fff&text={{mainUser.name | firstletter}}\"  alt=\"\" />\r\n\t\t\t\t<p>{{mainUser.name}}</p>\r\n\t\t\t\t<!--<i class=\"fa fa-chevron-down expand-button\" aria-hidden=\"true\"></i>-->\r\n\t\t\t\t<div id=\"status-options\" [class.active]=\"statusListVisible\">\r\n\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t<li id=\"status-online\" (click)=\"changeStatus(0)\" [class.active]=\"userStatus==0\" ><span class=\"status-circle\"></span> <p>Online</p></li>\r\n\t\t\t\t\t\t<li id=\"status-away\" (click)=\"changeStatus(3)\" [class.active]=\"userStatus==3\"><span class=\"status-circle\"></span> <p>Away</p></li>\r\n\t\t\t\t\t\t<li id=\"status-busy\" (click)=\"changeStatus(2)\" [class.active]=\"userStatus==2\"><span class=\"status-circle\"></span> <p>Busy</p></li>\r\n\t\t\t\t\t\t<li id=\"status-offline\" (click)=\"changeStatus(1)\" [class.active]=\"userStatus==1\"><span class=\"status-circle\"></span> <p>Offline</p></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id=\"expanded\">\r\n\t\t\t\t\t<label for=\"twitter\"><i class=\"fa fa-facebook fa-fw\" aria-hidden=\"true\"></i></label>\r\n\t\t\t\t\t<input name=\"twitter\" type=\"text\" value=\"mikeross\" />\r\n\t\t\t\t\t<label for=\"twitter\"><i class=\"fa fa-twitter fa-fw\" aria-hidden=\"true\"></i></label>\r\n\t\t\t\t\t<input name=\"twitter\" type=\"text\" value=\"ross81\" />\r\n\t\t\t\t\t<label for=\"twitter\"><i class=\"fa fa-instagram fa-fw\" aria-hidden=\"true\"></i></label>\r\n\t\t\t\t\t<input name=\"twitter\" type=\"text\" value=\"mike.ross\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div id=\"search\">\r\n\t\t\t<label for=\"\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></label>\r\n\t\t\t<input type=\"text\" placeholder=\"Search contacts...\" />\r\n\t\t</div>\r\n\t\t<div id=\"contacts\">\r\n\t\t\t<ul>\r\n\t\t\t\t<!---->\r\n\t\t\t\t<li (click)=\"switch(conversation.id)\" [class.active]=\"isActive(conversation.id)\" class=\"contact \"  *ngFor=\"let conversation of conversations\">\r\n\t\t\t\t\t<div class=\"wrap\">\r\n\t\t\t\t\t\t<span class=\"contact-status\" [ngClass]=\"getStatusClasses(conversation)\" ></span>\r\n\r\n\t\t\t\t\t\t<img [class.typing]=\"conversation.isTyping\" [class.resetTyping]=\"!conversation.isTyping\" src=\"http://placehold.it/50/59687f/fff&text={{conversation.name |firstletter}}\" alt=\"\" />\r\n\r\n\t\t\t\t\t\t<div class=\"meta\">\r\n\t\t\t\t\t\t\t<p class=\"name\">{{conversation.name}}</p>\r\n\t\t\t\t\t\t\t<p *ngIf=\"conversation.isTyping\"  class=\"preview typingText\">Typing...</p>\r\n\t\t\t\t\t\t\t<p  *ngIf=\"!conversation.isTyping\" class=\"preview\">{{conversation.messages[conversation.messages.length-1]?.content}}</p>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t\r\n\t</div>"

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AppConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APP_DI_CONFIG; });

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]("app.config");
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());

var APP_DI_CONFIG = {
    // hubEndpoint: "http://localhost:5000/usershub",
    // apiEndpoint: "http://localhost:5000/api",
    hubEndpoint: "http://chat.npoci.com/usershub",
    apiEndpoint: "http://chat.npoci.com/api",
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 341:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(149);


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_service__ = __webpack_require__(190);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__user_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_service__ = __webpack_require__(189);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hub_service__ = __webpack_require__(188);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__hub_service__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message__ = __webpack_require__(180);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(183);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__conversation__ = __webpack_require__(177);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__conversation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userStatus__ = __webpack_require__(184);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__customStatus__ = __webpack_require__(178);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typingModel__ = __webpack_require__(182);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__linkPreview__ = __webpack_require__(179);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__atachmentContentType__ = __webpack_require__(175);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__atachmentContentType__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__attachment__ = __webpack_require__(176);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sendingModel__ = __webpack_require__(181);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__sendingModel__["a"]; });










//# sourceMappingURL=index.js.map

/***/ })

},[343]);
//# sourceMappingURL=main.bundle.js.map