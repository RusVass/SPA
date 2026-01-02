import type { JSX } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'

import styles from './SearchBar.module.scss'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder }: Props): JSX.Element => {
  return (
    <div className={styles.root}>
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? 'Search articles'}
        fullWidth
        variant="outlined"
        size="small"
        className={styles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

