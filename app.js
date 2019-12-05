//Part 1

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//All in our chart is 1 group
var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

// Level 1: D3 Dabbler//////////////////////////////////////////////////////

// d3.csv("data.csv").then(function(stateData) {
//   stateData.forEach(function(i) {
//     i.poverty = +i.poverty;
//     i.healthcare = +i.healthcare;
//   });
//   //Scale functions
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(stateData, d => d.poverty)*0.85, d3.max(stateData, d => d.poverty)*1.15])
//     .range([0, width]);

//   var yLinearScale = d3.scaleLinear()
//     .domain([d3.min(stateData, d => d.healthcare)*0.85, d3.max(stateData, d => d.healthcare)*1.15])
//     .range([height, 0]);

//   //Axes
//   var bottomAxis=d3.axisBottom(xLinearScale);
//   var leftAxis=d3.axisLeft(yLinearScale);
//   //append them
//   chartGroup.append("g").attr("transform",`translate(0, ${height})`).call(bottomAxis);
//   chartGroup.append("g").call(leftAxis);
//   //circles+text group
//   var elemEnter=chartGroup.append("g");

//   //circles
//   elemEnter.selectAll("circle")
//     .data(stateData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "15")
//     .attr("fill", "steelblue")
//     .attr("opacity", ".6")

//   // abbr text inside every circle
//   elemEnter.selectAll("text")
//     .data(stateData)
//     .enter()
//     .append("text")
//     .attr("dx", d => xLinearScale(d.poverty)-5)
//     .attr("dy", d => yLinearScale(d.healthcare)+5)
//     .text(function(d){return d.abbr})
//     .attr("font-size","10")
//     .attr("stroke", "white");

//     // Axes
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left + 40)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .attr("class", "axisText")
//     .attr("font-size","22")
//     .text("Lacks Healthcare(%)");

//   chartGroup.append("text")
//     .attr("transform", `translate(${width / 2 -50}, ${height + margin.top + 30})`)
//     .attr("class", "axisText")
//     .attr("font-size","22")
//     .text("In Poverty (%)");

// })

// Level 2: Impress the Boss (Optional Challenge Assignment)///////////////////
// Initial Axes
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";


// function used for updating x-scale var upon click on axis label
function xScale(stateData, chosenXAxis) {
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.85, d3.max(stateData, d => d[chosenXAxis]) * 1.15])
    .range([0, width]);
  return xLinearScale;
}
function yScale(stateData, chosenYAxis) {
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d[chosenYAxis]) * 0.85, d3.max(stateData, d => d[chosenYAxis]) * 1.15])
    .range([height, 0]);
  return yLinearScale;
}

// function used for updating xAxis and yAxis var upon click on axes labels
function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));
  return circlesGroup;
}
function renderCirclesText(circlesText, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  circlesText.transition()
    .duration(1000)
    .attr("dx", d => newXScale(d[chosenXAxis])-5)
    .attr("dy", d => newYScale(d[chosenYAxis])+3);
  return circlesText;
}
// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label1 = "Poverty:";
  }
  else if  (chosenXAxis === "age") {
    var label1 = "Age:";
  }
  else {
    var label1 = "Household Income:";
  }

  if (chosenYAxis === "obesity") {
    var label2 = "Obese:";
  }
  else if  (chosenXAxis === "healthcare") {
    var label2 = "Healthcare:";
  }
  else {
    var label2 = "Smokes:";
  }
  if (chosenXAxis === "poverty") {
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label1} ${d[chosenXAxis]}% <br>${label2} ${d[chosenYAxis]}%`);
    })
  }
  else {
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label1} ${d[chosenXAxis]}<br>${label2} ${d[chosenYAxis]}%`);
    })
  }
  chartGroup.call(toolTip);
  circlesGroup
    .on("mouseover", function(data) {
    toolTip.show(data,this);})
    .on("mouseout", function(data, index) {
    toolTip.hide(data);});

    return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(stateData) {
  // parse data
  stateData.forEach(function(i) {
    i.poverty = +i.poverty;
    i.age = +i.age;
    i.income = +i.income;
    i.obesity = +i.obesity;
    i.healthcare = +i.healthcare;
    i.smokes = +i.smokes;

  });
  // xLinearScale & yLinearScale
  var xLinearScale = xScale(stateData, chosenXAxis);
  var yLinearScale = yScale(stateData, chosenYAxis);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .call(leftAxis);
  //new group for circles and text:
  var elemEnter=chartGroup.append("g");
  // append initial circles 
  var circlesGroup = elemEnter.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 10)
    .attr("fill", "Magenta ")
    .attr("stroke","Crimson ")
    .attr("opacity", ".2");

  var circlesText=elemEnter.selectAll("text")
    .data(stateData)
    .enter()
    .append("text")
    .attr("dx", d => xLinearScale(d[chosenXAxis])-5)
    .attr("dy", d => yLinearScale(d[chosenYAxis])+3)
    .text(function(d){return d.abbr})
    .attr("font-size","8")
    .attr("stroke", "Magenta")

  // Create group for  3 x- axis labels
  var labelsXGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var PovertyLabel = labelsXGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty")
    .classed("active", true)
    .attr("stroke","MediumVioletRed")
    .attr("font-size","15")
    .text("in Poverty(%)");

  var ageLabel = labelsXGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age")
    .classed("inactive", true)
    .attr("stroke","MediumVioletRed")
    .attr("font-size","15")
    .text("Age (Median)");
  var incomeLabel = labelsXGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income")
    .classed("inactive", true)
    .attr("stroke","MediumVioletRed")
    .attr("font-size","15")
    .text("Household Income (Median)");

    // Create group for  3 y- axis labels
  var labelsYGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)")

  var healthcareLabel = labelsYGroup.append("text")
    .attr("y", 0- margin.left+60 )
    .attr("x", 0- (height / 2) )
    .attr("value", "healthcare")
    .classed("active", true)
    .attr("stroke","BlueViolet")
    .attr("font-size","15")
    .text("Lacks Healthcare (%)");

  var smokesLabel = labelsYGroup.append("text")
    .attr("y", 0 - margin.left+40)
    .attr("x", 0 - (height / 2))
    .attr("value", "smokes")
    .classed("inactive", true)
    .attr("stroke","BlueViolet")
    .attr("font-size","15")
    .text("Smokes(%)");

  var obeseLabel = labelsYGroup.append("text")
    .attr("y", 0 - margin.left+20)
    .attr("x", 0 - (height / 2))
    .attr("value", "obesity")
    .classed("inactive", true)
    .attr("stroke","BlueViolet")
    .attr("font-size","15")
    .text("Obese(%)");  

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);


  // x axis labels event listener
  labelsXGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {
        chosenXAxis = value;
        xLinearScale = xScale(stateData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxes(xLinearScale, xAxis);
        
        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
        circlesText = renderCirclesText(circlesText, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          PovertyLabel
            .classed("active", true)
            .classed("inactive", false);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "age") {
          PovertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          PovertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
  
  // y axis labels event listener
  labelsYGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {
        chosenYAxis = value;
        yLinearScale = yScale(stateData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);
        
        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
        circlesText = renderCirclesText(circlesText, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  

        // changes classes to change bold text
        if (chosenYAxis === "obesity") {
          obeseLabel
            .classed("active", true)
            .classed("inactive", false);
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "healthcare") {
          obeseLabel
            .classed("active", false)
            .classed("inactive", true);
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          obeseLabel
            .classed("active", false)
            .classed("inactive", true);
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
});