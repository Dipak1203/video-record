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
