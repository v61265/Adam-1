const express = require('express')
const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware')

// Create Express Server
const app = express()

// Configuration
const PORXY_SERVER_PORT = Number(process.env.PROXY_SERVER_PORT) || 3000
const PROXIED_SERVER_PORT = Number(process.env.PROXIED_SERVER_PORT) || 3001
const HOST = 'localhost'
const API_SERVICE_URL = `http://localhost:${PROXIED_SERVER_PORT}`
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// handle amp route
app.use(
  '/story/amp',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer) => {
      const response = responseBuffer.toString('utf8') // convert buffer to string

      const dom = new JSDOM(response)
      const doc = dom.window.document
      const styleTags = doc.querySelectorAll('body style')
      const scriptTags = doc.querySelectorAll('body script')

      if (styleTags.length || scriptTags.length) {
        const head = doc.querySelector('head')

        // 找到 <head> 標籤
        styleTags?.forEach((styleTag) => {
          // 移除每個 <style> 標籤
          styleTag.remove()
          // 將每個 <style> 標籤添加到 <head> 標籤中
          head.appendChild(styleTag)
        })
        scriptTags?.forEach((scriptTag) => {
          scriptTag.remove()
          head.appendChild(scriptTag)
        })
      }

      const updatedResponse = dom.serialize()

      // manipulate html to remove all amp prohibit attributes
      return updatedResponse.replace(
        /contenteditable|spellcheck/g,
        (match) => `data-${match}`
      )
    }),
  })
)

// proxy all other routes in case any other request misleading to this proxy
app.use(
  '*',
  createProxyMiddleware({ target: API_SERVICE_URL, changeOrigin: true })
)

// Start Proxy
app.listen(PORXY_SERVER_PORT, () => {
  console.log(`Starting Proxy at ${HOST}:${PORXY_SERVER_PORT}`)
})
