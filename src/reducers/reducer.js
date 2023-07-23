import {
  UPLOAD_IMAGE,
  ACTIVE_FILTER_UPDATE,
  UPDATE_SLIDER_VALUE,
  UPDATE_IMAGE_DIRECTIONS,
  RESET_FILTERS,
} from '../utils/actions';

function reducer(state, action) {
  // change the "uploadedImage" with the selected image
  // also each time the user select a new image ===> reset filters to initial values
  if (action.type === UPLOAD_IMAGE) {
    const { image, initialFiltersState } = action.payload;
    return {
      ...state,
      uploadedImage: image,
      ...initialFiltersState,
    };
  }

  // change the "activeFilter" with the selected filter
  // also put the initial value of the selected filter as the initial value of the "sliderValue"
  if (action.type === ACTIVE_FILTER_UPDATE) {
    const { filterName } = action.payload;
    return {
      ...state,
      activeFilter: filterName,
      sliderValue: state.filters[filterName],
    };
  }

  // control the range input with "sliderValue" state
  // also put the controled value as the value of the selcted filter
  if (action.type === UPDATE_SLIDER_VALUE) {
    const { value } = action.payload;
    return {
      ...state,
      sliderValue: value,
      filters: { ...state.filters, [state.activeFilter]: value },
    };
  }

  // handle image directions based on the selected direction
  if (action.type === UPDATE_IMAGE_DIRECTIONS) {
    const { direction } = action.payload;
    if (direction === 'left') {
      return {
        ...state,
        filters: { ...state.filters, rotate: state.filters.rotate - 90 },
      };
    }
    if (direction === 'right') {
      return {
        ...state,
        filters: { ...state.filters, rotate: state.filters.rotate + 90 },
      };
    }
    if (direction === 'horizontal') {
      return {
        ...state,
        filters: {
          ...state.filters,
          flipHorizontal: state.filters.flipHorizontal * -1,
        },
      };
    }
    if (direction === 'vertical') {
      return {
        ...state,
        filters: {
          ...state.filters,
          flipVertical: state.filters.flipVertical * -1,
        },
      };
    }
  }

  if (action.type === RESET_FILTERS) {
    const { initialFiltersState } = action.payload;
    return {
      ...state,
      ...initialFiltersState,
    };
  }

  throw new Error(`NO matching "${action.type} - action type"`);
}
export default reducer;
