import { getDrupalClient } from '@/lib/drupal-client'

export default async function preview(request, response) {
  return await getDrupalClient().preview(request, response)
}
