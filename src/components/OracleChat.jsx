import { useMemo, useState } from 'react'

function OracleChat() {
  const [messages, setMessages] = useState([
    {
      role: 'oracle',
      content:
        'Seeker, I am the Oracle of Vindom. Ask of change, law, grief, devotion, or destiny, and I will answer from the turning dark.',
    },
  ])
  const [draft, setDraft] = useState('')

  const quickReplies = useMemo(
    () => [
      'How do I endure change?',
      'What does Ken ask of us?',
      'How do I know my path?',
    ],
    [],
  )

  const generateOracleResponse = (input) => {
    const lower = input.toLowerCase()
    if (lower.includes('change') || lower.includes('end')) {
      return 'Do not cling to the collapsing wall. Step into the ash-field and name one new vow. Vin closes one gate so you may see the hidden one.'
    }
    if (lower.includes('ken') || lower.includes('order') || lower.includes('law')) {
      return 'Ken asks for clean promises and faithful craft. Build routines that protect your future self, then let mercy keep those routines alive.'
    }
    if (lower.includes('fear') || lower.includes('grief')) {
      return 'Fear is the bell that rings before transformation. Sit beside it, breathe slowly, and ask what love remains when the old form falls away.'
    }
    return 'The sky does not answer with noise; it answers with pattern. Observe what repeats in your life, and there you will find your next instruction.'
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
            placeholder="Ask the Oracle..."
          />
          <button type="submit">Invoke</button>
        </div>
      </form>
    </div>
  )
}

export default OracleChat
