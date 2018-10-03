export default function renderFullPage(html,css) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Real Nadlan</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <style id="jss-server-side">${css}</style>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `
}
