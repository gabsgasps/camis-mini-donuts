interface OrderSummaryProps {
  optionName: string;
  quantity: number;
  selectedFlavors: string[];
  onSendToWhatsApp: () => void;
  onBack: () => void;
}

export const OrderSummary = ({
  optionName,
  quantity,
  selectedFlavors,
  onSendToWhatsApp,
  onBack
}: OrderSummaryProps) => {
  const formatFlavors = () => {
    const flavorCounts = selectedFlavors.reduce((acc, flavor) => {
      acc[flavor] = (acc[flavor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(flavorCounts)
      .map(([flavor, count]) => `${flavor}${count > 1 ? ` (${count}x)` : ''}`)
      .join(', ');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Resumo do pedido</h1>
      <p className="mb-2">Opção: {optionName}</p>
      <p className="mb-2">Quantidade: {quantity} mini donuts</p>
      <p className="mb-4">Sabores: {formatFlavors()}</p>
      <div className="space-y-2">
        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={onSendToWhatsApp}
        >
          Enviar para o WhatsApp
        </button>
        <button
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          onClick={onBack}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}; 