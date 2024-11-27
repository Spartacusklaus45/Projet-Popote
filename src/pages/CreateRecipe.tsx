import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  Camera, 
  Plus, 
  Minus, 
  Clock, 
  Users, 
  Globe,
  Lock,
  AlertTriangle,
  Save,
  Eye,
  Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface Step {
  id: string;
  description: string;
  duration: number;
  image?: string;
  tips?: string[];
}

export default function CreateRecipe() {
  const { user } = useAuth();
  const [isPublic, setIsPublic] = useState(false);
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    duration: '',
    difficulty: 'easy',
    servings: 4,
    ingredients: [] as Ingredient[],
    steps: [] as Step[],
    tags: [] as string[]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: 'g',
      price: 0
    };
    setRecipeData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };

  const addStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      description: '',
      duration: 0
    };
    setRecipeData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const validateRecipe = () => {
    const errors: string[] = [];
    
    if (!recipeData.title) errors.push("Le titre est requis");
    if (!recipeData.image) errors.push("Une image est requise");
    if (!recipeData.description) errors.push("La description est requise");
    if (!recipeData.category) errors.push("La catégorie est requise");
    if (!recipeData.duration) errors.push("Le temps de préparation est requis");
    if (recipeData.ingredients.length === 0) errors.push("Au moins un ingrédient est requis");
    if (recipeData.steps.length === 0) errors.push("Au moins une étape est requise");

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRecipe()) {
      toast.error("Veuillez corriger les erreurs avant de continuer");
      return;
    }

    try {
      // Logique de soumission
      toast.success(isPublic ? 'Recette soumise pour validation' : 'Recette enregistrée');
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer une recette</h1>
            <p className="text-gray-600">Partagez votre savoir-faire culinaire</p>
          </div>
          <ChefHat className="h-12 w-12 text-orange-500" />
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between">
            {['Informations', 'Ingrédients', 'Préparation', 'Finalisation'].map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < currentStep ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2">{step}</span>
                {index < 3 && (
                  <div className={`w-full h-1 mx-4 ${
                    index < currentStep - 1 ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Étape 1: Informations générales */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Image de la recette */}
              <div className="relative">
                <div
                  className={`w-full h-64 rounded-xl border-2 border-dashed ${
                    recipeData.image ? 'border-orange-500' : 'border-gray-300'
                  } flex items-center justify-center cursor-pointer overflow-hidden`}
                  onClick={() => document.getElementById('recipe-image')?.click()}
                >
                  {recipeData.image ? (
                    <img
                      src={recipeData.image}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Cliquez pour ajouter une photo</p>
                    </div>
                  )}
                </div>
                <input
                  id="recipe-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Titre et description */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de la recette
                  </label>
                  <input
                    type="text"
                    value={recipeData.title}
                    onChange={e => setRecipeData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Ex: Poulet Kedjenou"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={recipeData.description}
                    onChange={e => setRecipeData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Décrivez votre recette en quelques mots..."
                  />
                </div>
              </div>

              {/* Informations complémentaires */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={recipeData.category}
                    onChange={e => setRecipeData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="ivoirienne">Cuisine ivoirienne</option>
                    <option value="africaine">Cuisine africaine</option>
                    <option value="internationale">Cuisine internationale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulté
                  </label>
                  <select
                    value={recipeData.difficulty}
                    onChange={e => setRecipeData(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="easy">Facile</option>
                    <option value="medium">Moyen</option>
                    <option value="hard">Difficile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temps de préparation
                  </label>
                  <input
                    type="text"
                    value={recipeData.duration}
                    onChange={e => setRecipeData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Ex: 45 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de portions
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setRecipeData(prev => ({ 
                        ...prev, 
                        servings: Math.max(1, prev.servings - 1)
                      }))}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      <Minus className="h-5 w-5 text-gray-500" />
                    </button>
                    <span className="text-xl font-medium text-gray-900">
                      {recipeData.servings}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRecipeData(prev => ({
                        ...prev,
                        servings: prev.servings + 1
                      }))}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      <Plus className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Étape 2: Ingrédients */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Ingrédients</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter un ingrédient
                </button>
              </div>

              <div className="space-y-4">
                {recipeData.ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={e => {
                        const newIngredients = [...recipeData.ingredients];
                        newIngredients[index].name = e.target.value;
                        setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
                      }}
                      className="flex-grow rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Nom de l'ingrédient"
                    />
                    <input
                      type="number"
                      value={ingredient.quantity}
                      onChange={e => {
                        const newIngredients = [...recipeData.ingredients];
                        newIngredients[index].quantity = Number(e.target.value);
                        setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
                      }}
                      className="w-24 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Quantité"
                    />
                    <select
                      value={ingredient.unit}
                      onChange={e => {
                        const newIngredients = [...recipeData.ingredients];
                        newIngredients[index].unit = e.target.value;
                        setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
                      }}
                      className="w-24 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option value="g">grammes</option>
                      <option value="kg">kilogrammes</option>
                      <option value="ml">millilitres</option>
                      <option value="l">litres</option>
                      <option value="pcs">pièces</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const newIngredients = recipeData.ingredients.filter((_, i) => i !== index);
                        setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Étape 3: Préparation */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Étapes de préparation</h2>
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter une étape
                </button>
              </div>

              <div className="space-y-6">
                {recipeData.steps.map((step, index) => (
                  <div key={step.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Étape {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          const newSteps = recipeData.steps.filter((_, i) => i !== index);
                          setRecipeData(prev => ({ ...prev, steps: newSteps }));
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={step.description}
                          onChange={e => {
                            const newSteps = [...recipeData.steps];
                            newSteps[index].description = e.target.value;
                            setRecipeData(prev => ({ ...prev, steps: newSteps }));
                          }}
                          rows={3}
                          className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          placeholder="Décrivez cette étape..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Durée (en minutes)
                        </label>
                        <input
                          type="number"
                          value={step.duration}
                          onChange={e => {
                            const newSteps = [...recipeData.steps];
                            newSteps[index].duration = Number(e.target.value);
                            setRecipeData(prev => ({ ...prev, steps: newSteps }));
                          }}
                          className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image (optionnelle)
                        </label>
                        <div
                          className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-500"
                          onClick={() => document.getElementById(`step-image-${index}`)?.click()}
                        >
                          {step.image ? (
                            <img
                              src={step.image}
                              alt={`Étape ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">
                                Cliquez pour ajouter une photo
                              </p>
                            </div>
                          )}
                        </div>
                        <input
                          id={`step-image-${index}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const newSteps = [...recipeData.steps];
                                newSteps[index].image = reader.result as string;
                                setRecipeData(prev => ({ ...prev, steps: newSteps }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Étape 4: Finalisation */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Visibilité de la recette */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Visibilité de la recette
                    </h3>
                    <p className="text-gray-600">
                      Choisissez qui peut voir votre recette
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsPublic(false)}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        !isPublic
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Lock className="h-5 w-5 mr-2" />
                      Privée
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPublic(true)}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        isPublic
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Globe className="h-5 w-5 mr-2" />
                      Publique
                    </button>
                  </div>
                </div>

                {isPublic && (
                  <div className="mt-6 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-orange-800">
                          Publication de recette
                        </h4>
                        <p className="text-sm text-orange-600 mt-1">
                          Votre recette sera examinée par notre équipe avant d'être publiée.
                          Vous pourrez gagner 0.05% sur chaque commande d'ingrédients.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Aperçu */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Aperçu de la recette
                  </h3>
                  <button
                    type="button"
                    className="flex items-center text-orange-500 hover:text-orange-600"
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Voir l'aperçu
                  </button>
                </div>

                {validationErrors.length > 0 && (
                  <div className="mb-6 bg-red-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-red-800">
                          Corrections nécessaires
                        </h4>
                        <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Informations générales
                    </h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Durée</dt>
                        <dd className="text-gray-900">{recipeData.duration}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Portions</dt>
                        <dd className="text-gray-900">{recipeData.servings}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Difficulté</dt>
                        <dd className="text-gray-900">{recipeData.difficulty}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Contenu
                    </h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Ingrédients</dt>
                        <dd className="text-gray-900">{recipeData.ingredients.length}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Étapes</dt>
                        <dd className="text-gray-900">{recipeData.steps.length}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Images</dt>
                        <dd className="text-gray-900">
                          {recipeData.steps.filter(step => step.image).length + 1}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-900"
              >
                Précédent
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="ml-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto flex items-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                <Save className="h-5 w-5 mr-2" />
                {isPublic ? 'Proposer ma recette' : 'Enregistrer'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}