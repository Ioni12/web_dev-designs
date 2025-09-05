import React from "react";

const Loading = ({ size = "md", text = "Loading", showText = true }) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const containerSpacing = {
    sm: "space-x-1",
    md: "space-x-2",
    lg: "space-x-3",
  };

  return (
    <div className="rounded-[40px] shadow-lg border border-zinc-400 bg-white p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`flex items-center ${containerSpacing[size]}`}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${sizeClasses[size]} bg-slate-400 rounded-full shadow-lg`}
              style={{
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
              }}
            ></div>
          ))}
        </div>
        {showText && (
          <span
            className={`${textSizes[size]} font-mono tracking-wider text-slate-800 font-bold`}
          >
            {text.toUpperCase()}...
          </span>
        )}
        <style jsx>{`
          @keyframes bounce {
            0%,
            80%,
            100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// Usage examples
const LoadingDemo = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-mono tracking-wider text-slate-800 mb-4">
            Loading Components
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              SMALL
            </h3>
            <Loading size="sm" text="Loading" />
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              MEDIUM
            </h3>
            <Loading />
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              LARGE
            </h3>
            <Loading size="lg" text="Please wait" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              DOTS ONLY
            </h3>
            <Loading showText={false} />
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              CUSTOM TEXT
            </h3>
            <Loading text="Fetching data" />
          </div>
        </div>

        {/* Alternative styles matching different navbar states */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              PROCESSING
            </h3>
            <div className="rounded-[40px] shadow-lg border border-zinc-400 bg-purple-100 p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-gray-900 rounded-full shadow-lg"
                      style={{
                        animation: `bounce 1.4s ease-in-out ${
                          i * 0.16
                        }s infinite both`,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-lg font-mono tracking-wider text-gray-900 font-bold">
                  PROCESSING...
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
              STARTING
            </h3>
            <div className="rounded-[40px] shadow-lg border border-zinc-400 bg-blue-400 p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-gray-900 rounded-full shadow-lg"
                      style={{
                        animation: `bounce 1.4s ease-in-out ${
                          i * 0.16
                        }s infinite both`,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-lg font-mono tracking-wider text-gray-900 font-bold">
                  STARTING...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-style loading */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-mono text-slate-700 font-bold tracking-wide text-center">
            MOBILE STYLE
          </h3>
          <div className="rounded-3xl shadow-lg border border-zinc-400 border-opacity-30 bg-white p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-mono mb-2 tracking-wide text-slate-800">
                LOADING YOUR CONTENT
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-slate-400 rounded-full shadow-lg"
                    style={{
                      animation: `bounce 1.4s ease-in-out ${
                        i * 0.16
                      }s infinite both`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
