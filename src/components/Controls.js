import { useRef } from 'react';
import useGeneralContext from '../hooks/useGeneralContext';

function Controls() {
  const { handleUploadedImage, handleResetFilters, saveImage } =
    useGeneralContext();
  const fileInputRef = useRef(null);

  return (
    <div className="controls">
      <button onClick={handleResetFilters} className="reset-btn btn">
        reset filters
      </button>
      <div className="img-controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadedImage}
          ref={fileInputRef}
          hidden
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="choose-btn btn"
        >
          choose image
        </button>
        <button onClick={saveImage} className="save-btn btn">
          save image
        </button>
      </div>
    </div>
  );
}
export default Controls;
