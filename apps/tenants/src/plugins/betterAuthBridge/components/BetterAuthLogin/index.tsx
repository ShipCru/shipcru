'use client'

import React, { useState } from 'react'
import { useTranslation } from '@payloadcms/ui'

import './index.css'

export default function BetterAuthLogin() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/bridge/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Authentication failed')
        setLoading(false)
        return
      }

      window.location.href = '/admin'
    } catch {
      setError('Unable to connect to authentication service')
      setLoading(false)
    }
  }

  return (
    <div className="bridge-login">
      <form onSubmit={handleSubmit}>
        <div className="bridge-login__inputWrap">
          <div className="field-type email" style={{ flex: '1 1 auto' }}>
            <label className="field-label" htmlFor="bridge-email">
              {t('general:email')}
            </label>
            <div className="field-type__wrap">
              <input
                id="bridge-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field-type password" style={{ flex: '1 1 auto' }}>
            <label className="field-label" htmlFor="bridge-password">
              {t('general:password')}
            </label>
            <div className="field-type__wrap">
              <div>
                <input
                  id="bridge-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  aria-label="Password"
                  data-rtl="false"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bridge-login__error" role="alert">
            {error}
          </div>
        )}

        <div className="form-submit">
          <button
            type="submit"
            className="btn btn--icon-style-without-border btn--size-large btn--withoutPopup btn--style-primary"
            disabled={loading || !email || !password}
          >
            <span className="btn__content">
              <span className="btn__label">
                {loading ? t('general:loading') + '...' : 'Sign in'}
              </span>
            </span>
          </button>
        </div>
      </form>

      <div className="bridge-login__divider">
        <span>or use CMS credentials below</span>
      </div>
    </div>
  )
}
