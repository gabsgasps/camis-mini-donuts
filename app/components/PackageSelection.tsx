import { Package } from '../lib/types';
import Image from 'next/image';

interface PackageSelectionProps {
  options: Package[];
  onSelect: (id: number) => void;
}

export const PackageSelection = ({ options, onSelect }: PackageSelectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {options.map(option => (
        <div key={option.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-[7/4] relative">
            <Image
              src={option.imageUrl}
              alt={option.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold">{option.name}</h2>
            <p className="text-gray-600 mb-4">{option.description}</p>
            <button
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
              onClick={() => onSelect(option.id)}
            >
              Selecionar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 