import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messagesApi, leaderboardApi } from '../api/client'
import { useAuthStore } from '../store/authStore'
import type { Message } from '../types'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MessageSquare, Send, User, Search } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

export default function MessagesPage() {
  usePageTitle('Mesajlar')
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<{ id: number; username: string } | null>(null)
  const [newMsg, setNewMsg] = useState('')
  const [search, setSearch] = useState('')

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: messagesApi.getAll,
    refetchInterval: 10000,
  })

  const { data: allUsers = [] } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: leaderboardApi.getAll,
  })

  const sendMutation = useMutation({
    mutationFn: () => messagesApi.send(selectedUser!.id, newMsg),
    onSuccess: () => {
      setNewMsg('')
      qc.invalidateQueries({ queryKey: ['messages'] })
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Hata oluştu')
  })

  // Get unique conversations
  const conversations = Array.from(new Set(
    messages.map((m: Message) => m.senderId === user?.id ? m.receiverId : m.senderId)
  )).map(uid => {
    const msgs = messages.filter((m: Message) =>
      (m.senderId === uid && m.receiverId === user?.id) ||
      (m.senderId === user?.id && m.receiverId === uid)
    )
    const lastMsg = msgs[0]
    const otherUser = lastMsg.senderId === user?.id ? lastMsg.receiver : lastMsg.sender
    return { userId: uid, user: otherUser, lastMsg, msgs }
  })

  const currentConvo = selectedUser
    ? messages.filter((m: Message) =>
        (m.senderId === selectedUser.id && m.receiverId === user?.id) ||
        (m.senderId === user?.id && m.receiverId === selectedUser.id)
      ).reverse()
    : []

  const filteredUsers = allUsers.filter((u: any) =>
    u.id !== user?.id && u.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-56px)] flex">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
            <MessageSquare size={20} /> Mesajlar
          </h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-9 pr-3 py-2 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Kullanıcı ara..."
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Existing conversations */}
          {!search && conversations.length > 0 && (
            <div>
              <div className="px-4 py-2 text-slate-500 text-xs font-semibold uppercase">Konuşmalar</div>
              {conversations.map(({ userId, user: u, lastMsg }) => (
                <button
                  key={userId}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left ${
                    selectedUser?.id === userId ? 'bg-slate-700/70 border-r-2 border-indigo-500' : ''
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {u.username[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium">{u.username}</div>
                    <div className="text-slate-400 text-xs truncate">{lastMsg.content}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* User search results */}
          {search && (
            <div>
              <div className="px-4 py-2 text-slate-500 text-xs font-semibold uppercase">Kullanıcılar</div>
              {filteredUsers.map((u: any) => (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUser(u); setSearch('') }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {u.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{u.username}</div>
                    <div className="text-slate-400 text-xs">{u.totalPoints} puan</div>
                  </div>
                </button>
              ))}
              {filteredUsers.length === 0 && (
                <p className="px-4 py-3 text-slate-400 text-sm">Kullanıcı bulunamadı</p>
              )}
            </div>
          )}

          {!search && conversations.length === 0 && (
            <div className="p-4 text-center text-slate-500 text-sm">
              <User size={32} className="mx-auto mb-2 text-slate-600" />
              Henüz mesaj yok. Yukarıdan kullanıcı ara!
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="h-14 border-b border-slate-700 flex items-center px-6 gap-3">
              <div
                onClick={() => navigate(`/profile/${selectedUser.id}`)}
                className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-80"
              >
                {selectedUser.username[0].toUpperCase()}
              </div>
              <div
                onClick={() => navigate(`/profile/${selectedUser.id}`)}
                className="text-white font-semibold cursor-pointer hover:text-indigo-400 transition-colors"
              >
                {selectedUser.username}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {currentConvo.length === 0 ? (
                <div className="text-center text-slate-500 py-12 text-sm">
                  {selectedUser.username} ile konuşma başlat!
                </div>
              ) : (
                currentConvo.map((m: Message) => {
                  const isMe = m.senderId === user?.id
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-br-sm'
                          : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                      }`}>
                        {m.content}
                        <div className={`text-xs mt-1 ${isMe ? 'text-indigo-300' : 'text-slate-500'}`}>
                          {new Date(m.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-3">
                <input
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && newMsg.trim()) sendMutation.mutate() }}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mesaj yaz... (Enter ile gönder)"
                />
                <button
                  onClick={() => { if (newMsg.trim()) sendMutation.mutate() }}
                  disabled={!newMsg.trim() || sendMutation.isPending}
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg font-medium">Mesajlaşmaya Başla</p>
              <p className="text-slate-500 text-sm mt-1">
                Sol panelden bir kullanıcı seç veya ara
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
