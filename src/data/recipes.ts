import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Poulet Kedjenou",
    description: "Un délicieux plat traditionnel ivoirien mijoté lentement avec des épices et légumes",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    duration: "45 min",
    servings: 4,
    rating: 4.8,
    difficulty: "Moyen",
    category: "Plat Ivoirien",
    price: 5000,
    ingredients: [
      {
        id: "1",
        name: "Poulet",
        quantity: 1,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781",
        price: 2500
      },
      {
        id: "2",
        name: "Tomates",
        quantity: 500,
        unit: "g",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
        price: 800
      },
      {
        id: "3",
        name: "Oignons",
        quantity: 300,
        unit: "g",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
        price: 500
      },
      {
        id: "4",
        name: "Piment",
        quantity: 50,
        unit: "g",
        image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d",
        price: 200
      },
      {
        id: "5",
        name: "Ail",
        quantity: 30,
        unit: "g",
        image: "https://images.unsplash.com/photo-1615477550927-6ec8445fcf25",
        price: 200
      }
    ],
    steps: [
      {
        id: "1",
        description: "Couper le poulet en morceaux et le laver soigneusement",
        duration: 10,
        tips: ["Préférez un poulet fermier pour plus de saveur"],
        image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781"
      },
      {
        id: "2",
        description: "Émincer les oignons et couper les tomates en dés",
        duration: 10,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
      },
      {
        id: "3",
        description: "Faire mijoter à feu doux pendant 30 minutes",
        duration: 30,
        temperature: 180,
        tips: ["Ne pas ouvrir la marmite pendant la cuisson"]
      }
    ],
    nutrition: {
      calories: 350,
      proteins: 28,
      carbs: 12,
      fats: 18,
      fiber: 3,
      sugar: 4,
      sodium: 380,
      score: 'A'
    },
    reviews: [
      {
        id: "1",
        userId: "1",
        userName: "Marie K.",
        rating: 5,
        comment: "Excellente recette, très authentique !",
        date: "2024-03-15",
        helpful: 12,
        images: [
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
        ]
      }
    ],
    tips: [
      "Utilisez une marmite en terre cuite traditionnelle pour plus d'authenticité",
      "Servez avec de l'attiéké ou du riz blanc",
      "Le plat est encore meilleur réchauffé le lendemain"
    ],
    utensils: [
      {
        name: "Marmite en terre cuite",
        icon: "pot",
        required: true
      },
      {
        name: "Couteau de cuisine",
        icon: "utensils",
        required: true
      },
      {
        name: "Planche à découper",
        icon: "utensils",
        required: true
      }
    ],
    tags: ["Traditionnel", "Mijoté", "Sans gluten"],
    isFavorite: false,
    isPublic: true,
    alternatives: [
      {
        id: "1",
        title: "Version végétarienne",
        description: "Une délicieuse alternative aux champignons",
        changes: [
          "Remplacer le poulet par des champignons",
          "Ajouter des protéines végétales",
          "Ajuster les épices"
        ],
        author: {
          name: "Chef Marie",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        }
      }
    ]
  },
  {
    id: 2,
    title: "Attiéké Poisson",
    description: "Un plat traditionnel à base de manioc fermenté accompagné de poisson grillé",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369",
    duration: "30 min",
    servings: 2,
    rating: 4.9,
    difficulty: "Facile",
    category: "Plat Ivoirien",
    price: 4000,
    ingredients: [
      {
        id: "1",
        name: "Attiéké",
        quantity: 500,
        unit: "g",
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b",
        price: 1000
      },
      {
        id: "2",
        name: "Poisson",
        quantity: 400,
        unit: "g",
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62",
        price: 2500
      },
      {
        id: "3",
        name: "Oignons",
        quantity: 200,
        unit: "g",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
        price: 300
      },
      {
        id: "4",
        name: "Tomates",
        quantity: 200,
        unit: "g",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
        price: 300
      }
    ],
    steps: [
      {
        id: "1",
        description: "Nettoyer et assaisonner le poisson",
        duration: 10,
        tips: ["Bien écailler le poisson"],
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62"
      },
      {
        id: "2",
        description: "Griller le poisson",
        duration: 15,
        temperature: 200,
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62"
      },
      {
        id: "3",
        description: "Préparer la sauce tomate",
        duration: 10,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
      }
    ],
    nutrition: {
      calories: 280,
      proteins: 24,
      carbs: 32,
      fats: 8,
      fiber: 4,
      sugar: 2,
      sodium: 320,
      score: 'A'
    },
    reviews: [
      {
        id: "1",
        userId: "2",
        userName: "Jean D.",
        rating: 5,
        comment: "Un vrai délice !",
        date: "2024-03-14",
        helpful: 8,
        images: [
          "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369"
        ]
      }
    ],
    tips: [
      "Choisissez un poisson frais du jour",
      "L'attiéké doit être bien chaud pour être savoureux",
      "Accompagnez d'oignons émincés et de piment"
    ],
    utensils: [
      {
        name: "Gril",
        icon: "flame",
        required: true
      },
      {
        name: "Écumoire",
        icon: "utensils",
        required: true
      },
      {
        name: "Couteau",
        icon: "utensils",
        required: true
      }
    ],
    tags: ["Traditionnel", "Poisson", "Sans gluten"],
    isFavorite: false,
    isPublic: true,
    alternatives: [
      {
        id: "1",
        title: "Version végétarienne",
        description: "Avec du tofu grillé",
        changes: [
          "Remplacer le poisson par du tofu ferme",
          "Mariner le tofu dans une sauce épicée",
          "Griller le tofu jusqu'à ce qu'il soit croustillant"
        ],
        author: {
          name: "Chef Paul",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        }
      }
    ]
  },
  {
    id: 3,
    title: "Sauce Graine",
    description: "Une sauce traditionnelle à base de noix de palme",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    duration: "60 min",
    servings: 6,
    rating: 4.7,
    difficulty: "Moyen",
    category: "Sauce",
    price: 3500,
    ingredients: [
      {
        id: "1",
        name: "Noix de palme",
        quantity: 500,
        unit: "g",
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d",
        price: 1500
      },
      {
        id: "2",
        name: "Viande de bœuf",
        quantity: 500,
        unit: "g",
        image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976",
        price: 2500
      },
      {
        id: "3",
        name: "Épices",
        quantity: 1,
        unit: "lot",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
        price: 500
      }
    ],
    steps: [
      {
        id: "1",
        description: "Extraire le jus des noix de palme",
        duration: 20,
        tips: ["Utiliser de l'eau tiède pour une meilleure extraction"],
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d"
      },
      {
        id: "2",
        description: "Cuire la viande",
        duration: 30,
        temperature: 180,
        image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976"
      },
      {
        id: "3",
        description: "Mijoter la sauce",
        duration: 45,
        temperature: 160,
        tips: ["Remuer régulièrement pour éviter que la sauce n'attache"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
      }
    ],
    nutrition: {
      calories: 300,
      proteins: 15,
      carbs: 20,
      fats: 25,
      fiber: 5,
      sugar: 3,
      sodium: 400,
      score: 'B'
    },
    reviews: [
      {
        id: "1",
        userId: "3",
        userName: "Sophie M.",
        rating: 4,
        comment: "Très bonne recette traditionnelle",
        date: "2024-03-13",
        helpful: 5,
        images: [
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        ]
      }
    ],
    tips: [
      "Utilisez des noix de palme fraîches pour un meilleur goût",
      "La sauce peut être conservée au congélateur",
      "Servir avec du foutou ou du riz"
    ],
    utensils: [
      {
        name: "Marmite",
        icon: "pot",
        required: true
      },
      {
        name: "Passoire",
        icon: "utensils",
        required: true
      },
      {
        name: "Cuillère en bois",
        icon: "utensils",
        required: true
      }
    ],
    tags: ["Traditionnel", "Sauce", "Viande"],
    isFavorite: false,
    isPublic: true,
    alternatives: [
      {
        id: "1",
        title: "Version végétarienne",
        description: "Avec des champignons et du tofu",
        changes: [
          "Remplacer la viande par des champignons",
          "Ajouter du tofu fumé",
          "Ajuster l'assaisonnement"
        ],
        author: {
          name: "Chef Sarah",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
        }
      }
    ]
  }
];

export const getRecipeById = (id: number): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};