// src/components/booking/ExpertCard.jsx
import { Star, MapPin } from 'lucide-react';
import { Button, Card } from '../ui';

export const ExpertCard = ({ expert, onSelect, isSelected }) => {
  return (
    <Card 
      className={`p-4 transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-start space-x-4">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{expert.name}</h3>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(expert.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {expert.rating} ({expert.reviews} reseñas)
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{expert.experience}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary-600">
              €{expert.price}/hora
            </span>
            <Button
              variant={isSelected ? 'primary' : 'outline'}
              onClick={() => onSelect(expert)}
              size="sm"
            >
              {isSelected ? 'Seleccionado' : 'Seleccionar'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

