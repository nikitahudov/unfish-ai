'use client';

import { useState, useEffect } from 'react';
import { useContent } from './ContentContext';

interface FlashCardsProps {
  title?: string;
  cards: Array<{
    front: string;
    back: string;
  }>;
}

export function FlashCards({ title, cards }: FlashCardsProps) {
  const { onFlashcardsReviewed } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardOrder, setCardOrder] = useState<number[]>([]);
  const [markedAsKnown, setMarkedAsKnown] = useState<boolean[]>([]);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set());
  const [hasTracked, setHasTracked] = useState(false);

  // Initialize card order and tracking
  useEffect(() => {
    setCardOrder(cards.map((_, i) => i));
    setMarkedAsKnown(new Array(cards.length).fill(false));
  }, [cards.length]);

  const currentCardIndex = cardOrder[currentIndex] ?? 0;
  const currentCard = cards[currentCardIndex];

  // Track when all cards have been viewed
  useEffect(() => {
    if (viewedCards.size >= cards.length && !hasTracked) {
      onFlashcardsReviewed();
      setHasTracked(true);
    }
  }, [viewedCards.size, cards.length, hasTracked, onFlashcardsReviewed]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    // Track when a card is viewed (flipped)
    if (!isFlipped) {
      setViewedCards(prev => new Set([...prev, currentCardIndex]));
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cardOrder];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCardOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleMarkKnown = () => {
    const newMarked = [...markedAsKnown];
    newMarked[currentCardIndex] = true;
    setMarkedAsKnown(newMarked);

    // Auto-advance to next card
    if (currentIndex < cards.length - 1) {
      handleNext();
    }
  };

  const handleMarkLearning = () => {
    const newMarked = [...markedAsKnown];
    newMarked[currentCardIndex] = false;
    setMarkedAsKnown(newMarked);

    // Auto-advance to next card
    if (currentIndex < cards.length - 1) {
      handleNext();
    }
  };

  const knownCount = markedAsKnown.filter(Boolean).length;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped]);

  if (cards.length === 0) {
    return <div className="text-slate-400">No cards available</div>;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      {title && (
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      )}

      {/* Card Counter and Controls */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-400">
          Card {currentIndex + 1} of {cards.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-amber-400">
            {knownCount} marked as known
          </span>
          <button
            onClick={handleShuffle}
            className="px-3 py-1 text-sm bg-slate-700 text-amber-400 rounded hover:bg-slate-600 transition-colors"
          >
            🔀 Shuffle
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1 mb-6 justify-center">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-amber-500'
                : markedAsKnown[cardOrder[index]]
                ? 'bg-green-500'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="perspective-1000 mb-6">
        <div
          onClick={handleFlip}
          className={`
            relative cursor-pointer transition-transform duration-600 preserve-3d
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s',
            minHeight: '200px',
          }}
        >
          {/* Front */}
          <div
            className={`
              absolute w-full bg-slate-700 rounded-lg p-8 border-2 border-slate-600
              flex items-center justify-center text-center min-h-[200px]
              ${isFlipped ? 'invisible' : 'visible'}
            `}
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div>
              <p className="text-xs text-slate-400 mb-2">QUESTION</p>
              <p className="text-xl text-white">{currentCard?.front}</p>
            </div>
          </div>

          {/* Back */}
          <div
            className={`
              absolute w-full bg-amber-500/20 rounded-lg p-8 border-2 border-amber-500
              flex items-center justify-center text-center min-h-[200px]
              ${isFlipped ? 'visible' : 'invisible'}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div>
              <p className="text-xs text-amber-400 mb-2">ANSWER</p>
              <p className="text-xl text-amber-100">{currentCard?.back}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <div className="text-center mb-4">
        <button
          onClick={handleFlip}
          className="px-6 py-2 bg-amber-500 text-slate-900 font-medium rounded hover:bg-amber-400 transition-colors"
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
      </div>

      {/* Knowledge Tracking */}
      {isFlipped && (
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={handleMarkLearning}
            className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded hover:bg-red-500/30 transition-colors"
          >
            Still Learning
          </button>
          <button
            onClick={handleMarkKnown}
            className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded hover:bg-green-500/30 transition-colors"
          >
            Mark as Known ✓
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span className="text-xs text-slate-500">
          Use ← → arrow keys or click card to flip
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Summary */}
      {knownCount === cards.length && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
          <p className="text-green-400 text-center font-semibold">
            🎉 You've marked all cards as known! Great job!
          </p>
        </div>
      )}
    </div>
  );
}
