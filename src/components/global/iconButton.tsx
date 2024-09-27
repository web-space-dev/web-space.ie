import styled from "@emotion/styled";
import { colors } from "../../styles/variables";
import ArrowUpRight from "../../icons/arrowUpRight";

const StyledIconButton = styled.button`
  margin: 0;
  width: 3.5rem;
  height: 3rem;
  padding: 0;
  border: 2px solid ${colors.blackLight};
  transition: 0.3s ease;
  border-radius: 1rem;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};

    path {
      fill: ${colors.white};
    }
  }

  &:hover .styled-up-right-icon {
    transform: rotate(45deg);
  }
`;

const StyledArrowUpRight = styled(ArrowUpRight)`
  transition: 0.3s ease;
`;

export const StyledArrowDownRight = styled(ArrowUpRight)`
  transform: rotate(90deg);
  &:hover {
    transform: rotate(135deg);
  }
  transition: 0.3s ease;
`;
interface IconButtonProps {
  direction?: string;
}

export function IconButton({ direction = "upRight" }: IconButtonProps) {
  return (
    <StyledIconButton>
      {direction === "upRight" ? (
        <StyledArrowUpRight className="styled-up-right-icon" />
      ) : (
        <StyledArrowDownRight className="styled-down-right-icon" />
      )}
    </StyledIconButton>
  );
}
