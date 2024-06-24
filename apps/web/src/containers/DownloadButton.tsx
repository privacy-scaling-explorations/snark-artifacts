import { cdnUrl } from '../constants'
import { useStore } from '../hooks'

export function DownloadButton() {
  const { selectedFile, selectedProject, selectedVersion } = useStore()
  console.log({ selectedFile })
  const onClick = () => {
    const url = `${cdnUrl}/${selectedProject}/${selectedVersion}/${selectedFile}`
    window.location.href = url
  }

  return <button type='button' onClick={onClick} className='btn btn-primary' disabled={!selectedFile}>Download</button>
}
