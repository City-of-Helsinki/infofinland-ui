import { DrupalClient } from 'next-drupal'

const drupal = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL)

export default drupal
