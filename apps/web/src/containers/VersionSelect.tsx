import type { ChangeEvent } from 'react'
import { useStore, useVersions } from '../hooks'

export function VersionSelect() {
  const { selectedVersion, setSelectedVersion, resetSelectedFile } = useStore()
  const { data: versions, isSuccess, isFetched, isLoading, isError, error } = useVersions()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    resetSelectedFile()
    const target = e.target as HTMLSelectElement
    setSelectedVersion(target.value)
  }

  if (isLoading) return <div>Loading...</div>
  if (!isFetched) return null
  if (isError) return <div>Error: {(error as Error).message}</div>
  if (isSuccess) {
    return (
      <div className='form-group'>
        <label htmlFor='version'>Version</label>
        <select
          id='version'
          className='form-control'
          value={selectedVersion}
          onChange={onChange}
          disabled={!isSuccess}
        >
          {versions.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
      </div>
    )
  }
  return null
}
