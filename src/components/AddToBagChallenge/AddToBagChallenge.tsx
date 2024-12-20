import CardContainer from "../ui-kit/Container/CardContainer";


    const AddToBagChallenge: React.FC<Props> = ({ name, className = "" }) => {
        return (
          <CardContainer className={`${className} bg-[#c42d2d]`} name={name}>
            <Challenge />
          </CardContainer>
        );
      };
      

export default AddToBagChallenge

type Props = {
    name: string;
    className?: string;
};

const Challenge = () => {
    return (
      <div>
        <h1>Challenge</h1>
      </div>
    );
  };