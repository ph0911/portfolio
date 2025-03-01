/* eslint-disable @typescript-eslint/no-unused-vars */
import Intro from '@/components/intro'
import React from 'react'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import SkillsSection from '@/components/skills-section'

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container max-w-3xl'>
        <Intro />
        <SkillsSection />
        <RecentPosts />
        <RecentProjects />
      </div>
    </section>
  )
}
