import useGeneralContext from '../hooks/useGeneralContext';
import imgPlaceholder from '../images/image-placeholder.svg';

function PreviewImage() {
  const { uploadedImage, getStyle } = useGeneralContext();

  return (
    <div className="preview-img">
      {uploadedImage ? (
        <img
          style={getStyle()}
          src={URL.createObjectURL(uploadedImage)}
          className="img"
          alt="preview"
        />
      ) : (
        <img src={imgPlaceholder} alt="preview" />
      )}
    </div>
  );
}
export default PreviewImage;
