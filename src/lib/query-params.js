import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import { NODE_TYPES, CONTENT_TYPES } from './DRUPAL_API_TYPES'
// Common includes and fields.
const baseQueryParams = () =>
  new DrupalJsonApiParams()

    // //published pages only
    // .addFilter("status", "1")
    //Relations
    .addInclude([
      // Image
      'field_content.field_image.field_media_image',
      // Hero
      'field_hero.field_hero_image.field_media_image',
      'field_hero.field_hero_bg_color',
      //Columns
      'field_content.field_columns_left_column.field_image.field_media_image',
      'field_content.field_columns_right_column.field_image.field_media_image',
    ])
    // Page node fields
    .addFields(NODE_TYPES.PAGE, [
      'id',
      'title',
      'revision_timestamp',
      'langcode',
      'field_content',
      'field_hero',
      'field_description',
      'field_metatags',
    ])
    // Text paragraph
    .addFields(CONTENT_TYPES.TEXT, ['field_text'])
    // Heading
    .addFields(CONTENT_TYPES.HEADING, ['field_title'])
    // paragraph image
    .addFields(CONTENT_TYPES.PARAGRAPH_IMAGE, [
      'field_image',
      'field_image_caption',
      'langcode',
    ])
    .addFields(CONTENT_TYPES.MEDIA_IMAGE, [
      'field_media_image',
      'field_photographer',
    ])
    // Hero
    .addFields(CONTENT_TYPES.HERO, [
      'field_hero_title',
      'field_hero_image',
      'field_hero_bg_color',
    ])
    .addFields(CONTENT_TYPES.HERO_COLOR, ['name', 'field_color_hex'])
    // (image) file
    .addFields(CONTENT_TYPES.FILE, ['uri', 'url'])
    // PVT contact info
    .addFields(CONTENT_TYPES.PVT, ['field_contact_data'])
    .addFields(CONTENT_TYPES.PVT_NODE, [
      'field_email_address',
      'field_office_id',
      'field_phonenumber',
      'field_postal_address',
      'field_postal_address_additional',
      'field_service_hours',
      'field_visiting_address',
      'field_visiting_address_additional',
      'title',
    ])
    //Link Collection block
    .addFields(CONTENT_TYPES.READMORE, ['field_link_collection'])
    //Link collection content
    .addFields(CONTENT_TYPES.READMORE_LINK_COLLECTION, [
      'field_link_target_site',
      'title',
      'field_links',
    ])
    //Link translations
    .addFields(CONTENT_TYPES.READMORE_LINK, [
      'field_language_link',
      'field_language',
    ])
    .addFields(CONTENT_TYPES.LANGUAGE, ['name', 'field_locale'])
    .addFields(CONTENT_TYPES.ACCORDION, ['field_accordion_items'])
    .addFields(CONTENT_TYPES.ACCORDION_ITEM, [
      'field_accordion_item_content',
      'field_accordion_item_heading',
      'field_accordion_item_content',
    ])
    .addFields(CONTENT_TYPES.COLUMNS, [
      'field_columns_left_column',
      'field_columns_right_column',
      'field_image',
    ])

export const getLandingPageQueryParams = () =>
  baseQueryParams()
    .addFields(NODE_TYPES.LANDING_PAGE, [
      'id',
      'title',
      'revision_timestamp',
      'langcode',
      'field_content',
      'field_hero',
      'field_description',
      'field_metatags',
    ])

    .getQueryObject()

export const getPageQueryParams = () =>
  baseQueryParams()
    .addInclude([
      // These content types are not avalable for landing page
      //Link collections: link and translations including translated locale codes
      // DISABLED DUE TO API REGRESSION
      'field_content.field_link_collection.field_links.field_language',
      //Contact information fragments
      'field_content.field_contact_data',
      //Accordion: text, images, links, columns
      'field_content.field_accordion_items.field_accordion_item_content.field_columns_left_column.field_image.field_media_image',
      'field_content.field_accordion_items.field_accordion_item_content.field_columns_right_column.field_image.field_media_image',
      // DISABLED DUE TO API REGRESSION
      'field_content.field_accordion_items.field_accordion_item_content.field_link_collection.field_links.field_language',
      'field_content.field_accordion_items.field_accordion_item_content.field_image.field_media_image',
    ])
    .addFields(NODE_TYPES.PAGE, [
      'id',
      'title',
      'revision_timestamp',
      'langcode',
      'field_content',
      'field_hero',
      'field_description',
      'field_metatags',
      'field_use_anchor_links',
    ])
    .getQueryObject()

export const getThemeHeroParams = () =>
  new DrupalJsonApiParams()
    .addFields(NODE_TYPES.PAGE, ['id', 'field_hero'])
    .addInclude([
      // Hero
      'field_hero.field_hero_image.field_media_image',
    ])
    .addFields(CONTENT_TYPES.MEDIA_IMAGE, ['field_media_image'])
    .addFields(CONTENT_TYPES.FILE, ['uri', 'url'])
    .getQueryObject()

export const getMunicipalityParams = () =>
  new DrupalJsonApiParams()
    .addFields(CONTENT_TYPES.MUNICIPALITY, ['id', 'name'])
    .getQueryObject()
