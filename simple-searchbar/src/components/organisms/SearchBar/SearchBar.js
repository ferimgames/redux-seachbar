import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shoppingListActions } from "../../../store/shopping-list-slice";
import { uiActions } from "../../../store/ui-slice";
import { fetchItemsData } from "../../../store/shopping-list-actions";
import useOutsideClick from "../../../hooks/useOutSideClick";
import { devices } from "../../../util/width-devices";
import ShoppingItem from "../../molecules/ShoppingItem/ShoppingItem";
import Input from "../../atoms/Input/Input";
import Card from "../../atoms/Card/Card";

const Wrap = styled.div`
  position: relative;
`;

const StyledListOfResults = styled.ul`
  position: absolute;
  top: 40px;
  right: 0px;
  background-color: white;
  padding-inline-start: 0px;
  box-shadow: 0px 12px 28px rgba(48, 55, 61, 0.2);
  max-height: 350px;
  overflow-y: auto;
  width: 45em;

  &::-webkit-scrollbar {
    width: 6px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fcfcfc;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #7a7a7a;
    border-radius: 4px;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #7a7a7a;
  }

  @media ${devices.md} {
    width: 100%;
  }
`;
const StyledSearchInput = styled(Input)`
  display: flex;
  align-items: center;
  width: 300px;
  height: 2rem;
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 5px;
  & input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
  }
  @media ${devices.md} {
    width: 100%;
  }
`;
const StyledNoResultsMessage = styled(Card)`
  padding: 20px;
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const { items, searchQuery } = useSelector((state) => state.shoppingList);
  const isLoading = useSelector((state) => state.ui.isLoadingItems);
  const [firstSearchMade, setFirstSearchMade] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstSearchMade) {
        dispatch(fetchItemsData(searchQuery));
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, searchQuery, firstSearchMade]);

  const searchBarOnChangeHandler = (value) => {
    setFirstSearchMade(true);
    setIsFocused(true);
    dispatch(uiActions.setLoadingState(true));
    dispatch(shoppingListActions.resetItems());
    dispatch(shoppingListActions.setQuery(value));
  };

  const ref = useOutsideClick(() => {
    setIsFocused(false);
  });

  const searchBarOnFocusHandler = () => {
    setIsFocused(true);
  };

  const onClickListHandler = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  let itemListHTML = [];
  if (isLoading && firstSearchMade && searchQuery !== "") {
    for (let i = 0; i < 10; i++) {
      itemListHTML.push(<ShoppingItem key={i} isLoading={isLoading} />);
    }
  } else if (items.length === 0 && !isLoading && searchQuery !== "") {
    itemListHTML.push(
      <StyledNoResultsMessage key="1"> NO RESULTS FOUND</StyledNoResultsMessage>
    );
  } else if (searchQuery !== "") {
    itemListHTML.push(
      items.map((item) => (
        <ShoppingItem
          isLoading={isLoading}
          key={item.key}
          coverKey={item.cover_key}
          title={item.title}
          edition={item.edition_count}
          autor={item.author_name}
          yearPublication={item.first_publish_year}
        />
      ))
    );
  }
  return (
    <Wrap ref={ref}>
      <StyledSearchInput
        id="search"
        placeholder="Make your search Here"
        onChange={searchBarOnChangeHandler}
        onFocus={searchBarOnFocusHandler}
      />
      {searchQuery !== "" && isFocused && (
        <StyledListOfResults onClick={onClickListHandler}>{itemListHTML}</StyledListOfResults>
      )}
    </Wrap>
  );
};

export default SearchBar;
