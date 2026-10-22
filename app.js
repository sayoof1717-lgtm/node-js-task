const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const people = [];

function ask(question) {
  return new Promise(resolve =>
    rl.question(question, answer => resolve(answer.trim()))
  );
}

async function addPeople() {
  while (people.length < 10) {
    console.log(`\nPerson ${people.length + 1} of 10`);

    const id = await ask("ID: ");

    if (!id || people.some(p => p.id === id)) {
      console.log("ID must be unique.");
      continue;
    }

    const firstName = await ask("First name: ");
    const lastName = await ask("Last name: ");
    const age = Number(await ask("Age: "));
    const city = await ask("City: ");

    if (!firstName || !lastName || !city ||
        !Number.isInteger(age) || age <= 0) {
      console.log("Invalid data. Try again.");
      continue;
    }

    people.push({ id, firstName, lastName, age, city });
    console.log("Person added!");
  }
}

async function menu() {
  while (true) {
    console.log("\n--- PEOPLE MENU ---");
    console.log("1. Enter 10 people");
    console.log("2. View all people");
    console.log("3. View specific person");
    console.log("4. Delete all people");
    console.log("5. Delete specific person");
    console.log("6. View full names and cities");
    console.log("7. Exit");

    const choice = await ask("Choose: ");

    if (choice === "1") {
      if (people.length === 10) {
        console.log("Already have 10 people.");
      } else {
        await addPeople();
      }
    } else if (choice === "2") {
      console.table(people);
    } else if (choice === "3") {
      const id = await ask("Enter ID: ");
      const person = people.find(p => p.id === id);
      console.log(person || "Person not found");
    } else if (choice === "4") {
      people.length = 0;
      console.log("All people deleted.");
    } else if (choice === "5") {
      const id = await ask("Enter ID: ");
      const index = people.findIndex(p => p.id === id);

      if (index === -1) {
        console.log("Person not found");
      } else {
        people.splice(index, 1);
        console.log("Person deleted");
      }
    } else if (choice === "6") {
      people.forEach(p => {
        console.log(
          `Full name: ${p.firstName} ${p.lastName}, City: ${p.city}`
        );
      });
    } else if (choice === "7") {
      rl.close();
      break;
    } else {
      console.log("Invalid choice");
    }
  }
}

menu();
