import {
  AuiIf,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from '@assistant-ui/react'
import { ArrowUpIcon } from 'lucide-react'

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex h-full flex-col bg-white">
      <ThreadPrimitive.Viewport className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        <AuiIf condition={(s) => s.thread.isEmpty}>
          <p className="m-auto text-sm text-gray-400">
            Ask a question to get started.
          </p>
        </AuiIf>

        <ThreadPrimitive.Messages>
          {({ message }) => {
            if (message.role === 'user') return <UserMessage />
            return <AssistantMessage />
          }}
        </ThreadPrimitive.Messages>

        <ThreadPrimitive.ViewportFooter className="sticky bottom-0 pt-2">
          <ComposerPrimitive.Root className="flex w-full flex-col rounded-3xl border border-gray-200 bg-gray-100">
            <ComposerPrimitive.Input
              placeholder="Ask anything..."
              className="min-h-10 w-full resize-none bg-transparent px-5 pt-3.5 pb-2.5 text-sm focus:outline-none"
              rows={1}
            />
            <div className="flex items-center justify-end px-2.5 pb-2.5">
              <ComposerPrimitive.Send className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-white disabled:opacity-30">
                <ArrowUpIcon className="size-4" />
              </ComposerPrimitive.Send>
            </div>
          </ComposerPrimitive.Root>
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  )
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-blue-600 px-4 py-2.5 text-sm whitespace-pre-wrap text-white">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  )
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2.5 text-sm whitespace-pre-wrap text-gray-900">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  )
}
