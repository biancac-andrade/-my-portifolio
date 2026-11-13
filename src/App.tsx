import { motion } from 'motion/react'
import { AmbientMusic } from '@/components/layout/AmbientMusic'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { GlobalGrid } from '@/components/layout/GlobalGrid'
import { ScrollAtmosphere } from '@/components/layout/ScrollAtmosphere'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { SectionSocialDock } from '@/components/layout/SectionSocialDock'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { profile } from '@/data/profile'
import './App.css'

function App() {
  return (
    <motion.div className="site" initial={false}>
      <GlobalGrid />
      <ScrollAtmosphere />
      <ScrollProgress />
      <FloatingNav />
      <AmbientMusic />

      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <footer className="footer">
        <SectionSocialDock className="section-social-dock--footer" />
        <p>
          © {profile.copyrightYear} {profile.name}
        </p>
      </footer>
    </motion.div>
  )
}

export default App
