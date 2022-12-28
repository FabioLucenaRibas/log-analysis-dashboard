
const { ipcRenderer } = require('electron')
const ipc = ipcRenderer;
var dev, openDevTools = false;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

dev = 'true' == params.isdev;
openDevTools = 'true' == params.opendevtools;

setTimeout(function () {
    document.getElementById("loading-page").remove();
    document.getElementById("topBar").style.opacity = 1;
}, 1000);

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})

ipc.on('isMaximize', () => changeMaxResBtn(true));

ipc.on('isRestored', () => changeMaxResBtn(false));

function changeMaxResBtn(isMaximizedApp) {
    if (isMaximizedApp) {
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizedBtn')
        maxResBtn.classList.add('restoreBtn')
    } else {
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizedBtn')
    }
}

const tabGroup = document.querySelector("tab-group");
tabGroup.on("ready", () => {
    console.info("TabGroup is ready");
});

tabGroup.on("tab-added", (tab, tabGroup) => {
    let webview = tab.webview
    webview.shadowRoot.childNodes[0].innerHTML = ':host { display: flex; } iframe {opacity: 1;transition: opacity .5s linear;} iframe.hide {opacity: 0;pointer-events: none; transition: opacity 0s linear;}';
    webview.shadowRoot.childNodes[1].classList.add('hide');
    webview.classList.add("loader");
});

tabGroup.setDefaultTab({
    title: "LogAnalysisDashboard",
    src: (dev) ? "../../dist/log-analysis-dashboard/index.html" : "../index.html",
    iconURL: "images/log.svg",
    active: true,
    webviewAttributes: {
        allowpopups: true
    },
    ready: (tab) => {
        defineTitle(tab)
    }
});

tabGroup.addTab({
    title: "LogAnalysisDashboard",
    src: (dev) ? "../../dist/log-analysis-dashboard/index.html" : "../index.html",
    iconURL: "images/log.svg",
    active: true,
    closable: false,
    webviewAttributes: {
        allowpopups: true
    },
    ready: (tab) => {
        defineTitle(tab)
    }
});

function defineTitle(tab) {
    let webview = tab.webview;

    webview.addEventListener('load-commit', (e) => {
        setTimeout(function () {
            webview.classList.remove("loader");
            webview.shadowRoot.childNodes[1].classList.remove('hide');
        }, 500);
    })

    webview.addEventListener('dom-ready', (e) => {
        tab.setTitle(webview.getTitle())

        if (openDevTools) {
            webview.openDevTools()
        }
    })

    webview.addEventListener('page-title-updated', (e) => {
        tab.setTitle(webview.getTitle())
    })
}