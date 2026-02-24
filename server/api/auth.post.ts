export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body

  const sitePassword = process.env.SITE_PASSWORD

  if (!sitePassword) {
    throw createError({
      statusCode: 500,
      message: 'Password protection not configured'
    })
  }

  if (password !== sitePassword) {
    throw createError({
      statusCode: 401,
      message: 'Incorrect password'
    })
  }

  // Set auth cookie (expires in 7 days)
  setCookie(event, 'site_auth', sitePassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  })

  return { success: true }
})
