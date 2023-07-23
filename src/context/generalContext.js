import { createContext, useReducer } from 'react';
import reducer from '../reducers/reducer';
import {
  ACTIVE_FILTER_UPDATE,
  UPLOAD_IMAGE,
  UPDATE_SLIDER_VALUE,
  UPDATE_IMAGE_DIRECTIONS,
  RESET_FILTERS,
} from '../utils/actions';

const GeneralContext = createContext();

const initialFiltersState = {
  activeFilter: 'brightness',
  sliderValue: 100,
  filters: {
    brightness: 100,
    saturation: 100,
    inversion: 0,
    grayscale: 0,
    rotate: 0,
    flipHorizontal: 1,
    flipVertical: 1,
  },
};

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    uploadedImage: null,
    ...initialFiltersState,
  });

  // get the uploaded image that the user select
  const handleUploadedImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch({
      type: UPLOAD_IMAGE,
      payload: { image: file, initialFiltersState },
    });
  };

  // change the filter
  // also put the initial value of filter as the initial value of the "sliderValue"
  const handleActivefilterChange = (filterName) => {
    dispatch({ type: ACTIVE_FILTER_UPDATE, payload: { filterName } });
  };

  // control the range input with "sliderValue" state
  // also put the controled value as the value of the filter
  const handleSliderChange = (e) => {
    dispatch({ type: UPDATE_SLIDER_VALUE, payload: { value: e.target.value } });
  };

  // change the image direction based on the selected direction
  const handleImageDirections = (direction) => {
    dispatch({ type: UPDATE_IMAGE_DIRECTIONS, payload: { direction } });
  };

  // reset filters to the initial values
  const handleResetFilters = () => {
    dispatch({ type: RESET_FILTERS, payload: { initialFiltersState } });
  };

  const {
    brightness,
    saturation,
    inversion,
    grayscale,
    rotate,
    flipHorizontal,
    flipVertical,
  } = state.filters;

  // get a style object to apply it as inline style to the image
  const getStyle = () => {
    return {
      filter: `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`,
      transform: `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`,
    };
  };

  // save the image on your device by clicking on save image btn
  const saveImage = () => {
    // create canvas element
    const canvas = document.createElement('canvas');
    // access the drawing context using its getContext() method
    const ctx = canvas.getContext('2d');
    // creating an image from scratch
    const image = new Image();
    // When this script gets executed, the image starts loading.
    // If you try to call drawImage() before the image has finished loading, it won't do anything. So you need to be sure to use the load event so you don't try this before the image has loaded:
    image.onload = () => {
      // settting canvas width to actual image width
      canvas.width = image.naturalWidth;
      // settting canvas height to actual image height
      canvas.height = image.naturalHeight;
      // apply user selected filters to canvas image
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      // translate canvas from the center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      // apply user selected rotate to canvas image
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      // apply user selected flip to canvas image
      ctx.scale(flipHorizontal, flipVertical);

      // drawImage(image, x, y, width, height)
      // the coordinate (0, 0) ==> is the top-left corner of the canvas.
      // width and height ==> indicate the size to which to scale the image when drawing it onto the canvas.
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      // to download the image
      const link = document.createElement('a'); // create <a> element
      link.download = 'image.jpg'; // set <a> download value to 'image.jpg'
      link.href = canvas.toDataURL(); // set <a> href value to canvas data URL
      link.click(); // clicking <a> so the image is downloaded
    };
    // setting the src of the new created image with the user selected image
    image.src = URL.createObjectURL(state.uploadedImage);
  };

  return (
    <GeneralContext.Provider
      value={{
        ...state,
        handleUploadedImage,
        handleActivefilterChange,
        handleSliderChange,
        handleResetFilters,
        handleImageDirections,
        getStyle,
        saveImage,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export { Provider };
export default GeneralContext;
