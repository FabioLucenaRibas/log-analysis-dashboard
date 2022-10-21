const { ipcRenderer } = require('electron')
var path = require("path");
const ipc = ipcRenderer;

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})

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

ipc.on('isMaximize', () => changeMaxResBtn(true));

ipc.on('isRestored', () => changeMaxResBtn(false));


const tabGroup = document.querySelector("tab-group");
tabGroup.on("ready", () => console.info("TabGroup is ready"));

tabGroup.setDefaultTab({
    title: "LogAnalysisDashboard",
    src: "../index.html",
    iconURL: "images/log.svg",
    active: true,
    ready: (tab) => {
        defineTitle(tab)
    }
});

tabGroup.addTab({
    title: "LogAnalysisDashboard",
    src: "../index.html",
    iconURL: "images/log.svg",
    active: true,
    closable: false,
    ready: (tab) => {
        defineTitle(tab)
    }
});

function defineTitle(tab) {
    let webview = tab.webview;

    webview.addEventListener('dom-ready', (e) => {
        tab.setTitle(webview.getTitle())
    })

    webview.addEventListener('page-title-updated', (e) => {
        tab.setTitle(webview.getTitle())
    })
}