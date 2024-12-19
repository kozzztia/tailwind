import Card from "../ui-kit/Card/Card"

const ProfileCard: React.FC<ProfileCardProps> = ({name, className = ""})=> {
  return (
    <Card className={`${className}bg-gray-600`} name={name}>
        <h2>Profile</h2>
    </Card>
  )
}

export default ProfileCard

type ProfileCardProps = {
    name: string;
    className?: string
}