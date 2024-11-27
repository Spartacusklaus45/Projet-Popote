import { Recipe } from '../types/recipe';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = async (recipe: Recipe, servings: number) => {
  const doc = new jsPDF();

  // Logo et en-tête
  doc.setFontSize(24);
  doc.setTextColor(249, 115, 22); // Orange-500
  doc.text('Popote', 20, 20);

  // Titre de la recette
  doc.setFontSize(20);
  doc.setTextColor(17, 24, 39); // Gray-900
  doc.text(recipe.title, 20, 40);

  // Informations générales
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128); // Gray-500
  doc.text(`Temps de préparation: ${recipe.duration}`, 20, 55);
  doc.text(`Difficulté: ${recipe.difficulty}`, 20, 62);
  doc.text(`Pour ${servings} personnes`, 20, 69);
  doc.text(`Note: ${recipe.rating}/5`, 20, 76);

  // Ingrédients
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39);
  doc.text('Ingrédients', 20, 90);
  
  const ingredientRows = recipe.ingredients.map(ing => [
    ing.name,
    `${(ing.quantity * servings / recipe.servings).toFixed(1)} ${ing.unit}`,
    `${(ing.price * servings / recipe.servings).toLocaleString()} FCFA`
  ]);

  (doc as any).autoTable({
    startY: 95,
    head: [['Ingrédient', 'Quantité', 'Prix']],
    body: ingredientRows,
    theme: 'striped',
    headStyles: { fillColor: [249, 115, 22] }
  });

  // Instructions
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39);
  doc.text('Instructions', 20, (doc as any).lastAutoTable.finalY + 15);

  const stepRows = recipe.steps.map((step, index) => [
    `${index + 1}.`,
    step.description,
    step.duration ? `${step.duration} min` : ''
  ]);

  (doc as any).autoTable({
    startY: (doc as any).lastAutoTable.finalY + 20,
    head: [['Étape', 'Description', 'Durée']],
    body: stepRows,
    theme: 'striped',
    headStyles: { fillColor: [249, 115, 22] }
  });

  // Informations nutritionnelles
  if (recipe.nutrition) {
    doc.setFontSize(16);
    doc.text('Valeurs nutritionnelles (par portion)', 20, (doc as any).lastAutoTable.finalY + 15);

    const nutritionRows = [
      ['Calories', `${(recipe.nutrition.calories / servings).toFixed(0)} kcal`],
      ['Protéines', `${(recipe.nutrition.proteins / servings).toFixed(1)}g`],
      ['Glucides', `${(recipe.nutrition.carbs / servings).toFixed(1)}g`],
      ['Lipides', `${(recipe.nutrition.fats / servings).toFixed(1)}g`],
      ['Score nutritionnel', recipe.nutrition.score]
    ];

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      body: nutritionRows,
      theme: 'plain'
    });
  }

  // Conseils
  if (recipe.tips && recipe.tips.length > 0) {
    doc.setFontSize(16);
    doc.text('Conseils du chef', 20, (doc as any).lastAutoTable.finalY + 15);

    const tipsRows = recipe.tips.map(tip => [`• ${tip}`]);

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      body: tipsRows,
      theme: 'plain',
      styles: { cellPadding: 2 }
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(
      `Page ${i} sur ${pageCount} - Généré par Popote`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // QR Code pour la version en ligne
  const qrCodeUrl = `https://popote.ci/recipes/${recipe.id}`;
  doc.setFontSize(10);
  doc.text('Scannez pour voir la recette en ligne:', 20, doc.internal.pageSize.height - 30);
  // Ici vous pouvez ajouter un QR code si vous le souhaitez

  // Téléchargement
  doc.save(`${recipe.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};