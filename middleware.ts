import { NextResponse, NextRequest } from 'next/server'
import { sessionCookie } from './lib/const'
import { auth } from './firebase/server'

const adminPaths = [
  '/admin'
]

const userPaths = [
  '/app',
  '/account'
]

const pathsRequireAuth = [
  ...adminPaths,
  ...userPaths
]
 
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const headers = request.headers
  let userId: string
  let response: NextResponse
  let deleteSessionCookie = false
  const accept = headers.get('accept') || ''
  const contentType = headers.get('content-type')?.toLowerCase() || ''
  const isJsonRequest = contentType.includes('application/json')

  const wantsJSON =
    accept.includes('application/json') ||
    pathname.startsWith('/api') ||
    isJsonRequest
  const wantsHTML =
    !wantsJSON &&
    (accept.includes('text/html') || accept === '*/*' || accept === '')

  const cookie = request.cookies.get(sessionCookie)
  if (cookie) {
    try {
       const decodedIdToken = await auth.verifySessionCookie(cookie.value)
       userId = decodedIdToken.uid
    } catch {
      deleteSessionCookie = true
    }
  }

  if (pathsRequireAuth.some(path => pathname.startsWith(path))) {
    if (!userId) {
      if (wantsJSON) {
        response = NextResponse.json(
          {
            error: 'Unauthorized'
          },
          {
            status: 401
          }
        )
      } else {
        response = NextResponse.redirect(new URL('/auth/login', request.url))
      }
    }
  }

  if (userId) {
    response.headers.set('x-user-id', userId)
  }

  if (deleteSessionCookie) {
    response.cookies.delete(sessionCookie)
  }

  return response
}

export const config = {
  runtime: 'nodejs'
}
