"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { TextReveal, ImageReveal } from './page-transition'
import { Award, Briefcase, MapPin, Calendar } from 'lucide-react'

const stats = [
  { label: 'سنوات خبرة', value: '10+', icon: Calendar },
  { label: 'المشاريع المكتملة', value: '150+', icon: Briefcase },
]

const skills = [
  'هويات بصرية', 'تحرير فيديو', 'موشن جرافيك',
  'الطباعة', 'تصحيح الألوان', 'المؤثرات البصرية', 'إنشاء صفحات ويب'
]

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="min-h-screen flex items-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <ImageReveal delay={0.2}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                {/* Designer image inserted from public/images/0.jpg */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/0.jpg"
                    alt="اوس اركان"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Decorative elements removed per user request */}
              </div>
            </ImageReveal>
            
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass-card px-6 py-4 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-sm text-muted-foreground">متاح لـ</p>
              <p className="text-lg font-semibold text-primary">عمل حر</p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <motion.p
                className="text-primary text-sm tracking-[0.3em] uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                عنِّي
              </motion.p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                نبذة
              </h2>
              <motion.div
                className="text-muted-foreground text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-2xl font-semibold">المصمم اوس اركان</p>
                <div className="text-sm mt-4 space-y-4">
                  <p>
                    أنا مصمم جرافيك ومعدل فيديوهات شغوف بعملي، أواكب باستمرار كل ما هو جديد في عالم التصميم والتقنيات الرقمية، واضعًا نصب عيني هدفًا واحدًا: <strong>الارتقاء بعلامات الشركات التجارية</strong> عبر ابتكار طرق عرض تناسب طبيعة أعمالها.
                  </p>
                  <p>
                    بفضل خبرة طويلة وإتقان للأعمال الرقمية، أعمل على تقديم حلول بصرية متكاملة تجمع بين الإبداع والدقة. كما أنني أمتلك خبرة في <strong>تصميم صفحات الويب</strong>، وهو مجال توسعت فيه بعد دراستي الأكاديمية، مما أتاح لي الجمع بين الهوية البصرية والتواجد الرقمي للشركات بشكل متكامل.
                  </p>
                  <p>
                    أسعى دائمًا إلى تقديم أعمال احترافية تعكس هوية العلامة التجارية وتمنحها حضورًا مميزًا في السوق، مع الالتزام بأعلى معايير الجودة والابتكار.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-4 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mb-4">المهارات</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 rounded-full text-sm border border-primary/30 text-primary hover:bg-primary/10 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
