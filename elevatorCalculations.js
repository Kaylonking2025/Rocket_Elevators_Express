// Import the calculations module
const { costs } = require('./agent.js'); 


// this function is to calculate the number of elevators and total cost
function calculateElevators(apartments, floors) {
    const apartmentsPerFloor = Math.ceil(apartments / floors);
    const elevatorsRequired = Math.ceil(apartmentsPerFloor / 6);
    const elevatorBanks = Math.ceil(floors / 20);
    const totalElevators = Math.ceil(elevatorBanks * elevatorsRequired);
    
    return totalElevators;
}


// this function is to calculate total cost based on tier
function calculateCost(apartments, floors, tier) {
    console.log(tier)
    
    //get the particular tier out of the costs object

    const totalElevators = calculateElevators(apartments, floors); 

    const selectedTier = costs[tier]

    // Total cost calculation
    const totalCost = (selectedTier.elevatorCost * totalElevators) + (selectedTier.installationCost * totalElevators);
    
    console.log(totalCost)
    return {
        status: 'success',
        totalCost,
        totalElevators
    };

    
}

// Export functions
module.exports = {
    calculateElevators,
    calculateCost,

};
