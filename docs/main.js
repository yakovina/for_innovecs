/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://for_innovecs/./node_modules/events/events.js?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ADDED_ANGLE: () => (/* binding */ ADDED_ANGLE),\n/* harmony export */   DEFAULT_TIMEOUT: () => (/* binding */ DEFAULT_TIMEOUT),\n/* harmony export */   SLOT_EVENTS_ENUM: () => (/* binding */ SLOT_EVENTS_ENUM),\n/* harmony export */   SLOT_NAMES_ENUM: () => (/* binding */ SLOT_NAMES_ENUM)\n/* harmony export */ });\nvar DEFAULT_TIMEOUT = 30;\nvar ADDED_ANGLE = 120;\nvar SLOT_NAMES_ENUM;\n(function (SLOT_NAMES_ENUM) {\n    SLOT_NAMES_ENUM[\"SLOT1\"] = \"slot-1\";\n    SLOT_NAMES_ENUM[\"SLOT2\"] = \"slot-2\";\n    SLOT_NAMES_ENUM[\"SLOT3\"] = \"slot-3\";\n})(SLOT_NAMES_ENUM || (SLOT_NAMES_ENUM = {}));\nvar SLOT_EVENTS_ENUM;\n(function (SLOT_EVENTS_ENUM) {\n    SLOT_EVENTS_ENUM[\"START\"] = \":start\";\n    SLOT_EVENTS_ENUM[\"STOP\"] = \":stop\";\n})(SLOT_EVENTS_ENUM || (SLOT_EVENTS_ENUM = {}));\n\n\n//# sourceURL=webpack://for_innovecs/./src/constants.ts?");

/***/ }),

/***/ "./src/controllers/SlotMachineController.ts":
/*!**************************************************!*\
  !*** ./src/controllers/SlotMachineController.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_SlotMachineModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/SlotMachineModel */ \"./src/models/SlotMachineModel.ts\");\n\nvar SlotMachineController = /** @class */ (function () {\n    function SlotMachineController() {\n        this.SlotMachine = new _models_SlotMachineModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n    SlotMachineController.prototype.play = function () {\n        var _this = this;\n        this.SlotMachine.start();\n        setTimeout(function () {\n            _this.SlotMachine.stop();\n        }, 200);\n    };\n    SlotMachineController.prototype.isRunning = function () {\n        return this.SlotMachine.isRunning;\n    };\n    return SlotMachineController;\n}());\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlotMachineController);\n\n\n//# sourceURL=webpack://for_innovecs/./src/controllers/SlotMachineController.ts?");

/***/ }),

/***/ "./src/mocks/slotMashine.ts":
/*!**********************************!*\
  !*** ./src/mocks/slotMashine.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   paintSlotMashine: () => (/* binding */ paintSlotMashine)\n/* harmony export */ });\nvar paintSlotMashine = function () { return \"\\n<div id='container'>\\n<div id=\\\"slot-machine\\\">\\n<div id=\\\"slots\\\">\\n  <div class=\\\"container\\\">\\n    <div class=\\\"slot slot-1\\\">\\n      <figure>1</figure>\\n      <figure>2</figure>\\n      <figure>3</figure>\\n    </div>\\n  </div>\\n  <div class=\\\"container\\\">\\n    <div class=\\\"slot slot-2\\\">\\n      <figure>1</figure>\\n      <figure>2</figure>\\n      <figure>3</figure>\\n    </div>\\n  </div>\\n  <div class=\\\"container\\\">\\n    <div class=\\\"slot slot-3\\\">\\n      <figure>1</figure>\\n      <figure>2</figure>\\n      <figure>3</figure>\\n    </div>\\n  </div>\\n</div>\\n<button id=\\\"playButton\\\">Play</button>\\n</div>\\n</div>\\n\"; };\n\n\n//# sourceURL=webpack://for_innovecs/./src/mocks/slotMashine.ts?");

/***/ }),

/***/ "./src/models/SlotMachineModel.ts":
/*!****************************************!*\
  !*** ./src/models/SlotMachineModel.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n/* harmony import */ var _SlotModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SlotModel */ \"./src/models/SlotModel.ts\");\n\n\nvar SlotMachineModel = /** @class */ (function () {\n    function SlotMachineModel() {\n        this.slots = Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__.SLOT_NAMES_ENUM).map(function (slotName) { return new _SlotModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"](slotName); });\n        this.isRunning = false;\n    }\n    SlotMachineModel.prototype.start = function () {\n        this.isRunning = true;\n        this.slots.forEach(function (slot) {\n            slot.start();\n        });\n    };\n    SlotMachineModel.prototype.stop = function () {\n        this.isRunning = false;\n        this.slots.forEach(function (slot) {\n            slot.stop();\n        });\n    };\n    return SlotMachineModel;\n}());\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlotMachineModel);\n\n\n//# sourceURL=webpack://for_innovecs/./src/models/SlotMachineModel.ts?");

/***/ }),

/***/ "./src/models/SlotModel.ts":
/*!*********************************!*\
  !*** ./src/models/SlotModel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n\nvar Slot = /** @class */ (function () {\n    function Slot(name) {\n        this.name = name;\n        this.isRunning = false;\n        this.getRandomPanel();\n    }\n    Slot.prototype.getRandomPanel = function () {\n        //TODO: add mappping constants\n        var rand = Math.random();\n        if (rand < 0.33) {\n            this.currAngle = 0;\n        }\n        else if (rand < 0.66) {\n            this.currAngle = 120;\n        }\n        else {\n            this.currAngle = 240;\n        }\n    };\n    ;\n    Slot.prototype.start = function () {\n        this.isRunning = true;\n        __webpack_require__.g.emitter.emit(this.name + _constants__WEBPACK_IMPORTED_MODULE_0__.SLOT_EVENTS_ENUM.START, { currAngle: this.currAngle });\n    };\n    Slot.prototype.stop = function () {\n        this.isRunning = false;\n        this.getRandomPanel();\n        __webpack_require__.g.emitter.emit(this.name + _constants__WEBPACK_IMPORTED_MODULE_0__.SLOT_EVENTS_ENUM.STOP, { currAngle: this.currAngle });\n    };\n    return Slot;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slot);\n\n\n//# sourceURL=webpack://for_innovecs/./src/models/SlotModel.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   transformSlot: () => (/* binding */ transformSlot)\n/* harmony export */ });\nvar transformSlot = function (angle) {\n    return \"translateZ(-35px) rotateX(-\".concat(angle, \"deg)\");\n};\n\n\n//# sourceURL=webpack://for_innovecs/./src/utils.ts?");

/***/ }),

/***/ "./src/views/slotMachineView.ts":
/*!**************************************!*\
  !*** ./src/views/slotMachineView.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n/* harmony import */ var _controllers_SlotMachineController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/SlotMachineController */ \"./src/controllers/SlotMachineController.ts\");\n/* harmony import */ var _mocks_slotMashine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mocks/slotMashine */ \"./src/mocks/slotMashine.ts\");\n/* harmony import */ var _slotView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slotView */ \"./src/views/slotView.ts\");\n\n\n\n\nvar SlotMachineView = /** @class */ (function () {\n    function SlotMachineView() {\n    }\n    SlotMachineView.prototype.init = function () {\n        var _this = this;\n        var _a;\n        var element = document.createElement('div');\n        element.innerHTML = (0,_mocks_slotMashine__WEBPACK_IMPORTED_MODULE_2__.paintSlotMashine)();\n        document.body.appendChild(element);\n        this.controller = new _controllers_SlotMachineController__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        this.playButton = document.getElementById('playButton');\n        (_a = this.playButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {\n            if (!_this.controller.isRunning()) {\n                _this.controller.play();\n            }\n        });\n        this.render();\n    };\n    SlotMachineView.prototype.render = function () {\n        Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__.SLOT_NAMES_ENUM).forEach(function (slotClass) {\n            new _slotView__WEBPACK_IMPORTED_MODULE_3__[\"default\"](slotClass);\n        });\n    };\n    return SlotMachineView;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlotMachineView);\n\n\n//# sourceURL=webpack://for_innovecs/./src/views/slotMachineView.ts?");

/***/ }),

/***/ "./src/views/slotView.ts":
/*!*******************************!*\
  !*** ./src/views/slotView.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\n\n\nvar SlotView = /** @class */ (function () {\n    function SlotView(slotName) {\n        this.slotName = slotName;\n        this.slotElement = document.querySelector('.' + slotName);\n        this.init();\n    }\n    SlotView.prototype.init = function () {\n        var _this = this;\n        __webpack_require__.g.emitter.on(this.slotName + _constants__WEBPACK_IMPORTED_MODULE_0__.SLOT_EVENTS_ENUM.START, function (_a) {\n            var currAngle = _a.currAngle;\n            _this.spin(currAngle);\n        });\n        __webpack_require__.g.emitter.on(this.slotName + _constants__WEBPACK_IMPORTED_MODULE_0__.SLOT_EVENTS_ENUM.STOP, function (_a) {\n            var currAngle = _a.currAngle;\n            _this.stop(currAngle);\n        });\n    };\n    SlotView.prototype.transform = function (currAngle) {\n        this.slotElement.style.transform = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.transformSlot)(currAngle);\n    };\n    SlotView.prototype.spin = function (currAngle) {\n        var _this = this;\n        var angle = currAngle;\n        this.timer = setInterval(function () {\n            _this.transform(currAngle);\n            angle += _constants__WEBPACK_IMPORTED_MODULE_0__.ADDED_ANGLE;\n        }, _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TIMEOUT);\n    };\n    SlotView.prototype.stop = function (currAngle) {\n        clearInterval(this.timer);\n        if (!this.slotElement || !this.slotElement.style.transform) {\n            this.transform(currAngle);\n        }\n    };\n    return SlotView;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlotView);\n\n\n//# sourceURL=webpack://for_innovecs/./src/views/slotView.ts?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _views_slotMachineView_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/slotMachineView.ts */ \"./src/views/slotMachineView.ts\");\n\n\n\n\n  __webpack_require__.g.emitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();\n  const slotMachine = new _views_slotMachineView_ts__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  slotMachine.init();\n\n//# sourceURL=webpack://for_innovecs/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;