import styles from "./SkillsSection.module.css";
import LiSkill from "./LiSkill";

export default function SkillsSection() {
  const skills = [
    { skillName: "JavaScript (ES6+)", imgSrc: "/images/Logos/JavaScript.png" },
    { skillName: "React", imgSrc: "/images/Logos/React.png" },
    { skillName: "Node.js", imgSrc: "/images/Logos/NodeJS.png" },
    { skillName: "MongoDB", imgSrc: "/images/Logos/Mongo DB.png" },
    { skillName: "CSS (CSS Grid, Flexbox)", imgSrc: "/images/Logos/CSS.png" },
    { skillName: "Tailwind", imgSrc: "/images/Logos/Tailwind.png" },
    { skillName: "Git & GitHub", imgSrc: "images/Logos/Github.png" },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-100 overflow-hidden">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-10">My Skills</h2>
        <SkillsTrack skills={skills} />
      </div>
    </section>
  );
}

function SkillsTrack({ skills }) {
  return (
    <div className={styles.skillsTrackContainer}>
      {[...Array(2)].map((_, i) => (
        <ul
          key={i}
          className={`${styles.skillsTrack} ${i === 1 ? styles.duplicate : ""}`}
        >
          {skills.map((skill, index) => (
            <LiSkill key={`${i}-${index}`} skillName={skill.skillName} imgSrc={skill.imgSrc} />
          ))}
        </ul>
      ))}
    </div>
  );
}