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
const ListWrap = styled.div`
  position: absolute;
  width: 45em;
  top: 55px;
  right: 0px;
  background-color: white;
  box-shadow: 0px 12px 28px rgba(48, 55, 61, 0.2);
  &::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    right: 10%;
    top: -20px;
    margin-left: -10px;
    border: 10px solid;
    border-color: transparent transparent white transparent;
  }
  @media ${devices.md} {
    width: 100%;
  }
`;
const StyledShadowBox = styled.div`
  position: absolute;
  bottom: 0px;
  width: calc(100% - 6px);
  height: 20px;
  box-shadow: inset 0px -15px 10px 0px rgba(233, 233, 233);
  z-index: 1;
`;
const StyledListOfResults = styled.ul`
  position: relative;
  overflow-y: auto;
  max-height: 350px;
  padding-inline-start: 0px;
  padding-bottom: ${(props) => (props.isEmpty ? "0px" : "20px")};
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fcfcfc;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
  }
  &::-webkit-scrollbar-thumb {
    background: #7a7a7a;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #7a7a7a;
  }
  & li:last-child div {
    border-bottom: initial;
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
  //firstSearchMade prevents request sending and render listing to be done before the user interacts
  //with the searchbar.
  const [firstSearchMade, setFirstSearchMade] = useState(false);
  //isFocused determines if the listing is render or not, skeleton or otherwise 
  const [isFocused, setIsFocused] = useState(false);
  
  const dispatch = useDispatch();
  const { items, searchQuery } = useSelector((state) => state.shoppingList);
  const isLoading = useSelector((state) => state.ui.isLoadingItems);

  //Send data to the server after 200 ms of the user stop typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstSearchMade && searchQuery !== "") {
        dispatch(fetchItemsData(searchQuery));
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [dispatch, searchQuery, firstSearchMade]);

  //Setting the states for a new search on the local component and on redux
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
  //Dummy listing for the loading skeleton while data is been retrive 
  if (isLoading && firstSearchMade && searchQuery !== "") {
    itemListHTML = Array.from({ length: 10 }).map((_, i) => (
      <ShoppingItem key={i} isLoading={isLoading} />
    ));
    //No data found after is done loading 
  } else if (items.length === 0 && !isLoading && searchQuery !== "") {
    itemListHTML.push(
      <StyledNoResultsMessage key="1"> NO RESULTS FOUND</StyledNoResultsMessage>
    );
    //If data is found 
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
          userQuery={searchQuery}
        />
      ))
    );
  }
  return (
    <Wrap ref={ref}>
      <StyledSearchInput
        id="search"
        placeholder="Make your search Here"
        value={searchQuery}
        onChange={searchBarOnChangeHandler}
        onFocus={searchBarOnFocusHandler}
      />
      {searchQuery !== "" && isFocused && (
        <ListWrap>
          <StyledListOfResults
            onClick={onClickListHandler}
            isEmpty={items.length === 0}
          >
            {itemListHTML}
          </StyledListOfResults>
          {items.length !== 0 && <StyledShadowBox />}
        </ListWrap>
      )}
    </Wrap>
  );
};

export default SearchBar;
