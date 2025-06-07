/* eslint-disable @typescript-eslint/no-unused-vars */
import Intro from '@/components/sections/intro'
import React from 'react'
import RecentPosts from '@/components/sections/recent-posts'
import RecentProjects from '@/components/sections/recent-projects'
import SkillsSection from '@/components/sections/skills-section'

export default function Home() {
  return (
    <section className='pt-24 pb-16'>
      <div className='container max-w-3xl'>
        <Intro />
        <SkillsSection />
        <RecentPosts />
        <RecentProjects />
      </div>
    </section>
  )
}
