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
function getCPUBenchmark() {
    var _speedconstant = 8.9997e-9; //if speed=(c*a)/t, then constant=(s*t)/a and time=(a*c)/s
    var d = new Date();
    var amount = 150000000;
    var estprocessor = 1.7; //average processor speed, in GHZ
    console.log("JSBenchmark by Aaron Becker, running loop "+amount+" times.     Estimated time (for "+estprocessor+"ghz processor) is "+(Math.round(((_speedconstant*amount)/estprocessor)*100)/100)+"s");
    for (var i = amount; i>0; i--) {} 
    var newd = new Date();
    var accnewd = Number(String(newd.getSeconds())+"."+String(newd.getMilliseconds()));
    var accd = Number(String(d.getSeconds())+"."+String(d.getMilliseconds())); 
    var di = accnewd-accd;
    //console.log(accnewd,accd,di);
    if (d.getMinutes() != newd.getMinutes()) {
    di = (60*(newd.getMinutes()-d.getMinutes()))+di}
    const spd = ((_speedconstant*amount)/di);
    console.log("Time: "+Math.round(di*1000)/1000+"s, estimated speed: "+Math.round(spd*1000)/1000+"GHZ");

    return Math.round(spd*1000)/1000 + "GHZ";
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
const data = {
    // window: {
    //     devicePixelRatio: window.devicePixelRatio,
    //     localStorage: hasLocalStorage(),
    //     sessionStorage: hasSessionStorage(),
    //     indexedDB: hasIndexedDB(),
    //     openDatabase: getOpenDatabase(),
    //     reducedMotion: window.matchMedia("prefers-reduced-motion").matches,
    // },
    // // console: {
    // //     // memory: console.memory// not in wk
    // // },
    // document: {
    //     fonts: getDocumentFonts(),
    // },
    // // performance: {
    // //     memory: performance.memory,// not in wk
    // // },
    navigator: {
        appName: navigator.appName,
        appCodeName: navigator.appCodeName,
        appVersion: navigator.appVersion,
        mimeTypes: getMimeTypes(),
        cookieEnabled: navigator.cookieEnabled,
        language: navigator.language,
        languages: navigator.languages,
        userAgent: navigator.userAgent,
        plugins: getRegularPlugins(),
        platform: navigator.platform,
        doNotTrack: navigator.doNotTrack,
        hardwareConcurrency: navigator.hardwareConcurrency,//not in wk but there is a pollyfil
        maxTouchPoints: navigator.maxTouchPoints,//not in wk, covered by getTouchSupport
        mediaCapabilities: navigator.mediaCapabilities,//not in wk
        mediaDevices: null,//async
        deviceMemory: navigator.deviceMemory,//not in wk
        connection: navigator.connection,//not in wk
        onLine: navigator.onLine,
        keyboard: navigator.keyboard,//not in wk
        nfc: navigator.nfc,//not in wk
        permissions: navigator.permissions,// probably can't be used in this case, not in wk
        presentation: navigator.presentation,// not in wk
        product: navigator.product,
        productSub: navigator.productSub,
        storage: navigator.storage,//not in wk
        vendor: navigator.vendor,
        vendorSub: navigator.vendorSub,
        xr: navigator.xr,//not in wk
        webkitPersistentStorage: navigator.webkitPersistentStorage,//not in wk
        webkitTemporaryStorage: navigator.webkitTemporaryStorage,//not in wk
        getBattery: navigator.getBattery,//not in wk
        getGamepads: getGamepads(),//async
        getInstalledRelatedApps: navigator.getInstalledRelatedApps,//not in wk
        getVRDisplays: navigator.getVRDisplays,//not in wk
        javaEnabled: navigator.javaEnabled()
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
    // canvas2d: getCanvasFp(),
    // webgl: getWebglFp(),
    // canvasFonts: getCanvasFonts(),
    // jsFonts: null,//async
    // canPlayType: getCanPlayTypes(),
    timezoneOffset: (new Date()).getTimezoneOffset(),
    // audio: null,//async
    // webrtc: [],//async
    dateTimeFormat: Intl.DateTimeFormat().resolvedOptions(),
    // input: [],//async
    // touchSupport: getTouchSupport(),
    // typesSupported: getIsTypeSupported(),
    // voices: null,//async
    // dom: createDOMFP(),
    systemColors: systemColors(),
    // cpuBenchmark: getCPUBenchmark()
};

// audioKey(fingerprint => {
//     data.audio = fingerprint;
//     console.log('audio done');
// });

enumerateDevicesKey(devices => {
    data.navigator.mediaDevices = devices;
    console.log('mediaDevices done');
});

// jsFontsKey(fonts => {
//     data.jsFonts = fonts;
//     console.log('js fonts done');
// });

// getWebRTCFP(candidate => {
//     if (candidate) {
//         data.webrtc.push(candidate);
//         console.log('webrtc done');
//     }
// });

// getInuputFP(i => {
//     const alreadyExists = data.input.some(input => input.type === i.type);

//     if (!alreadyExists) {
//         data.input.push(i);
//     }
// });


const resultString = JSON.stringify(data, null, 2);
    // document.getElementById("start")
    // let start=getElementById('start')
    // let final = document.createElement('div');
    // final.id = 'finish';
    // final.innerText=resultString
document.getElementById("start").innerHTML = resultString;
console.log(resultString);
// start.appendChild(final);