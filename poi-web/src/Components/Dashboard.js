import React from 'react';
import axios from 'axios';

import AISuggestionsTable from './AISuggestionsTable';
import SummaryBox from './SummaryBox';
import SelectionBox from './SelectionBox';
import SelectionBoxTwo from './SelectionBoxTwo';


const strutureList = ['truck', 'warehouse', 'factory', 'silo', 'water tank', 'cooling tower', 'chimney', 'conveyor systems', 'pipelines', 'power installation', 'processing tower'];

class Dashboard extends React.Component {
  state = {
    aiSuggestions: {},
    allPOIs: [],
    aiSummary: "No Summary.",
    aiObjects: [],
    currentStructure: '',
  }

  callAPI = async (input, context) => {
    if (!input || !context) {
      console.log("No input, No context.");
      return;
    }

    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:9100/api/poi',
        params: {
          input,
          context
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response) {
        return response.data;
      }
    } catch(error) {
      return error;
    }
  }

  arrToObj = (arr) => {
    const resObj = {};
    arr.forEach(item => {
      resObj[item] = '';
    });

    return resObj;
  }

  extractAttributes(response) {
    if (!response || typeof response !== 'string') {
        return [];
    }

    // Remove unwanted characters like brackets, quotes, and extra spaces
    response = response.replace(/[\[\]`"'{}]/g, '').trim();

    // Normalize spaces and replace underscores with spaces
    response = response.replace(/_/g, ' ');

    // Split based on commas, spaces, or new lines
    let attributes = response.split(/[\s,]+/);

    // Remove empty strings and standardize attribute case
    attributes = attributes.map(attr => attr.trim()).filter(attr => attr.length > 0);

    return attributes;
  }

  POIObjects = async () => {
    const { currentStructure } = this.state;
    if (!currentStructure) {
      console.log("No POI selected.");
      return;
    }
    const context = "If it is an item, return at least 5 parts or components of that item. If it is a structure or building, return at least 5 items that would normally be found in that building or that are used to construct the building. Strictly return only a list in array format. Do not provide example values, descriptions, code or explanations";
    const res = await this.callAPI(currentStructure, context);
    
    const resArr = this.extractAttributes(res.data);
    this.setState({ aiObjects: [...resArr] });
  }

  POICreation = async () => {
    const { allPOIs } = this.state;
    console.log('allPOIs', allPOIs)
    if (allPOIs.length <= 0) {
      console.log("No POIs selected.");
      return;
    }
    const context = "Given an item, return at least 5 possible descriptive attributes of that item. Strictly return only a list in array format. Do not provide example values, descriptions, code or explanations";
    
    allPOIs.forEach(async(poi) => {
      const res = await this.callAPI(poi, context);
      const resArr = this.extractAttributes(res.data);
      const resObj = this.arrToObj([...resArr]);
      
      // Use functional update to prevent overwriting previous state
      if (poi && Object.keys(resObj).length > 0) {
        this.setState(prevState => ({
          aiSuggestions: { 
            ...prevState.aiSuggestions, 
            [poi]: resObj 
          }
        }));
      }
    })
  }

  POIDisplay = async () => {
    const { aiSuggestions } = this.state;
    if (Object.keys(aiSuggestions).length <= 0) {
      console.log("No POI selected.");
      return;
    }
    const context = "Give a summary or brief report of all the items in that list like you are reporting to a manager.";
    const res = await this.callAPI(JSON.stringify(aiSuggestions), context);
    this.setState({ aiSummary: res.data });
  }

  setCurrentStructure = value => {
    this.setState({ currentStructure: value });
  }

  setAllPOIs = value => {
    const { allPOIs } = this.state;
    this.setState({ allPOIs: [...allPOIs, value] });
    this.setState(prevState => ({
      aiSuggestions: { 
        ...prevState.aiSuggestions, 
        [value]: {} 
      }
    }));
    // this.setState({ aiSuggestions: { ...aiSuggestions, [value]: {} } });
  }

  updateAiObjects = value => {
    const { aiObjects } = this.state;
    this.setState({ aiObjects: [...aiObjects, value] });
  }

  deletePOI = value => {
    const { aiSuggestions } = this.state;
    if (aiSuggestions[value]) {
      delete aiSuggestions[value];
    };
    this.setState({ aiSuggestions: { ...aiSuggestions } });
  }

  updatePOIAttribute = (value, subKey, key) => {
    this.setState(prevState => ({
      aiSuggestions: { 
        ...prevState.aiSuggestions, 
        [key]: { 
          ...prevState.aiSuggestions[key],  // Preserve existing data
          [subKey]: value  // Example update (replace with the actual intended key)
        } 
      }
    }));
  }

  addPOIAttribute = (value, subKey, key) => {
    this.setState(prevState => ({
      aiSuggestions: { 
        ...prevState.aiSuggestions, 
        [key]: { 
          ...prevState.aiSuggestions[key],  // Preserve existing data
          [subKey]: value  // Example update (replace with the actual intended key)
        } 
      }
    }));
  }

  deletePOIAttribute = (subKey, key) => {
    const { aiSuggestions } = this.state;
    if (aiSuggestions[key].hasOwnProperty(subKey)) {
      delete aiSuggestions[key][subKey];
    };
    this.setState({ aiSuggestions: { ...aiSuggestions } });
  }

  render() {
    const { aiSummary, aiSuggestions, aiObjects, currentStructure } = this.state;

    console.log('aiSuggestions', aiSuggestions);
    return (
      <>
        <h2 className="project-name-heading" style={{ color: '#007bff' }}>Team Thr33</h2>
        <h2 className="project-name-heading">POI Management AI Assistant</h2>
        <br />
        <div className="box-1">
          <div className="box-2">
            <div>
              <SelectionBox title="Select Structure" subtitle="(Potential POI suggestions)" options={strutureList} onSelect={this.setCurrentStructure} button_children="Generate POIs" onSubmit={this.POIObjects} />
            </div>
            <div>
              <SelectionBoxTwo title={`Choose POIs for ${currentStructure}`} options={aiObjects} updateOptions={this.updateAiObjects} onSelect={this.setAllPOIs} button_children="Generate Attributes for All POIs" onSubmit={this.POICreation} />
            </div>
            <div>
              <SummaryBox title="POI Summary" text={aiSummary} button_children="Generate Summary" onClick={this.POIDisplay} />
            </div>
          </div>
          <div>
            <AISuggestionsTable addPOIAttribute={this.addPOIAttribute} data={aiSuggestions} deletePOI={this.deletePOI} updatePOIAttribute={this.updatePOIAttribute} deletePOIAttribute={this.deletePOIAttribute} />
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    )
  }

}

export default Dashboard;
