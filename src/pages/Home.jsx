import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import URLForm from "../components/URLForm";
import URLList from "../components/URLList";

export default function Home() {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("urls");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shorten Your URL</Typography>
      <URLForm urls={urls} setUrls={setUrls} />
      <URLList urls={urls} />
    </Container>
  );
}
