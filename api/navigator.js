const data = {
    navigator: {
        values: {
            appName: navigator.appName,
            appCodeName: navigator.appCodeName,
            appVersion: navigator.appVersion,
            cookieEnabled: navigator.cookieEnabled,
            language: navigator.language,
            languages: navigator.languages,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,//not in wk but there is a pollyfil
            maxTouchPoints: navigator.maxTouchPoints,//not in wk, covered by getTouchSupport    
            deviceMemory: navigator.deviceMemory,//not in wk
            onLine: navigator.onLine,
            nfc: navigator.nfc,//not in wk
            product: navigator.product,
            productSub: navigator.productSub,
            vendor: navigator.vendor,
            vendorSub: navigator.vendorSub,
            xr: navigator.xr,//not in wk
            getInstalledRelatedApps: navigator.getInstalledRelatedApps,//not in wk
            getVRDisplays: navigator.getVRDisplays //not in wk
        },
        undefined_values: {
            "navigator.browserSpecs": navigator.browserSpecs,
            "navigator.version": navigator.version,
            "navigator.enumerateDevices": navigator.enumerateDevices,
            "navigator.webkitGetGamepads": navigator.webkitGetGamepads,
            "navigator.cpuClass": navigator.cpuClass,
            "navigator.En": navigator.En,
            "navigator.browserLanguage": navigator.browserLanguage,
            "navigator.systemLanguage": navigator.systemLanguage,
            "navigator.userLanguage": navigator.userLanguage,
            "navigator.standalone": navigator.standalone,
            "navigator.jg": navigator.jg,
            "navigator.pointerEnabled": navigator.pointerEnabled,
            "navigator.uaf": navigator.uaf,
            "navigator.ai": navigator.ai,
            "navigator.msMaxTouchPoints": navigator.msMaxTouchPoints,
            "navigator.share": navigator.share,
            "navigator.webdriver": navigator.webdriver,
            "navigator.msPointerEnabled": navigator.msPointerEnabled,
            "navigator.taintEnabled": navigator.taintEnabled,
            "navigator.buildID": navigator.buildID,
            "navigator.oscpu": navigator.oscpu,
            "navigator.connection.downlinkMax": navigator.connection.downlinkMax,
            "navigator.connection.type": navigator.connection.type,
            "navigator.getBattery.level": navigator.getBattery.level,
            "navigator.getBattery.charging": navigator.getBattery.charging,
            "navigator.getBattery.dischargingTime": navigator.getBattery.dischargingTime,
            "navigator.getBattery.chargingTime": navigator.getBattery.chargingTime
        },
        obj: {
            getGamepads: getGamepads(),//async
            mimeTypes: getMimeTypes(),
            plugins: getRegularPlugins(),
            connection: getConnection(),
            mediaCapabilities: navigator.mediaCapabilities,//not in wk
            mediaDevices: null,//async
            keyboard: navigator.keyboard,//not in wk
            permissions: navigator.permissions,// probably can't be used in this case, not in wk
            presentation: navigator.presentation,// not in wk
            storage: navigator.storage,//not in wk
            webkitPersistentStorage: navigator.webkitPersistentStorage,//not in wk
            webkitTemporaryStorage: navigator.webkitTemporaryStorage,//not in wk
        },
        func: {
            javaEnabled: navigator.javaEnabled(),
            getBattery: navigator.getBattery()//not in wk
        }
    },
    screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        keepAwake: screen.keepAwake,//not in wk
        availLeft: screen.availLeft,
        availTop: screen.availTop,
        deviceXDPI: screen.deviceXDPI,//not in wk
    },
    timezoneOffset: (new Date()).getTimezoneOffset(),
    dateTimeFormat: Intl.DateTimeFormat().resolvedOptions(),
    systemColors: systemColors(),
};

// OBJECTS
// EMPTY
//     "navigator.mediaCapabilities": navigator.mediaCapabilities,
//     "navigator.credentials": navigator.credentials,
//     "navigator.clipboard": navigator.clipboard,
//     "navigator.storage": navigator.storage,
//     "navigator.webkitPersistentStorage": navigator.webkitPersistentStorage,
//     "navigator.geolocation": navigator.geolocation,
//     "navigator.webkitTemporaryStorage": navigator.webkitTemporaryStorage,
//     "navigator.bluetooth": navigator.bluetooth,
//     "navigator.keyboard": navigator.keyboard,
//     "navigator.permissions": navigator.permissions,
//     "navigator.locks": navigator.locks
// NOT EMPTY
//     "navigator.serviceWorker": navigator.serviceWorker,
//     "navigator.presentation": navigator.presentation,
//     "navigator.mediaDevices": navigator.mediaDevices,
//     "navigator.usb": navigator.usb,
// UNDEFINED
//     "navigator.loadPurpose": navigator.loadPurpose,
//     "navigator.appMinorVersion": navigator.appMinorVersion,
//     "navigator.fido": navigator.fido,
// FUNCTIONS
//     "navigator.sendBeacon": navigator.sendBeacon,
//     "navigator.unregisterProtocolHandler": navigator.unregisterProtocolHandler,
//     "navigator.requestMIDIAccess": navigator.requestMIDIAccess,
//     "navigator.registerProtocolHandler": navigator.registerProtocolHandler,
//     "navigator.getGamepads": navigator.getGamepads,
//     "navigator.webkitGetUserMedia": navigator.webkitGetUserMedia,
//     "navigator.getBattery": navigator.getBattery,
//     "navigator.getUserMedia": navigator.getUserMedia,
//     "navigator.vibrate": navigator.vibrate,
//     "navigator.requestMediaKeySystemAccess": navigator.requestMediaKeySystemAccess,


function getConnection() {
    con = navigator.connection;
    return {
        downlink: con.downlink,
        effectiveType: con.effectiveType,
        onchange: con.onchange,
        rtt: con.rtt,
        saveData: con.saveData
    }
}


function getMimeTypes() {
    return Array.from(navigator.mimeTypes).map(mt => {
        return {
            descirption: mt.description,
            type: mt.type,
            suffixes: mt.suffixes,
            plugin: mt.enabledPlugin ? {
                name: mt.enabledPlugin.name,
                filename: mt.enabledPlugin.filename,
                description: mt.enabledPlugin.description,
                mimeType: mt.enabledPlugin[0] ? mt.enabledPlugin[0].type : null
            } : null
        }
    });
}
function getRegularPlugins() {
    var plugins = []
    if (navigator.plugins) {
        // plugins isn't defined in Node envs.
        for (var i = 0, l = navigator.plugins.length; i < l; i++) {
            if (navigator.plugins[i]) { plugins.push(navigator.plugins[i]) }
        }
    }
    // sorting plugins only for those user agents, that we know randomize the plugins
    // every time we try to enumerate them
    // if (this.pluginsShouldBeSorted()) {
    //     plugins = plugins.sort(function (a, b) {
    //         if (a.name > b.name) { return 1 }
    //         if (a.name < b.name) { return -1 }
    //         return 0
    //     })
    // }
    return plugins.map(plugin => {
        var mimeTypes = Array.from(plugin).map(mt => {
            return {
                type: mt.type,
                sufixes: mt.suffixes
            };
        });
        return {
            name: plugin.name,
            description: plugin.description,
            mimeTypes
        }
    }, this)
}

function systemColors() {
    const colors = ["ActiveCaption", "AppWorkspace", "Background", "ButtonFace", "ButtonHighlight", "ButtonShadow", "ButtonText", "CaptionText", "GrayText", "Highlight", "HighlightText", "InactiveBorder", "InactiveCaption", "InactiveCaptionText", "InfoBackground", "InfoText", "Menu", "MenuText", "Scrollbar", "ThreeDDarkShadow", "ThreeDFace", "ThreeDHighlight", "ThreeDLightShadow", "ThreeDShadow", "Window", "WindowFrame", "WindowText", "ActiveBorder"];

    return colors.map(color => {
        document.body.style.backgroundColor = color;

        return {
            name: color,
            value: window.getComputedStyle(document.body).backgroundColor
        };
    });
}
function getGamepads() {
    if (!navigator.getGamepads) {
        return null;
    }

    return Array.from(navigator.getGamepads()).map(gamepad => {
        if (!gamepad) {
            return null;
        }

        return {
            id: gamepad.id,
            buttons: gamepad.buttons.length,
            axes: gamepad.axes.length
        }
    });
}
enumerateDevicesKey(devices => {
    data.navigator.mediaDevices = devices;
});


const resultString = JSON.stringify(data, null, 2);
document.getElementById("start").innerHTML = resultString;
