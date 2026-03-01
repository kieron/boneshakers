export default defineEventHandler((event) => {
  const sitePassword = process.env.SITE_PASSWORD

  // If no password set, allow access
  if (!sitePassword) {
    return
  }

  // Allow access to the password page, consent form, and their APIs
  const path = getRequestURL(event).pathname
  if (path === '/password' || path === '/api/auth' || path === '/consent' || path === '/api/consent') {
    return
  }

  // Allow static assets
  if (path.startsWith('/_nuxt/') || path.startsWith('/__nuxt')) {
    return
  }

  // Check for auth cookie
  const authCookie = getCookie(event, 'site_auth')

  if (authCookie !== sitePassword) {
    // Redirect to password page
    return sendRedirect(event, '/password')
  }
})
