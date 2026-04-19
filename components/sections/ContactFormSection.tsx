'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Mail, User, MessageSquare } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { Glow } from '@/components/ui/Glow'
import { useLang } from '@/lib/LanguageContext'

export default function ContactFormSection() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('message', form.message)

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-padding relative overflow-hidden border-t border-white/[0.06]">
      <Glow color="pink"   size={600} className="top-1/2 left-1/2" />
      <Glow color="orange" size={400} className="top-1/4 right-1/4" />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container relative z-10 max-w-2xl mx-auto">

        {/* ── Headline ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.contactForm.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl text-white mt-4 mb-5 leading-tight"
          >
            {t.contactForm.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed">
            {t.contactForm.sub}
          </motion.p>
        </motion.div>

        {/* ── Success state ── */}
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-[20px] p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(224,64,160,0.07), rgba(155,89,245,0.07))',
              border: '1px solid rgba(224,64,160,0.2)',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(224,64,160,0.2) 0%, rgba(255,255,255,0.04) 100%)',
                border: '1px solid rgba(224,64,160,0.3)',
              }}
            >
              <CheckCircle2 size={28} style={{ color: '#E040A0' }} />
            </div>
            <p className="font-display font-bold text-white text-xl">{t.contactForm.successMsg}</p>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[20px] p-8 flex flex-col gap-5"
            style={{
              background: 'linear-gradient(135deg, rgba(224,64,160,0.05), rgba(155,89,245,0.05), rgba(74,158,255,0.03))',
              border: '1px solid rgba(224,64,160,0.18)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(224,64,160,0.6), transparent)' }}
            />

            {/* Corner glow */}
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(224,64,160,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }}
            />

            {/* Name field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 group-focus-within:text-[#E040A0] text-white/30">
                <User size={15} />
              </div>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={t.contactForm.namePlaceholder}
                className="form-field"
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {/* Email field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 group-focus-within:text-[#E040A0] text-white/30">
                <Mail size={15} />
              </div>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder={t.contactForm.emailPlaceholder}
                className="form-field"
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {/* Message field */}
            <div className="relative group">
              <div className="absolute left-4 top-4 pointer-events-none transition-colors duration-200 group-focus-within:text-[#E040A0] text-white/30">
                <MessageSquare size={15} />
              </div>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder={t.contactForm.messagePlaceholder}
                className="form-field resize-none"
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{t.contactForm.errorMsg}</p>
            )}

            <ButtonPrimary type="submit" disabled={status === 'sending'} className="w-full justify-center mt-1">
              {status === 'sending' ? (
                t.contactForm.sending
              ) : (
                <>
                  <Send size={15} />
                  {t.contactForm.submit}
                </>
              )}
            </ButtonPrimary>
          </motion.form>
        )}
      </div>
    </section>
  )
}
