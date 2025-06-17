import {
  getImage,
  getHeroFromNode,
  getLinks,
  getVideo,
  addPrerenderLocalesToPaths,
} from '@/lib/ssr-helpers'
import getConfig from 'next/config'

/**
 *
 * Sidenote: using array.at is safe because tests are run in node, not browser
 */

describe('ssr-helpers', () => {
  describe('getImage', () => {
    it('should return image props from paragraph--image item', () => {
      const image = getImage({
        field_image: {
          field_photographer: 'Koe Kuvaaja',
          field_media_image: {
            uri: { url: '/foo.png' },
            resourceIdObjMeta: {
              alt: 'alt',
              title: 'title',
              width: 100,
              height: 200,
            },
          },
        },
        field_image_caption: 'kuvatekstiä',
      })
      expect(image.src).toBe('https://test.env/foo.png')
      expect(image.alt).toBe('alt')
      expect(image.width).toBe(100)
      expect(image.height).toBe(200)
      expect(image.title).toBe('title')
      expect(image.photographer).toBe('Koe Kuvaaja')
      expect(image.caption).toBe('kuvatekstiä')
    })

    it('should fail gracefully', () => {
      const image = getImage({})
      expect(image.src).toBeUndefined()
      expect(image.alt).toBeUndefined()
      expect(image.width).toBeUndefined()
      expect(image.height).toBeUndefined()
      expect(image.title).toBeUndefined()
      expect(image.caption).toBeUndefined()
      expect(image.photographer).toBeUndefined()
    })
  })

  describe('getHeroFromNode', () => {
    it('should return url and title', () => {
      const hero = getHeroFromNode({
        field_hero: {
          field_hero_title: 'title',
          field_hero_image: {
            field_media_image: { uri: { url: '/hero.png' } },
          },
        },
      })
      expect(hero.src).toBe('https://test.env/hero.png')
      expect(hero.title).toBe('title')
    })

    it('should return null values if field_hero is not complete', () => {
      const hero = getHeroFromNode({ field_hero: {} })
      expect(hero.color).toBeNull()
      expect(hero.src).toBeNull()
      expect(hero.title).toBeNull()
    })
  })

  describe('getLinks', () => {
    it('should return main link and languages', () => {
      const links = getLinks({
        collection: [
          {
            field_link_target_site: 'sivusto',
            title: 'title',
            field_links: [
              {
                field_language: { field_locale: 'en' },
                field_language_link: 'http://en.en',
              },
              {
                field_language: { field_locale: 'so' },
                field_language_link: 'http://so.so',
              },
              {
                field_language: { field_locale: 'fi' },
                field_language_link: 'http://fi.fi',
              },
            ],
          },
        ],
        locale: 'so',
      })
      expect(links.at(0).mainTranslation.locale).toBe('so')
      expect(links.at(0).mainTranslation.url).toBe('http://so.so')
      expect(links.at(0).siteName).toBe('sivusto')
      expect(links.at(0).title).toBe('title')
      // Must include current language
      expect(links.at(0).languages).toHaveLength(3)
    })

    it('should sort languages to the configured language order', () => {
      const links = getLinks({
        collection: [
          {
            field_link_target_site: 'sivusto',
            title: 'title',
            field_links: [
              {
                field_language: { field_locale: 'en' },
                field_language_link: 'http://en.en',
              },
              {
                field_language: { field_locale: 'sv' },
                field_language_link: 'http://sv.sv',
              },
              {
                field_language: { field_locale: 'so' },
                field_language_link: 'http://so.so',
              },
              {
                field_language: { field_locale: 'fi' },
                field_language_link: 'http://fi.fi',
              },
            ],
          },
        ],
        locale: 'so',
      })

      expect(links.at(0).languages.at(0).locale).toBe('fi')
      expect(links.at(0).languages.at(1).locale).toBe('sv')
      expect(links.at(0).languages.at(2).locale).toBe('en')
    })

    it('should default to english if required locale is not translated', () => {
      const links = getLinks({
        collection: [
          {
            field_link_target_site: 'sivusto',
            title: 'title',
            field_links: [
              {
                field_language: { field_locale: 'fi' },
                field_language_link: 'http://fi.fi',
              },
              {
                field_language: { field_locale: 'en' },
                field_language_link: 'http://en.en',
              },
            ],
          },
        ],
        locale: 'so',
      })
      expect(links.at(0).mainTranslation.locale).toBe('en')
      expect(links.at(0).mainTranslation.url).toBe('http://en.en')
      expect(links.at(0).siteName).toBe('sivusto')
      expect(links.at(0).title).toBe('title')
      expect(links.at(0).languages).toHaveLength(2)
    })

    it('should fall back to finnish  if required locale and english are not translated', () => {
      const links = getLinks({
        collection: [
          {
            field_link_target_site: 'sivusto',
            title: 'title',
            field_links: [
              {
                field_language: { field_locale: 'fi' },
                field_language_link: 'http://fi.fi',
              },
            ],
          },
        ],
        locale: 'so',
      })
      expect(links.at(0).mainTranslation.locale).toBe('fi')
      expect(links.at(0).mainTranslation.url).toBe('http://fi.fi')
      expect(links.at(0).siteName).toBe('sivusto')
      expect(links.at(0).title).toBe('title')
      expect(links.at(0).languages).toHaveLength(1)
    })

    it('should fail gracefully', () => {
      const links = getLinks()
      expect(links).toBeUndefined()
    })
  })

  describe('addPrerenderLocalesToPaths', () => {
    it('should add next.config.publicRuntimeConfig.PRERENDER_LOCALES to given paths', () => {
      const withLocales = addPrerenderLocalesToPaths([{ a: 1 }])
      const { serverRuntimeConfig } = getConfig()
      expect(withLocales).toHaveLength(
        serverRuntimeConfig.PRERENDER_LOCALES.length
      )
      expect(withLocales.at(0).locale).toBe('fi')
    })
  })

  describe('getVideo', () => {
    it('should return url and title for media--remote_video', () => {
      const video = getVideo({
        field_video_title: 'Remote embed url: Youtube, Vimeo',
        field_remote_video: {
          field_media_oembed_video: 'https://www.vi.deo/1',
        },
      })

      expect(video.url).toBe('https://www.vi.deo/1')

      expect(video.title).toBe('Remote embed url: Youtube, Vimeo')
    })

    it('should return url and title for paragraph--helsinki_kanava', () => {
      const video = getVideo({
        field_video_url: {
          uri: 'https://www.vi.deo/2.mp4',
          title: 'direct link to mp4 (helsinki kanava video)',
        },
      })

      expect(video.url).toBe('https://www.vi.deo/2.mp4')

      expect(video.title).toBe('direct link to mp4 (helsinki kanava video)')
    })
    it('should return undefined values if data is missing', () => {
      const not = getVideo({})
      expect(not.url).toBeUndefined()
      expect(not.title).toBeUndefined()
    })
  })
})
