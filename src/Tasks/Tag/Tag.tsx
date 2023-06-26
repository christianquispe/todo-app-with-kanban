import "./styles.css";


interface TagProps {
    children: React.ReactNode
}

export default function Tag({children}: TagProps) {
    return <span className="Tag">{children}</span>
}

