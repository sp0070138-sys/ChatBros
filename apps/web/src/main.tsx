
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { App } from "./App.jsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ChatProvider } from "./context.jsx"

createRoot(document.getElementById("root")!).render(

  <ThemeProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </ThemeProvider>
)
