import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [len, setlen] = useState(8);
  const [notrue, setnotrue] = useState(false);
  const [chartrue, setchartrue] = useState(false);
  const [password, setpassword] = useState("");
  // useRef hook
  const passRef = useRef(null);
  const passwordgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let spc = "!@#$%^&*-_+=[]{}~`";
    let n = "0123456789";
    if (notrue) str += n;
    if (chartrue) str += spc;
    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [len, notrue, chartrue]);

  const copypasstoClipboard = useCallback(() => {
    passRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgen();
  }, [len, notrue, chartrue, passwordgen]);
  return (
    <>
      <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md">
        <h1 className="my-3 text-center text-white">Password Generator</h1>
        <div className="flex mb-4 overflow-hidden rounded shadow">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copypasstoClipboard}
            className="px-4 py-2 text-white bg-blue-700 rounded-sm hover:bg-blue-500"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={len}
              className="cursor-pointer"
              onChange={(e) => {
                setlen(e.target.value);
              }}
            />
            <label>Length: {len}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={notrue}
              id="NumberInput"
              onChange={() => {
                setnotrue((prev) => !prev);
              }}
            />
            <label id="NumberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={chartrue}
              id="CharInput"
              onChange={() => {
                setchartrue((prev) => !prev);
              }}
            />
            <label id="CharInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
