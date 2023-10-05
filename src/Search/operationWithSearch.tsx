import { useState } from 'react'

export const useOperationWithSearch = (): any => {
  const [genreOrTag, setGenreOrTag] = useState('')
  const [genreArr, setGenreArr] = useState<string[] >([])
  const [foundByName, setFoundByName] = useState('')
  const [tag, setTag] = useState('')
  const [tagArr, setTagArr] = useState<string[] >([])
  const [year, setYear] = useState('')
  const [season, setSeason] = useState('')

  const handleSeasonFound = (season: string): any => {
    setSeason(season)
  }
  const handleTagAddToArr = (tagArr: any): any => {
    setTagArr(tag => [...tag, tagArr])
  }
  const handleGenreAddToArr = (genreArr: any): any => {
    setGenreArr(genre => [...genre, genreArr])
  }
  const handleYearFound = (year: string): any => {
    setYear(year)
  }
  const handleTagFound = (tag: string): any => {
    setTag(tag)
  }
  const handleGenreFound = (genreOrTag: string): any => {
    setGenreOrTag(genreOrTag)
  }
  const handleNameFound = (foundByName: string): any => {
    setFoundByName(foundByName)
  }
  const deleteGenreByIndex = (genre: any): any => {
    const mediaAnimeIndex = genreArr.findIndex((mediaTitle: any) => mediaTitle === genre)
    console.log(mediaAnimeIndex)
    if (mediaAnimeIndex === -1) {
      return 'index_not_found'
    } else {
      const mediaArr = [...genreArr]
      mediaArr.splice(mediaAnimeIndex, 1)
      setGenreArr(mediaArr)
    }
  }
  const deleteTagByIndex = (tag: any): any => {
    const mediaAnimeIndex = tagArr.findIndex((mediaTitle: any) => mediaTitle === tag)
    if (mediaAnimeIndex === -1) {
      return 'index_not_found'
    } else {
      const mediaArr = [...tagArr]
      mediaArr.splice(mediaAnimeIndex, 1)
      setTagArr(mediaArr)
    }
  }
  const deleteTagAndGenre = (): any => {
    const clearArr: any[] = []
    setTagArr(clearArr)
    setGenreArr(clearArr)
  }

  return {
    genreOrTag,
    genreArr,
    foundByName,
    tag,
    tagArr,
    year,
    season,
    handleSeasonFound,
    handleTagAddToArr,
    handleGenreAddToArr,
    handleYearFound,
    handleTagFound,
    handleGenreFound,
    handleNameFound,
    deleteTagAndGenre,
    deleteTagByIndex,
    deleteGenreByIndex
  }
}
