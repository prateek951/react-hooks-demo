import React, { useEffect } from "react";
import Summary from "./Summary";
import { useHttp } from "../hooks/http";

const Character = props => {
  // state = { loadedCharacter: {}, isLoading: false };
  const [isLoading, fetchedData] = useHttp(
    `https://swapi.co/api/people/${props.selectedChar}`,
    [props.selectedChar]
  );
  let loadedCharacter = null;
  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  useEffect(() => {
    return () => {
      console.log("component did unmount");
    };
  }, []);

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  //useEffect to replace componentDidMount
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // useEffect to replace componentDidUpdate
  //When selected character changes, re-fetch the new selected character
  //This is just like the componentDidUpdate lifecycle hook
  //This will run for one render as well as for subsequent renders as well

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

//Whenever the props change only then it will re-render the component
//ELIMINATES THE USE OF shouldComponentUpdate in functional components by using
//memoization
export default React.memo(Character);
