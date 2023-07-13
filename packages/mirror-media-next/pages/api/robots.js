export default function handler(req, res) {
  const { host } = req.headers
  res.setHeader('Content-Type', 'text/plain')
  if (host?.startsWith('www')) {
    res.write(`User-agent: * 
Allow: / `)
  } else {
    res.write(`User-agent: * 
Disallow: /`)
  }
  res.end()
}
