"use client";

import styled from "styled-components";

import { Bar } from "@repo/ui/bar";
import { usePathname } from "next/navigation";

const StyledDiv = styled.div`
  color: red;
`;

export const Baz = () => {
  const pathname = usePathname();
  console.log('pathname from internal :>> ', pathname);

  const match = pathname.match('/');
  console.log('match from internal :>> ', match);

  return (
    <StyledDiv>
      <Bar />
    </StyledDiv>
  );
};
