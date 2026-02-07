import { useMemo, useState } from 'react'
import styles from './SignupPage.module.css'

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', userType: '', terms: false })
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  const strength = useMemo(() => {
    const value = form.password
    if (value.length >= 12 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) return 'strong'
    if (value.length >= 8 && (/[A-Z]/.test(value) || /[0-9]/.test(value))) return 'medium'
    return 'weak'
  }, [form.password])

  function updateField(key, value) { setForm(prev => ({ ...prev, [key]: value })) }

  function onSubmit(e) {
    e.preventDefault()
    if (!form.terms) { alert('Please agree to the Terms of Service and Privacy Policy'); return }
    if (form.password !== form.confirmPassword) { alert("Passwords don't match"); return }
    if (form.password.length < 8) { alert('Password must be at least 8 characters'); return }
    alert('Account created successfully! Redirecting...')
    console.log('Form submission:', form)
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          <h1 className={styles.signupTitle}>Create Your Account</h1>
          <p className={styles.signupSubtitle}>Join thousands of students finding their perfect home</p>
          <form id="signupForm" onSubmit={onSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} placeholder="John" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} placeholder="Doe" required />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="john@example.com" required />
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                  <input id="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => updateField('password', e.target.value)} placeholder="••••••••" required minLength={8} />
                  <button type="button" className={styles.togglePassword} onClick={() => setShowPw(v => !v)}><i className={showPw ? 'far fa-eye-slash' : 'far fa-eye'}></i></button>
                </div>
                <div className={styles.passwordStrength} data-strength={strength}></div>
                <div className={styles.strengthText} style={{ color: strength === 'strong' ? 'var(--strong)' : strength === 'medium' ? 'var(--medium)' : 'var(--weak)' }}>
                  {strength === 'strong' ? 'Strong password' : strength === 'medium' ? 'Medium password' : 'Weak password'}
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.passwordWrapper}>
                  <input id="confirmPassword" type={showPw2 ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} placeholder="••••••••" required />
                  <button type="button" className={styles.togglePassword} onClick={() => setShowPw2(v => !v)}><i className={showPw2 ? 'far fa-eye-slash' : 'far fa-eye'}></i></button>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="userType">I am a...</label>
                <select id="userType" value={form.userType} onChange={(e) => updateField('userType', e.target.value)} required>
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student looking for housing</option>
                  <option value="landlord">Property owner/manager</option>
                </select>
              </div>
            </div>
            <label className={styles.termsGroup}>
              <input type="checkbox" checked={form.terms} onChange={(e) => updateField('terms', e.target.checked)} />
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>
            <button type="submit" className={styles.signupBtn}>Create Account</button>
            <div className={styles.loginLink}>Already have an account? <a href="/login">Log in</a></div>
          </form>
        </div>
      </div>
    </div>
  )
}

