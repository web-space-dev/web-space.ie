import styled from "@emotion/styled";
import React from "react";

const StyledWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
`;

export default function useDebugPanel(values: { [key: string]: any }) {
  return (
    <StyledWrapper>
      {Object.entries(values).map(([name, value]) => (
        <React.Fragment key={name}>
          {name}: {value.toString()}
          <br />
        </React.Fragment>
      ))}
    </StyledWrapper>
  );
}
