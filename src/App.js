import { Box, Typography, styled } from "@mui/material";

export const BoxContainer = styled(Box)({
  minWidth: 100,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Text = styled(Typography)({
  margin: 5,
  fontSize: 20,
  fontFamily: "serif",
  lineHeight: 1.1,
});

export const AlertBox = styled(Box)({
  margin: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
