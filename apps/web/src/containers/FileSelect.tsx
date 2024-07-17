import type { ChangeEvent } from 'react'
import { Options } from '../components'
import { useFiles, useStore } from '../hooks'

export function FileSelect() {
  const { selectedFile, setSelectedFile, tickedDownloadAll, toggleTickedDownloadAll } = useStore()
  const { data: files, isLoading, isFetched, isSuccess, isError, error } = useFiles()
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target as HTMLSelectElement
    setSelectedFile(value)
  }

  if (isLoading) return <div>Loading...</div>
  if (!isFetched) return null
  if (isError) return <div>{(error as Error).message}</div>
  if (isSuccess) {
    return (
      <div class='flex items-center space-x-4'>
        <div class='flex flex-col'>
          <label htmlFor='file'>File</label>
          <select id='file' onChange={onSelectChange} value={selectedFile} disabled={tickedDownloadAll}>
            <Options items={files} />
          </select>
        </div>
        <div class='flex items-center space-x-2 pt-8'>
          <label htmlFor='all-files'>All</label>
          <input
            id='all-files'
            type='checkbox'
            onChange={toggleTickedDownloadAll}
            checked={tickedDownloadAll}
            title='Download all artifacts as .tgz tarball'
          />
        </div>
      </div>
    )
  }
  return null
}
