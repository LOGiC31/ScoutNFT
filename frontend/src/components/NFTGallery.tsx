import React, { useState, useEffect } from 'react';
import './NFTGallery.css';

interface NFT {
  name: string;
  image_path: string;
}

const NFTGallery: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch('http://localhost:8000/fetch-nfts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NFT[] = await response.json();
        setNfts(data);
        setTotalImages(data.length);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching NFTs:", err);
        setError("Failed to load NFTs. Please try again later.");
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="nft-gallery-container">
      <h2>Explore Our NFTs</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="nft-grid">
        {nfts.map((nft) => (
          <div key={nft.name} className="nft-item">
            <h3>{nft.name}</h3>
            <img
              src={`/${nft.image_path}`}
              alt={nft.name}
              className="nft-image"
              onError={() => console.error(`Failed to load image: /${nft.image_path}`)}
            />
          </div>
        ))}
        {nfts.length === 0 && !error && <p>No NFTs available.</p>}
      </div>
    </div>
  );
};

export default NFTGallery;