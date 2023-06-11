import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import Card from "../../atoms/Card/Card";
import { boldedText } from "../../../util/formatters"
// Create a styled container for the shopping item based on Card atom
const StyledItemContainer = styled.li`
  list-style: none;
  overflow: hidden;
  & a {
    text-decoration: none;
    color: initial;
  }
`;
const StyledCard = styled(Card)`
  padding: 10px;
  border-bottom: 1px solid #ededed;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #ededed;
  }
  & p {
    margin-block-start: 0px;
    margin-block-end: 0.7em;
  }
  & p span {
    font-size: 14px;
    line-height: 1.25;
    display: inline;
  }
  & span {
    font-size: 11px;
    display: block;
    text-overflow: ellipsis;
  }
`;

const ItemDescriptionContainer = styled.div`
  display: block;
  text-align: left;
`;

// Create a styled image component
const ItemImage = styled.img`
  width: 3.5em;
  height: 5.25em;
  border-radius: 4px;
  margin-right: 16px;
  position: absolute;
  object-fit: cover;
  border: 1px solid #ededed;
`;

// Create a keyframe animation for the loading skeleton
const skeletonAnimation = keyframes`
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #eee;
  }
`;

// Create a styled skeleton placeholder for the image
const SkeletonImage = styled(ItemImage)`
  min-width: 50px;
  background-color: #eee;
  position: initial;
  animation: ${skeletonAnimation} 1.5s infinite;
`;

// Create a styled skeleton placeholder for the description
const SkeletonDescription = styled.div`
  width: 200px;
  height: 16px;
  background-color: #eee;
  animation: ${skeletonAnimation} 1.5s infinite;
  margin-bottom: 5px;
`;

// Create a functional component that uses the styled components
const ShoppingItem = ({
  title,
  autor,
  yearPublication,
  edition,
  coverKey,
  isLoading,
}) => {
  const { searchQuery } = useSelector((state) => state.shoppingList);
  if (isLoading) {
    return (
      <StyledItemContainer>
        <StyledCard>
          <SkeletonImage />
          <ItemDescriptionContainer>
            <SkeletonDescription />
            <SkeletonDescription />
          </ItemDescriptionContainer>
        </StyledCard>
      </StyledItemContainer>
    );
  }
  const imgSrc = coverKey
    ? "https://covers.openlibrary.org/b/olid/" + coverKey + "-M.jpg"
    : "https://static.vecteezy.com/system/resources/previews/002/563/631/original/teach-school-and-education-open-book-knowledge-line-style-icon-free-vector.jpg";

  const boldedTitle = boldedText(title, searchQuery);
  return (
    <StyledItemContainer>
      <a
        href={`https://www.amazon.es/s?k=${title}+${autor}+${yearPublication}`}
        rel="noreferrer"
        target="_blank"
      >
        <StyledCard>
          <SkeletonImage />
          <ItemImage src={imgSrc} alt="Shopping Item" />
          <ItemDescriptionContainer>
            <p>{boldedTitle}</p>
            <span>
              {autor} ({yearPublication}) - Ed. {edition}
            </span>
          </ItemDescriptionContainer>
        </StyledCard>
      </a>
    </StyledItemContainer>
  );
};
export default ShoppingItem;
