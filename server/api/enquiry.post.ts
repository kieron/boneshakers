export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, phone, service, message } = body

  // Validate required fields
  if (!name || !email) {
    throw createError({
      statusCode: 400,
      message: 'Name and email are required'
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid email address'
    })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const emailTo = process.env.EMAIL_TO

  // If env vars not configured, log and return success (for development)
  if (!resendApiKey || !emailTo) {
    console.log('Email not configured - enquiry received:', { name, email, phone, service, message })
    return { success: true, demo: true }
  }

  // Format the service name
  const serviceNames: Record<string, string> = {
    tattoo: 'Tattoo',
    piercing: 'Piercing',
    laser: 'Laser Removal',
    cosmetic: 'Cosmetic Tattooing',
    other: 'Other'
  }
  const serviceName = service ? serviceNames[service] || service : 'General'

  // Build the email HTML
  const emailHtml = `
    <h2>New ${serviceName} Enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Service:</strong> ${serviceName}</p>
    ${message ? `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
    <hr>
    <p style="color: #888; font-size: 12px;">This enquiry was submitted via the Boneshakers website.</p>
  `

  // Send via Resend REST API
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Boneshakers Website <noreply@boneshakers.co.uk>',
      to: emailTo,
      reply_to: email,
      subject: `New ${serviceName} Enquiry from ${name}`,
      html: emailHtml
    })
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Resend API error:', errorData)
    throw createError({
      statusCode: 500,
      message: 'Failed to send enquiry'
    })
  }

  return { success: true }
})

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
