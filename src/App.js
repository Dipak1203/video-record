import { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import VideoRecorder from "./components/VideoRecorder";

const App = () => {
  const [recordOption, setRecordOption] = useState("video");

  const toggleOption = (option) => {
    return () => {
      setRecordOption(option);
    };
  };
  return (
    <div>
      <button onClick={toggleOption("video")}>Video Record</button>
      <button onClick={toggleOption("audio")}>audio Record</button>
      <div>
        {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
      </div>
    </div>
  );
};
export default App;
