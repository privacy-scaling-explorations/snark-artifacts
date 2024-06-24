import { atom, useAtom } from 'jotai'

const selectedFileAtom = atom('')
const selectedProjectAtom = atom('')
const selectedVersionAtom = atom('')

export const useStore = () => {
  const [selectedFile, setSelectedFile] = useAtom(selectedFileAtom)
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom)
  const [selectedVersion, setSelectedVersion] = useAtom(selectedVersionAtom)

  return {
    selectedFile,
    resetSelectedFile: () => setSelectedFile(''),
    setSelectedFile,
    selectedProject,
    setSelectedProject,
    selectedVersion,
    resetSelectedVersion: () => setSelectedVersion(''),
    setSelectedVersion,
  }
}
