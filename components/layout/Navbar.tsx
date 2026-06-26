'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from '@/utils/classNames'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PiSparkleFill } from 'react-icons/pi'
import { FaRegUserCircle, FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'

const navItems = [
  { href: '/manhwa', label: 'MANHWA' },
  { href: '/aichixia', label: '✨ AI' },
]

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const localAvatar = localStorage.getItem('avatar')
        if (localAvatar) {
          setAvatarUrl(localAvatar)
          return
        }
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setAvatarUrl(null); return }
        const { data: profileData } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single()
        if (profileData?.avatar_url) { setAvatarUrl(profileData.avatar_url); return }
        setAvatarUrl(null)
      } catch {
        setAvatarUrl(null)
      }
    }
    loadAvatar()
    const { data: listener } = supabase.auth.onAuthStateChange(() => loadAvatar())
    return () => listener.subscription.unsubscribe()
  }, [])

  if (!mounted) return null

  return (
    <nav className={classNames(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
          <PiSparkleFill className="text-blue-400 text-2xl" />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Aichiow
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                'px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all',
                router.pathname.startsWith(item.href)
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link href="/profile" className="flex items-center">
            {avatarUrl ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400/50">
                <Image src={avatarUrl} alt="avatar" width={32} height={32} className="object-cover" />
              </div>
            ) : (
              <FaRegUserCircle className="text-gray-400 hover:text-white text-2xl transition-colors" />
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={classNames(
                'block px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                router.pathname.startsWith(item.href)
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
