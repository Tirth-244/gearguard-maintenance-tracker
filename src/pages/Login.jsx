import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Sparkles, Code, Coffee } from 'lucide-react'

function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // 🎮 EASTER EGG STATE
    const [devMode, setDevMode] = useState(false)
    const [keySequence, setKeySequence] = useState([])
    const [showMessage, setShowMessage] = useState(false)

    const navigate = useNavigate()

    // 🎮 EASTER EGG: Type "debug" anywhere on the page
    useEffect(() => {
        const handleKeyPress = (e) => {
            const newSequence = [...keySequence, e.key].slice(-5)
            setKeySequence(newSequence)

            if (newSequence.join('').toLowerCase() === 'debug') {
                setDevMode(!devMode)
                setShowMessage(true)
                setTimeout(() => setShowMessage(false), 3000)
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [keySequence, devMode])

    const validateForm = () => {
        if (!email) {
            setError('Email is required')
            return false
        }
        if (!password) {
            setError('Password is required')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!validateForm()) return

        setLoading(true)

        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess('Login successful!')
                setTimeout(() => {
                    onLogin(data.token)
                    navigate('/dashboard')
                }, 1000)
            } else {
                setError(data.message || 'Login failed')
            }
        } catch (err) {
            setError('Connection error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // 🎮 Funny placeholder texts for dev mode
    const funnyPlaceholders = {
        email: ['your.email@company.dev', 'definitely.not.admin@test.com', 'css.wizard@frontend.io'],
        password: ['hunter2', 'correcthorsebatterystaple', 'password123... just kidding']
    }

    return (
        <div className={`auth-container ${devMode ? 'dev-mode' : ''}`}>
            {/* 🎮 Easter egg notification */}
            {showMessage && (
                <div className="easter-egg-message">
                    <Sparkles size={20} />
                    {devMode ? '🎮 Developer Mode Activated!' : '👋 Developer Mode Deactivated'}
                </div>
            )}

            <div className="auth-card">
                {/* 🎮 Dev Mode Badge */}
                {devMode && (
                    <div className="dev-badge">
                        <Code size={14} />
                        DEV MODE
                    </div>
                )}

                <div className="auth-header">
                    <div className={`auth-icon ${devMode ? 'spinning' : ''}`}>
                        {devMode ? <Coffee size={32} /> : <Lock size={32} />}
                    </div>
                    <h1>{devMode ? 'Welcome Back, Dev!' : 'Welcome Back'}</h1>
                    <p>{devMode ? '☕ Coffee-powered authentication' : 'Sign in to your account'}</p>
                </div>

                {/* 🎮 Dev mode hint */}
                {devMode && (
                    <div className="dev-hint">
                        💡 <strong>Psst!</strong> Type "debug" again to toggle back
                    </div>
                )}

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={devMode ? funnyPlaceholders.email[Math.floor(Math.random() * 3)] : 'your.email@company.com'}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={devMode ? funnyPlaceholders.password[Math.floor(Math.random() * 3)] : '••••••••'}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-footer">
                        <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-loading">
                                <span className="spinner"></span>
                                Signing in...
                            </span>
                        ) : (
                            devMode ? '🚀 Deploy to Production (just kidding)' : 'Sign In'
                        )}
                    </button>

                    <div className="divider">or continue with</div>

                    <div className="social-buttons">
                        <button className="btn-social">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" />
                                <path d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45c-.86.58-1.97.92-3.46.92-2.65 0-4.89-1.78-5.69-4.17H1.07v2.52C2.72 17.75 6.09 20 10 20z" />
                                <path d="M4.31 11.88c-.22-.58-.35-1.21-.35-1.88 0-.67.13-1.3.35-1.88V5.6H1.07C.39 6.95 0 8.42 0 10s.39 3.05 1.07 4.4l3.24-2.52z" />
                                <path d="M10 3.83c1.51 0 2.87.52 3.94 1.54l2.94-2.94C15.46.99 12.97 0 10 0 6.09 0 2.72 2.25 1.07 5.6l3.24 2.52C5.11 5.61 7.35 3.83 10 3.83z" />
                            </svg>
                            Google
                        </button>
                        <button className="btn-social">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    <div className="auth-switch">
                        {devMode ? (
                            <span>🎮 <strong>Pro tip:</strong> Type "debug" to find this mode!</span>
                        ) : (
                            <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
                        )}
                    </div>
                </div>

                {/* 🎮 Dev mode debug panel */}
                {devMode && (
                    <div className="debug-panel">
                        <div><strong>🐛 Debug Info:</strong></div>
                        <div>• Easter egg found: ✅</div>
                        <div>• Developer level: 9000+</div>
                        <div>• Coffee consumed: Infinity ☕</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login