var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
var require = createRequire(import.meta.url);
var __dirname = path.dirname(fileURLToPath(import.meta.url));
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..');
export var MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export var RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export var VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST;
// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1'))
    app.disableHardwareAcceleration();
// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
    app.setAppUserModelId(app.getName());
if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}
var win = null;
var preload = path.join(__dirname, '../preload/index.mjs');
var indexHtml = path.join(RENDERER_DIST, 'index.html');
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            win = new BrowserWindow({
                title: 'Main window',
                icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
                webPreferences: {
                    preload: preload,
                    // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
                    // nodeIntegration: true,
                    // Consider using contextBridge.exposeInMainWorld
                    // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
                    // contextIsolation: false,
                },
            });
            if (VITE_DEV_SERVER_URL) { // #298
                win.loadURL(VITE_DEV_SERVER_URL);
                // Open devTool if the app is not packaged
                win.webContents.openDevTools();
            }
            else {
                win.loadFile(indexHtml);
            }
            // Test actively push message to the Electron-Renderer
            win.webContents.on('did-finish-load', function () {
                win === null || win === void 0 ? void 0 : win.webContents.send('main-process-message', new Date().toLocaleString());
            });
            // Make all links open with the browser, not with the application
            win.webContents.setWindowOpenHandler(function (_a) {
                var url = _a.url;
                if (url.startsWith('https:'))
                    shell.openExternal(url);
                return { action: 'deny' };
            });
            return [2 /*return*/];
        });
    });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', function () {
    win = null;
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('second-instance', function () {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized())
            win.restore();
        win.focus();
    }
});
app.on('activate', function () {
    var allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    }
    else {
        createWindow();
    }
});
// New window example arg: new windows url
ipcMain.handle('open-win', function (_, arg) {
    var childWindow = new BrowserWindow({
        webPreferences: {
            preload: preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (VITE_DEV_SERVER_URL) {
        childWindow.loadURL("".concat(VITE_DEV_SERVER_URL, "#").concat(arg));
    }
    else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});
