export const isElementAtBottomOfPage = (event: number): boolean => {
  return event.documentElement.scrollHeight - (event.documentElement.scrollTop + window.innerHeight) < 100
}
