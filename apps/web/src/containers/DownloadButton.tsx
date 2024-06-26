import { useDownloadUrl, useStore } from '../hooks'

export function DownloadButton() {
  const { selectedFile, tickedDownloadAll } = useStore()
  const disabled = !(selectedFile || tickedDownloadAll)
  const downloadUrl = useDownloadUrl()

  const onClick = () => {
    window.location.href = downloadUrl
  }

  return (
    <button type='button' onClick={onClick} className='btn btn-primary' disabled={disabled}>
      Download
    </button>
  )
}
