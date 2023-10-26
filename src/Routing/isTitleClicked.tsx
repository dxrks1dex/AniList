import { redirect } from 'react-router-dom'

export const isTitleClicked = () => {
  return redirect('anime/{}')
}
