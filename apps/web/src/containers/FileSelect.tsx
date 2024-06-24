import type { ChangeEvent } from 'react'
import { Options } from '../components'
import { useFiles, useStore } from '../hooks'

export function FileSelect() {
  const { setSelectedFile } = useStore()
  const { data: files, isLoading, isFetched, isSuccess, isError, error } = useFiles()
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const file = e.target as HTMLSelectElement
    setSelectedFile(file.value)
  }

  if (isLoading) return <div>Loading...</div>
  if (!isFetched) return null
  if (isError) return <div>{(error as Error).message}</div>
  if (isSuccess) {
    return (
      <div className='form-group'>
        <label htmlFor='file'>File</label>
        <select
          className='form-control'
          id='file'
          name='file'
          disabled={!isSuccess}
          onChange={onChange}
        >
          <Options items={files} />
        </select>
      </div>
    )
  }
  return null
}
