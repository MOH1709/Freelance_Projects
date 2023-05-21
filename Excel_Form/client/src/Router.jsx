import { BrowserRouter, Routes, Route } from "react-router-dom";

//-----------------------------------------------> custom imports
import { Signup, Error } from "./screens";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Freelance_Projects" element={<Signup />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}