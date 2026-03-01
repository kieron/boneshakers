import PDFDocument from 'pdfkit'

type PDFDoc = InstanceType<typeof PDFDocument>

interface ConsentFormData {
  fullName: string
  dob: string
  phone: string
  email?: string
  location: string
  description: string
  medicationDetails?: string
  heart: string
  bloodPressure: string
  hepatitis: string
  haemorrhaging: string
  epilepsy: string
  diabetes: string
  skinConditions: string
  latexAllergy: string
  pregnant: string
  alcoholDrugs: string
  medication: string
  confirmOver18: boolean
  understandRisks: boolean
  signature: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ConsentFormData>(event)

  // Validate required fields
  const requiredFields = ['fullName', 'dob', 'phone', 'location', 'description', 'signature'] as const
  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        message: `${field} is required`
      })
    }
  }

  if (!body.confirmOver18 || !body.understandRisks) {
    throw createError({
      statusCode: 400,
      message: 'Both consent statements must be confirmed'
    })
  }

  // Generate PDF
  const pdfBuffer = await generateConsentPDF(body)
  const pdfBase64 = pdfBuffer.toString('base64')

  const resendApiKey = process.env.RESEND_API_KEY
  const emailTo = process.env.EMAIL_TO

  // Format date for filename
  const today = new Date().toISOString().split('T')[0]
  const clientName = body.fullName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()
  const filename = `consent-${clientName}-${today}.pdf`

  // If env vars not configured, log and return success (for development)
  if (!resendApiKey || !emailTo) {
    console.log('Email not configured - consent form received:', {
      name: body.fullName,
      dob: body.dob,
      phone: body.phone,
      location: body.location
    })
    return { success: true, demo: true }
  }

  // Build summary email HTML
  const emailHtml = `
    <h2>New Consent Form Submitted</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.fullName)}</p>
    <p><strong>Date of Birth:</strong> ${escapeHtml(body.dob)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
    ${body.email ? `<p><strong>Email:</strong> ${escapeHtml(body.email)}</p>` : ''}
    <hr>
    <p><strong>Tattoo Location:</strong> ${escapeHtml(body.location)}</p>
    <p><strong>Description:</strong> ${escapeHtml(body.description)}</p>
    <hr>
    <h3>Medical Flags</h3>
    ${getMedicalFlags(body)}
    <hr>
    <p style="color: #888; font-size: 12px;">Full consent form PDF attached. Submitted via the Boneshakers website on ${new Date().toLocaleDateString('en-GB')}.</p>
  `

  // Send via Resend REST API with PDF attachment
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Boneshakers Website <noreply@boneshakers.co.uk>',
      to: emailTo,
      reply_to: body.email || undefined,
      subject: `Consent Form: ${body.fullName}`,
      html: emailHtml,
      attachments: [
        {
          filename,
          content: pdfBase64
        }
      ]
    })
  })

  if (!res.ok) {
    const errorData = await res.text()
    console.error('Resend API error:', errorData)
    throw createError({
      statusCode: 500,
      message: 'Failed to submit consent form'
    })
  }

  return { success: true }
})

async function generateConsentPDF(data: ConsentFormData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const doc = new PDFDocument({ size: 'A4', margin: 50 })

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const pageWidth = doc.page.width - 100
    const accentColor = '#d4a84b'
    const darkColor = '#1a1a1a'

    // Header
    doc.rect(0, 0, doc.page.width, 80).fill(darkColor)
    doc.fillColor('white')
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('BONESHAKERS TATTOO STUDIO', 50, 25, { align: 'center', width: pageWidth })
    doc.fontSize(14)
      .text('CONSENT FORM', 50, 50, { align: 'center', width: pageWidth })

    let y = 100

    // Personal Information Section
    y = drawSectionHeader(doc, 'PERSONAL INFORMATION', y, pageWidth, accentColor)
    y = drawField(doc, 'Name', data.fullName, y)
    y = drawField(doc, 'Date of Birth', data.dob, y)
    y = drawField(doc, 'Phone', data.phone, y)
    y = drawField(doc, 'Email', data.email || 'Not provided', y)

    y += 10

    // Tattoo Details Section
    y = drawSectionHeader(doc, 'TATTOO DETAILS', y, pageWidth, accentColor)
    y = drawField(doc, 'Location', data.location, y)
    y = drawMultilineField(doc, 'Description', data.description, y, pageWidth)

    y += 10

    // Medical Information Section
    y = drawSectionHeader(doc, 'MEDICAL INFORMATION', y, pageWidth, accentColor)

    const medicalItems = [
      { label: 'Heart Disease/Murmurs', value: data.heart },
      { label: 'Blood Pressure Issues', value: data.bloodPressure },
      { label: 'HIV/Hepatitis', value: data.hepatitis },
      { label: 'Haemorrhaging Conditions', value: data.haemorrhaging },
      { label: 'Epilepsy', value: data.epilepsy },
      { label: 'Diabetes', value: data.diabetes },
      { label: 'Skin Conditions', value: data.skinConditions },
      { label: 'Latex Allergy', value: data.latexAllergy },
      { label: 'Pregnant/Breastfeeding', value: data.pregnant },
      { label: 'Under Influence', value: data.alcoholDrugs },
      { label: 'Taking Medication', value: data.medication }
    ]

    for (const item of medicalItems) {
      // Check for page break
      if (y > 700) {
        doc.addPage()
        y = 50
      }
      const displayValue = item.value ? item.value.charAt(0).toUpperCase() + item.value.slice(1) : 'Not answered'
      y = drawField(doc, item.label, displayValue, y, item.value === 'yes' ? '#dc3545' : undefined)
    }

    if (data.medication === 'yes' && data.medicationDetails) {
      y = drawMultilineField(doc, 'Medication Details', data.medicationDetails, y, pageWidth)
    }

    y += 10

    // Check for page break before consent section
    if (y > 600) {
      doc.addPage()
      y = 50
    }

    // Consent Section
    y = drawSectionHeader(doc, 'CONSENT STATEMENTS', y, pageWidth, accentColor)
    doc.fillColor('#333')
      .fontSize(10)
      .font('Helvetica')
    doc.text('• I confirm I am over 18 years old', 50, y)
    y += 15
    doc.text('• I understand the risks and aftercare instructions', 50, y)
    y += 25

    // Signature Section
    if (y > 550) {
      doc.addPage()
      y = 50
    }

    y = drawSectionHeader(doc, 'SIGNATURE', y, pageWidth, accentColor)

    // Add signature image
    if (data.signature && data.signature.startsWith('data:image')) {
      try {
        const base64Data = data.signature.split(',')[1]
        const imgBuffer = Buffer.from(base64Data, 'base64')
        doc.image(imgBuffer, 50, y, { width: 200, height: 60 })
        y += 70
      } catch {
        doc.fillColor('#888')
          .fontSize(10)
          .text('[Signature provided]', 50, y)
        y += 20
      }
    }

    // Footer
    y += 10
    doc.fillColor('#333')
      .fontSize(10)
      .text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 50, y)
    y += 15
    doc.fillColor('#888')
      .fontSize(8)
      .text('Boneshakers Tattoo Studio - Professional Tattoo Services', 50, y)

    doc.end()
  })
}

function drawSectionHeader(doc: PDFDoc, title: string, y: number, width: number, color: string): number {
  doc.rect(50, y, width, 20).fill(color)
  doc.fillColor('white')
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(title, 55, y + 5)
  return y + 30
}

function drawField(doc: PDFDoc, label: string, value: string, y: number, valueColor?: string): number {
  doc.fillColor('#666')
    .fontSize(9)
    .font('Helvetica')
    .text(`${label}:`, 50, y)
  doc.fillColor(valueColor || '#333')
    .font('Helvetica-Bold')
    .text(value, 180, y)
  return y + 18
}

function drawMultilineField(doc: PDFDoc, label: string, value: string, y: number, width: number): number {
  doc.fillColor('#666')
    .fontSize(9)
    .font('Helvetica')
    .text(`${label}:`, 50, y)
  y += 15
  doc.fillColor('#333')
    .font('Helvetica')
    .text(value, 50, y, { width: width, lineGap: 3 })
  const textHeight = doc.heightOfString(value, { width: width })
  return y + textHeight + 10
}

function getMedicalFlags(data: ConsentFormData): string {
  const flags = []
  if (data.heart === 'yes') flags.push('Heart Disease/Murmurs')
  if (data.bloodPressure === 'yes') flags.push('Blood Pressure Issues')
  if (data.hepatitis === 'yes') flags.push('HIV/Hepatitis')
  if (data.haemorrhaging === 'yes') flags.push('Haemorrhaging Conditions')
  if (data.epilepsy === 'yes') flags.push('Epilepsy')
  if (data.diabetes === 'yes') flags.push('Diabetes')
  if (data.skinConditions === 'yes') flags.push('Skin Conditions')
  if (data.latexAllergy === 'yes') flags.push('Latex Allergy')
  if (data.pregnant === 'yes') flags.push('Pregnant/Breastfeeding')
  if (data.alcoholDrugs === 'yes') flags.push('Under Influence')
  if (data.medication === 'yes') flags.push(`Taking Medication${data.medicationDetails ? `: ${data.medicationDetails}` : ''}`)

  if (flags.length === 0) {
    return '<p style="color: green;">No medical flags reported.</p>'
  }

  return `<ul style="color: #dc3545;">${flags.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`
}

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
