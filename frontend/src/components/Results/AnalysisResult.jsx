import React from "react";
import PropTypes from "prop-types";
import { FiList, FiTag } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
export default function AnalysisResult({ data }) {
  console.log("AnalysisResult received data:", data);
  
  // Handle different data structures that might come from API
  let analysis = {};
  
  if (data?.analysis) {
    // If data has analysis property directly
    analysis = data.analysis;
  } else if (data?.document?.analysis) {
    // If data is wrapped in document object
    analysis = data.document.analysis;
  } else if (data) {
    // If data is the analysis object itself
    analysis = data;
  }
  
  // Extract values with fallback to empty defaults
  const summary = analysis.summary || analysis.Summary || "";
  const keyPoints = analysis.keyPoints || analysis.key_points || analysis.KeyPoints || [];
  const keywords = analysis.keywords || analysis.Keywords || [];
  const sentiment = analysis.sentiment || analysis.Sentiment || "Neutral";
  const notes = analysis.notes || analysis.Notes || "";
  
  console.log("Extracted analysis data:", { summary, keyPoints, keywords, sentiment, notes });

      const sentimentIcon = () => {
        switch (sentiment) {
          case "Positive":
            return <AiOutlineCheckCircle className="inline-block mr-2 text-green-500" />;
          case "Negative":
            return <AiOutlineCloseCircle className="inline-block mr-2 text-red-500" />;
          case "Neutral":
            return <AiOutlineInfoCircle className="inline-block mr-2 text-gray-500" />;
          default:
            return null;
        }
      };

  return (
      <article className="bg-white p-6 rounded-xl shadow-xl space-y-6 transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Analysis</h3>
      
      {/* Summary Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-1.5 h-6 bg-indigo-600 mr-3 rounded"></span>
          Summary
        </h4>
        <div className="prose prose-indigo max-w-none text-gray-700">
          <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
        </div>
      </div>

      {/* Key Insights Section */}
      {keyPoints.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 flex items-center mb-3">
            <FiList className="inline-block mr-2 text-gray-500" />
            Key Insights
          </h4>
          <ul className="space-y-2">
            {keyPoints.map((kp, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2"></span>
                <span className="text-gray-600">{kp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sentiment Analysis Section */}
      {sentiment && sentiment !== "Unknown" && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 flex items-center mb-3">
            {sentimentIcon()}
            Sentiment Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Overall Sentiment:</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                sentiment === "Positive" 
                  ? "bg-green-100 text-green-800" 
                  : sentiment === "Negative" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-gray-100 text-gray-800"
              }`}>
                {sentimentIcon()}
                {sentiment}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Emotion Tags:</p>
              <div className="flex flex-wrap gap-2">
                {analysis.emotionTags?.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tone & Intent Section */}
      {analysis.tone && analysis.intent && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 flex items-center mb-3">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Tone & Intent
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Tone:</p>
              <p className="text-gray-800 font-medium">{analysis.tone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Intent:</p>
              <p className="text-gray-800 font-medium">{analysis.intent}</p>
            </div>
          </div>
        </div>
      )}

      {/* Named Entity Extraction Section */}
      {analysis.namedEntities && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 flex items-center mb-3">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Named Entity Extraction
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.namedEntities).map(([type, entities]) => (
              <div key={type}>
                <p className="text-sm text-gray-500 capitalize">{type}:</p>
                <div className="flex flex-wrap gap-2">
                  {entities.map((entity, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structural Analysis Section */}
      {analysis.readabilityScore && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 flex items-center mb-3">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Structural Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Writing Style:</p>
              <p className="text-gray-800 font-medium">{analysis.writingStyle || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Readability Score:</p>
              <p className="text-gray-800 font-medium">{analysis.readabilityScore}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 flex items-center mb-3">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2"></span>
                <span className="text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      



      {/* Tone & Intent Section */}
      {analysis.tone && analysis.intent && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Tone & Intent
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Tone:</p>
              <p className="text-gray-800 font-medium">{analysis.tone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Intent:</p>
              <p className="text-gray-800 font-medium">{analysis.intent}</p>
            </div>
          </div>
        </div>
      )}

      {/* Named Entity Extraction Section */}
      {analysis.namedEntities && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Named Entity Extraction
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.namedEntities).map(([type, entities]) => (
              <div key={type}>
                <p className="text-sm text-gray-500 capitalize">{type}:</p>
                <div className="flex flex-wrap gap-2">
                  {entities.map((entity, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structural Analysis Section */}
      {analysis.readabilityScore && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Structural Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Writing Style:</p>
              <p className="text-gray-800 font-medium">{analysis.writingStyle || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Readability Score:</p>
              <p className="text-gray-800 font-medium">{analysis.readabilityScore}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Recommendations
          </h4>
          <ul className="list-disc list-inside pl-6 text-gray-600 space-y-1">
            {analysis.recommendations.map((rec, i) => (
              <li key={i} className="pl-2 border-l-2 border-indigo-100">{rec}</li>
            ))}
          </ul>
        </div>
      )}


      {keyPoints.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiList className="inline-block mr-2 text-gray-500" />
            Key Points
          </h4>
          <ul className="list-disc list-inside pl-6 text-gray-600 space-y-1">
            {keyPoints.map((kp, i) => (
              <li key={i} className="pl-2 border-l-2 border-indigo-100">{kp}</li>
            ))}
          </ul>
        </div>
      )}

      {keywords.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <span 
                key={i} 
                className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full 
                         hover:bg-indigo-100 transition-colors duration-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {sentiment && sentiment !== "Unknown" && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            {sentimentIcon()}
            Sentiment
          </h4>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            sentiment === "Positive" 
              ? "bg-green-100 text-green-800" 
              : sentiment === "Negative" 
                ? "bg-red-100 text-red-800" 
                : "bg-gray-100 text-gray-800"
          }`}>
            {sentimentIcon()}
            {sentiment}
          </div>
        </div>
      )}

      {notes && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-700 flex items-center">
            <FiTag className="inline-block mr-2 text-gray-500" />
            Notes
          </h4>
          <p className="text-gray-600">{notes}</p>
        </div>
      )}
    </article>
  );
}

AnalysisResult.propTypes = {
  data: PropTypes.shape({
    document: PropTypes.shape({
      analysis: PropTypes.shape({
        summary: PropTypes.string,
        keyPoints: PropTypes.arrayOf(PropTypes.string),
        keywords: PropTypes.arrayOf(PropTypes.string),
        sentiment: PropTypes.string,
        notes: PropTypes.string,
        rawGeminiResponse: PropTypes.string
      })
    })
  }),
};
