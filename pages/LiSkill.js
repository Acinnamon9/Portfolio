export default function LiSkill({ skillName, imgSrc }) {
    return (
        <li>
            <img src={imgSrc} alt={skillName} className="mt-2 w-auto" />
            <span>{skillName}</span>
        </li>
    );
}