import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-32">
        <h1 className="text-5xl font-bold text-blue-600">Hi, I'm Abhijeet</h1>
        <p className="text-xl mt-4">I'm a web developer. Welcome to my portfolio!</p>
        <a href="https://github.com/Acinnamon9" className="mt-6 text-lg text-blue-500 hover:underline">
          Check out my GitHub
        </a>
      </section>



      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">About Me</h2>
          <p className="mt-4 text-lg text-gray-700">
            I’m passionate about coding and currently diving deep into full-stack development with React, Node.js, and more!
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-200 text-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">My Projects</h2>
          <p className="mt-4 text-lg text-gray-700">
            Check out my upcoming projects! I'll be adding them soon.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">My Skills</h2>
          <ul className="mt-4 text-lg text-gray-700">
            <li>JavaScript (ES6+)</li>
            <li>React</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>CSS (Tailwind, CSS Grid, Flexbox)</li>
            <li>Git & GitHub</li>
          </ul>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-20 bg-gray-200">
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
