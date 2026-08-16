import { useEffect, useState } from 'react'
import {
  Trash2,
  Mail,
  Phone,
  User,
  Inbox,
  AlertTriangle,
} from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { getMessages, deleteMessage } from '../../services/firestoreService'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)

  const fetchMessages = async () => {
    const data = await getMessages()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    await deleteMessage(deleteId)
    setDeleteId(null)
    fetchMessages()
  }

  if (loading) return <LoadingSpinner message="Loading messages..." />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Messages</h2>
        {messages.length > 0 && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
          </span>
        )}
      </div>

      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Inbox size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No messages yet</h3>
          <p className="mt-1 text-sm text-slate-500">
            Submissions from the contact form will appear here.
          </p>
        </div>
      ) : (
        /* Message Cards Grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {messages.map((msg) => {
            const rawDate = msg.createdAt?.toDate?.() || msg.createdAt
            const formattedDate = rawDate
              ? new Date(rawDate).toLocaleString()
              : ''

            return (
              <div
                key={msg.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-700 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  {/* Top Header: Sender Name & Delete Button */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 ">
                        <User size={18} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800">
                        {msg.name || 'Anonymous'}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDeleteId(msg.id)}
                      className="rounded-lg p-2 text-slate-400 transition-colors active:bg-red-50  hover:text-red-600 active:scale-95"
                      title="Delete message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 space-y-1.5 text-xs font-medium text-slate-500">
                    {msg.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={15} className="text-slate-400" />
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                    )}
                    {msg.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={15} className="text-slate-400" />
                        <a
                          href={`tel:${msg.phone}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {msg.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Message Body */}
                  <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                    {msg.message}
                  </div>
                </div>

                {/* Footer Timestamp */}
                {formattedDate && (
                  <p className="mt-4 text-xs text-slate-400">
                    {formattedDate}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {Boolean(deleteId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Delete Message?
              </h3>
            </div>

            <p className="text-xl text-slate-600">
              Are you sure you want to delete this contact submission? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}