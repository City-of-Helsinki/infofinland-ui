import axios from 'axios'
import getConfig from 'next/config'

const WEBFORM_ID = 'contact'
const NOT_ALLOWED = 'not allowed'
export default async function handler(request, response) {
  const { NEXT_PUBLIC_DRUPAL_BASE_URL } = getConfig().serverRuntimeConfig
  const POST_URL = `${NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`

  try {
    if (!request.method === 'POST') {
      throw new Error(NOT_ALLOWED)
    }
    const {
      sender_email,
      message,
      page,
      name,
      feedback_email,
      subject = 'Palautetta sivustolta: <otsikko puuttuu>',
    } = request?.body
    const form_response = await axios.post(POST_URL, {
      sender_email,
      message,
      page,
      subject,
      name,
      feedback_email,
      webform_id: WEBFORM_ID,
    })
    if (form_response?.status !== 200) {
      const error = new Error(response.statusText)
      error.status = response.status
      throw error
    }

    response.status(200).json({ ok: true })
  } catch (error) {
    console.error(error.message, {
      responseData: error.response?.data,
      requestBody: request?.body,
    })
    return response.status(error.status || 400).json(error.message)
  }
}
