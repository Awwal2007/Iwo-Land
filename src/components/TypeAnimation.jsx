import { TypeAnimation } from 'react-type-animation';

const TypingEffect = () => {
return (
    <TypeAnimation
    sequence={[
        '"The child who listens to prospers"', 
        2000, 
        '', 
        '"The child who listens to take good advice."', 
        2000, 
        '', 
    ]}
    speed={70}
    deletionSpeed={70}
    repeat={Infinity}
    style={{ fontSize: "1rem", fontWeight: "500", color: "white" }}
    />
);
};

export default TypingEffect;
