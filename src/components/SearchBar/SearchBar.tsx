import type React from 'react'
import type { ReactElement } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props): ReactElement {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value)
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="caption"
        sx={{
          mb: 0.5,
          display: 'block',
          fontSize: 16,
          fontWeight: 700,
          color: '#6b6b6b',
        }}
      >
        Filter by keywords
      </Typography>

      <TextField
        fullWidth
        variant="standard"
        placeholder="The most successful IT companies in 2020"
        value={value}
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#9e9e9e' }} />
            </InputAdornment>
          ),
          sx: {
            backgroundColor: '#ffffff',
            borderRadius: 1,
            fontSize: 28,
            color: '#9e9e9e',
            px: 2,
            py: 1.5,
          },
        }}
      />
    </Box>
  )
}

