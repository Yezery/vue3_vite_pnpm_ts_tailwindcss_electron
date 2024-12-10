var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ipcRenderer, contextBridge } from 'electron';
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
    on: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var channel = args[0], listener = args[1];
        return ipcRenderer.on(channel, function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return listener.apply(void 0, __spreadArray([event], args, false));
        });
    },
    off: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var channel = args[0], omit = args.slice(1);
        return ipcRenderer.off.apply(ipcRenderer, __spreadArray([channel], omit, false));
    },
    send: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var channel = args[0], omit = args.slice(1);
        return ipcRenderer.send.apply(ipcRenderer, __spreadArray([channel], omit, false));
    },
    invoke: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var channel = args[0], omit = args.slice(1);
        return ipcRenderer.invoke.apply(ipcRenderer, __spreadArray([channel], omit, false));
    },
    // You can expose other APTs you need here.
    // ...
});
// --------- Preload scripts loading ---------
function domReady(condition) {
    if (condition === void 0) { condition = ['complete', 'interactive']; }
    return new Promise(function (resolve) {
        if (condition.includes(document.readyState)) {
            resolve(true);
        }
        else {
            document.addEventListener('readystatechange', function () {
                if (condition.includes(document.readyState)) {
                    resolve(true);
                }
            });
        }
    });
}
var safeDOM = {
    append: function (parent, child) {
        if (!Array.from(parent.children).find(function (e) { return e === child; })) {
            return parent.appendChild(child);
        }
    },
    remove: function (parent, child) {
        if (Array.from(parent.children).find(function (e) { return e === child; })) {
            return parent.removeChild(child);
        }
    },
};
/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
    var className = "loaders-css__square-spin";
    var styleContent = "\n@keyframes square-spin {\n  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }\n  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }\n  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }\n  100% { transform: perspective(100px) rotateX(0) rotateY(0); }\n}\n.".concat(className, " > div {\n  animation-fill-mode: both;\n  width: 50px;\n  height: 50px;\n  background: #fff;\n  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;\n}\n.app-loading-wrap {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #282c34;\n  z-index: 9;\n}\n    ");
    var oStyle = document.createElement('style');
    var oDiv = document.createElement('div');
    oStyle.id = 'app-loading-style';
    oStyle.innerHTML = styleContent;
    oDiv.className = 'app-loading-wrap';
    oDiv.innerHTML = "<div class=\"".concat(className, "\"><div></div></div>");
    return {
        appendLoading: function () {
            safeDOM.append(document.head, oStyle);
            safeDOM.append(document.body, oDiv);
        },
        removeLoading: function () {
            safeDOM.remove(document.head, oStyle);
            safeDOM.remove(document.body, oDiv);
        },
    };
}
// ----------------------------------------------------------------------
var _a = useLoading(), appendLoading = _a.appendLoading, removeLoading = _a.removeLoading;
domReady().then(appendLoading);
window.onmessage = function (ev) {
    ev.data.payload === 'removeLoading' && removeLoading();
};
setTimeout(removeLoading, 4999);
