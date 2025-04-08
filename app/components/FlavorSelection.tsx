interface FlavorSelectionProps {
  selectedOption: number;
  optionName: string;
  flavors: string[];
  selectedFlavors: string[];
  maxQuantity: number;
  customQuantity: number;
  onCustomQuantityChange: (quantity: number) => void;
  onFlavorSelect: (flavor: string) => void;
  onFlavorRemove: (flavor: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const FlavorSelection = ({
  selectedOption,
  optionName,
  flavors,
  selectedFlavors,
  maxQuantity,
  customQuantity,
  onCustomQuantityChange,
  onFlavorSelect,
  onFlavorRemove,
  onBack,
  onComplete
}: FlavorSelectionProps) => {
  const getFlavorCount = (flavor: string) => {
    return selectedFlavors.filter(f => f === flavor).length;
  };

  const isComplete = selectedFlavors.length === maxQuantity;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mt-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-md">
          <p className="text-center text-gray-600 mb-4">
            Selecionados: {selectedFlavors.length}/{maxQuantity}
          </p>
          <div className="space-y-2">
            {isComplete && (
              <button
                className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                onClick={onComplete}
              >
                Continuar
              </button>
            )}
            <button
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              onClick={onBack}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <h1 className="text-xl font-bold text-center mb-2">{optionName}</h1>
        <p className="text-gray-600 text-center mb-6">
          Adicione até {maxQuantity} donuts
        </p>
        {selectedOption === 4 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Quantidade de mini donuts
            </label>
            <input
              type="number"
              min="1"
              value={customQuantity}
              onChange={(e) => onCustomQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full max-w-[200px] mx-auto block p-2 border rounded-md text-center"
            />
          </div>
        )}
      </div>

      

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {flavors.map((flavor, index) => {
          const count = getFlavorCount(flavor);
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
              <div className="w-full aspect-[4/3] rounded-lg bg-pink-50 mb-3 flex items-center justify-center">
                {/* Placeholder for donut image */}
                <div className="w-16 h-16 rounded-full bg-pink-200"></div>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">{flavor}</h3>
              <div className="flex items-center gap-3 mt-auto">
                <button
                  onClick={() => count > 0 && onFlavorRemove(flavor)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    count > 0
                      ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  disabled={count === 0}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{count}</span>
                <button
                  onClick={() => selectedFlavors.length < maxQuantity && onFlavorSelect(flavor)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedFlavors.length < maxQuantity
                      ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  disabled={selectedFlavors.length >= maxQuantity}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}; 