import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/react'
import { backendChatAdapter } from './chat-adapter'
import { Thread } from './Thread'

function App() {
  const runtime = useLocalRuntime(backendChatAdapter)

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-screen w-screen">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  )
}

export default App
