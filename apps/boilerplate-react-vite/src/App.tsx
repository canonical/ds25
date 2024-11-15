import { useState } from "react";
import reactLogo from "./assets/react.svg";
import canonicalLogo from "/canonical.svg";
import "./App.css";

import { Button } from "@canonical/ds-react-core";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href="https://canonical.com"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <img src={canonicalLogo} className="logo" alt="Canonical logo"></img>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Canonical Design System</h1>
      <h2>React Vite template</h2>
      <div className="card">
        <Button
          label={`Count: ${count}`}
          primary={true}
          onClick={() => setCount((count) => count + 1)}
        ></Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
