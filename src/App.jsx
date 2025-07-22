import React, { useState } from 'react';

// --- SVG Icons (replaces lucide-react for a self-contained component) ---
const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconCode = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const IconWand = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>
);
const IconInfo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);


// --- Tab 1: Secure Encoder Component ---
const SecureEncoder = () => {
    const [textInput, setTextInput] = useState('');
    const [encodedResult, setEncodedResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const SUFFIX = '_OLiGankEwSPermOs';
    const PREFIX = '?edit=';

    const handleEncode = () => {
        if (!textInput) {
            setEncodedResult('');
            return;
        }
        const textToEncode = textInput + SUFFIX;
        try {
            const encoded = btoa(textToEncode);
            // Add the requested prefix to the final result
            setEncodedResult(PREFIX + encoded);
        } catch (error) {
            console.error("Encoding Error:", error);
            setEncodedResult("Error: Input contains characters that cannot be encoded.");
        }
    };

    const handleCopy = () => {
        if (!encodedResult) return;
        navigator.clipboard.writeText(encodedResult).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Secure Encoder</h2>
                <p className="text-gray-500 mt-1">Encode text securely for your integrations.</p>
            </div>
            <div>
                <label htmlFor="text-input" className="block text-sm font-medium text-gray-600 mb-2">Your Text</label>
                <textarea
                    id="text-input"
                    rows="5"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full p-3 bg-white text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Type or paste your text here..."
                />
                <button
                    onClick={handleEncode}
                    className="w-full mt-4 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Encode Text
                </button>
            </div>
            {encodedResult && (
                <div className="mt-8">
                    <label htmlFor="result-output" className="block text-sm font-medium text-gray-600 mb-2">Encoded Result</label>
                    <div className="relative">
                        <pre id="result-output" className="w-full p-4 bg-gray-100 rounded-md text-indigo-600 font-mono whitespace-pre-wrap break-all border border-gray-200">
                            {encodedResult}
                        </pre>
                        <button onClick={handleCopy} className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-md text-xs transition-colors flex items-center">
                           {isCopied ? <IconCheck /> : <IconClipboard />}
                           <span className="ml-1.5">{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Tab 2: Script Converter Component ---
const ScriptConverter = () => {
  const [rawCode, setRawCode] = useState('');
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isCopiedHead, setIsCopiedHead] = useState(false);
  const [isCopiedBody, setIsCopiedBody] = useState(false);

  const convertStyleStringToObject = (styleString) => {
    if (!styleString) return '{}';
    const style = {};
    styleString.split(';').forEach(declaration => {
      if (declaration) {
        const [property, value] = declaration.split(':');
        if (property && value) {
          const camelCaseProperty = property.trim().replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
          style[camelCaseProperty] = value.trim();
        }
      }
    });
    return JSON.stringify(style, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
  };

  const formatJsCode = (jsCode) => {
    // Basic formatting for readability
    let formatted = jsCode.replace(/;/g, ';\n  ').replace(/{/g, '{\n  ').replace(/}/g, '\n}');
    return `{\`\n  ${formatted}\n\`}`;
  };

  const processNode = (node, indent = '') => {
    if (node.nodeType === 8) return `${indent}{/* ${node.textContent.trim()} */}`;
    if (node.nodeType === 3 && !node.textContent.trim()) return '';
    if (node.nodeType === 3) return `${indent}${node.textContent.trim()}`;
    
    if (node.nodeType === 1) {
      const tagName = node.tagName.toLowerCase();
      let props = '';

      if (tagName === 'script') {
        let scriptProps = '';
        for (const attr of node.attributes) {
          scriptProps += attr.name === 'async' ? ` async` : ` ${attr.name}="${attr.value}"`;
        }
        if (node.textContent.trim()) {
          const formattedJs = formatJsCode(node.textContent.trim());
          const idProp = node.id ? `id="${node.id}"` : `id="inline-script-${Math.random().toString(36).substr(2, 9)}"`;
          return `${indent}<Script ${idProp}${scriptProps} strategy="afterInteractive">\n  ${formattedJs}\n</Script>`;
        }
        return `${indent}<Script${scriptProps.trim()} strategy="afterInteractive" />`;
      }

      for (const attr of node.attributes) {
        props += attr.name === 'style' ? ` style={${convertStyleStringToObject(attr.value)}}` : ` ${attr.name}="${attr.value}"`;
      }

      const children = Array.from(node.childNodes).map(child => processNode(child, indent + '  ')).filter(Boolean).join('\n');
      
      if (['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) {
        return `${indent}<${tagName}${props} />`;
      }
      
      return children ? `${indent}<${tagName}${props}>\n${children}\n${indent}</${tagName}>` : `${indent}<${tagName}${props}></${tagName}>`;
    }
    return '';
  };

  const handleConvert = () => {
    setHeadCode('');
    setBodyCode('');
    setInstructions('');
    if (!rawCode.trim()) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawCode, 'text/html');
    
    const headNodes = Array.from(doc.head.childNodes);
    const bodyNodes = Array.from(doc.body.childNodes);
    
    const convertedHeadParts = headNodes.map(node => processNode(node)).filter(Boolean);
    const convertedBodyParts = bodyNodes.map(node => processNode(node)).filter(Boolean);
    
    let instructionsText = '';
    let hasHeadCode = false;

    if (convertedHeadParts.length > 0) {
      setHeadCode(convertedHeadParts.join('\n'));
      instructionsText += `1. Import the Script and Head components:\n   import Script from 'next/script';\n   import Head from 'next/head';\n\n2. Paste the "Head Code" inside the <Head> component in your main layout file.\n\n`;
      hasHeadCode = true;
    }

    if (convertedBodyParts.length > 0) {
      setBodyCode(convertedBodyParts.join('\n'));
      instructionsText += `${hasHeadCode ? '3.' : '1.'} Paste the "Body Code" right after the opening <body> tag in your layout.\n\n`;
    }
    
    if (!instructionsText) {
      setInstructions("Could not parse valid <script> or <noscript> tags. Please check your input.");
    } else {
      setInstructions(instructionsText.trim());
    }
  };

  const handleCopy = (type) => {
    const textToCopy = type === 'head' ? headCode : bodyCode;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
        if (type === 'head') {
            setIsCopiedHead(true);
            setTimeout(() => setIsCopiedHead(false), 2000);
        } else {
            setIsCopiedBody(true);
            setTimeout(() => setIsCopiedBody(false), 2000);
        }
    }).catch(err => console.error('Failed to copy text: ', err));
  };
  
  const placeholderText = `<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-XXXX');</script>\n<!-- End Google Tag Manager -->`;

  return (
    <div>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Script Tag Converter</h2>
            <p className="text-gray-500 mt-1">Convert HTML snippets to React / Next.js components.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
                <label htmlFor="raw-code" className="text-md font-semibold mb-2 flex items-center text-gray-700">
                    <IconCode /> <span className="ml-2">Input HTML</span>
                </label>
                <textarea
                    id="raw-code"
                    value={rawCode}
                    onChange={(e) => setRawCode(e.target.value)}
                    placeholder={placeholderText}
                    className="flex-grow bg-white border border-gray-300 rounded-lg p-4 font-mono text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                    rows="15"
                />
            </div>

            <div className="flex flex-col space-y-4">
                {!headCode && !bodyCode && !instructions && (
                    <div className="h-full bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-center text-gray-500">
                        <IconWand /> <span className="ml-2">Output will appear here...</span>
                    </div>
                )}
                {instructions && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-md font-semibold mb-2 flex items-center text-blue-700">
                            <IconInfo /> <span className="ml-2">Instructions</span>
                        </h3>
                        <p className="font-mono text-sm text-blue-800 whitespace-pre-wrap">{instructions}</p>
                    </div>
                )}
                {headCode && (
                    <div className="relative">
                        <h3 className="text-md font-semibold mb-2 text-gray-700">Head Code</h3>
                        <pre className="bg-gray-100 border border-gray-200 rounded-lg p-4 pr-16 overflow-auto">
                            <code className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{headCode}</code>
                        </pre>
                        <button onClick={() => handleCopy('head')} className="absolute top-10 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded-md flex items-center transition-colors text-xs">
                            {isCopiedHead ? <IconCheck /> : <IconClipboard />}
                            <span className="ml-1.5">{isCopiedHead ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                )}
                {bodyCode && (
                    <div className="relative">
                        <h3 className="text-md font-semibold mb-2 text-gray-700">Body Code</h3>
                        <pre className="bg-gray-100 border border-gray-200 rounded-lg p-4 pr-16 overflow-auto">
                            <code className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{bodyCode}</code>
                        </pre>
                        <button onClick={() => handleCopy('body')} className="absolute top-10 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded-md flex items-center transition-colors text-xs">
                            {isCopiedBody ? <IconCheck /> : <IconClipboard />}
                            <span className="ml-1.5">{isCopiedBody ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
        <div className="text-center mt-6">
            <button
                onClick={handleConvert}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                Convert Code
            </button>
        </div>
    </div>
  );
};


// --- Main App Component with Tabs ---
export default function App() {
    const [activeTab, setActiveTab] = useState('encoder');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'encoder':
                return <SecureEncoder />;
            case 'converter':
                return <ScriptConverter />;
            default:
                return <SecureEncoder />;
        }
    };

    const TabButton = ({ tabName, title }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                        ? 'bg-blue-500 text-white shadow'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >
                {title}
            </button>
        );
    };

    return (
        <div 
            className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center font-sans p-4" 
            style={{ border: '5px solid red' }}
        >
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex justify-center mb-8">
                    <img 
                        src="https://get.nicejob.com/hubfs/raw_assets/public/atomhq-com/assets/images/nicejob_logo.svg" 
                        alt="NiceJob Logo" 
                        className="h-10"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x40/007bff/ffffff?text=NiceJob'; }}
                    />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex justify-center space-x-2 mb-8">
                        <TabButton tabName="encoder" title="Secure Encoder" />
                        <TabButton tabName="converter" title="Script Converter" />
                    </div>
                    {renderTabContent()}
                </div>
                <footer className="text-center mt-6">
                    <p className="text-sm text-gray-400">A NiceJob Tool</p>
                </footer>
            </div>
        </div>
    );
}
