import type { ChangeEvent } from 'react'
import { Options } from '../components'
import { useFiles, useStore } from '../hooks'

export function FileSelect() {
  const { selectedFile, setSelectedFile } = useStore()
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
      <div>
        <label htmlFor='file'>File</label>
        <select id='file' onChange={onChange} value={selectedFile}>
          <Options items={files} />
        </select>
        {
          /* <label htmlFor='all-files' style={{ marginLeft: '1rem'}}>Download all</label>
            <input id='all-files' type='checkbox' /> */
        }
      </div>
    )
  }
  return null
}
