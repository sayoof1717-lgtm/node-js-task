const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let people = [];

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function enterPeople() {
    console.log("\n=== Enter Data for 10 People ===\n");

    for (let i = 0; i < 10; i++) {
        console.log(`Person ${i + 1}`);

        const id = await ask("ID: ");
        const firstName = await ask("First Name: ");
        const lastName = await ask("Last Name: ");
        const age = await ask("Age: ");
        const city = await ask("City: ");

        people.push({
            id,
            firstName,
            lastName,
            age,
            city
        });

        console.log("-------------------");
    }

    menu();
}

function displayAllPeople() {
    if (people.length === 0) {
        console.log("No people found.");
        return;
    }

    console.log("\n=== All People ===");
    console.table(people);
}

async function displaySpecificPerson() {
    const id = await ask("Enter ID: ");

    const person = people.find(p => p.id === id);

    if (person) {
        console.table([person]);
    } else {
        console.log("Person not found.");
    }
}

async function deleteSpecificPerson() {
    const id = await ask("Enter ID to delete: ");

    const index = people.findIndex(p => p.id === id);

    if (index !== -1) {
        people.splice(index, 1);
        console.log("Person deleted successfully.");
    } else {
        console.log("Person not found.");
    }
}

function deleteAllPeople() {
    people = [];
    console.log("All people deleted successfully.");
}

function displayFullNamesAndCities() {
    if (people.length === 0) {
        console.log("No people found.");
        return;
    }

    console.log("\n=== Full Names and Cities ===");

    people.forEach(person => {
        console.log(
            `Full Name: ${person.firstName} ${person.lastName} | City: ${person.city}`
        );
    });
}

async function menu() {
    console.log(`
======== MENU ========
1. View All People
2. View Specific Person
3. Delete Specific Person
4. Delete All People
5. View Full Name and City
6. Exit
======================
`);

    const choice = await ask("Choose an option: ");

    switch (choice) {
        case "1":
            displayAllPeople();
            break;

        case "2":
            await displaySpecificPerson();
            break;

        case "3":
            await deleteSpecificPerson();
            break;

        case "4":
            deleteAllPeople();
            break;

        case "5":
            displayFullNamesAndCities();
            break;

        case "6":
            console.log("Goodbye!");
            rl.close();
            return;

        default:
            console.log("Invalid choice.");
    }

    menu();
}

enterPeople();