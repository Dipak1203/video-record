### IN THIS PROJECT I HAVE CRATE SIMPLE AUDIO AND VIDEO RECORDER USING REACT

### First I have created react app using

# npx create-react-app video-recorder

### I have created in src directory AudioRecorder component

## In AudioRecorder Component

# Get Permission like this code

<>

# First I have created hooks like this

# const [permission, setPermission] = useState(false)

# const [stream, setStream] = useState(null)

# const [audio, setAudio] = useState(null)

# const [audioRecord, setAudioRecord] = useState([])

# const [recordStatus, setRecordStatus] = useState('inactive')

# const mediaRecorder = useRef(null)

# mimeType = "audio/webm";

</>

# const getPermission = async() =>{

        if("MediaRecorder" in windows){
            try{
                 const streamData = await navigator.mediaDevices.getUserMedia({audio:true,video:false});
                setPermission(true);
                setStream(streamData);
            }catch(error){
                console.log(error.message);
            }
        }else{
                console.log("your browser cannot support");
        }

}

# And Created startRecord Function

# In this function/component do start audio record

# const startRecording = async() =>{

        setRecordStatus('active');

        const media =  new MediaRecorder(stream,{type:mineType})

        MediaRecorder.current = media;

        MediaRecorder.current.start();
          let localAudioChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
         if (typeof event.data === "undefined") return;
         if (event.data.size === 0) return;
         localAudioChunks.push(event.data);
         };
         setAudioChunks(localAudioChunks);

        };
        };

}

# Created Stop Recorder Function/component

# const stopRecording = async () =>{

        setRecordStatus('inactive')

        MediaRecorder.current.stop();
        MediaRecorder.current.onstop = () =>{
                  // creates a blob file from the audiochunks data
                  const audioBlob = new Blob(audioChunks, { type: mimeType });

                // create a playable url from the blob file.
                // Blob file = The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.
                 const audioUrl = URL.createObjectURL(audioBlob);
                 setAudio(audioUrl);
                setAudioChunks([]);
                  };
        }

}

### in Audio Component
# <div>
    <h1>Audio Recorder</h1>
      <div className="audio-controls">
        {!persmission ? (
          <button onClick={getMicrophonePermission}>Get Microphone</button>
        ) : null}
        {persmission && recordingStatus === "inactive" ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : null}
        {recordingStatus === "recording" ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : null}
        {persmission ? <button>Record</button> : null}
      </div>
      {audio ? (
        <>
          <audio src={audio} controls />
          <a download href={audio}>
            Download Record
          </a>
        </>
      ) : null}
   # </div>

### And you final result looks like 

import React, { useRef, useState } from "react";

const AudioRecorder = () => {
  const [persmission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audio, setAudio] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [stream, setStream] = useState(null);

  const mimeType = "audio/webm";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("your browser not supported");
    }
  };

  // Start Record Function
  const startRecording = async () => {
    setRecordingStatus("recording");
    // Create new media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });

    // set the mediaRecorder instance to the mediaRecorder ref

    mediaRecorder.current = media;

    // invokes the start method to start the recording process
    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  //! Stop Recording Function
  const stopRecording = () => {
    setRecordingStatus("inactive");

    // stop the recording instance

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      // creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });

      // create a playable url from the blob file.

      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };
  return (
    <div>
      <h1>Audio Recorder</h1>
      <div className="audio-controls">
        {!persmission ? (
          <button onClick={getMicrophonePermission}>Get Microphone</button>
        ) : null}
        {persmission && recordingStatus === "inactive" ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : null}
        {recordingStatus === "recording" ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : null}
        {persmission ? <button>Record</button> : null}
      </div>
      {audio ? (
        <>
          <audio src={audio} controls />
          <a download href={audio}>
            Download Record
          </a>
        </>
      ) : null}
    </div>
  );
};

export default AudioRecorder;
