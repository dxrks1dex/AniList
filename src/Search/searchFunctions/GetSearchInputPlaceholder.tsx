
export const getSearchInputPlaceholder = ({ values }: { values: string[] | string }): string => {
  if (values.length === 0) {
    return 'Any'
  }
  if (values.length === 1) {
    return values[0]
  }

  return `${values[0]} +${values.length - 1}`
}
