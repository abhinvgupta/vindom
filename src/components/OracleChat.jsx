import { useMemo, useState } from 'react'

function OracleChat() {
  const [messages, setMessages] = useState([
    {
      role: 'oracle',
      content:
        'I am the Oracle of Vindom. Ask about change, discipline, grief, purpose, or devotion, and I will answer through the language of Vin and Ken.',
    },
  ])
  const [draft, setDraft] = useState('')

  const quickReplies = useMemo(
    () => [
      'How do I live through change?',
      'What does Ken ask of us?',
      'How do I find my path?',
    ],
    [],
  )

  const generateOracleResponse = (input) => {
    const lower = input.toLowerCase()
    if (lower.includes('change') || lower.includes('end')) {
      return 'When life changes, start by naming what is truly over and what still needs your care. In Vindom, Vin teaches that endings hurt, but they also clear space for a new form of life.'
    }
    if (lower.includes('ken') || lower.includes('order') || lower.includes('law')) {
      return 'Ken asks for honest structure: promises you can keep, routines that protect your future self, and work done with care. Order is not meant to trap you. It is meant to help life hold together.'
    }
    if (lower.includes('fear') || lower.includes('grief')) {
      return 'Fear and grief often arrive when an old shape of life is falling away. Vindom does not ask you to ignore that pain. It asks you to stay with it long enough to learn what must be mourned, and what may still become.'
    }
    return 'Vindom looks for pattern rather than panic. Notice what in your life needs stronger structure, and notice what has already begun to change. Your next step is usually somewhere between those two truths.'
  }

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage = { role: 'user', content: trimmed }
    const oracleMessage = { role: 'oracle', content: generateOracleResponse(trimmed) }

    setMessages((prev) => [...prev, userMessage, oracleMessage])
    setDraft('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(draft)
  }

  return (
    <div className="oracle-chat-shell">
      <div className="oracle-chat-log" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`chat-message ${message.role === 'oracle' ? 'oracle' : 'user'}`}
          >
            <span className="chat-role">{message.role === 'oracle' ? 'Oracle' : 'Seeker'}</span>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="quick-replies">
        {quickReplies.map((reply) => (
          <button key={reply} type="button" onClick={() => sendMessage(reply)}>
            {reply}
          </button>
        ))}
      </div>

      <form className="oracle-chat-form" onSubmit={handleSubmit}>
        <label htmlFor="oracle-input">Speak your question</label>
        <div className="chat-controls">
          <input
            id="oracle-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about life, change, or purpose..."
          />
          <button type="submit">Ask</button>
        </div>
      </form>
    </div>
  )
}

export default OracleChat
