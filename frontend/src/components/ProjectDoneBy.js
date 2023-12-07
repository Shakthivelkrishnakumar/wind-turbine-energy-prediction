import React from 'react';

const ProjectDoneBy = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 order-lg-1">
          <div className="d-flex align-items-center h-100">
            <div>
              <h2>Wind Energy Prediction Range Scale</h2>
              <p>Small Residential Turbines: 1 kW - 10 kW</p>
              <p>Medium-sized Turbines for Farms or Small Businesses: 10 kW - 100 kW</p>
              <p>Large-scale Turbines for Commercial Use: 100 kW - 3,000 kW (3 MW)</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 order-lg-2">
          <img
            src="https://img.freepik.com/premium-photo/energy-efficiency-bar-chart-wind-turbine-digitally-generated-image_519469-3250.jpg" // Replace with your image URL
            alt="Wind Turbine"
            className="img-fluid rounded"
            style={{ maxWidth: "100%", maxHeight: "700px" }} // Adjust image size
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDoneBy;
