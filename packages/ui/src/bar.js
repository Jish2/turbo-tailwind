"use client";

import { usePathname } from 'next/navigation';

import styled from "styled-components";

const StyledDiv = styled.div`
  color: red;
`;

export function Bar() {
  const pathname = usePathname();
  console.log('pathname from external :>> ', pathname);

  const match = pathname.match('/');
  console.log('match from external :>> ', match);

  return <StyledDiv>Bar</StyledDiv>;
}
