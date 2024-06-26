import { atom, useAtom } from 'jotai'

const selectedFileAtom = atom('')
const selectedProjectAtom = atom('')
const selectedVersionAtom = atom('')
const tickedDownloadAllAtom = atom(false)

export const useStore = () => {
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom)
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)
  const [selectedVersion, setSelectedVersion] = useAtom(selectedVersionAtom)
  const [tickedDownloadAll, setTickedDownloadAll] = useAtom(tickedDownloadAllAtom)
  const toggleTickedDownloadAll = () => setTickedDownloadAll(prev => !prev)

  return {
    selectedFile,
    resetSelectedFile: () => setSelectedFile(''),
    setSelectedFile,
    selectedProject,
    setSelectedProject,
    selectedVersion,
    resetSelectedVersion: () => setSelectedVersion(''),
    setSelectedVersion,
    tickedDownloadAll,
    toggleTickedDownloadAll,
  }
}
