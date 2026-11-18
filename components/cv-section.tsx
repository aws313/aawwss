"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Phone, Mail, Instagram, Globe } from 'lucide-react'

const experience = [
  {
    title: 'مصمم جرافيك ومونتير فيديو',
    company: 'شركة الدبوس للتجارة العامة – بغداد',
    period: '2026 – حتى الآن',
    points: [
      'تصميم وإخراج الملف التعريفي الرسمي للشركة (Company Profile) والمواد الترويجية المطبوعة (Roll-ups، ستاندات العرض).',
      'إنتاج وتعديل الفيديوهات الإعلانية والترويجية لمنتجات الشركة وخطوط التوزيع، مما ساهم في رفع التفاعل البصري للعلامة التجارية.',
      'توحيد الهوية البصرية للمنتجات التجارية وضمان جودتها عبر المنصات الرقمية والمطبوعة.',
    ],
  },
  {
    title: 'مصمم جرافيك ومونتير فيديو',
    company: 'شركة سيلا للتسويق والدعاية والإعلان – بغداد',
    period: '2024 – 2025',
    points: [
      'إدارة وتنفيذ الهويات البصرية المتكاملة لأكثر من 10 علامات تجارية في قطاعات متنوعة (العقارات، الطاقة الشمسية، التقنية، والمنتجات الطبية).',
      'تصميم الحملات الإعلانية المتكاملة لمنصات التواصل الاجتماعي، بالإضافة إلى المطبوعات التجارية.',
      'إنتاج مقاطع الفيديو الإعلانية والموشن جرافيك وتصحيح الألوان بما يتوافق مع استراتيجية كل عميل.',
    ],
  },
  {
    title: 'مصمم جرافيك ومطبوعات',
    company: 'مطابع شارع المتنبي – بغداد',
    period: '2023',
    points: [
      'تصميم وتجهيز المجلات، الكتيبات (Brochures)، والملصقات الإعلانية للطباعة وفق المعايير الفنية الدقيقة للألوان والمقاسات.',
      'التواصل المباشر مع العملاء لفهم متطلباتهم وتحويلها إلى تصاميم احترافية جاهزة للتنفيذ الطباعي الفوري.',
    ],
  },
  {
    title: 'مصمم جرافيك ومونتير (عمل حر)',
    company: 'ستوديو خاص – بغداد',
    period: '2019 – 2022',
    points: [
      'تنفيذ أكثر من 150 مشروعاً متنوعاً شملت تصميم الشعارات، الهويات البصرية، ومحتوى السوشيال ميديا للشركات الناشئة.',
      'تقديم حلول بصرية متكاملة وتصميم واجهات صفحات الويب لتعزيز التواجد الرقمي لأصحاب المشاريع.',
    ],
  },
  {
    title: 'مونتير فيديو',
    company: 'مختبر الأخوين للإنتاج المرئي – ساحة التحرير، بغداد',
    period: '2015 – 2018',
    points: [
      'تحرير ومونتاج الفيديوهات الخاصة بالمناسبات والفعاليات بجودة عالية.',
      'معالجة الصوتيات وتصحيح الألوان وإخراج النسخ النهائية وفق جدول زمني دقيق.',
    ],
  },
]

const skills = [
  'تصميم الشعارات',
  'بناء الهويات البصرية (Branding)',
  'تصميم محتوى السوشيال ميديا',
  'تجهيز ملفات الطباعة والبروفايلات',
  'البروشورات والبنرات الإعلانية',
  'المونتاج الاحترافي',
  'الموشن جرافيك',
  'المؤثرات البصرية (VFX)',
  'تصحيح الألوان (Color Grading)',
  'تصميم واجهات وصفحات الويب',
]

const software = ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects', 'Adobe InDesign']

const education = [
  'بكالوريوس في تكنولوجيا المعلومات (IT)',
  'دبلوم تقني في الطرق والجسور',
]

const contact = [
  { icon: MapPin, label: 'بغداد، العراق', href: undefined },
  { icon: Phone, label: '07715684737', href: 'tel:+9647715684737' },
  { icon: Mail, label: 'aws44144@gmail.com', href: 'mailto:aws44144@gmail.com' },
  { icon: Instagram, label: '@aws_desi', href: 'https://instagram.com/aws_desi' },
  { icon: Globe, label: 'معرض الأعمال', href: 'https://aawwss-static.onrender.com/' },
]

export function CvSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section ref={containerRef} id="cv" className="min-h-screen py-20 px-4">
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">السيرة الذاتية</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-cyan">أوس أركان هاشم</h2>
        <p className="mt-4 text-muted-foreground text-lg">مصمم جرافيك أول ومونتير فيديو</p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Contact and summary */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-start"
        >
          <div className="grid gap-3">
            {contact.map((c) => {
              const Icon = c.icon
              const inner = (
                <>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/40 bg-primary/10 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-foreground" dir="ltr">{c.label}</span>
                </>
              )
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl border border-border/60 hover:border-primary/60 transition-colors">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="flex items-center gap-4 p-3 rounded-xl border border-border/60">{inner}</div>
              )
            })}
          </div>

          <div className="rounded-2xl border border-border/60 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">الملخص المهني</h3>
            <p className="text-muted-foreground leading-loose">
              مصمم جرافيك ومونتير فيديو محترف بخبرة عملية تتجاوز 6 سنوات في تطوير الهويات البصرية، تصميم الحملات الإعلانية لمنصات التواصل الاجتماعي، وإنتاج الفيديوهات الترويجية والموشن جرافيك. أتمتع بقدرة عالية على تحويل الأفكار التسويقية إلى حلول بصرية متكاملة تعزز حضور العلامات التجارية وتدعم أهدافها البيعية، مع التزام تام بمعايير الجودة والدقة وسرعة التنفيذ.
            </p>
          </div>
        </motion.div>

        {/* Experience timeline */}
        <div>
          <h3 className="flex items-center gap-3 text-2xl font-semibold text-foreground mb-8">
            <Briefcase className="w-6 h-6 text-primary" /> الخبرات العملية
          </h3>
          <div className="relative ps-8 border-s border-primary/30 space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                className="relative"
              >
                <span className="absolute -start-[37px] top-1.5 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_oklch(0.66_0.2_258/0.8)]" />
                <p className="text-sm text-primary mb-1" dir="ltr">{job.period}</p>
                <h4 className="text-lg font-semibold text-foreground">{job.title}</h4>
                <p className="text-muted-foreground mb-3">{job.company}</p>
                <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc ps-5 marker:text-primary">
                  {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills and software */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="rounded-2xl border border-border/60 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-5">المهارات الفنية</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-sm border border-primary/30 bg-primary/10 text-foreground">{s}</span>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">المهارات الشخصية: إدارة المشاريع المتعددة تحت الضغط، الالتزام بالمواعيد النهائية، والعمل بروح الفريق.</p>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-border/60 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-5">البرامج</h3>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {software.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-sm border border-border text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 md:p-8">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-5">
                <GraduationCap className="w-5 h-5 text-primary" /> المؤهلات العلمية
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                {education.map((e) => <li key={e}>• {e}</li>)}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
