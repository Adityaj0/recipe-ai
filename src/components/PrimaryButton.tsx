import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyles = {
  small: {
    py: 0.6,
    px: 2,
    fontSize: '0.92rem',
  },
  medium: {
    py: 1.2,
    px: 3,
    fontSize: '1rem',
  },
  large: {
    py: 1.8,
    px: 4,
    fontSize: '1.15rem',
  },
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ loading, children, size = 'medium', ...props }) => (
  <Button
    {...props}
    sx={{
      ...sizeStyles[size],
      borderRadius: '999px',
      fontWeight: 500,
      letterSpacing: '0.01em',
      background: 'linear-gradient(90deg, #474973 0%, #F1DAC4 100%)',
      color: '#161B33',
      boxShadow: '0 2px 8px 0 rgba(71,73,115,0.10)',
      transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
      '&:hover': {
        background: 'linear-gradient(90deg, #F1DAC4 0%, #474973 100%)',
        color: '#0D0C1D',
        boxShadow: '0 4px 16px 0 rgba(71,73,115,0.18)',
        transform: 'scale(1.025)',
      },
      '&:disabled': {
        background: '#474973',
        color: '#bdbdcf',
        opacity: 0.7,
      },
      ...(props.sx || {}),
    }}
    fullWidth={props.fullWidth}
    disabled={props.disabled || loading}
  >
    {loading ? <CircularProgress size={24} sx={{ color: '#161B33' }} /> : children}
  </Button>
);

export default PrimaryButton; 