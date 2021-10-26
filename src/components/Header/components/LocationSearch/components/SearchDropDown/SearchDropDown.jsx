// @flow
import SearchBar from '../SearchBar/SearchBar';
import SearchedLocations from '../SearchedLocations/SearchedLocations';
import classes from './SearchDropDown.module.scss';
import React, { useState, useEffect } from 'react';
import type { SearchDropDownPropsType } from './SearchDropDownPropsType';
import { useLocationSearch } from '../../../../../../hooks/searchHooks';

function SearchDropDown({ isOpenDropDown, ...props }: SearchDropDownPropsType): React$Node {
  const [searchString, setSearchString] = useState('');
  const locations = useLocationSearch(searchString);

  const handleSetSearchString = async string => setSearchString(string);

  return (
    <div className={classes.searchBarContainer}>
      <SearchBar onChangeSearchString={handleSetSearchString} />
      <SearchedLocations locations={locations} />
    </div>
  );
}

export default SearchDropDown;
