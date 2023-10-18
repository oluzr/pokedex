import styled from "@emotion/styled";
import PokeNameChip from "../common/PokeNameChip";
import PokeMarkChip from "../common/PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SkeletonElement from "../skeleton/SkeletonElement";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchPokemonsDetail } from "../store/detailSlice";
interface PokeCardProps {
  name: string;
}
const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetail
  );
  const pokemon = pokemonDetails[props.name];
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    if (!isVisible) {
      return;
    }
    dispatch(fetchPokemonsDetail(props.name));
  }, [dispatch, props.name, isVisible]);
  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  if (!pokemon) {
    return (
      <>
        <Item ref={ref} color="#ccc">
          <SkeletonElement type="title" />
          <SkeletonElement type="avatar" />
          <SkeletonElement type="mark" />
        </Item>
      </>
    );
  }

  return (
    <Item ref={ref} color={pokemon.color} onClick={handleClick}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          id={pokemon.id}
          color={pokemon.color}
        />
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.name} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li<{ color: string }>`
  border: 1px solid #c0c0c0;
  width: 250px;
  height: 300px;
  box-shadow: 1px 2px 3px 0px #c0c0c0;
  display: flex;
  flex-direction: column;

  padding: 8px;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
    border-color: ${(props) => props.color};
  }
`;
const Header = styled.section`
  display: flex;
`;

const Body = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Image = styled.img`
  max-width: 90%;
  display: inline-block;
`;
const Footer = styled.section`
  display: flex;
`;
export default PokeCard;
