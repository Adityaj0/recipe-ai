import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, Variants } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { keyframes } from '@emotion/react';
import PrimaryButton from '../components/PrimaryButton';

const colors = {
  primary: '#0D0C1D',
  secondary: '#161B33',
  accent: '#474973',
  background: '#F1DAC4',
};

const StyledPaper = styled(Paper)({
  padding: '2rem',
  marginBottom: '2rem',
  background: colors.primary,
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(13, 12, 29, 0.2)',
  border: `1px solid ${colors.accent}`,
});

const RecipeCard = styled(Card)({
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

const RecipeGlow = styled('div')({
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

const RecipeTitle = styled(Typography)({
  color: '#fff',
  fontWeight: 800,
  fontSize: '1.35rem',
  marginBottom: '1.2rem',
  letterSpacing: '-0.5px',
  textAlign: 'center',
  width: '100%',
});

const RecipeText = styled(Typography)({
  color: '#bdbdcf',
  fontWeight: 400,
  fontSize: '1.08rem',
  marginBottom: '1.2rem',
  lineHeight: 1.6,
});

const IngredientChip = styled(Chip)({
  margin: '0.5rem',
  borderRadius: '20px',
  background: colors.accent,
  color: colors.background,
  '& .MuiChip-deleteIcon': {
    color: colors.background,
  },
});

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
}

const recipeCardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const RecipePage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const getRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Making API request with ingredients:', ingredients);
      
      const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 0131bdeb1074432471a36093396f377fa046d9c49eaa9c355e96c5b29ac243a5`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: [
            {
              role: "system",
              content: "You are a helpful recipe assistant. Generate recipes based on the given ingredients. Return only a valid JSON array with no additional text. Each recipe must have exactly these fields: title (string), ingredients (array of strings), instructions (array of strings), and imageUrl (string)."
            },
            {
              role: "user",
              content: `Generate 3 recipes using these ingredients: ${ingredients.join(', ')}. 
              Return only a valid JSON array with no additional text. Each recipe must have title, ingredients, instructions, and imageUrl.`
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      // Clean the response content to ensure it's valid JSON
      const content = data.choices[0].message.content.trim();
      let generatedRecipes;
      
      try {
        // Try to parse the content directly
        generatedRecipes = JSON.parse(content);
      } catch (parseError) {
        // If direct parsing fails, try to extract JSON from the content
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          throw new Error('Could not find valid JSON in the response');
        }
        generatedRecipes = JSON.parse(jsonMatch[0]);
      }

      if (!Array.isArray(generatedRecipes)) {
        throw new Error('Invalid recipe format received');
      }

      // Validate each recipe has the required fields
      const validRecipes = generatedRecipes.filter(recipe => 
        recipe.title && 
        Array.isArray(recipe.ingredients) && 
        Array.isArray(recipe.instructions) && 
        recipe.imageUrl
      );

      if (validRecipes.length === 0) {
        throw new Error('No valid recipes found in the response');
      }

      setRecipes(validRecipes);
    } catch (err) {
      console.error('API Error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: colors.background,
      py: 4,
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <StyledPaper>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: colors.background,
                mb: 4,
                textAlign: 'center',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              What ingredients do you have?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Add an ingredient"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: colors.background }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    background: colors.secondary,
                    color: colors.background,
                    '& fieldset': {
                      borderColor: colors.accent,
                    },
                    '&:hover fieldset': {
                      borderColor: colors.background,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.background,
                  },
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  onClick={handleAddIngredient}
                  sx={{
                    minWidth: '120px',
                    borderRadius: '50px',
                    py: 1.5,
                    background: colors.accent,
                    color: colors.background,
                    '&:hover': {
                      background: colors.background,
                      color: colors.primary,
                    },
                  }}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </motion.div>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {ingredients.map((ingredient) => (
                <motion.div
                  key={ingredient}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IngredientChip
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient(ingredient)}
                  />
                </motion.div>
              ))}
            </Box>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-block' }}
            >
              <PrimaryButton
                onClick={getRecipes}
                loading={loading}
                disabled={ingredients.length === 0}
                sx={{
                  mt: 2,
                  minWidth: 120,
                  borderRadius: '50px',
                  py: 1.5,
                  background: colors.accent,
                  color: colors.background,
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    background: colors.background,
                    color: colors.primary,
                  },
                }}
                size="medium"
                startIcon={
                  <motion.span
                    whileHover={{ scale: 1.25 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                  </motion.span>
                }
              >
                Generate Recipes
              </PrimaryButton>
            </motion.div>
            {error && (
              <Typography sx={{ mt: 2, color: colors.background }}>
                {error}
              </Typography>
            )}
          </StyledPaper>
        </motion.div>

        {recipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Grid container spacing={4}>
              {recipes.map((recipe, index) => (
                <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                  <motion.div
                    style={{ width: '100%', display: 'flex' }}
                    variants={recipeCardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <RecipeCard>
                      <CardContent sx={{ p: 0, width: '100%' }}>
                        <RecipeTitle gutterBottom>{recipe.title}</RecipeTitle>
                        <RecipeText>
                          <strong style={{ color: '#F1DAC4', display: 'block', marginBottom: 6 }}>Ingredients:</strong>
                          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                            {recipe.ingredients.map((ing, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{ color: '#bdbdcf' }}
                              >
                                {ing}
                              </motion.li>
                            ))}
                          </ul>
                        </RecipeText>
                        <RecipeText>
                          <strong style={{ color: '#F1DAC4', display: 'block', marginBottom: 6 }}>Instructions:</strong>
                          <ol style={{ marginTop: '8px', paddingLeft: '20px' }}>
                            {recipe.instructions.map((step, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{ color: '#bdbdcf' }}
                              >
                                {step}
                              </motion.li>
                            ))}
                          </ol>
                        </RecipeText>
                        <RecipeGlow />
                      </CardContent>
                    </RecipeCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default RecipePage; 