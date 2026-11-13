import { profile } from '@/data/profile'
import { EducationShowcase } from '@/components/education/EducationShowcase'
import { SectionSocialDock } from '@/components/layout/SectionSocialDock'
import { Reveal } from '@/components/ui/Reveal'
import { SectionWash } from '@/components/ui/SectionWash'

export function EducationSection() {
  return (
    <section className="section section--education" id="formacao">
      <SectionWash variant="education" />

      <Reveal className="education-header">
        <span className="section-label section-label--education">
          02 / Formação
        </span>
        <h2 className="education-headline">Formação acadêmica</h2>
        <p className="education-intro">{profile.educationIntro}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <EducationShowcase items={profile.educationCarousel} />
      </Reveal>

      <SectionSocialDock />
    </section>
  )
}
