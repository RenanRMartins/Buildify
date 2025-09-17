const fs = require('fs');

// Read the file
let content = fs.readFileSync('/Users/macbookair/Desktop/Buildify/src/components/PropertyPanel/ComponentPropsEditor.tsx', 'utf8');

// Replace all input field classes
content = content.replace(
  /className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/g,
  'className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"'
);

// Replace all textarea classes
content = content.replace(
  /className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/g,
  'className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"'
);

// Replace all select classes
content = content.replace(
  /className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/g,
  'className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"'
);

// Replace all label classes
content = content.replace(
  /className="block text-xs font-medium text-gray-600 mb-1"/g,
  'className="block text-xs font-medium text-white/70 mb-1"'
);

// Replace all checkbox classes
content = content.replace(
  /className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/g,
  'className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"'
);

// Replace all checkbox label classes
content = content.replace(
  /className="text-sm text-gray-700"/g,
  'className="text-sm text-white/90"'
);

// Replace all clear button classes
content = content.replace(
  /className="px-2 py-2 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"/g,
  'className="px-2 py-2 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"'
);

// Replace all clear button classes (alternative)
content = content.replace(
  /className="px-2 py-1 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"/g,
  'className="px-2 py-1 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"'
);

// Replace all clear all button classes
content = content.replace(
  /className="px-2 py-1 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"/g,
  'className="px-2 py-1 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"'
);

// Replace main label class
content = content.replace(
  /className="block text-sm font-medium text-gray-700"/g,
  'className="block text-sm font-medium text-white/90"'
);

// Write the file back
fs.writeFileSync('/Users/macbookair/Desktop/Buildify/src/components/PropertyPanel/ComponentPropsEditor.tsx', content);

console.log('Input fields updated successfully!');
