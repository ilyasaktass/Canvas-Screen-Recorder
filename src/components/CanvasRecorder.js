import { useEffect, useRef, useState } from 'react'
import bgImage from '../image/canvasbg2.svg'
import ShowVideo from './ShowVideo'
const DrawingCanvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [url, setUrl] = useState('')
  const [showVideo,setShowVideo]=useState(false);
  const [recorder,setRecorder]=useState(null);
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 500
    canvas.height = 500

    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    setIsDrawing(true)
    nativeEvent.preventDefault()
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }

    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    nativeEvent.preventDefault()
  }

  const stopDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = 'source-over'
  }

  const setToErase = async() => {
    contextRef.current.globalCompositeOperation = 'destination-out'
  }

  const startRecording=async()=>{
    var aStream=null;
    await navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
        // create the MediaStreamAudioSourceNode
        var context = new AudioContext();
        var source = context.createMediaStreamSource(stream);
        aStream=source.mediaStream
    },
        (err) => console.error(err));

    var cStream=canvasRef.current.captureStream(50);
    if (aStream) {
        var track = aStream.getAudioTracks()[0];
        cStream.addTrack(track);
    } else {
        alert("Sayfa Yüklenirken Hata Oluştu Lütfen Soru Seçimini Tekrar Yapınız!");
    }
    var options = {
        videoBitsPerSecond: 5000000,
        type: 'video/webm; codecs=h264'
    }
   var recorder =  new MediaRecorder(cStream, options);
    recorder.start(30000);
    setRecorder(recorder);
  }
  const stopRecording=async()=>{
    if(recorder!==undefined && recorder!==undefined){
        recorder.addEventListener('dataavailable', (evt) => {
            const url = URL.createObjectURL(evt.data)
            setUrl(url)
            console.log(url)
          })
          recorder.stream.getTracks().forEach(track => track.stop());
    }
    
  }
//   useEffect(() => {
//     debugger
//     let stream = canvasRef.current.captureStream(25)
//     const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
//     document
//       .getElementById('startRecord')
//       .addEventListener('click', function () {
//         recorder.start()
//       })
//     document
//       .getElementById('stopRecord')
//       .addEventListener('click', function () {
//         recorder.stop()
//         recorder.addEventListener('dataavailable', (evt) => {
//           const url = URL.createObjectURL(evt.data)
//           setUrl(url)
//           console.log(url)
//         })
//       })
//   }, [])
  return (
    <div>
       <div className='d-flex justify-content-center align-items-center gap-3'>
       <canvas
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={500}
        height={500}
        style={{ backgroundImage: `url(${bgImage})` }}
      ></canvas>
       {url &&  <video
          controls
          autoPlay
          aria-valuenow={1}
          src={url}
          style={{ backgroundImage: `url(${bgImage})` }}
        ></video>}
       </div>
      <br />     
      <div>
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <span
          className="btn btn-secondary rounded-full d-flex justify-content-center align-items-center gap-2"
          id="startRecord"
            onClick={startRecording}
        >
          Start
        </span>
        <span
          className="btn btn-secondary rounded-full d-flex justify-content-center align-items-center gap-2"
          id="stopRecord"
            onClick={stopRecording}
        >
          Stop
        </span>
      </div>
    </div>
  )
}
export default DrawingCanvas
