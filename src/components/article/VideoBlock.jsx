import { H3 } from '../Typo'
import Block from '@/components/layout/Block'
import ReactPlayer from 'react-player'
import { useTranslation } from 'next-i18next'

const INITIAL_VOLUME = 0.8
const INITIAL_MUTE = true

const VideoBlock = ({ url, title }) => {
  const { t } = useTranslation('common')
  return (
    <Block className="my-16">
      <H3>{title}</H3>
      <div
        className="flex justify-center pt-2 mt-4 border-t border-gray-lighter aspect-video"
        role="button"
        arial-label={t('video.button')}
      >
        <ReactPlayer
          light
          controls
          volume={INITIAL_VOLUME}
          muted={INITIAL_MUTE}
          url={url}
          height="100%"
          width="100%"
          // onPlay={()=>console.log('on play')}
          // onStart={()=>console.log('start')}
          // onReady={()=>console.log('ready')}
          onError={() => console.error('player error', url)}
        />
      </div>
    </Block>
  )
}

export default VideoBlock
