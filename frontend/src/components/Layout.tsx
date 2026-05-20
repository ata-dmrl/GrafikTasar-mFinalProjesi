import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/client'
import { Home, Map, Trophy, Swords, MessageSquare, LogOut, Bell, User } from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [showNotifs, setShowNotifs] = useState(false)

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: usersApi.getNotifications,
    refetchInterval: 30000,
  })

  const readAllMutation = useMutation({
    mutationFn: usersApi.markAllNotificationsRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] })
  })

  const unread = notifications.filter((n: any) => !n.read).length

  const handleBellClick = () => {
    const next = !showNotifs
    setShowNotifs(next)
    if (next && unread > 0) readAllMutation.mutate()
  }

  const handleLogout = () => { logout(); navigate('/login') }

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Ana Sayfa' },
    { to: '/learn', icon: Map, label: 'Öğren' },
    { to: '/leaderboard', icon: Trophy, label: 'Sıralama' },
    { to: '/challenges', icon: Swords, label: 'Challenge' },
    { to: '/messages', icon: MessageSquare, label: 'Mesajlar' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 flex-shrink-0 flex flex-col" style={{ background: '#091525', borderRight: '1px solid #162942' }}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid #162942' }}>
          <div className="flex-shrink-0">
            <img src="/logo.png" alt="ReacType" className="w-9 h-9 object-contain" />
          </div>
          <div className="hidden lg:block">
            <div className="font-bold text-white text-base leading-tight">ReacType</div>
            <div className="text-xs" style={{ color: '#00B8FF' }}>Öğren · Kodla · Kazan</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-white nav-active-glow'
                    : 'text-slate-400 hover:text-white'
                }`
              }
              style={({ isActive }) => isActive
                ? { background: 'linear-gradient(135deg, #1756FF22, #00B8FF11)', border: '1px solid #1756FF44' }
                : { border: '1px solid transparent' }
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className="flex-shrink-0" style={isActive ? { color: '#00B8FF' } : {}} />
                  <span className="hidden lg:block text-sm font-medium">{label}</span>
                  {isActive && (
                    <span className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#00B8FF' }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3" style={{ borderTop: '1px solid #162942' }}>
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0F2040')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            onClick={() => navigate(`/profile/${user?.id}`)}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1756FF, #00B8FF)' }}
            >
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="hidden lg:block min-w-0">
              <div className="text-white text-sm font-semibold truncate">{user?.username}</div>
              <div className="text-xs font-medium" style={{ color: '#00B8FF' }}>{user?.totalPoints} puan</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 transition-colors"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1A0810')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className="hidden lg:block text-sm">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="h-14 flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: '#091525', borderBottom: '1px solid #162942' }}
        >
          {/* Page breadcrumb hint */}
          <div className="text-slate-400 text-sm hidden md:block">
            <span style={{ color: '#00B8FF' }}>●</span>{' '}
            <span className="text-slate-300">ReacType</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleBellClick}
                className="relative p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                style={{ border: '1px solid #162942' }}
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center font-bold"
                    style={{ background: '#1756FF', fontSize: '10px' }}
                  >
                    {unread}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div
                  className="absolute right-0 top-11 w-80 rounded-xl shadow-2xl z-50"
                  style={{ background: '#091525', border: '1px solid #162942' }}
                >
                  <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid #162942' }}>
                    <h3 className="text-white font-semibold text-sm">Bildirimler</h3>
                    {unread > 0 && (
                      <button
                        onClick={() => readAllMutation.mutate()}
                        disabled={readAllMutation.isPending}
                        className="text-xs transition-colors disabled:opacity-50"
                        style={{ color: '#00B8FF' }}
                      >
                        Tümünü okundu işaretle
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-slate-400 text-sm p-4 text-center">Bildirim yok</p>
                    ) : (
                      notifications.slice(0, 10).map((n: any) => (
                        <div key={n.id} className="p-3" style={{ borderBottom: '1px solid #162942' }}>
                          <div className={`text-sm font-medium ${n.read ? 'text-slate-300' : 'text-white'}`}>{n.title}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{n.body}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <button
              onClick={() => navigate(`/profile/${user?.id}`)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg"
              style={{ border: '1px solid #162942' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #1756FF, #00B8FF)' }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm hidden md:block text-slate-300">{user?.username}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {showNotifs && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
      )}
    </div>
  )
}
