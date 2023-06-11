import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
`;
const Card = ({ children, className }) => {
  return <StyledDiv className={className}>{children}</StyledDiv>;
};

export default Card;
