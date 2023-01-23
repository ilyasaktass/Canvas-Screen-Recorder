import * as React from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import bg from '../image/canvasbg3.svg'
import { FaEraser ,FaPen,FaTrash} from 'react-icons/fa'
import {IoIosUndo,IoIosRedo} from "react-icons/io"
import {AiOutlineZoomIn } from 'react-icons/ai'
const styles = {
    border:"2px solid #d2d2d2",
  borderRadius: '5px',
}

const Canvas = () => {
  const canvasRef = React.useRef()
  return (
    <div className="d-flex gap-2">
      <div className="tools d-flex flex-column gap-2">
      <span
          className="btn btn-primary rounded-full"
          onClick={() => {
            canvasRef.current.eraseMode(false)
            var el=document.getElementById("canvas");
            el.style.cursor='default'
            
          }}
        >
          <FaPen />
        </span>
        <span
          className="btn btn-danger rounded-full"
          onClick={() => {
            canvasRef.current.eraseMode(true)
           var el=document.getElementById("canvas");
           el.style.cursor='crosshair'
          }}
        >
          <FaEraser />
         
        </span>
        <span
          className="btn btn-info rounded-full"
          onClick={() => {
            canvasRef.current.undo()
          
          }}
        >
          <IoIosUndo />
        </span>
        <span
          className="btn btn-info rounded-full"
          onClick={() => {
            canvasRef.current.redo()
           console.log(canvasRef)
          }}
        >
          <IoIosRedo />
        </span>
        <span
          className="btn btn-warning rounded-full"
          onClick={() => {
            canvasRef.current.clearCanvas()
          }}
        >
          <FaTrash />
        </span>

        <span
          className="btn btn-warning rounded-full"
          onClick={() => {
            var el=document.getElementById("canvas");
           el.style.cursor='-webkit-zoom-in'
           el.style.cursor='zoom-in'
          }}
        >
          <AiOutlineZoomIn />
        </span>
      </div>
      <ReactSketchCanvas
         id='canvas'
        ref={canvasRef}
        style={styles}
        width="1000px"
        height="700px"
        strokeWidth={4}
        strokeColor="red"
        backgroundImage={bg}
        exportWithBackgroundImage
        eraserWidth={20}
      />
    </div>
  )
}

export default Canvas
