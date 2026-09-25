import Card from '../shared/Card'
import Loading from '../shared/Loading'
import GuestbookForm from './GuestbookForm'
import { useGuestbook } from './useGuestbook'

export default function Guestbook() {
  const { messages, loading, submitting, error, user, submitMessage, fetchMessages } = useGuestbook()

  return (
    <section id="guestbook" aria-labelledby="guestbook-heading" className="space-y-6 py-16">
      <div>
        <h2 id="guestbook-heading" className="text-3xl font-bold text-gray-900 dark:text-white">Guestbook</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Leave a message and connect with me.</p>
      </div>
      <Card>
        <GuestbookForm user={user} submitting={submitting} error={error} onSubmit={submitMessage} />
      </Card>
      {loading ? <Loading /> : error && messages.length === 0 ? (
        <Card><div role="alert" className="space-y-3 text-red-600 dark:text-red-400"><p>{error}</p><button type="button" onClick={() => void fetchMessages()} className="font-medium underline hover:no-underline">Try again</button></div></Card>
      ) : messages.length === 0 ? (
        <Card><p className="text-gray-600 dark:text-gray-300">No messages yet. Be the first to sign the guestbook.</p></Card>
      ) : (
        <div className="space-y-3">{messages.map((entry) => <Card key={entry.id}>
          <div className="flex items-start gap-3">
            {entry.avatar_url ? <img src={entry.avatar_url} alt="" className="h-10 w-10 rounded-full" /> : <div aria-hidden="true" className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />}
            <div className="flex-1"><p className="font-semibold text-gray-900 dark:text-white">@{entry.user_github_handle}</p><p className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-200">{entry.message}</p><time dateTime={entry.created_at} className="mt-2 block text-xs text-gray-500 dark:text-gray-400">{new Date(entry.created_at).toLocaleDateString()}</time></div>
          </div>
        </Card>)}</div>
      )}
    </section>
  )
}
