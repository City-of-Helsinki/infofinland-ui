import axios from 'axios'
import getConfig from 'next/config'
import { getFeedbackPage } from '@/lib/ssr-api'
import { CACHE_HEADERS_10M } from '@/cache-headers'
import logger from '@/logger'

const WEBFORM_ID = 'contact'

export default async function handler(request, response) {
  const { NEXT_PUBLIC_DRUPAL_BASE_URL } = getConfig().serverRuntimeConfig
  const POST_URL = `${NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`

  //Get feedback content from Drupal
  if (request.method === 'GET') {
    const { locale } = request.query
    const feedback = await getFeedbackPage({ locale }).catch((e) => {
      logger.error(
        'Feedback content error',
        e?.response?.status,
        e?.response?.data,
        { locale }
      )
      return null
    })

    return response
      .setHeader(...CACHE_HEADERS_10M)
      .status(200)
      .json(feedback)
  }

  // Send feedback form to drupal
  if (request.method === 'POST') {
    try {
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
      logger.error(error.message, {
        responseData: error.response?.data,
        requestBody: request?.body,
      })
      return response.status(error.status || 400).json(error.message)
    }
  }
}
