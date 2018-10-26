"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var accordionMenu =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(accordionMenu, _HTMLElement);

  function accordionMenu() {
    var _this;

    _classCallCheck(this, accordionMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(accordionMenu).call(this));
    var template = document.getElementById('accordion-menu');
    var templateContent = template.content;

    var self = _assertThisInitialized(_assertThisInitialized(_this));

    var shadowRoot = _this.attachShadow({
      mode: 'open'
    }).appendChild(templateContent.cloneNode(true));

    return _this;
  }

  return accordionMenu;
}(_wrapNativeSuper(HTMLElement));

var accordionPanel =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(accordionPanel, _HTMLElement2);

  function accordionPanel() {
    var _this2;

    _classCallCheck(this, accordionPanel);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(accordionPanel).call(this));
    var template = document.getElementById('accordion-panel');
    var templateContent = template.content;

    var self = _assertThisInitialized(_assertThisInitialized(_this2));

    var button = document.createElement('button');
    var dt = document.createElement('dt');

    var shadowRoot = _this2.attachShadow({
      mode: 'open'
    }).appendChild(templateContent.cloneNode(true));

    var content = _this2.shadowRoot.getElementById('content'); // Set up definition term


    dt.setAttribute('class', 'accordion-trigger'); // Set up accordion trigger

    button.setAttribute('class', 'accordion-action');
    button.setAttribute('aria-controls', 'content');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = self.getAttribute('aria-label'); // Add button to term

    dt.appendChild(button); // Add term and trigger into the shadowRoot

    self.shadowRoot.insertBefore(dt, content); // Click event for trigger

    button.addEventListener('click', function () {
      var controls = this.getAttribute('aria-controls');
      var target = self.shadowRoot.getElementById(controls);
      var state = target.getAttribute('aria-hidden');

      if (state === 'true') {
        this.setAttribute('aria-expanded', 'true');
        target.setAttribute('aria-hidden', 'false');
        target.setAttribute('tabindex', '-1');
        target.focus();
      } else {
        this.setAttribute('aria-expanded', 'false');
        target.setAttribute('aria-hidden', 'true');
        target.removeAttribute('tabindex');
      }
    });
    return _this2;
  }

  return accordionPanel;
}(_wrapNativeSuper(HTMLElement));

window.customElements.define('accordion-menu', accordionMenu);
window.customElements.define('accordion-panel', accordionPanel);
