import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function StatsTable({ urls = [] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Short URL</TableCell>
          <TableCell>Original URL</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Expiry</TableCell>
          <TableCell>Clicks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {urls.length > 0 ? (
          urls.map((u, i) => {
            const clicks = u.clicks || []; // default to empty array
            return (
              <TableRow key={i}>
                <TableCell>{`${window.location.origin}/r/${u.shortcode}`}</TableCell>
                <TableCell>{u.original}</TableCell>
                <TableCell>{new Date(u.created).toLocaleString()}</TableCell>
                <TableCell>{new Date(u.expiry).toLocaleString()}</TableCell>
                <TableCell>
                  {clicks.length}
                  <ul>
                    {clicks.map((c, j) => (
                      <li key={j}>
                        {c.timestamp} | {c.referrer} | {c.location}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5}>No URLs available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
