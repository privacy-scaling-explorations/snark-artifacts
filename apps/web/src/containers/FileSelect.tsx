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
      <div>
        <label htmlFor='file'>File</label>
        <select id='file' onChange={onSelectChange} value={selectedFile} disabled={tickedDownloadAll}>
          <Options items={files} />
        </select>

        <label htmlFor='all-files' style={{ marginLeft: '1rem' }}>All</label>
        <input
          id='all-files'
          type='checkbox'
          onChange={toggleTickedDownloadAll}
          checked={tickedDownloadAll}
          title='Download all artifacts as .tgz tarball'
        />
      </div>
    )
  }
  return null
}
