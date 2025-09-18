import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import generator from "../utils/generator";
import { isValidUrl, isValidExpiry, isValidShortcode } from "../utils/validator";
import logger from "../utils/logger";

export default function URLForm({ urls, setUrls }) {
  const [inputs, setInputs] = useState([{ url: "", expiry: "", shortcode: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addField = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: "", expiry: "", shortcode: "" }]);
  };

  const handleSubmit = () => {
    const newUrls = [];
    for (let input of inputs) {
      if (!input.url) continue;
      if (!isValidUrl(input.url)) continue;
      let expiryMinutes = input.expiry ? parseInt(input.expiry) : 30;
      if (!isValidExpiry(expiryMinutes)) continue;
      let code = input.shortcode || generator(6);
      if (!isValidShortcode(code)) continue;
      if (urls.some(u => u.shortcode === code)) continue;
      newUrls.push({
        original: input.url,
        shortcode: code,
        created: Date.now(),
        expiry: Date.now() + expiryMinutes * 60000,
        clicks: []
      });
    }
    if (newUrls.length > 0) {
      const updated = [...urls, ...newUrls];
      setUrls(updated);
      logger("shorten", { count: newUrls.length });
    }
    setInputs([{ url: "", expiry: "", shortcode: "" }]);
  };

  return (
    <>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Long URL"
              value={input.url}
              onChange={e => handleChange(i, "url", e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Expiry (min)"
              value={input.expiry}
              onChange={e => handleChange(i, "expiry", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Custom Code"
              value={input.shortcode}
              onChange={e => handleChange(i, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addField} sx={{ mr: 2 }}>Add URL</Button>
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
    </>
  );
}
