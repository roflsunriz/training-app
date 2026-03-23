import { Outlet, Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'ホーム' },
  { to: '/progress', label: '進捗' },
  { to: '/settings', label: '設定' },
] as const

export function AppShell(): React.JSX.Element {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-800">
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
      <nav className="border-t border-stone-200 bg-white" role="navigation" aria-label="メインナビゲーション">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex flex-col items-center px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-emerald-600'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
