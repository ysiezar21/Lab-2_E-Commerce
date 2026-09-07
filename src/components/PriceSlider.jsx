import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import ReactSlider from 'react-slider';

const PriceSlider = connectRange(({ min, max, currentRefinement, refine }) => {
  const [values, setValues] = React.useState([
    currentRefinement.min ?? min ?? 0,
    currentRefinement.max ?? max ?? 1000
  ]);
  
React.useEffect(() => {
  setValues([
    currentRefinement.min ?? min ?? 0,
    currentRefinement.max ?? max ?? 1000
  ]);
}, [currentRefinement.min, currentRefinement.max, min, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  const handleAfterChange = (newValues) => {
    refine({ min: newValues[0], max: newValues[1] });
  };

  return (
    <div className="price-slider-container">
      <ReactSlider
        className="price-slider"
        thumbClassName="price-thumb"
        trackClassName="price-track"
        min={min ?? 0}
        max={max ?? 1000}
        value={values}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
        pearling
        minDistance={10}
        renderThumb={(props, state) => (
          <div {...props} data-value={`$${state.valueNow}`} />
        )}
      />
      <div className="price-values">
        <span className="price-min">${values[0]}</span>
        <span className="price-max">${values[1]}</span>
      </div>
    </div>
  );
});

export default PriceSlider;