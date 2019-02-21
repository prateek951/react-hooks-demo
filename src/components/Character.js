import React, { useState, useEffect } from "react";

import Summary from "./Summary";

const Character = props => {
  // state = { loadedCharacter: {}, isLoading: false };

  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setLoading] = useState(false);

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
  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + props.selectedChar
    );
    // this.setState({ isLoading: true });
    setLoading(true);
    fetch("https://swapi.co/api/people/" + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setLoading(false);
        setLoadedCharacter(loadedCharacter);
        // this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  //useEffect to replace componentDidMount
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // useEffect to replace componentDidUpdate
  //When selected character changes, re-fetch the new selected character
  //This is just like the componentDidUpdate lifecycle hook
  //This will run for one render as well as for subsequent renders as well

  useEffect(() => {
    //Fetch the character if the selectedCharacter changes
    fetchData();
    return () => {
      //this code will fire write before the useEffect runs next time
      //THIS CODE IS RESPONSIBLE FOR DOING THE CLEANUP TASK as componentWillUnmount used to do
      console.log("Cleaning up....");
    };
  }, [props.selectedChar]);
  // componentDidMount() {
  //   this.fetchData();
  // }

  //useEffect will also do the cleanup
  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
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
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default Character;
