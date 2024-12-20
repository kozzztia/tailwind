import CardContainer from "../ui-kit/Container/CardContainer";
import { buttons, links } from "./const";

const ProfileCard: React.FC<ProfileCardProps> = ({ name, className = "" }) => {
  return (
    <CardContainer className={`${className} bg-[#ffdd99]`} name={name}>
      <Card />
    </CardContainer>
  );
};

export default ProfileCard;

type ProfileCardProps = {
  name: string;
  className?: string;
};

const Card = () => {
  return (
    <div className="w-[390px] h-[580px] flex flex-col bg-white rounded-[50px] overflow-hidden drop-shadow">
      <div className="bg-[red] w-full h-[220px] flex justify-center items-start">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="name"
          className="w-[120px] h-[120px] rounded-full mt-4 object-cover drop-shadow"
        />
      </div>
      <article className="w-full flex flex-col justify-start items-center pt-5 px-9 pb-10 flex-grow">
        <h4 className="w-full text-[29px] font-normal text-gray-600 text-center tracking-wider leading-2">
          Johnny Rogers
        </h4>
        <a
          href="https://t.me/your_channel_name"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-[11px] font-normal text-gray-600 text-center hover:underline leading-1"
        >
          @telegram
        </a>
        <ul className="w-full flex justify-center items-center gap-6 mt-7">
          {links.map((item) => (
            <li
              key={item.id}
              className="w-[25px] h-[25px] flex justify-center items-center rounded-full bg-[red]"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                {/* {item.icon} */}
                icon
              </a>
            </li>
          ))}
        </ul>
        <p className="w-full text-[13px] font-normal text-gray-600 text-center leading-1 mt-8 tracking-wider">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
          reiciendis iste blanditiis voluptate cumque consectetur vitae
          quibusdam.
        </p>
        <nav className="w-full flex justify-between items-center gap-4 mt-auto">
          {
            buttons.map((item) => (
              <button 
              key={item.id}
              onClick={item.action}
              className="w-full text-[#b3b3cc] text-[14px] font-semibold py-[9px] px-4 rounded-full 
              bg-inherit border border-[#b3b3cc] transition-colors duration-300
              hover:bg-[#d147a3] hover:text-white focus:bg-[#d147a3] focus:text-white
              ">
              {item.name}
            </button>
            ))
          }

        </nav>
      </article>
    </div>
  );
};
