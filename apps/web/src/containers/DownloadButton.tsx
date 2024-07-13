import { useDownloadUrl, useStore } from '../hooks'

export function DownloadButton() {
  const { selectedFile, tickedDownloadAll } = useStore()
  const disabled = !(selectedFile || tickedDownloadAll)
  const downloadUrl = useDownloadUrl()

  const onClick = () => {
    window.location.href = downloadUrl
  }

  return (
    <button type='button' onClick={onClick} className='btn btn-primary mt-5' disabled={disabled}>
      Download
    </button>
  )
}
