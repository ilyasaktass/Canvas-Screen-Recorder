import React, { useState } from "react";
import { Row, Button, Badge } from "antd";
import { useReactMediaRecorder } from "react-media-recorder";
import Text from "antd/lib/typography/Text";
import { BsFillCameraVideoFill,BsCameraVideoOffFill} from 'react-icons/bs'
import {IoMdReverseCamera} from "react-icons/io"
import {IoCloudDownloadSharp} from "react-icons/io5"
import {VscPreview} from 'react-icons/vsc'
const ScreenRecording = ({
  screen,
  audio,
  video,
  downloadRecordingPath,
  downloadRecordingType
}) => {
  const [recordingNumber, setRecordingNumber] = useState(0);
  const RecordView = () => {
    const {
      status,
      startRecording: startRecord,
      stopRecording: stopRecord,
      mediaBlobUrl
    } = useReactMediaRecorder({ screen, audio, video });
const startRecording = () => {
      return startRecord();
    };
const stopRecording = () => {
      const currentTimeSatmp = new Date().getTime();
      setRecordingNumber(currentTimeSatmp);
      return stopRecord();
    };
const viewRecording = () => {
      window.open(mediaBlobUrl, "_blank").focus();
    };
const downloadRecording = () => {
      const pathName = `${downloadRecordingPath}_${recordingNumber}.${downloadRecordingType}`;
      try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // for IE
          window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
        } else {
          // for Chrome
          const link = document.createElement("a");
          link.href = mediaBlobUrl;
          link.download = pathName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (err) {
        console.error(err);
      }
    };
return (
      <Row className="d-flex justify-content-between w-100  gap-5">
         <Row>
         {status && status !== "stopped" && (
            <strong>
             Status: {status && status.toUpperCase()}
            </strong>
          )}
          {status && status === "recording" && (
            <Badge
              className="screen-recording-badge"
              color="#faad14"
              status="processing"
              offset={[2, 0]}
              style={{
                marginLeft: "5px"
              }}
            />
          )}
         </Row>
        <Row style={{display:"flex",justifyContent:'space-between',alignItems:'center',flexDirection:'row',gap:'10px'}}>
          {status && status !== "recording" && (
            <button
              onClick={startRecording}
              className="btn"
              ghost
            >
              {mediaBlobUrl && mediaBlobUrl !==undefined ? <smal className="btn btn-secondary d-flex justify-content-center align-items-center "><IoMdReverseCamera/></smal>  : <smal  className="btn btn-success d-flex justify-content-center align-items-center p-2"><BsFillCameraVideoFill/></smal>}
            </button>
          )}
          {status && status === "recording" && (
            <button
              size="small"
              onClick={stopRecording}
              icon="stop"
              className="btn btn-danger rounded-pill d-flex justify-content-center align-items-center p-2"
              ghost
            >
             <BsCameraVideoOffFill/>
            </button>
          )}
          {mediaBlobUrl && status && status === "stopped" && (
            <button
              size="small"
              onClick={viewRecording}
              className="btn btn-info d-flex justify-content-center align-items-center rounded-xl"
            >
              <VscPreview/>
            </button>
          )}
          {downloadRecordingType &&
            mediaBlobUrl &&
            status &&
            status === "stopped" && (
              <button
                onClick={downloadRecording}
                className="btn btn-success d-flex justify-content-center align-items-center rounded-xl"
              >
                <IoCloudDownloadSharp/>
              </button>
            )}
        </Row>
      </Row>
    );
  };
return (
    <div className="d-flex justify-content-between gap-4 p-3" style={{width:"1000px"}}>
      {RecordView()}
    </div>
  );
};
export default ScreenRecording;