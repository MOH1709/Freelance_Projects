import { BrowserRouter, Routes, Route } from "react-router-dom";

//-----------------------------------------------> custom imports
import { Signup } from "./screens";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Signup />} />

        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  )
}