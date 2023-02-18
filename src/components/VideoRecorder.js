import { useState } from "react";

const VideoRecorder = () => {
  const [persmission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

  const getCameraPermission = async () => {
    if("MediaRecorder" in window)
    {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia(
                {
                    audio:false,
                    video:true
                }
            )
            setPermission(true)
            setStream(streamData);
        } catch (error) {
            alert(error.message)
        }
    }else{
        alert("Your browser not support")
    }
  };
  return (
    <div>
      <h2>Video Recorder</h2>
      <main>
        {!persmission ? (
          <button onClick={getCameraPermission}>Get Camera</button>
        ) : null}
        {persmission ? <button>Record</button> : null}
      </main>
    </div>
  );
};

export default VideoRecorder;
