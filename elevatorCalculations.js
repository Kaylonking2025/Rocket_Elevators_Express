
// Cost data for different tiers
const costs = {
    standard: {
        elevatorCost: 8000,
        installationCost: 0.10
    },
    premium: {
        elevatorCost: 12000,
        installationCost: 0.15
    },
    excelium: {
        elevatorCost: 15000,
        installationCost: 0.20
    }
};

// Function to calculate the number of elevators and total cost
function calculateElevatorsAndCost(apartments, floors, tier) {
    const tierCost = costs[tier];

    const totalCost = (tierCost.elevatorCost + tierCost.installationCost) * elevatorsRequired;

    return {
        elevatorsRequired,
        totalCost
    };
}

//==============================================CALCULATE ELEVATORS NEEDED==============================================//

//// Function to calculate required elevators
function calculateElevators(apartments, floors) {
    // Basic logic for elevator calculation

    //1. Divide the number of apartments by the number of floors to get an average of apartments per floor
 const apartmentsPerFloor = Math.ceil(apartments / floors); 
 console.log(apartmentsPerFloor)
    
    //2. divide the average apartments per floor by 6 to get the amount of required elevators
 const elevatorsRequired = Math.ceil(apartmentsPerFloor / 6);
 console.log(elevatorsRequired) 

    //3. Divide the number of floors by 20 to get the number of elevator banks
 const elevatorBanks = Math.ceil(floors / 20);
 console.log(elevatorBanks)

    //4. Multiply the number of elevator banks by the number of elevators required to get the total elevators required
 const totalElevators = Math.ceil(elevatorBanks * elevatorsRequired)
 console.log(totalElevators)
   
    return totalElevators;
}

//==============================================CALCULATE TOTAL COST==============================================//

// Function to calculate total cost based on tier
function calculateCost(apartments, floors, tier) {

    // Cost per unit
    const costs = {
        standard: {
            elevatorCost: 8000,
            installationCost: 0.10
        },
        premium: {
            elevatorCost: 12000,
            installationCost: 0.15
        },
        excelium: {
            elevatorCost: 15000,
            installationCost: 0.20
        }
    };
    // Instillation fee

    // Number of elevators

        //CALL THE FUNCTION
        const totalElevators = calculateElevator(apartments, floors)
          


    // Total Cost
    const tierCosts = costs[tier];
    const totalCost = tierCosts.baseCost + (tierCosts.costPerFloor * floors) + (tierCosts.costPerApartment * apartments);
    return totalCost;
}

module.exports = {
    calculateElevators,
    calculateCost,
    costs,
};