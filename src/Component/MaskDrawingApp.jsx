import React, { useEffect, useRef, useState } from "react";

const MaskDrawingApp = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [brushSize, setBrushSize] = useState(20);
  const [originalImage, setOriginalImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Limit canvas size to 800x600 while maintaining aspect ratio
        const maxWidth = 800;
        const maxHeight = 600;
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Store image size
        setImageSize({ width, height });
        
        // Clear canvas and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Create a drawing layer
        ctx.globalCompositeOperation = 'source-over';
        
        // Store original image
        setOriginalImage(img);
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  };

  // Setup drawing event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const startDrawing = (e) => {
      if (!originalImage) return;
      setIsDrawing(true);
      draw(e);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing || !originalImage) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      ctx.lineWidth = brushSize * Math.min(scaleX, scaleY);
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(255, 0, 0, 1)';  // i Changed it  to red for clear visibility
      ctx.globalCompositeOperation = 'source-over';

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing, brushSize, originalImage]);

  // Export mask
  const exportMask = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Create mask canvas with exact same dimensions
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');

    // Fill background black
    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    // Get image data of the drawing layer
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Create a new image data to store the mask
    const maskImageData = maskCtx.createImageData(canvas.width, canvas.height);
    const maskData = maskImageData.data;

    // Process each pixel
    for (let i = 0; i < data.length; i += 4) {
      // Check if the pixel is red (drawn area)
      if (data[i] === 255 && data[i+1] === 0 && data[i+2] === 0) {
        // Set mask pixel to white
        maskData[i] = 255;     // Red
        maskData[i+1] = 255;   // Green
        maskData[i+2] = 255;   // Blue
        maskData[i+3] = 255;   // Alpha
      } else {
        // Keep background black
        maskData[i] = 0;
        maskData[i+1] = 0;
        maskData[i+2] = 0;
        maskData[i+3] = 255;
      }
    }

    // Put the processed mask image data
    maskCtx.putImageData(maskImageData, 0, 0);

    // Generate mask image
    const maskDdata = maskCanvas.toDataURL('image/png');
    setMaskImage(maskDdata);
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw original image if exists
    if (originalImage) {
      ctx.drawImage(
        originalImage, 
        0, 
        0, 
        canvas.width, 
        canvas.height
      );
    }
  };

  const handleSubmit =() =>{
    const realOne = originalImage.src
    const maskOne = maskImage

    
    
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mask Drawing App</h1>
      
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg, image/png"
        onChange={handleImageUpload}
        className="mb-4"
      />
      
      <div className="mb-4">
        <label className="mr-2">Brush Size: {brushSize}</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>
      
      <canvas 
        ref={canvasRef} 
        id="canvas" 
        className="mx-auto mb-4 border border-black"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          display: imageSize.width > 0 ? 'block' : 'none'
        }}
      />
      
      <div className="flex justify-center  space-x-4">
        <button 
          onClick={exportMask} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!originalImage}
        >
          Create Mask
        </button>
        <button 
          onClick={clearCanvas}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={!originalImage}
        >
          Clear Canvas
        </button>
      </div>
      
      {originalImage && maskImage && (
        <div className=" flex flex-col items-center gap-5" >

          <div className=" flex justify-center gap-2 items-center mx-16">
          <div>
            <h2 className="text-xl mb-2">Original Image</h2>
            <img 
              src={originalImage.src} 
              alt="Original" 
             
              style={{ maxWidth: '50%', height: '50%' }}
            />
          </div>
          <div>
            <h2 className="text-xl mb-2">Generated Mask</h2>
            <img 
              src={maskImage} 
              alt="Mask" 
              
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
            
          </div>

          <button className="px-4 py-2 bg-blue-500 text-white rounded w-20" onClick={handleSubmit}>save</button>
         

          
        </div>

        
      )}
    </div>
  );
};

export default MaskDrawingApp;