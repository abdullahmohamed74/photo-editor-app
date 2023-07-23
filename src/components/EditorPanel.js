import { filterOptions, rotateOptions } from '../utils/helpers';
import useGeneralContext from './../hooks/useGeneralContext';

function EditorPanel() {
  const {
    activeFilter,
    sliderValue,
    handleActivefilterChange,
    handleSliderChange,
    handleImageDirections,
  } = useGeneralContext();

  return (
    <div className="editor-panel">
      <div className="filters">
        <h2>filters</h2>
        <div className="filter-options">
          {filterOptions.map((option) => {
            const { id, name } = option;
            return (
              <button
                onClick={() => handleActivefilterChange(name)}
                className={`btn ${activeFilter === name ? 'active' : ''}`}
                key={id}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div className="filter-control">
          <div className="filter-info">
            <p className="filter-name">{activeFilter}</p>
            <p className="filter-value">{sliderValue}%</p>
          </div>
          <input
            className="range-input"
            type="range"
            min={0}
            max={
              activeFilter === 'brightness' || activeFilter === 'saturation'
                ? '200'
                : '100'
            }
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>
      </div>

      <div className="rotate">
        <h2>rotate & flip</h2>
        <div className="rotate-options">
          {rotateOptions.map((option) => {
            const { id, icon, direction } = option;
            return (
              <button
                onClick={() => handleImageDirections(direction)}
                className="btn"
                key={id}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default EditorPanel;
