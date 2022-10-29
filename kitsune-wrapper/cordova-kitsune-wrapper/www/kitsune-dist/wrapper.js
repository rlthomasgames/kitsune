"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[186],{

/***/ 197:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wrapper = void 0;
const ioc_mapping_1 = __webpack_require__(739);
const CoreState_1 = __webpack_require__(23);
class Wrapper {
    constructor() {
        const startUpCommand = ioc_mapping_1.default.get(CoreState_1.default.INIT);
        startUpCommand.run();
    }
}
exports.Wrapper = Wrapper;


/***/ }),

/***/ 597:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InitWrapper = void 0;
const inversify_1 = __webpack_require__(21);
const kitsune_wrapper_library_1 = __webpack_require__(46);
const FetchConfig_1 = __webpack_require__(102);
const LoadModule_1 = __webpack_require__(846);
const ioc_mapping_1 = __webpack_require__(739);
const CoreState_1 = __webpack_require__(23);
let InitWrapper = class InitWrapper {
    constructor() {
        this.totalLoaded = 0;
    }
    run() {
        this._wrapperConfig.request().then(() => {
            this.loadModules();
        });
    }
    loadModules() {
        const modules = (this._wrapperConfig).getConfig().modules;
        const result = !modules ? true : false;
        if (true === result) {
            return null;
        }
        this.totalModules = modules.length;
        if (this.totalModules === 0) {
            this.completeInit();
            return;
        }
        modules.forEach((module) => {
            var _a;
            (_a = this._moduleLoader.request(module)) === null || _a === void 0 ? void 0 : _a.then((moduleInstance) => {
                this.totalLoaded++;
                if (this.totalLoaded === this.totalModules) {
                    this.completeInit();
                    return;
                }
            });
        });
    }
    completeInit() {
        ioc_mapping_1.default.get(CoreState_1.default.INIT_COMPLETE);
    }
};
__decorate([
    (0, inversify_1.inject)(kitsune_wrapper_library_1.TYPES.FetchConfig),
    __metadata("design:type", FetchConfig_1.FetchConfig)
], InitWrapper.prototype, "_wrapperConfig", void 0);
__decorate([
    (0, inversify_1.inject)(kitsune_wrapper_library_1.TYPES.LoadModule),
    __metadata("design:type", LoadModule_1.LoadModule)
], InitWrapper.prototype, "_moduleLoader", void 0);
InitWrapper = __decorate([
    (0, inversify_1.injectable)()
], InitWrapper);
exports.InitWrapper = InitWrapper;


/***/ }),

/***/ 110:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InitWrapperComplete = void 0;
const inversify_1 = __webpack_require__(21);
const kitsune_wrapper_library_1 = __webpack_require__(46);
const FetchConfig_1 = __webpack_require__(102);
let InitWrapperComplete = class InitWrapperComplete {
    postConstruct() {
        this.run();
    }
    run() {
        var _a, _b;
        (_a = this._helloWorld) === null || _a === void 0 ? void 0 : _a.startModule();
        (_b = this._pixi) === null || _b === void 0 ? void 0 : _b.startModule();
    }
};
__decorate([
    (0, inversify_1.inject)(kitsune_wrapper_library_1.TYPES.FetchConfig),
    __metadata("design:type", FetchConfig_1.FetchConfig)
], InitWrapperComplete.prototype, "_wrapperConfig", void 0);
__decorate([
    (0, inversify_1.optional)(),
    (0, inversify_1.inject)('HelloWorldExtension'),
    __metadata("design:type", Object)
], InitWrapperComplete.prototype, "_helloWorld", void 0);
__decorate([
    (0, inversify_1.optional)(),
    (0, inversify_1.inject)('PixiFrameworkExtension'),
    __metadata("design:type", Object)
], InitWrapperComplete.prototype, "_pixi", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InitWrapperComplete.prototype, "postConstruct", null);
InitWrapperComplete = __decorate([
    (0, inversify_1.injectable)()
], InitWrapperComplete);
exports.InitWrapperComplete = InitWrapperComplete;


/***/ }),

/***/ 23:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const CoreState = {
    INIT: Symbol.for("Init"),
    INIT_COMPLETE: Symbol.for("InitComplete")
};
exports["default"] = CoreState;


/***/ }),

/***/ 739:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(706);
const inversify_1 = __webpack_require__(21);
const Base_1 = __webpack_require__(340);
const CoreState_1 = __webpack_require__(23);
const LoadModule_1 = __webpack_require__(846);
const InitWrapper_1 = __webpack_require__(597);
const FetchConfig_1 = __webpack_require__(102);
const InitWrapperComplete_1 = __webpack_require__(110);
let container = new inversify_1.Container({ skipBaseClassChecks: true });
container.bind(CoreState_1.default.INIT).to(InitWrapper_1.InitWrapper);
container.bind(Base_1.TYPES.FetchConfig).to(FetchConfig_1.FetchConfig).inSingletonScope();
container.bind(Base_1.TYPES.LoadModule).to(LoadModule_1.LoadModule);
container.bind(CoreState_1.default.INIT_COMPLETE).to(InitWrapperComplete_1.InitWrapperComplete);
exports["default"] = container;


/***/ }),

/***/ 102:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FetchConfig = void 0;
const inversify_1 = __webpack_require__(21);
const _ = __webpack_require__(784);
let FetchConfig = class FetchConfig {
    constructor() {
        this.getConfig = () => this.finalConfig;
        this.getUrlParams = () => new URLSearchParams(window.location.search);
    }
    request() {
        const params = {};
        this.getUrlParams().forEach((value, key, parent) => {
            Object.defineProperty(params, key, { value: value });
        });
        this.urlParams = params;
        this.baseConfig = Object.assign({}, baseConfig);
        this.internalPromise = fetch('./config/wrapper.json')
            .then(response => {
            return response.json();
        }, reason => { })
            .then(data => {
            this.configLoaded(data);
        });
        return this.internalPromise;
    }
    configLoaded(fetchedConfig) {
        const merge0 = _.merge(this.urlParams, this.baseConfig);
        this.finalConfig = Object.assign({}, fetchedConfig, merge0);
        this.finalConfig = _.merge(this.finalConfig, fetchedConfig);
    }
};
FetchConfig = __decorate([
    (0, inversify_1.injectable)()
], FetchConfig);
exports.FetchConfig = FetchConfig;
const baseConfig = {
    version: 0,
    securityToken: "none",
    language: "en-UK",
    //gameConfig: "localhost:9090/config/lobby.json",
    platformAddress: "localhost:7070/socket",
    layout: {
        name: "layout0"
    }
};


/***/ }),

/***/ 846:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoadModule = void 0;
const inversify_1 = __webpack_require__(21);
const ioc_mapping_1 = __webpack_require__(739);
let LoadModule = class LoadModule {
    request(moduleVO) {
        return (moduleVO === null) ? undefined : this.loadJS(moduleVO.modulePath, moduleVO.moduleName, document.head);
    }
    loadJS(url, extensionName, location) {
        return new Promise((resolved, rejected) => {
            const scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = url;
            location.appendChild(scriptTag);
            scriptTag.onload = () => {
                // @ts-ignore
                const kitsuneExtensionFactories = window['kitsuneExtensionFactories'];
                const extension = kitsuneExtensionFactories.get(extensionName);
                ioc_mapping_1.default.bind(extensionName).to(extension);
                const instance = ioc_mapping_1.default.get(extensionName);
                resolved(instance);
            };
            scriptTag.onerror = (error) => {
                rejected(error);
            };
        });
    }
};
LoadModule = __decorate([
    (0, inversify_1.injectable)()
], LoadModule);
exports.LoadModule = LoadModule;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [712,823], () => (__webpack_exec__(197)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Ysc0JBQXNCLG1CQUFPLENBQUMsR0FBbUI7QUFDakQsb0JBQW9CLG1CQUFPLENBQUMsRUFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7QUNYRjtBQUNiO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CLG9CQUFvQixtQkFBTyxDQUFDLEVBQVc7QUFDdkMsa0NBQWtDLG1CQUFPLENBQUMsRUFBeUI7QUFDbkUsc0JBQXNCLG1CQUFPLENBQUMsR0FBd0I7QUFDdEQscUJBQXFCLG1CQUFPLENBQUMsR0FBdUI7QUFDcEQsc0JBQXNCLG1CQUFPLENBQUMsR0FBb0I7QUFDbEQsb0JBQW9CLG1CQUFPLENBQUMsRUFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7O0FDaEVOO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkI7QUFDM0Isb0JBQW9CLG1CQUFPLENBQUMsRUFBVztBQUN2QyxrQ0FBa0MsbUJBQU8sQ0FBQyxFQUF5QjtBQUNuRSxzQkFBc0IsbUJBQU8sQ0FBQyxHQUF3QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7O0FDaERkO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7O0FDTkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQU8sQ0FBQyxHQUFrQjtBQUMxQixvQkFBb0IsbUJBQU8sQ0FBQyxFQUFXO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQyxHQUFrRDtBQUN6RSxvQkFBb0IsbUJBQU8sQ0FBQyxFQUF3QjtBQUNwRCxxQkFBcUIsbUJBQU8sQ0FBQyxHQUF1QjtBQUNwRCxzQkFBc0IsbUJBQU8sQ0FBQyxHQUF5QjtBQUN2RCxzQkFBc0IsbUJBQU8sQ0FBQyxHQUF3QjtBQUN0RCw4QkFBOEIsbUJBQU8sQ0FBQyxHQUFpQztBQUN2RSw0Q0FBNEMsMkJBQTJCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7O0FDZkY7QUFDYjtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQixvQkFBb0IsbUJBQU8sQ0FBQyxFQUFXO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyxHQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsY0FBYztBQUMvRCxTQUFTO0FBQ1Q7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25EYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCLG9CQUFvQixtQkFBTyxDQUFDLEVBQVc7QUFDdkMsc0JBQXNCLG1CQUFPLENBQUMsR0FBb0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb3JlL1dyYXBwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9jb21tYW5kcy9Jbml0V3JhcHBlci50cyIsIndlYnBhY2s6Ly8vLi9jb3JlL2NvbW1hbmRzL0luaXRXcmFwcGVyQ29tcGxldGUudHMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9jb25zdGFudHMvQ29yZVN0YXRlLnRzIiwid2VicGFjazovLy8uL2NvcmUvaW9jL2lvY19tYXBwaW5nLnRzIiwid2VicGFjazovLy8uL2NvcmUvc2VydmljZS9GZXRjaENvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9jb3JlL3NlcnZpY2UvTG9hZE1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV3JhcHBlciA9IHZvaWQgMDtcbmNvbnN0IGlvY19tYXBwaW5nXzEgPSByZXF1aXJlKFwiLi9pb2MvaW9jX21hcHBpbmdcIik7XG5jb25zdCBDb3JlU3RhdGVfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50cy9Db3JlU3RhdGVcIik7XG5jbGFzcyBXcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRVcENvbW1hbmQgPSBpb2NfbWFwcGluZ18xLmRlZmF1bHQuZ2V0KENvcmVTdGF0ZV8xLmRlZmF1bHQuSU5JVCk7XG4gICAgICAgIHN0YXJ0VXBDb21tYW5kLnJ1bigpO1xuICAgIH1cbn1cbmV4cG9ydHMuV3JhcHBlciA9IFdyYXBwZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkluaXRXcmFwcGVyID0gdm9pZCAwO1xuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xuY29uc3Qga2l0c3VuZV93cmFwcGVyX2xpYnJhcnlfMSA9IHJlcXVpcmUoXCJraXRzdW5lLXdyYXBwZXItbGlicmFyeVwiKTtcbmNvbnN0IEZldGNoQ29uZmlnXzEgPSByZXF1aXJlKFwiLi4vc2VydmljZS9GZXRjaENvbmZpZ1wiKTtcbmNvbnN0IExvYWRNb2R1bGVfMSA9IHJlcXVpcmUoXCIuLi9zZXJ2aWNlL0xvYWRNb2R1bGVcIik7XG5jb25zdCBpb2NfbWFwcGluZ18xID0gcmVxdWlyZShcIi4uL2lvYy9pb2NfbWFwcGluZ1wiKTtcbmNvbnN0IENvcmVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9Db3JlU3RhdGVcIik7XG5sZXQgSW5pdFdyYXBwZXIgPSBjbGFzcyBJbml0V3JhcHBlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudG90YWxMb2FkZWQgPSAwO1xuICAgIH1cbiAgICBydW4oKSB7XG4gICAgICAgIHRoaXMuX3dyYXBwZXJDb25maWcucmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9kdWxlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZE1vZHVsZXMoKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSAodGhpcy5fd3JhcHBlckNvbmZpZykuZ2V0Q29uZmlnKCkubW9kdWxlcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gIW1vZHVsZXMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIGlmICh0cnVlID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG90YWxNb2R1bGVzID0gbW9kdWxlcy5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsTW9kdWxlcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUluaXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5fbW9kdWxlTG9hZGVyLnJlcXVlc3QobW9kdWxlKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRoZW4oKG1vZHVsZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbExvYWRlZCsrO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvdGFsTG9hZGVkID09PSB0aGlzLnRvdGFsTW9kdWxlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlSW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb21wbGV0ZUluaXQoKSB7XG4gICAgICAgIGlvY19tYXBwaW5nXzEuZGVmYXVsdC5nZXQoQ29yZVN0YXRlXzEuZGVmYXVsdC5JTklUX0NPTVBMRVRFKTtcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgKDAsIGludmVyc2lmeV8xLmluamVjdCkoa2l0c3VuZV93cmFwcGVyX2xpYnJhcnlfMS5UWVBFUy5GZXRjaENvbmZpZyksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZldGNoQ29uZmlnXzEuRmV0Y2hDb25maWcpXG5dLCBJbml0V3JhcHBlci5wcm90b3R5cGUsIFwiX3dyYXBwZXJDb25maWdcIiwgdm9pZCAwKTtcbl9fZGVjb3JhdGUoW1xuICAgICgwLCBpbnZlcnNpZnlfMS5pbmplY3QpKGtpdHN1bmVfd3JhcHBlcl9saWJyYXJ5XzEuVFlQRVMuTG9hZE1vZHVsZSksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIExvYWRNb2R1bGVfMS5Mb2FkTW9kdWxlKVxuXSwgSW5pdFdyYXBwZXIucHJvdG90eXBlLCBcIl9tb2R1bGVMb2FkZXJcIiwgdm9pZCAwKTtcbkluaXRXcmFwcGVyID0gX19kZWNvcmF0ZShbXG4gICAgKDAsIGludmVyc2lmeV8xLmluamVjdGFibGUpKClcbl0sIEluaXRXcmFwcGVyKTtcbmV4cG9ydHMuSW5pdFdyYXBwZXIgPSBJbml0V3JhcHBlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW5pdFdyYXBwZXJDb21wbGV0ZSA9IHZvaWQgMDtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IGtpdHN1bmVfd3JhcHBlcl9saWJyYXJ5XzEgPSByZXF1aXJlKFwia2l0c3VuZS13cmFwcGVyLWxpYnJhcnlcIik7XG5jb25zdCBGZXRjaENvbmZpZ18xID0gcmVxdWlyZShcIi4uL3NlcnZpY2UvRmV0Y2hDb25maWdcIik7XG5sZXQgSW5pdFdyYXBwZXJDb21wbGV0ZSA9IGNsYXNzIEluaXRXcmFwcGVyQ29tcGxldGUge1xuICAgIHBvc3RDb25zdHJ1Y3QoKSB7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9hID0gdGhpcy5faGVsbG9Xb3JsZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0YXJ0TW9kdWxlKCk7XG4gICAgICAgIChfYiA9IHRoaXMuX3BpeGkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGFydE1vZHVsZSgpO1xuICAgIH1cbn07XG5fX2RlY29yYXRlKFtcbiAgICAoMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KShraXRzdW5lX3dyYXBwZXJfbGlicmFyeV8xLlRZUEVTLkZldGNoQ29uZmlnKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgRmV0Y2hDb25maWdfMS5GZXRjaENvbmZpZylcbl0sIEluaXRXcmFwcGVyQ29tcGxldGUucHJvdG90eXBlLCBcIl93cmFwcGVyQ29uZmlnXCIsIHZvaWQgMCk7XG5fX2RlY29yYXRlKFtcbiAgICAoMCwgaW52ZXJzaWZ5XzEub3B0aW9uYWwpKCksXG4gICAgKDAsIGludmVyc2lmeV8xLmluamVjdCkoJ0hlbGxvV29ybGRFeHRlbnNpb24nKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnR5cGVcIiwgT2JqZWN0KVxuXSwgSW5pdFdyYXBwZXJDb21wbGV0ZS5wcm90b3R5cGUsIFwiX2hlbGxvV29ybGRcIiwgdm9pZCAwKTtcbl9fZGVjb3JhdGUoW1xuICAgICgwLCBpbnZlcnNpZnlfMS5vcHRpb25hbCkoKSxcbiAgICAoMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KSgnUGl4aUZyYW1ld29ya0V4dGVuc2lvbicpLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCBPYmplY3QpXG5dLCBJbml0V3JhcHBlckNvbXBsZXRlLnByb3RvdHlwZSwgXCJfcGl4aVwiLCB2b2lkIDApO1xuX19kZWNvcmF0ZShbXG4gICAgKDAsIGludmVyc2lmeV8xLnBvc3RDb25zdHJ1Y3QpKCksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCB2b2lkIDApXG5dLCBJbml0V3JhcHBlckNvbXBsZXRlLnByb3RvdHlwZSwgXCJwb3N0Q29uc3RydWN0XCIsIG51bGwpO1xuSW5pdFdyYXBwZXJDb21wbGV0ZSA9IF9fZGVjb3JhdGUoW1xuICAgICgwLCBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKSgpXG5dLCBJbml0V3JhcHBlckNvbXBsZXRlKTtcbmV4cG9ydHMuSW5pdFdyYXBwZXJDb21wbGV0ZSA9IEluaXRXcmFwcGVyQ29tcGxldGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENvcmVTdGF0ZSA9IHtcbiAgICBJTklUOiBTeW1ib2wuZm9yKFwiSW5pdFwiKSxcbiAgICBJTklUX0NPTVBMRVRFOiBTeW1ib2wuZm9yKFwiSW5pdENvbXBsZXRlXCIpXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29yZVN0YXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IEJhc2VfMSA9IHJlcXVpcmUoXCJraXRzdW5lLXdyYXBwZXItbGlicmFyeS9kaXN0L2Jhc2UvY29uc3RhbnRzL0Jhc2VcIik7XG5jb25zdCBDb3JlU3RhdGVfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvQ29yZVN0YXRlXCIpO1xuY29uc3QgTG9hZE1vZHVsZV8xID0gcmVxdWlyZShcIi4uL3NlcnZpY2UvTG9hZE1vZHVsZVwiKTtcbmNvbnN0IEluaXRXcmFwcGVyXzEgPSByZXF1aXJlKFwiLi4vY29tbWFuZHMvSW5pdFdyYXBwZXJcIik7XG5jb25zdCBGZXRjaENvbmZpZ18xID0gcmVxdWlyZShcIi4uL3NlcnZpY2UvRmV0Y2hDb25maWdcIik7XG5jb25zdCBJbml0V3JhcHBlckNvbXBsZXRlXzEgPSByZXF1aXJlKFwiLi4vY29tbWFuZHMvSW5pdFdyYXBwZXJDb21wbGV0ZVwiKTtcbmxldCBjb250YWluZXIgPSBuZXcgaW52ZXJzaWZ5XzEuQ29udGFpbmVyKHsgc2tpcEJhc2VDbGFzc0NoZWNrczogdHJ1ZSB9KTtcbmNvbnRhaW5lci5iaW5kKENvcmVTdGF0ZV8xLmRlZmF1bHQuSU5JVCkudG8oSW5pdFdyYXBwZXJfMS5Jbml0V3JhcHBlcik7XG5jb250YWluZXIuYmluZChCYXNlXzEuVFlQRVMuRmV0Y2hDb25maWcpLnRvKEZldGNoQ29uZmlnXzEuRmV0Y2hDb25maWcpLmluU2luZ2xldG9uU2NvcGUoKTtcbmNvbnRhaW5lci5iaW5kKEJhc2VfMS5UWVBFUy5Mb2FkTW9kdWxlKS50byhMb2FkTW9kdWxlXzEuTG9hZE1vZHVsZSk7XG5jb250YWluZXIuYmluZChDb3JlU3RhdGVfMS5kZWZhdWx0LklOSVRfQ09NUExFVEUpLnRvKEluaXRXcmFwcGVyQ29tcGxldGVfMS5Jbml0V3JhcHBlckNvbXBsZXRlKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvbnRhaW5lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5GZXRjaENvbmZpZyA9IHZvaWQgMDtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xubGV0IEZldGNoQ29uZmlnID0gY2xhc3MgRmV0Y2hDb25maWcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdldENvbmZpZyA9ICgpID0+IHRoaXMuZmluYWxDb25maWc7XG4gICAgICAgIHRoaXMuZ2V0VXJsUGFyYW1zID0gKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICB9XG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgICAgIHRoaXMuZ2V0VXJsUGFyYW1zKCkuZm9yRWFjaCgodmFsdWUsIGtleSwgcGFyZW50KSA9PiB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGFyYW1zLCBrZXksIHsgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cmxQYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuYmFzZUNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGJhc2VDb25maWcpO1xuICAgICAgICB0aGlzLmludGVybmFsUHJvbWlzZSA9IGZldGNoKCcuL2NvbmZpZy93cmFwcGVyLmpzb24nKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSwgcmVhc29uID0+IHsgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb25maWdMb2FkZWQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFByb21pc2U7XG4gICAgfVxuICAgIGNvbmZpZ0xvYWRlZChmZXRjaGVkQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlMCA9IF8ubWVyZ2UodGhpcy51cmxQYXJhbXMsIHRoaXMuYmFzZUNvbmZpZyk7XG4gICAgICAgIHRoaXMuZmluYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBmZXRjaGVkQ29uZmlnLCBtZXJnZTApO1xuICAgICAgICB0aGlzLmZpbmFsQ29uZmlnID0gXy5tZXJnZSh0aGlzLmZpbmFsQ29uZmlnLCBmZXRjaGVkQ29uZmlnKTtcbiAgICB9XG59O1xuRmV0Y2hDb25maWcgPSBfX2RlY29yYXRlKFtcbiAgICAoMCwgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSkoKVxuXSwgRmV0Y2hDb25maWcpO1xuZXhwb3J0cy5GZXRjaENvbmZpZyA9IEZldGNoQ29uZmlnO1xuY29uc3QgYmFzZUNvbmZpZyA9IHtcbiAgICB2ZXJzaW9uOiAwLFxuICAgIHNlY3VyaXR5VG9rZW46IFwibm9uZVwiLFxuICAgIGxhbmd1YWdlOiBcImVuLVVLXCIsXG4gICAgLy9nYW1lQ29uZmlnOiBcImxvY2FsaG9zdDo5MDkwL2NvbmZpZy9sb2JieS5qc29uXCIsXG4gICAgcGxhdGZvcm1BZGRyZXNzOiBcImxvY2FsaG9zdDo3MDcwL3NvY2tldFwiLFxuICAgIGxheW91dDoge1xuICAgICAgICBuYW1lOiBcImxheW91dDBcIlxuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTG9hZE1vZHVsZSA9IHZvaWQgMDtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IGlvY19tYXBwaW5nXzEgPSByZXF1aXJlKFwiLi4vaW9jL2lvY19tYXBwaW5nXCIpO1xubGV0IExvYWRNb2R1bGUgPSBjbGFzcyBMb2FkTW9kdWxlIHtcbiAgICByZXF1ZXN0KG1vZHVsZVZPKSB7XG4gICAgICAgIHJldHVybiAobW9kdWxlVk8gPT09IG51bGwpID8gdW5kZWZpbmVkIDogdGhpcy5sb2FkSlMobW9kdWxlVk8ubW9kdWxlUGF0aCwgbW9kdWxlVk8ubW9kdWxlTmFtZSwgZG9jdW1lbnQuaGVhZCk7XG4gICAgfVxuICAgIGxvYWRKUyh1cmwsIGV4dGVuc2lvbk5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZWQsIHJlamVjdGVkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHRUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdFRhZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgICBzY3JpcHRUYWcuc3JjID0gdXJsO1xuICAgICAgICAgICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcbiAgICAgICAgICAgIHNjcmlwdFRhZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGNvbnN0IGtpdHN1bmVFeHRlbnNpb25GYWN0b3JpZXMgPSB3aW5kb3dbJ2tpdHN1bmVFeHRlbnNpb25GYWN0b3JpZXMnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBraXRzdW5lRXh0ZW5zaW9uRmFjdG9yaWVzLmdldChleHRlbnNpb25OYW1lKTtcbiAgICAgICAgICAgICAgICBpb2NfbWFwcGluZ18xLmRlZmF1bHQuYmluZChleHRlbnNpb25OYW1lKS50byhleHRlbnNpb24pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gaW9jX21hcHBpbmdfMS5kZWZhdWx0LmdldChleHRlbnNpb25OYW1lKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlZChpbnN0YW5jZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NyaXB0VGFnLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3RlZChlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuTG9hZE1vZHVsZSA9IF9fZGVjb3JhdGUoW1xuICAgICgwLCBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKSgpXG5dLCBMb2FkTW9kdWxlKTtcbmV4cG9ydHMuTG9hZE1vZHVsZSA9IExvYWRNb2R1bGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=