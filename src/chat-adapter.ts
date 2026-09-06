import type { ChatModelAdapter, ThreadMessage } from '@assistant-ui/react'

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3001'

type BackendMessage = {
  role: 'user' | 'assistant'
  content: string
}

function toBackendMessages(messages: readonly ThreadMessage[]): BackendMessage[] {
  return messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .map((message) => ({
      role: message.role as 'user' | 'assistant',
      content: message.content
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join(''),
    }))
}

export const backendChatAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }) {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: toBackendMessages(messages) }),
      signal: abortSignal,
    })

    if (!response.ok || !response.body) {
      let errorMessage = `Request failed with status ${response.status}`
      try {
        const data = await response.json()
        if (typeof data.error === 'string') errorMessage = data.error
      } catch {
        // response body wasn't JSON; fall back to the status-based message
      }
      throw new Error(errorMessage)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let text = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += decoder.decode(value, { stream: true })
      yield { content: [{ type: 'text', text }] }
    }
  },
}
