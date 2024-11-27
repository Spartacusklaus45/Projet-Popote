import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Mail, Apple } from 'lucide-react';
import toast from 'react-hot-toast';

interface SocialAuthProps {
  onSuccess: () => void;
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const socialButtons = [
  {
    provider: 'Facebook',
    icon: Facebook,
    color: 'bg-[#1877F2]',
    hoverColor: 'hover:bg-[#1666d3]'
  },
  {
    provider: 'Google',
    icon: Mail,
    color: 'bg-[#DB4437]',
    hoverColor: 'hover:bg-[#c13b2f]'
  },
  {
    provider: 'Apple',
    icon: Apple,
    color: 'bg-black',
    hoverColor: 'hover:bg-gray-900'
  }
];

export default function SocialAuth({ onSuccess }: SocialAuthProps) {
  const handleSocialLogin = (provider: string) => {
    toast.success(`Connexion avec ${provider} réussie !`);
    onSuccess();
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {socialButtons.map(({ provider, icon: Icon, color, hoverColor }) => (
        <motion.button
          key={provider}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleSocialLogin(provider)}
          className={`${color} ${hoverColor} text-white p-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center transform`}
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}