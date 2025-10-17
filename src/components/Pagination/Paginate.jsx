import { Pagination, Stack } from "@mui/material";
import React from "react";

export const Paginate = ({ totalPages, handleChangePage, pages }) => {
  return (
    <Stack spacing={2} sx={{ marginLeft: 2 }}>
      <Pagination
        count={totalPages}
        variant='outlined'
        shape='rounded'
        onChange={handleChangePage}
        color='secondary'
        page={pages}
        size='large'
        sx={{
          color: "#880e4f",
          "&:hover": { color: "#f06292" },
        }}
      />
    </Stack>
  );
};
