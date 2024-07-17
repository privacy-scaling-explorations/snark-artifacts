import { useDownloadUrl, useStore } from '../hooks'

export function DownloadButton() {
  const { selectedFile, tickedDownloadAll } = useStore()
  const disabled = !(selectedFile || tickedDownloadAll)
  const downloadUrl = useDownloadUrl()

  const onClick = () => {
    window.location.href = downloadUrl
  }

  return (
    <button type='button' onClick={onClick} disabled={disabled} className={`${disabled ? 'is-disabled' : ''}`}>
      Download
    </button>
  )
}
