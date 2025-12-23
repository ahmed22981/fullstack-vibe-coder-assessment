import React, {useState} from "react";
import {
  Sparkles,
  Copy,
  RefreshCw,
  ArrowRight,
  Check,
  Loader2,
  Zap,
} from "lucide-react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const PromptEnhancerHero = () => {
  const [userInput, setUserInput] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const MIN_CHARS = 15;

  const examplePrompts = [
    "موقع لبيع الكتب",
    "تطبيق للياقة البدنية",
    "E-Commerce for clothes",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setCharCount(value.length);
  };

  const enhancePrompt = async () => {
    // Safety check in case of devtools manipulation
    if (userInput.trim().length < MIN_CHARS) return;

    setIsLoading(true);
    setShowResult(false);

    try {
      const response = await fetch("http://localhost:5000/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idea: userInput}),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setEnhancedPrompt(data.enhancedPrompt);
      setShowResult(true);
    } catch (error) {
      console.error("React fetch Error:", error);
      setEnhancedPrompt("Server is waking up, please try again in a moment...");
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(enhancedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const reset = () => {
    setUserInput("");
    setEnhancedPrompt("");
    setShowResult(false);
    setCharCount(0);
  };

  const fillExample = (example) => {
    setUserInput(example);
    setCharCount(example.length);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative font-sans">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        {!showResult && (
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2 mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Powered by Me</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Turn Ideas into
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                Production-Ready Prompts
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Transform your rough website ideas into detailed, professional
              prompts that AI builders and developers can actually use.
            </p>
          </div>
        )}

        {/* Input Section */}
        {!showResult ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                What's your website idea? (Min {MIN_CHARS} characters)
              </label>

              <textarea
                value={userInput}
                onChange={handleInputChange}
                placeholder="Describe your idea in simple words... (e.g., A marketplace for high-end digital art assets)"
                className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-lg"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                <span
                  className={`text-sm transition-colors duration-300 ${
                    charCount >= MIN_CHARS
                      ? "text-green-400 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {charCount} / {MIN_CHARS} characters minimum
                </span>

                <button
                  onClick={enhancePrompt}
                  disabled={charCount < MIN_CHARS || isLoading}
                  className="w-full sm:w-auto group relative bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600/50 disabled:to-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed 
             px-4 py-2 text-sm rounded-lg
             md:px-8 md:py-3 md:text-base md:rounded-xl 
             font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      <span>Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Enhance My Prompt</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform hidden sm:block" />
                    </>
                  )}
                </button>
              </div>

              {/* Example Prompts */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => fillExample(example)}
                      className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full px-6 py-2 mb-4">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">
                  Enhanced Successfully
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Your Enhanced Prompt
              </h2>
              <p className="text-gray-400">
                Ready to use with any AI builder or developer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Before */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <h3 className="font-semibold text-gray-300">Before</h3>
                </div>
                <div className="bg-black/20 rounded-xl p-4 min-h-37.5">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {userInput}
                  </p>
                </div>
              </div>

              {/* After */}
              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 ring-2 ring-purple-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-purple-300">After</h3>
                </div>

                <SimpleBar
                  style={{maxHeight: 400}}
                  className="bg-black/20 rounded-xl custom-simplebar"
                >
                  <div className="p-4">
                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                      {enhancedPrompt}
                    </p>
                  </div>
                </SimpleBar>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={copyToClipboard}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                {isCopied ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Prompt
                  </>
                )}
              </button>

              <button
                onClick={reset}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                Try Another Idea
              </button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center max-w-md">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                <Sparkles className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Enhancing Your Prompt</h3>
              <p className="text-gray-400">
                Optimize AI is analyzing and improving your idea...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptEnhancerHero;
