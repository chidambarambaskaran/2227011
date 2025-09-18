import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import logger from "../utils/logger";

export default function Redirect() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("urls");
    if (!saved) {
      setError("Invalid or expired link");
      return;
    }
    const urls = JSON.parse(saved);
    const entry = urls.find(u => u.shortcode === code);
    if (!entry) {
      setError("Link not found");
      return;
    }
    const now = Date.now();
    if (now > entry.expiry) {
      setError("Link expired");
      return;
    }
    const click = {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      location: "Unknown"
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        click.location = `${pos.coords.latitude},${pos.coords.longitude}`;
        entry.clicks.push(click);
        localStorage.setItem("urls", JSON.stringify(urls));
        logger("redirect", { code, url: entry.original });
        window.location.href = entry.original;
      }, () => {
        entry.clicks.push(click);
        localStorage.setItem("urls", JSON.stringify(urls));
        logger("redirect", { code, url: entry.original });
        window.location.href = entry.original;
      });
    } else {
      entry.clicks.push(click);
      localStorage.setItem("urls", JSON.stringify(urls));
      logger("redirect", { code, url: entry.original });
      window.location.href = entry.original;
    }
  }, [code, navigate]);

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">Redirecting...</Typography>
    </Container>
  );
}
