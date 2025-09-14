import React, { useState } from 'react';
import { TrendingUp, Brain, MapPin, Calendar, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface PricePrediction {
  crop: string;
  region: string;
  predicted_price: string;
  confidence: string;
  recommendation: string;
  current_price?: string;
  trend: 'up' | 'down' | 'stable';
  factors: string[];
}

export function PricePredictionAgent() {
  const [formData, setFormData] = useState({
    crop: '',
    region: '',
    current_price: ''
  });
  const [prediction, setPrediction] = useState<PricePrediction | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock AI prediction function - in production, this would call an actual ML API
  const generatePrediction = (crop: string, region: string, currentPrice?: string): PricePrediction => {
    const crops = {
      wheat: { base: 2200, volatility: 0.1 },
      rice: { base: 2800, volatility: 0.12 },
      tomatoes: { base: 1500, volatility: 0.25 },
      potatoes: { base: 1200, volatility: 0.15 },
      onions: { base: 2000, volatility: 0.3 },
      mangoes: { base: 4000, volatility: 0.2 }
    };

    const cropData = crops[crop.toLowerCase() as keyof typeof crops] || { base: 2000, volatility: 0.15 };
    const basePrice = cropData.base;
    const volatility = cropData.volatility;

    // Simulate price prediction with some randomness
    const priceVariation = (Math.random() - 0.5) * 2 * volatility;
    const predictedMin = Math.round(basePrice * (1 + priceVariation - volatility/2));
    const predictedMax = Math.round(basePrice * (1 + priceVariation + volatility/2));

    const confidence = Math.round(75 + Math.random() * 20); // 75-95%
    const trend = priceVariation > 0.05 ? 'up' : priceVariation < -0.05 ? 'down' : 'stable';

    let recommendation = '';
    if (trend === 'up') {
      recommendation = 'Wait for 3-5 days to get a better price';
    } else if (trend === 'down') {
      recommendation = 'Sell now before prices drop further';
    } else {
      recommendation = 'Current prices are stable, good time to sell';
    }

    const factors = [
      'Seasonal demand patterns',
      'Weather conditions in region',
      'Transportation costs',
      'Market supply levels'
    ];

    return {
      crop: crop.charAt(0).toUpperCase() + crop.slice(1),
      region,
      predicted_price: `₹${predictedMin}-₹${predictedMax} per quintal`,
      confidence: `${confidence}%`,
      recommendation,
      current_price: currentPrice ? `₹${currentPrice} per quintal` : undefined,
      trend,
      factors
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.crop || !formData.region) return;

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const result = generatePrediction(formData.crop, formData.region, formData.current_price);
      setPrediction(result);
      setLoading(false);
    }, 1500);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'down': return <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />;
      default: return <TrendingUp className="h-5 w-5 text-gray-600 rotate-90" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.toLowerCase().includes('wait')) {
      return <Clock className="h-5 w-5 text-yellow-600" />;
    } else if (recommendation.toLowerCase().includes('sell now')) {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">AI Price Predictor</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get intelligent price predictions for your crops based on market trends, weather patterns, and historical data
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Get Price Prediction</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Crop Type
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData(prev => ({ ...prev, crop: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select crop</option>
                <option value="wheat">🌾 Wheat</option>
                <option value="rice">🌾 Rice</option>
                <option value="tomatoes">🍅 Tomatoes</option>
                <option value="potatoes">🥔 Potatoes</option>
                <option value="onions">🧅 Onions</option>
                <option value="mangoes">🥭 Mangoes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Region/State
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select region</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 inline mr-2" />
                Current Market Price (Optional)
              </label>
              <input
                type="number"
                value={formData.current_price}
                onChange={(e) => setFormData(prev => ({ ...prev, current_price: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter current price per quintal"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.crop || !formData.region}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing Market Data...</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  <span>Predict Price</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prediction Results */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {!prediction ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
                <Brain className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Prediction Ready</h3>
              <p className="text-gray-600">Fill in the form to get intelligent price predictions</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Price Prediction</h3>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getTrendColor(prediction.trend)}`}>
                  {getTrendIcon(prediction.trend)}
                  <span className="text-sm font-medium capitalize">{prediction.trend}</span>
                </div>
              </div>

              {/* Crop and Region */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Crop</p>
                    <p className="font-semibold text-gray-900">{prediction.crop}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Region</p>
                    <p className="font-semibold text-gray-900">{prediction.region}</p>
                  </div>
                </div>
              </div>

              {/* Price Prediction */}
              <div className="text-center bg-purple-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Predicted Price (Next 3-7 days)</p>
                <p className="text-3xl font-bold text-purple-600 mb-2">{prediction.predicted_price}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="text-sm font-semibold text-purple-600">{prediction.confidence}</span>
                </div>
              </div>

              {/* Current Price Comparison */}
              {prediction.current_price && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Current Market Price</p>
                  <p className="text-lg font-semibold text-blue-600">{prediction.current_price}</p>
                </div>
              )}

              {/* Recommendation */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {getRecommendationIcon(prediction.recommendation)}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">AI Recommendation</p>
                    <p className="text-sm text-gray-700">{prediction.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* Factors Considered */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">Factors Considered:</p>
                <div className="space-y-2">
                  {prediction.factors.map((factor, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Prediction generated on {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">How AI Price Prediction Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                <Calendar className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Historical Analysis</h4>
              <p className="text-sm opacity-90">Analyzes past price trends and seasonal patterns</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                <MapPin className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Regional Factors</h4>
              <p className="text-sm opacity-90">Considers local supply, demand, and transportation</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                <Brain className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Machine Learning</h4>
              <p className="text-sm opacity-90">Uses AI algorithms to predict future prices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}