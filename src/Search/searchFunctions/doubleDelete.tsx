import { type MediaSeason } from '../../gqlTypes.g'

interface DelProps {

  filter: (mediaItem: (mediaItem: string, index: number) => boolean) => Array<MediaSeason | null | undefined> | undefined
  indexOf: (mediaItem: string) => number | undefined
}

export const doubleDelete = (mediaArr: Array<MediaSeason | null | undefined | string> | undefined): Array<MediaSeason | null | undefined | string> | undefined => {
  if (mediaArr === undefined || mediaArr === null) {
    return
  }
  return mediaArr?.filter((mediaItem, index) =>
    mediaArr?.indexOf(mediaItem) === index)
}
