// pages/index.js
"use client"

import { useState } from 'react';
import { Package } from './lib/types';
import { PackageSelection } from './components/PackageSelection';
import { FlavorSelection } from './components/FlavorSelection';
import { OrderSummary } from './components/OrderSummary';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [customQuantity, setCustomQuantity] = useState<number>(1);
  const [showSummary, setShowSummary] = useState(false);

  const options: Package[] = [
    { 
      id: 1, 
      name: 'Copo - 200ml', 
      description: '6 mini donuts da sua escolha', 
      quantity: 6,
      imageUrl: 'https://s3.typebot.io/public/workspaces/clwxpxmaa000th1axanj90oog/typebots/cm8xrw4kq001jw9lfm8rznbi6/blocks/zne0msp0lqxjmwfvytjxermk/items/zne0msp0lqxjmwfvytjxermk'
    },
    { 
      id: 2, 
      name: 'Caixa G', 
      description: '8 mini donuts da sua escolha', 
      quantity: 8,
      imageUrl: 'https://s3.typebot.io/public/workspaces/clwxpxmaa000th1axanj90oog/typebots/cm8xrw4kq001jw9lfm8rznbi6/blocks/uyigyahfnfkny7hbdqefdhi2/items/uyigyahfnfkny7hbdqefdhi2'
    },
    { 
      id: 3, 
      name: 'Caixa M', 
      description: '4 mini donuts da sua escolha', 
      quantity: 4,
      imageUrl: 'https://s3.typebot.io/public/workspaces/clwxpxmaa000th1axanj90oog/typebots/cm8xrw4kq001jw9lfm8rznbi6/blocks/w1sll6al0wtz4inh8x2hpdww/items/w1sll6al0wtz4inh8x2hpdww'
    },
    { 
      id: 4, 
      name: 'Pedido customizado', 
      description: 'Escolha a quantidade de donuts', 
      quantity: null,
      imageUrl: 'https://s3.typebot.io/public/workspaces/clwxpxmaa000th1axanj90oog/typebots/cm8xrw4kq001jw9lfm8rznbi6/blocks/w5yvj7cac569680wyqr9ffao/items/w5yvj7cac569680wyqr9ffao'
    },
  ];

  const flavors = [
    'Homer',
    'Prestigio',
    'Paçoca',
    'Brigadeiro',
    'Chocoball',
    'Kit Kat',
    'Ovomaltine',
    'Oreo',
    'M&M\'s',
    'Ninho com Nutella',
  ];

  const getCurrentQuantity = () => {
    const option = options.find(opt => opt.id === selectedOption);
    return option?.id === 4 ? customQuantity : option?.quantity || 0;
  };

  const handleSendToWhatsApp = () => {
    const option = options.find(opt => opt.id === selectedOption);
    const quantity = option?.id === 4 ? customQuantity : option?.quantity;
    
    const flavorCounts = selectedFlavors.reduce((acc, flavor) => {
      acc[flavor] = (acc[flavor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const flavorsList = Object.entries(flavorCounts)
      .map(([flavor, count]) => `(${count}x)  ${flavor}`)
      .join('\n');
    
    const message = `Olá quero fazer meu pedido com\n\n${option?.name} (${quantity} mini donuts) e os seguintes sabores:\n${flavorsList}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleBack = () => {
    setSelectedOption(null);
    setSelectedFlavors([]);
    setCustomQuantity(1);
    setShowSummary(false);
  };

  const handleFlavorSelect = (flavor: string) => {
    if (selectedFlavors.length < getCurrentQuantity()) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const handleFlavorRemove = (flavor: string) => {
    const index = selectedFlavors.lastIndexOf(flavor);
    if (index !== -1) {
      setSelectedFlavors([
        ...selectedFlavors.slice(0, index),
        ...selectedFlavors.slice(index + 1)
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl m-auto px-4">
      {!selectedOption ? (
        <PackageSelection
          options={options}
          onSelect={setSelectedOption}
        />
      ) : !showSummary ? (
        <FlavorSelection
          selectedOption={selectedOption}
          optionName={options.find(opt => opt.id === selectedOption)?.name || ''}
          flavors={flavors}
          selectedFlavors={selectedFlavors}
          maxQuantity={getCurrentQuantity()}
          customQuantity={customQuantity}
          onCustomQuantityChange={setCustomQuantity}
          onFlavorSelect={handleFlavorSelect}
          onFlavorRemove={handleFlavorRemove}
          onBack={handleBack}
          onComplete={() => setShowSummary(true)}
        />
      ) : (
        <OrderSummary
          optionName={options.find(opt => opt.id === selectedOption)?.name || ''}
          quantity={getCurrentQuantity()}
          selectedFlavors={selectedFlavors}
          onSendToWhatsApp={handleSendToWhatsApp}
          onBack={() => setShowSummary(false)}
        />
      )}
      </div>
    </div>
  );
};

export default Home;
