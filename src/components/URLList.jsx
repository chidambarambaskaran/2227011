import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

export default function URLList({ urls }) {
  const copy = text => navigator.clipboard.writeText(text);

  return (
    <List>
      {urls.map((u, i) => (
        <ListItem key={i} divider>
          <ListItemText
            primary={`${window.location.origin}/r/${u.shortcode}`}
            secondary={`Expires: ${new Date(u.expiry).toLocaleString()}`}
          />
          <Button onClick={() => copy(`${window.location.origin}/r/${u.shortcode}`)}>Copy</Button>
        </ListItem>
      ))}
    </List>
  );
}
