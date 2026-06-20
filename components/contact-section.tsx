"use client"

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MapPin, ArrowUpRight, Instagram, Phone } from 'lucide-react'

// Social links removed (GitHub/Twitter/LinkedIn). Instagram shown under phone.

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section ref={ref} className="relative py-32 px-4" id="contact">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{
            background: 'radial-gradient(circle, oklch(0.75 0.18 195) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Section header */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase">تواصل</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-glow-cyan">
          {"لنعمل معًا"}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          هل لديك مشروع في ذهنك؟ يسعدني سماع التفاصيل والعمل معك.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">تواصل معي</h3>
              <p className="text-muted-foreground leading-relaxed">
                أهتم دائمًا بمعرفة المشاريع الجديدة والأفكار الإبداعية أو فرص التعاون.
              </p>
            </div>

            <div className="space-y-4">
                <motion.a
                  href="mailto:aws44144@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl glass-card group"
                  whileHover={{ x: 10, boxShadow: '0 0 30px oklch(0.75 0.18 195 / 0.2)' }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">البريد الإلكتروني</span>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      aws44144@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground mr-auto group-hover:text-primary transition-colors" />
                </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl glass-card"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent/20">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">الموقع</span>
                  <p className="text-foreground">العراق _بغداد</p>
                </div>
              </motion.div>

              <motion.a
                href="tel:+9647715684737"
                className="flex items-center gap-4 p-4 rounded-xl glass-card group"
                whileHover={{ x: 10, boxShadow: '0 0 30px oklch(0.75 0.18 195 / 0.2)' }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">الهاتف</span>
                  <p className="text-foreground group-hover:text-primary transition-colors">07715684737</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground mr-auto group-hover:text-primary transition-colors" />
              </motion.a>

              {/* Instagram - formatted like phone card */}
              <motion.a
                href="https://instagram.com/20_AW_"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl glass-card group"
                whileHover={{ x: 10, boxShadow: '0 0 30px oklch(0.75 0.18 195 / 0.2)' }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">انستقرام</span>
                  <p className="text-foreground group-hover:text-primary transition-colors">@20_AW_</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground mr-auto group-hover:text-primary transition-colors" />
              </motion.a>
            </div>

            {/* Removed generic social links (GitHub/Twitter/LinkedIn).
                Instagram is shown directly under the phone number above. */}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="اسمك"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground block mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground block mb-2">الرسالة</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none h-32"
                  placeholder="أخبرني عن مشروعك..."
                  required
                />
              </div>

              {/* Glowing submit button */}
              <motion.button
                type="submit"
                className="relative w-full py-4 rounded-lg overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient */}
                <motion.span
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.75 0.18 195) 0%, oklch(0.65 0.25 330) 100%)'
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0.9
                  }}
                />
                
                {/* Animated glow */}
                <motion.span
                  className="absolute inset-0"
                  animate={{
                    boxShadow: isHovered 
                      ? '0 0 40px oklch(0.75 0.18 195 / 0.6), 0 0 80px oklch(0.65 0.25 330 / 0.4), inset 0 0 40px oklch(0.75 0.18 195 / 0.2)'
                      : '0 0 20px oklch(0.75 0.18 195 / 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.2) 50%, transparent 100%)',
                  }}
                  animate={isHovered ? {
                    x: ['-100%', '200%']
                  } : {}}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />

                {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-2 text-primary-foreground font-semibold tracking-wider uppercase text-sm">
                  <span>إرسال الرسالة</span>
                  <motion.span
                    animate={isHovered ? { x: 5, y: -5 } : { x: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.span>
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
