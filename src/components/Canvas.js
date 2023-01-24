import React ,{useState,useRef,useCallback, useEffect} from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import bg from '../image/canvasbg3.svg'
import { FaEraser ,FaPen,FaTrash} from 'react-icons/fa'
import {IoIosUndo,IoIosRedo} from "react-icons/io"
import {AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import {CirclePicker } from 'react-color'
import recorder from 'react-canvas-recorder';
const styles = {
    border:"2px solid #d2d2d2",
  borderRadius: '5px',
}

const Canvas = () => {
    const [penColor,setPenColor]=useState("#000")
  const canvasRef = useRef()
  const [url,setUrl]=useState("");
  const startRecording = useCallback(() => {
    recorder.createStream(canvasRef.current);
    recorder.start();
  }, [canvasRef])

  const stopRecording = useCallback(() => {
    recorder.stop();
    const file = recorder.save();
    const url = URL.createObjectURL(file);
    setUrl(url)
    console.log(url)
    // Do something with the file
  }, [])

  return (
    <div className="d-flex gap-2">
      <div className="tools d-flex flex-column gap-2">
        <span>
            <CirclePicker width='100px' onChange={(e)=>setPenColor(e.hex)}/>
        </span>
      <span
          className="btn btn-primary rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            canvasRef.current.eraseMode(false)
            var el=document.getElementById("canvas");
            el.style.cursor='default'
            
          }}
        >
          <FaPen />
        </span>
        <span
          className="btn btn-danger rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            canvasRef.current.eraseMode(true)
           var el=document.getElementById("canvas");
           el.style.cursor='crosshair'
          }}
        >
          <FaEraser />
         
        </span>
        <span
          className="btn btn-secondary rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            canvasRef.current.undo()
          
          }}
        >
          <IoIosUndo />
        </span>
        <span
          className="btn btn-info rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            canvasRef.current.redo()
           console.log(canvasRef)
          }}
        >
          <IoIosRedo />
        </span>
        <span
          className="btn btn-warning rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            canvasRef.current.clearCanvas()
          }}
        >
          <FaTrash />
        </span>

        <span
          className="btn btn-success rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            var el=document.getElementById("canvas");
           el.style.cursor='-webkit-zoom-in'
           el.style.cursor='zoom-in'
          }}
        >
          <AiOutlineZoomIn />
        </span>
        <span
          className="btn btn-secondary rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={() => {
            var el=document.getElementById("canvas");
           el.style.cursor='-webkit-zoom-out'
           el.style.cursor='zoom-out'
          }}
        >
          <AiOutlineZoomOut />
        </span>
        <span className="btn btn-secondary rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={startRecording}>
          Start
        </span>
        <span className="btn btn-secondary rounded-full d-flex justify-content-center align-items-center gap-2"
          onClick={stopRecording}>
          Stop
        </span>
      </div>
      {/* <ReactSketchCanvas
         id='canvas'
        ref={canvasRef}
        style={styles}
        width="1000px"
        height="700px"
        strokeWidth={4}
        strokeColor={penColor}
        
        backgroundImage={bg}
        exportWithBackgroundImage
        eraserWidth={20}
      /> */}
      <canvas ref={canvasRef}></canvas>
      <video controls src={url}></video>
    </div>
  )
}

export default Canvas
