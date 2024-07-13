import { Footer, Header } from './components'
import { DownloadButton, FileSelect, ProjectSelect, VersionSelect } from './containers'

export const App = () => (
  <div class='flex flex-col h-screen p-4'>
    <Header />
    <form>
      <ProjectSelect />
      <VersionSelect />
      <FileSelect />
      <DownloadButton />
    </form>
    <Footer />
  </div>
)
