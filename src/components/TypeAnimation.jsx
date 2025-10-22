import { TypeAnimation } from 'react-type-animation';

const TypingEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        '"The child who listens to prospers"', 
        2000, // wait 2 seconds
        '', // clear
        '"The child who listens to take good advice."', 
        2000, // wait 2 seconds
        '', // clear
      ]}
      speed={70} // typing speed
      deletionSpeed={70}
      repeat={Infinity} // or remove for once
      style={{ fontSize: "1rem", fontWeight: "500", color: "white" }}
    />
  );
};

export default TypingEffect;
