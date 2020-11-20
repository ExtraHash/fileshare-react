import React from 'react';
import { FileUploader } from "./components/FileUploader";
import { FileList } from "./components/FileList";

function App() {
  return (
    <div className="container">
      <FileUploader />
      <br />
      <FileList />
    </div>
  );
}

export default App;
