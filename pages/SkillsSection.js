export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">My Skills</h2>
        <ul className="mt-4 text-lg text-gray-700 flex space-x-4 justify-center">
          <li>
            <span>JavaScript (ES6+)</span>
            <img src="/images/Logos/JavaScript.png" alt="JavaScript" className="mt-2 h-6 w-auto" />
          </li>
          <li>
            <span>React</span>
            <img src="/images/Logos/React.png" alt="React" className="mt-2 h-6 w-auto" />
          </li>
          <li>
            <span>Node.js</span>
            <img src="/images/Logos/NodeJS.png" alt="Node.js" className="mt-2 h-6 w-auto" />
          </li>
          <li>
            <span>MongoDB</span>
            <img src="/images/Logos/Mongo DB.png" alt="MongoDB" className="mt-2 h-6 w-auto" />
          </li>
          <li>
            <span>CSS (CSS Grid, Flexbox)</span>
            <img src="/images/Logos/CSS.png" alt="CSS" className="mt-2 h-6 w-auto" />
          </li>
          <li>
            <span>Tailwind</span>
            <img src="/images/Logos/Tailwind.png" alt="Tailwind" className="mt-2 h-6 w-auto" />
          </li>
          <li>
            <span>Git & GitHub</span>
            <img src="images/Logos/Github.png" alt="GitHub" className="mt-2 h-6 w-auto" />
          </li>
        </ul>
      </div>
    </section>
  );
}