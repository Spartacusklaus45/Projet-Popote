import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Les secrets de la cuisine ivoirienne traditionnelle",
    excerpt: "Découvrez les techniques et ingrédients essentiels qui font la richesse de la cuisine ivoirienne...",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
    author: "Chef Marie K.",
    date: "15 Mars 2024",
    category: "Traditions",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Comment réduire le gaspillage alimentaire",
    excerpt: "Conseils pratiques et astuces pour mieux gérer vos courses et conserver vos aliments plus longtemps...",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
    author: "Jean D.",
    date: "12 Mars 2024",
    category: "Conseils",
    readTime: "4 min"
  },
  {
    id: 3,
    title: "Les bienfaits des épices africaines",
    excerpt: "Focus sur les épices traditionnelles africaines et leurs vertus pour la santé...",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    author: "Dr. Sophie M.",
    date: "10 Mars 2024",
    category: "Santé",
    readTime: "6 min"
  }
];

export default function Blog() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Le Blog Popote
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos articles sur la cuisine, la nutrition et les traditions culinaires
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
                  alt="Cuisine africaine moderne"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>20 Mars 2024</span>
                  <span className="mx-2">•</span>
                  <User className="h-4 w-4 mr-2" />
                  <span>Chef Paul N.</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  La cuisine africaine moderne : entre tradition et innovation
                </h2>
                <p className="text-gray-600 mb-6">
                  Comment les chefs africains contemporains réinventent la cuisine traditionnelle tout en préservant son authenticité...
                </p>
                <button className="flex items-center text-orange-500 hover:text-orange-600">
                  <span>Lire l'article</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {post.readTime} de lecture
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-orange-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Restez informé
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et recettes directement dans votre boîte mail.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow rounded-l-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
            <button className="px-6 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}