type Doctor = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  distance: number;
  queueStatus: number;
  waitTime: number;
  rating: number;
  availability: string;
  contact: string;
  fee: number;
  medicalCenterAddress: string;
};

const firstNames = [
  "John", "Sarah", "Michael", "Jessica", "David", "Emily", "James", "Olivia", "Daniel", "Sophia",
  "Alice", "Robert", "Elizabeth", "William", "Liam", "Mia", "Lucas", "Emma", "Alexander", "Charlotte"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "García", "Rodriguez", "Martinez",
  "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez"
];

// Create a Set to store the used doctor names to avoid repetition
const usedDoctorNames = new Set<string>();

function generateUniqueDoctorName(): string {
  let fullName: string;
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    fullName = `Dr. ${firstName} ${lastName}`;
  } while (usedDoctorNames.has(fullName)); // Repeat until we get a unique name

  usedDoctorNames.add(fullName); // Add to used names
  return fullName;
}

const mockDoctors: Doctor[] = []; // Explicitly typed array

const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Boston", "San Francisco", "Seattle", "Mumbai", "Kolkata", "Chennai", "Delhi", "Bangaluru"];
const specialties = ["Cardiology", "Pediatrics", "Dermatology", "Dentistry", "Orthopedics", "Neurology", "Psychiatry", "Gynecology","General Practice"];
const distances = [2, 5, 10]; // Nearby, medium-range, little far

let doctorId = 1;

// function generateDoctorData() {
//   const batchSize = 20
//   for(let i = 0; i<=batchSize; i++) {

    locations.forEach((location) => {
      specialties.forEach((specialty) => {
        distances.forEach((distance, index) => {
    
            mockDoctors.push({
              id: doctorId++,
              name: generateUniqueDoctorName(),
              specialty,
              location,
              distance,
              queueStatus: Math.floor(Math.random() * 5) + 1, // Random queue status (1-5)
              waitTime: Math.floor(Math.random() * 40) + 10, // Random wait time (10-50 mins)
              rating: parseFloat((Math.random() * 6 + 4).toFixed(1)), // Rating between 4.0 and 10
              availability: `${["Mon", "Tue", "Wed", "Thu", "Fri"][Math.floor(Math.random() * 5)]} - 9:00 AM to 5:00 PM`,
              contact: `555-${Math.floor(Math.random() * 9000) + 1000}`,
              fee: Math.floor(Math.random() * 100) + 100, // Fee between $100-$200
              medicalCenterAddress: `${Math.floor(Math.random() * 999)} ${["Main", "Elm", "Pine", "Maple", "Cedar"][Math.floor(Math.random() * 5)]} St, ${location}, ${
                ["NY", "CA", "IL", "TX", "FL", "MA", "WA"][locations.indexOf(location)]
              } 1000${index}`,
            });
          // }
        });
      });
    });

  // }
//   return mockDoctors;
// }

// const doctorBatch = generateDoctorData();
// console.log(doctorBatch);

export { mockDoctors };