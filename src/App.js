import React, { useState } from "react";

import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = props => {
  //always returns two elements
  const [side, setSide] = useState("light");
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [destroyed,setDestroyed ] = useState(false);
  // state = {
  //   selectedCharacter: 1,
  //   side: 'light',
  //   destroyed: false
  // };
  // Step 2 : Turn all the functions that we had earlier
  // into constants
  const sideHandler = side => {
    // this.setState({ side: side });
    setSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    // this.setState({ selectedCharacter: charId });
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    // this.setState({ destroyed: true });
    setDestroyed(true);
  };

  let content = (
    <React.Fragment>
      <CharPicker
        side={side}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, "light")}>Light Side</button>
      <button onClick={sideHandler.bind(this, "dark")}>Dark Side</button>
      {side === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
