import { FIREBASE_ADMIN_CREDENTIAL } from '../config/index.mjs'
import { initializeApp, getApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

let app
try {
  app = getApp()
} catch (e) {
  app = initializeApp({ credential: cert(FIREBASE_ADMIN_CREDENTIAL) })
}

function getAdminApp() {
  return app
}

function getAdminAuth() {
  return getAuth(app)
}

export { getAdminApp, getAdminAuth }
