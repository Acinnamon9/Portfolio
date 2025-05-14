import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import ProjectsSection from './ProjectsSection'
import SkillsSection from './SkillsSection'
import HeroSection from './HeroSection'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}
export default function Home() {
  return (

    <div>
      <nav className="sticky top-0 bg-white shadow z-50">
        <ul className="flex justify-center gap-8 py-4">
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#projects" className="hover:text-blue-600">Projects</a></li>
          <li><a href="#skills" className="hover:text-blue-600">Skills</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>

      
        <HeroSection />
        



        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold">About Me</h2>
            <p className="mt-4 text-lg text-gray-700">
              I’m passionate about coding and currently diving deep into full-stack development with React, Node.js, and more!
            </p>
          </div>
        </section>

        <ProjectsSection />

        <SkillsSection />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold">Contact Me</h2>
            <p className="mt-4 text-lg text-gray-700">
              Feel free to reach out! You can email me at <a href="mailto:youremail@example.com" className="text-blue-500">abhisand30@gmail.com</a>
            </p>
          </div>
        </section>
      </div>
  );
}
