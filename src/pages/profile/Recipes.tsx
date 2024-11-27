import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecipeStats from '../../components/profile/sections/RecipeStats';
import RecipeList from '../../components/profile/sections/RecipeList';
import RecipeHeader from '../../components/profile/sections/RecipeHeader';
import RecipeEmptyState from '../../components/profile/sections/RecipeEmptyState';
import { useRecipes } from '../../contexts/RecipeContext';
import toast from 'react-hot-toast';

export default function Recipes() {
  const navigate = useNavigate();
  const { userRecipes, deleteRecipe, toggleRecipeVisibility } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalRecipes: userRecipes.length,
    totalOrders: 156,
    totalEarnings: 15000,
    averageRating: 4.8,
    monthlyGrowth: 12
  };

  const handleCreateRecipe = () => {
    navigate('/create-recipe');
  };

  const handleEditRecipe = (id: number) => {
    navigate(`/create-recipe?edit=${id}`);
  };

  const handleDeleteRecipe = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      try {
        await deleteRecipe(id);
        toast.success('Recette supprimée avec succès');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleToggleVisibility = async (id: number, isPublic: boolean) => {
    try {
      await toggleRecipeVisibility(id);
      toast.success(isPublic ? 'Recette rendue privée' : 'Recette soumise pour validation');
    } catch (error) {
      toast.error('Erreur lors du changement de visibilité');
    }
  };

  const handleViewRecipe = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  const filteredRecipes = userRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <RecipeHeader
        onCreateRecipe={handleCreateRecipe}
        onSearch={setSearchQuery}
        onFilter={() => {}}
      />

      {userRecipes.length > 0 ? (
        <>
          <RecipeStats stats={stats} />
          <RecipeList
            recipes={filteredRecipes}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            onToggleVisibility={handleToggleVisibility}
            onView={handleViewRecipe}
          />
        </>
      ) : (
        <RecipeEmptyState onCreateRecipe={handleCreateRecipe} />
      )}
    </div>
  );
}