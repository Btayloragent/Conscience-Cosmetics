import { useState } from 'react';
import BackgroundImageComponent from "./landingPage"; 



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BackgroundImageComponent /> 
    </>
  );
}

export default App;
