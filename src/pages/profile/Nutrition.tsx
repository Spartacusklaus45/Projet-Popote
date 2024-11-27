import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Utensils,
  Activity,
  Target,
  TrendingUp,
  Award,
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react';

// Données simulées pour les graphiques
const generateDailyData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: format(subDays(new Date(), i), 'dd MMM', { locale: fr }),
    calories: Math.floor(Math.random() * (2500 - 1800) + 1800),
    objectif: 2000
  })).reverse();
};

const macroData = [
  { name: 'Protéines', value: 25, color: '#F97316' },
  { name: 'Glucides', value: 45, color: '#22C55E' },
  { name: 'Lipides', value: 30, color: '#3B82F6' }
];

export default function Nutrition() {
  const [dailyData] = useState(generateDailyData());
  const [selectedPeriod, setSelectedPeriod] = useState('semaine');

  const currentStats = {
    calories: 1850,
    objectif: 2000,
    progression: 92.5,
    tendance: 'positive'
  };

  const achievements = [
    {
      title: "Objectif protéines atteint",
      description: "3 jours consécutifs",
      icon: Award,
      color: "text-orange-500 bg-orange-100"
    },
    {
      title: "Calories dans la cible",
      description: "5 jours cette semaine",
      icon: Target,
      color: "text-green-500 bg-green-100"
    }
  ];

  const recommendations = [
    {
      title: "Augmentez votre apport en protéines",
      description: "Essayez d'ajouter des légumineuses à vos repas",
      type: "improvement"
    },
    {
      title: "Excellent contrôle des calories",
      description: "Continuez sur cette lancée !",
      type: "success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Utensils className="h-6 w-6 text-orange-500" />
            </div>
            <span className="text-sm text-gray-500">Aujourd'hui</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {currentStats.calories} kcal
          </h3>
          <p className="text-sm text-gray-600">
            sur {currentStats.objectif} kcal
          </p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${currentStats.progression}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <span className="text-sm text-gray-500">Progression</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {currentStats.progression}%
          </h3>
          <p className="text-sm text-gray-600">de l'objectif atteint</p>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+2.5% vs. semaine dernière</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-500" />
            </div>
            <button className="text-sm text-orange-500 hover:text-orange-600">
              Modifier
            </button>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {currentStats.objectif} kcal
          </h3>
          <p className="text-sm text-gray-600">Objectif quotidien</p>
          <div className="mt-4">
            <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
              Voir les détails
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des calories */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Évolution des calories
            </h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="semaine">7 derniers jours</option>
              <option value="mois">30 derniers jours</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#F97316"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="objectif"
                  stroke="#9CA3AF"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition des macronutriments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Répartition des macronutriments
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {macroData.map((macro, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold" style={{ color: macro.color }}>
                  {macro.value}%
                </div>
                <div className="text-sm text-gray-600">{macro.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Succès et recommandations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Succès */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Succès de la semaine
            </h3>
            <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Définir un objectif
            </button>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
              >
                <div className={`p-2 rounded-lg ${achievement.color}`}>
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recommandations personnalisées
          </h3>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
              >
                <div className={`p-2 rounded-lg ${
                  recommendation.type === 'success'
                    ? 'bg-green-100 text-green-500'
                    : 'bg-orange-100 text-orange-500'
                }`}>
                  {recommendation.type === 'success' ? (
                    <Award className="h-6 w-6" />
                  ) : (
                    <AlertCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {recommendation.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {recommendation.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}