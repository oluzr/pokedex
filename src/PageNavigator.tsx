import { Route, Routes } from "react-router-dom";
import PokeCardList from "./list/PokeCardList";
import Pokemon from "./detail/Pokemon";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<PokeCardList />} />
      <Route path="pokemon/:name" element={<Pokemon />} />
    </Routes>
  );
};

export default PageNavigator;
