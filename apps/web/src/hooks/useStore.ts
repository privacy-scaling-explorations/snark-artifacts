import { atom, useAtom } from 'jotai'

const selectedFileAtom = atom('')
const selectedProjectAtom = atom('')
const selectedVersionAtom = atom('')
const tickedDownloadAllAtom = atom(false)

export const useStore = () => {
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom)
  const _resetSelectedFile = () => setSelectedFile('')

  const [tickedDownloadAll, _setTickedDownloadAll] = useAtom(tickedDownloadAllAtom)
  const _resetTickedDownloadAll = () => _setTickedDownloadAll(false)
  const toggleTickedDownloadAll = () => _setTickedDownloadAll(prev => !prev)

  const [selectedVersion, _setSelectedVersion] = useAtom(selectedVersionAtom)
  const setSelectedVersion = (...args: Parameters<typeof _setSelectedVersion>) => {
    _resetSelectedFile()
    _resetTickedDownloadAll()
    _setSelectedVersion(...args)
  }
  const _resetSelectedVersion = () => setSelectedVersion('')

  const [selectedProject, _setSelectedProject] = useAtom(selectedProjectAtom)
  const setSelectedProject = (...args: Parameters<typeof _setSelectedProject>) => {
    _resetSelectedVersion()
    _setSelectedProject(...args)
  }

  return {
    selectedFile,
    setSelectedFile,
    selectedProject,
    setSelectedProject,
    selectedVersion,
    setSelectedVersion,
    tickedDownloadAll,
    toggleTickedDownloadAll,
  }
}
