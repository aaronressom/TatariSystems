// Utility function to handle asset paths for GitHub Pages and Render deployment
export const getAssetPath = (path: string): string => {
  return `/${path.replace(/^\//, '')}`;
};

// Debug function to check all asset paths
export const debugAssetPaths = () => {
  const assets = [
    'assets/tatarilogo.png',
    'headshots/dalban.jpg',
    'headshots/boucheseiche.jpg'
  ];
  
  console.log('=== Asset Path Debug ===');
  assets.forEach(asset => {
    console.log(`${asset} -> ${getAssetPath(asset)}`);
  });
  console.log('Environment:', process.env.NODE_ENV);
  console.log('=======================');
}; 