"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[823],{338:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractAsyncRequest=void 0;t.AbstractAsyncRequest=class{request(e){}}},821:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCommand=void 0;t.AbstractCommand=class{run(){console.log("this is abstract implementation of ICommand, please make sure to override")}}},631:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractModule=void 0;t.AbstractModule=class{constructor(){this.name="Abstract"}startModule(){console.log("this is abstract implementation of IInjectableExtensionModule, please make sure to override")}}},873:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractSoundService=void 0;t.AbstractSoundService=class{loadSound(e){console.log("this is abstract implementation of ISoundService, please make sure to override")}}},340:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TYPES=void 0,t.TYPES={FetchConfig:Symbol.for("FetchConfig"),Command:Symbol.for("Command"),LoadModule:Symbol.for("LoadModule"),InjectionTest:Symbol.for("InjectionTest")}},46:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TYPES=t.AbstractAsyncRequest=t.AbstractCommand=t.AbstractSoundService=t.AbstractModule=void 0;var o=r(631);Object.defineProperty(t,"AbstractModule",{enumerable:!0,get:function(){return o.AbstractModule}});var s=r(873);Object.defineProperty(t,"AbstractSoundService",{enumerable:!0,get:function(){return s.AbstractSoundService}});var n=r(821);Object.defineProperty(t,"AbstractCommand",{enumerable:!0,get:function(){return n.AbstractCommand}});var a=r(338);Object.defineProperty(t,"AbstractAsyncRequest",{enumerable:!0,get:function(){return a.AbstractAsyncRequest}});var c=r(340);Object.defineProperty(t,"TYPES",{enumerable:!0,get:function(){return c.TYPES}})}},e=>{e.O(0,[712],(()=>{return t=46,e(e.s=t);var t}));e.O()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy9rd2wuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiJnRkFDQUEsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFFLDBCQUF1QixFQU8vQkYsRUFBUUUscUJBTlIsTUFDSUMsUUFBUUMsR0FFUixFLGNDTEpOLE9BQU9DLGVBQWVDLEVBQVMsYUFBYyxDQUFFQyxPQUFPLElBQ3RERCxFQUFRSyxxQkFBa0IsRUFPMUJMLEVBQVFLLGdCQU5SLE1BQ0lDLE1BQ0lDLFFBQVFDLElBQUksNEVBQ2hCLEUsY0NMSlYsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFTLG9CQUFpQixFQVV6QlQsRUFBUVMsZUFUUixNQUNJQyxjQUNJQyxLQUFLQyxLQUFPLFVBQ2hCLENBQ0FDLGNBQ0lOLFFBQVFDLElBQUksOEZBQ2hCLEUsY0NSSlYsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFjLDBCQUF1QixFQU8vQmQsRUFBUWMscUJBTlIsTUFDSUMsVUFBVUgsR0FDTkwsUUFBUUMsSUFBSSxpRkFDaEIsRSxjQ0xKVixPQUFPQyxlQUFlQyxFQUFTLGFBQWMsQ0FBRUMsT0FBTyxJQUN0REQsRUFBUWdCLFdBQVEsRUFDaEJoQixFQUFRZ0IsTUFBUSxDQUNaQyxZQUFhQyxPQUFPQyxJQUFJLGVBQ3hCQyxRQUFTRixPQUFPQyxJQUFJLFdBQ3BCRSxXQUFZSCxPQUFPQyxJQUFJLGNBQ3ZCRyxjQUFlSixPQUFPQyxJQUFJLGlCLGVDTjlCckIsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFnQixNQUFRaEIsRUFBUUUscUJBQXVCRixFQUFRSyxnQkFBa0JMLEVBQVFjLHFCQUF1QmQsRUFBUVMsb0JBQWlCLEVBQ2pJLElBQUljLEVBQW1CLEVBQVEsS0FDL0J6QixPQUFPQyxlQUFlQyxFQUFTLGlCQUFrQixDQUFFd0IsWUFBWSxFQUFNQyxJQUFLLFdBQWMsT0FBT0YsRUFBaUJkLGNBQWdCLElBQ2hJLElBQUlpQixFQUF5QixFQUFRLEtBQ3JDNUIsT0FBT0MsZUFBZUMsRUFBUyx1QkFBd0IsQ0FBRXdCLFlBQVksRUFBTUMsSUFBSyxXQUFjLE9BQU9DLEVBQXVCWixvQkFBc0IsSUFDbEosSUFBSWEsRUFBb0IsRUFBUSxLQUNoQzdCLE9BQU9DLGVBQWVDLEVBQVMsa0JBQW1CLENBQUV3QixZQUFZLEVBQU1DLElBQUssV0FBYyxPQUFPRSxFQUFrQnRCLGVBQWlCLElBQ25JLElBQUl1QixFQUF5QixFQUFRLEtBQ3JDOUIsT0FBT0MsZUFBZUMsRUFBUyx1QkFBd0IsQ0FBRXdCLFlBQVksRUFBTUMsSUFBSyxXQUFjLE9BQU9HLEVBQXVCMUIsb0JBQXNCLElBQ2xKLElBQUkyQixFQUFTLEVBQVEsS0FDckIvQixPQUFPQyxlQUFlQyxFQUFTLFFBQVMsQ0FBRXdCLFlBQVksRUFBTUMsSUFBSyxXQUFjLE9BQU9JLEVBQU9iLEtBQU8sRyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMva2l0c3VuZS13cmFwcGVyLWxpYnJhcnkvZGlzdC9iYXNlL2Fic3RyYWN0L0Fic3RyYWN0QXN5bmNSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMva2l0c3VuZS13cmFwcGVyLWxpYnJhcnkvZGlzdC9iYXNlL2Fic3RyYWN0L0Fic3RyYWN0Q29tbWFuZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2tpdHN1bmUtd3JhcHBlci1saWJyYXJ5L2Rpc3QvYmFzZS9hYnN0cmFjdC9BYnN0cmFjdE1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2tpdHN1bmUtd3JhcHBlci1saWJyYXJ5L2Rpc3QvYmFzZS9hYnN0cmFjdC9BYnN0cmFjdFNvdW5kU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2tpdHN1bmUtd3JhcHBlci1saWJyYXJ5L2Rpc3QvYmFzZS9jb25zdGFudHMvQmFzZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2tpdHN1bmUtd3JhcHBlci1saWJyYXJ5L2Rpc3QvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BYnN0cmFjdEFzeW5jUmVxdWVzdCA9IHZvaWQgMDtcclxuY2xhc3MgQWJzdHJhY3RBc3luY1JlcXVlc3Qge1xyXG4gICAgcmVxdWVzdChtb2R1bGVOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIDtcclxufVxyXG5leHBvcnRzLkFic3RyYWN0QXN5bmNSZXF1ZXN0ID0gQWJzdHJhY3RBc3luY1JlcXVlc3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQWJzdHJhY3RDb21tYW5kID0gdm9pZCAwO1xyXG5jbGFzcyBBYnN0cmFjdENvbW1hbmQge1xyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIGFic3RyYWN0IGltcGxlbWVudGF0aW9uIG9mIElDb21tYW5kLCBwbGVhc2UgbWFrZSBzdXJlIHRvIG92ZXJyaWRlJyk7XHJcbiAgICB9XHJcbiAgICA7XHJcbn1cclxuZXhwb3J0cy5BYnN0cmFjdENvbW1hbmQgPSBBYnN0cmFjdENvbW1hbmQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQWJzdHJhY3RNb2R1bGUgPSB2b2lkIDA7XHJcbmNsYXNzIEFic3RyYWN0TW9kdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdBYnN0cmFjdCc7XHJcbiAgICB9XHJcbiAgICBzdGFydE1vZHVsZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBhYnN0cmFjdCBpbXBsZW1lbnRhdGlvbiBvZiBJSW5qZWN0YWJsZUV4dGVuc2lvbk1vZHVsZSwgcGxlYXNlIG1ha2Ugc3VyZSB0byBvdmVycmlkZScpO1xyXG4gICAgfVxyXG4gICAgO1xyXG59XHJcbmV4cG9ydHMuQWJzdHJhY3RNb2R1bGUgPSBBYnN0cmFjdE1vZHVsZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BYnN0cmFjdFNvdW5kU2VydmljZSA9IHZvaWQgMDtcclxuY2xhc3MgQWJzdHJhY3RTb3VuZFNlcnZpY2Uge1xyXG4gICAgbG9hZFNvdW5kKG5hbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBhYnN0cmFjdCBpbXBsZW1lbnRhdGlvbiBvZiBJU291bmRTZXJ2aWNlLCBwbGVhc2UgbWFrZSBzdXJlIHRvIG92ZXJyaWRlJyk7XHJcbiAgICB9XHJcbiAgICA7XHJcbn1cclxuZXhwb3J0cy5BYnN0cmFjdFNvdW5kU2VydmljZSA9IEFic3RyYWN0U291bmRTZXJ2aWNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRZUEVTID0gdm9pZCAwO1xyXG5leHBvcnRzLlRZUEVTID0ge1xyXG4gICAgRmV0Y2hDb25maWc6IFN5bWJvbC5mb3IoXCJGZXRjaENvbmZpZ1wiKSxcclxuICAgIENvbW1hbmQ6IFN5bWJvbC5mb3IoXCJDb21tYW5kXCIpLFxyXG4gICAgTG9hZE1vZHVsZTogU3ltYm9sLmZvcihcIkxvYWRNb2R1bGVcIiksXHJcbiAgICBJbmplY3Rpb25UZXN0OiBTeW1ib2wuZm9yKFwiSW5qZWN0aW9uVGVzdFwiKSxcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5UWVBFUyA9IGV4cG9ydHMuQWJzdHJhY3RBc3luY1JlcXVlc3QgPSBleHBvcnRzLkFic3RyYWN0Q29tbWFuZCA9IGV4cG9ydHMuQWJzdHJhY3RTb3VuZFNlcnZpY2UgPSBleHBvcnRzLkFic3RyYWN0TW9kdWxlID0gdm9pZCAwO1xyXG52YXIgQWJzdHJhY3RNb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2Jhc2UvYWJzdHJhY3QvQWJzdHJhY3RNb2R1bGVcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFic3RyYWN0TW9kdWxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBBYnN0cmFjdE1vZHVsZV8xLkFic3RyYWN0TW9kdWxlOyB9IH0pO1xyXG52YXIgQWJzdHJhY3RTb3VuZFNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2Jhc2UvYWJzdHJhY3QvQWJzdHJhY3RTb3VuZFNlcnZpY2VcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFic3RyYWN0U291bmRTZXJ2aWNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBBYnN0cmFjdFNvdW5kU2VydmljZV8xLkFic3RyYWN0U291bmRTZXJ2aWNlOyB9IH0pO1xyXG52YXIgQWJzdHJhY3RDb21tYW5kXzEgPSByZXF1aXJlKFwiLi9iYXNlL2Fic3RyYWN0L0Fic3RyYWN0Q29tbWFuZFwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQWJzdHJhY3RDb21tYW5kXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBBYnN0cmFjdENvbW1hbmRfMS5BYnN0cmFjdENvbW1hbmQ7IH0gfSk7XHJcbnZhciBBYnN0cmFjdEFzeW5jUmVxdWVzdF8xID0gcmVxdWlyZShcIi4vYmFzZS9hYnN0cmFjdC9BYnN0cmFjdEFzeW5jUmVxdWVzdFwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQWJzdHJhY3RBc3luY1JlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFic3RyYWN0QXN5bmNSZXF1ZXN0XzEuQWJzdHJhY3RBc3luY1JlcXVlc3Q7IH0gfSk7XHJcbnZhciBCYXNlXzEgPSByZXF1aXJlKFwiLi9iYXNlL2NvbnN0YW50cy9CYXNlXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUWVBFU1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQmFzZV8xLlRZUEVTOyB9IH0pO1xyXG4iXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJBYnN0cmFjdEFzeW5jUmVxdWVzdCIsInJlcXVlc3QiLCJtb2R1bGVOYW1lIiwiQWJzdHJhY3RDb21tYW5kIiwicnVuIiwiY29uc29sZSIsImxvZyIsIkFic3RyYWN0TW9kdWxlIiwiY29uc3RydWN0b3IiLCJ0aGlzIiwibmFtZSIsInN0YXJ0TW9kdWxlIiwiQWJzdHJhY3RTb3VuZFNlcnZpY2UiLCJsb2FkU291bmQiLCJUWVBFUyIsIkZldGNoQ29uZmlnIiwiU3ltYm9sIiwiZm9yIiwiQ29tbWFuZCIsIkxvYWRNb2R1bGUiLCJJbmplY3Rpb25UZXN0IiwiQWJzdHJhY3RNb2R1bGVfMSIsImVudW1lcmFibGUiLCJnZXQiLCJBYnN0cmFjdFNvdW5kU2VydmljZV8xIiwiQWJzdHJhY3RDb21tYW5kXzEiLCJBYnN0cmFjdEFzeW5jUmVxdWVzdF8xIiwiQmFzZV8xIl0sInNvdXJjZVJvb3QiOiIifQ==