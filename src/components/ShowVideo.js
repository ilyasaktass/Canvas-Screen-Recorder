import React from 'react'

const ShowVideo = ({source,bgImage}) => {
    debugger
  return (
    <video
          controls
          autoPlay
          aria-valuenow={1}
          src={source}
          style={{ backgroundImage: `url(${bgImage})` }}
        ></video>
  )
}

export default ShowVideo