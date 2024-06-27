import { cdnUrl, npmRegistryUrl } from '../constants'
import { useStore } from './useStore'

export const useDownloadUrl = () => {
  const { selectedFile, selectedProject, selectedVersion, tickedDownloadAll } = useStore()
  return tickedDownloadAll
    ? `${npmRegistryUrl}/@zk-kit/${selectedProject}-artifacts/-/${selectedProject}-artifacts-${selectedVersion}.tgz`
    : `${cdnUrl}/${selectedProject}/${selectedVersion}/${selectedFile}`
}
