import styled from "styled-components";
import SearchBar from "../components/organisms/SearchBar/SearchBar";
import { devices } from "../Util/width-devices";
const StyledHeader = styled.header`
  width: 100%;
  height: 5rem;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #252424;

  & h1 {
    color: white;
  }
  & ul {
    list-style: none;
    margin: 10px 0px;
    padding: 0;
  }
  @media ${devices.md} {
    text-align: center;
    display: inline-block;
    height: fit-content;
  }
`;
const MainHeader = (props) => {
  return (
    <StyledHeader>
      <h1>Redux SearchBar</h1>
      <nav>
        <ul>
          <li>
            <SearchBar />
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default MainHeader;
