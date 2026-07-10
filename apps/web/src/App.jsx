import { Button } from "@workspace/ui/components/button";
import Sidbar from "../Sidebar/Sidebar.jsx";
import Chatarea from "../MainArea/Chatarea.jsx";
import Authentication from "../Login/Authentication.jsx";

export function App() {
  return (
    <main className="grid grid-rows-1 grid-cols-[22rem_1fr] w-screen h-screen">
      <Authentication />
      <Sidbar />
      <Chatarea />
    </main>
  )
}
