import MediaRecord from './components/MediaRecord'
import './App.css'
import Canvas from './components/Canvas'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <MediaRecord
        screen={true}
        audio={true}
        video={true}
        downloadRecordingPath="Screen_Recording_Demo"
        downloadRecordingType="mp4"
        emailToSupport="ilyas.aktas@obrosoft.com"
      />
       <Canvas/>
    </div>
  )
}

export default App
