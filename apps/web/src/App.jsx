import { Button } from "@workspace/ui/components/button";
import Sidbar from "../Sidebar/Sidebar.jsx";
import Chatarea from "../MainArea/Chatarea.jsx";

export function App() {
  return (
    <main className="grid grid-rows-1 grid-cols-[20rem_1fr] w-screen h-screen">
      <Sidbar />
      <Chatarea />
    </main>
  )
}
