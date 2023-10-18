import styled from "@emotion/styled";
interface PokeNameChipProps {
  name: string;
  id: number;
  color:string
}
const PokeNameChip = (props: PokeNameChipProps) => {
  const renderNumber = (id: number) : string => {
    return String(id).padStart(3, "0");
  };
  return (
    <Chip>
      <Number color={props.color}>{renderNumber(props.id)}</Number>
      <ChipText>{props.name}</ChipText>
    </Chip>
  );
};
const Chip = styled.div`
  border: 1px solid #c0c0c0;

  font-weight: 500;
  border-radius: 15px;
  display: flex;
  gap: 0 6px;
  align-items: center;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;
const Number = styled.div<{color:string}>`
  background: ${props=> props.color};
  border: 1px solid #c0c0c0;
  padding: 3px 6px;
  position: relative;
  transform: scale(1.1);
  font-size: 13px;
  border-radius: 16px;
`;
const ChipText = styled.label`
  padding-right: 8px;
  font-size: 14px;
  font-weight: 700;
`;
export default PokeNameChip;
