import { atom, useAtom } from 'jotai'

const selectedFileAtom = atom('')
const selectedProjectAtom = atom('')
const selectedVersionAtom = atom('')
const tickedDownloadAllAtom = atom(false)

export const useStore = () => {
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom)
  const resetSelectedFile = () => setSelectedFile('')

  const [tickedDownloadAll, _setTickedDownloadAll] = useAtom(tickedDownloadAllAtom)
  const _resetTickedDownloadAll = () => _setTickedDownloadAll(false)
  const toggleTickedDownloadAll = () => _setTickedDownloadAll(prev => !prev)

  const [selectedVersion, _setSelectedVersion] = useAtom(selectedVersionAtom)
  const setSelectedVersion = (...args: Parameters<typeof _setSelectedVersion>) => {
    resetSelectedFile()
    _resetTickedDownloadAll()
    _setSelectedVersion(...args)
  }
  const resetSelectedVersion = () => setSelectedVersion('')

  const [selectedProject, _setSelectedProject] = useAtom(selectedProjectAtom)
  const setSelectedProject = (...args: Parameters<typeof _setSelectedProject>) => {
    resetSelectedVersion()
    _setSelectedProject(...args)
  }

  return {
    selectedFile,
    resetSelectedFile,
    setSelectedFile,
    selectedProject,
    setSelectedProject,
    selectedVersion,
    resetSelectedVersion,
    setSelectedVersion,
    tickedDownloadAll,
    toggleTickedDownloadAll,
  }
}
