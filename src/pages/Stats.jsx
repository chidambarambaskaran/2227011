import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import StatsTable from "../components/StatsTable";

export default function Stats() {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("urls");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("urls");
    setUrls(saved ? JSON.parse(saved) : []);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      <StatsTable urls={urls} />
    </Container>
  );
}
