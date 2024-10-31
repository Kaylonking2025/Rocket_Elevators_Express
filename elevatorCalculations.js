// Import the calculations module
const { costs } = require('./agent.js'); 

// this function is for validating inputs
function validateInputs(apartments, floors, tier) {
    if (!costs[tier]) {
        return { valid: false, message: `Invalid tier: ${tier}` };
    }

    if (typeof apartments !== 'number' || typeof floors !== 'number') {
        return { valid: false, message: 'Apartments and floors must be numbers.' };
    }

    if (!Number.isInteger(apartments) || !Number.isInteger(floors)) {
        return { valid: false, message: 'Apartments and floors must be integers.' };
    }

    if (apartments <= 0 || floors <= 0) {
        return { valid: false, message: 'Apartments and floors must be greater than zero.' };
    }

    return { valid: true };
}

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
    const validation = validateInputs(apartments, floors, tier);
    if (!validation.valid) {
        return { status: 'error', message: validation.message };
    }

    const tierCosts = costs[tier];
    const totalElevators = calculateElevators(apartments, floors);

    // Total cost calculation
    const totalCost = (tierCosts.elevatorCost * totalElevators) + (tierCosts.installationCost * totalElevators);

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
