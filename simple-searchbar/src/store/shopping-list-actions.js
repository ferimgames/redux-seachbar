import { uiActions } from "./ui-slice";
import { shoppingListActions } from "./shopping-list-slice";

const ITEM_LIMIT = 10;

export const fetchItemsData = (query) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=" +
          query +
          "&limit=" +
          ITEM_LIMIT
      );
      if (!response.ok) {
        throw new Error("Could not fetch items data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const itemsData = await fetchData();
      const parseItemData = itemsData.docs.map((doc) => ({
        key: doc.key,
        cover_key: doc.cover_edition_key,
        title: doc.title,
        author_name: doc.author_name[0],
        edition_count: doc.edition_count,
        first_publish_year: doc.first_publish_year,
      }));
      dispatch(
        shoppingListActions.replaceItems({
          items: parseItemData || [],
        })
      );
      dispatch(uiActions.setLoadingState(false));
    } catch (error) {
      dispatch(uiActions.setLoadingState(false));
    }
  };
};
