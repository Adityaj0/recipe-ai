import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import PrimaryButton from '../components/PrimaryButton';

const colors = {
  primary: '#0D0C1D',
  secondary: '#161B33',
  accent: '#474973',
  background: '#F1DAC4',
};

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HeroSection = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(-45deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(13, 12, 29, 0.1)',
    backdropFilter: 'blur(5px)',
  },
});

const FeatureCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  minHeight: '340px',
  height: '100%',
  padding: '2.5rem 2rem 3.5rem 2rem',
  borderRadius: '20px',
  background: '#111118',
  boxShadow: '0 4px 32px 0 rgba(0,0,0,0.45)',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid transparent',
  backgroundClip: 'padding-box',
  transition: 'box-shadow 0.3s, border 0.3s, transform 0.3s',
  '&:hover': {
    boxShadow: '0 12px 48px 0 rgba(80,80,180,0.25)',
    transform: 'translateY(-8px) scale(1.035)',
    border: '2px solid #F1DAC4',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    inset: 0,
    borderRadius: '20px',
    padding: '2px',
    background: 'linear-gradient(120deg, #474973 0%, #F1DAC4 50%, #474973 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    pointerEvents: 'none',
    opacity: 0.7,
    transition: 'opacity 0.3s',
  },
  '&:hover::before': {
    opacity: 1,
    filter: 'blur(1.5px) brightness(1.2)',
  },
});

const FeatureTitle = styled(Typography)({
  color: '#fff',
  fontWeight: 800,
  fontSize: '1.6rem',
  marginBottom: '1.2rem',
  letterSpacing: '-0.5px',
});

const FeatureDesc = styled(Typography)({
  color: '#bdbdcf',
  fontWeight: 400,
  fontSize: '1.08rem',
  marginBottom: '2.2rem',
  lineHeight: 1.6,
});

const FeatureGlow = styled('div')({
  position: 'absolute',
  left: '50%',
  bottom: '0.8rem',
  transform: 'translateX(-50%)',
  width: '120px',
  height: '60px',
  borderRadius: '60px 60px 120px 120px',
  background: 'radial-gradient(ellipse at center, #f1dac4 0%, #474973 60%, transparent 100%)',
  opacity: 0.85,
  filter: 'blur(18px) brightness(1.2)',
  zIndex: 0,
  animation: 'glowPulse 2.5s ease-in-out infinite',
  '@keyframes glowPulse': {
    '0%, 100%': { opacity: 0.85, filter: 'blur(18px) brightness(1.2)' },
    '50%': { opacity: 1, filter: 'blur(24px) brightness(1.4)' },
  },
});

const FloatingElements = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: 0,
});

const FloatingElement = styled(motion.div)({
  position: 'absolute',
  background: 'rgba(241, 218, 196, 0.1)',
  borderRadius: '50%',
  backdropFilter: 'blur(5px)',
});

const Footer = styled(Box)({
  width: '100%',
  background: '#161B33',
  color: '#F1DAC4',
  padding: '2rem 0 1rem 0',
  marginTop: '4rem',
  borderTop: '1.5px solid #474973',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '1.05rem',
  letterSpacing: '0.02em',
});

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const floatingElements = Array.from({ length: 10 }).map((_, i) => ({
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <Box sx={{ background: colors.background }}>
      <HeroSection>
        <FloatingElements>
          {floatingElements.map((element, i) => (
            <FloatingElement
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                x: [element.x, element.x + 20, element.x],
                y: [element.y, element.y + 20, element.y],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              sx={{
                width: element.size,
                height: element.size,
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
            />
          ))}
        </FloatingElements>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    color: colors.background,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Discover Recipes with AI
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.background,
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  Get personalized recipe suggestions based on the ingredients you have at home.
                </Typography>
                <PrimaryButton
                  onClick={() => navigate('/recipes')}
                  sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
                >
                  Get Started
                </PrimaryButton>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 220, md: 340 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 180, md: 260 },
                      height: { xs: 180, md: 260 },
                      borderRadius: '24% 76% 65% 35% / 55% 45% 55% 45%',
                      background: 'linear-gradient(135deg, #474973 0%, #F1DAC4 60%, #161B33 100%)',
                      boxShadow: '0 8px 40px 0 rgba(13,12,29,0.18)',
                      filter: 'blur(0.5px)',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{
                      position: 'absolute',
                      left: '30%',
                      top: '30%',
                      width: '40%',
                      height: '40%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #fff7e6 0%, #474973 80%, transparent 100%)',
                      opacity: 0.7,
                    }} />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: colors.primary,
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Features
          </Typography>
        </motion.div>
        <Grid container spacing={4} sx={{ mt: 2, alignItems: 'stretch' }}>
          {[
            {
              title: 'Easy to Use',
              description: 'Enter your ingredients, and let the AI generate recipes for you.'
            },
            {
              title: 'Faster Cooking Times',
              description: 'Get recipes in seconds, no more waiting for youtube videos or google searches.'
            },
            {
              title: 'Upheld Privacy',
              description: 'Your data is never stored remotely. Recipe AI is privacy-first.'
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <motion.div
                style={{ width: '100%', display: 'flex' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureCard>
                  <FeatureTitle variant="h5">{feature.title}</FeatureTitle>
                  <FeatureDesc>{feature.description}</FeatureDesc>
                  <FeatureGlow />
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer>
        <Box sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.5 }}>
          Recipe AI
        </Box>
        <Box sx={{ opacity: 0.7, fontSize: '0.98rem' }}>
          &copy; {new Date().getFullYear()} Recipe AI. All rights reserved.
        </Box>
      </Footer>
    </Box>
  );
};

export default LandingPage; 