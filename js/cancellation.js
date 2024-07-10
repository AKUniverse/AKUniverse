const searchResultsContainer = document.getElementById("searchResults");

function displayResult(resultText, isGoing) {
    const resultDiv = document.createElement("div");
    resultDiv.className = isGoing ? "bold-green" : "bold-red";
    resultDiv.textContent = resultText;

    searchResultsContainer.appendChild(resultDiv);
}

let emptyQueryMessageDisplayed = false;

const loadingIndicator = document.getElementById("loadingIndicator");

async function searchAndDisplayResults(query) {
    // Remove leading and trailing spaces using regular expression
    query = query.replace(/^\s+|\s+$/g, '');

    searchResultsContainer.innerHTML = ""; // Clear previous results
    let resultsFound = false;

    if (!query) {
        if (!emptyQueryMessageDisplayed) {
            displayResult("Please enter a postcode to search.");
            emptyQueryMessageDisplayed = true;
        }
        return; // Exit the function if the query is blank
    } else {
        emptyQueryMessageDisplayed = false; // Reset the flag
    }

    // Show loading indicator
    loadingIndicator.style.display = "block";

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const fetchPromises = [];

    for (const day of days) {
        fetchPromises.push(
            Promise.all([
                database.ref(`going/${day}`).once("value"),
                database.ref(`cancellation/${day}`).once("value")
            ]).then(([goingSnapshot, cancellationSnapshot]) => {
                const goingList = goingSnapshot.val();
                const cancellationList = cancellationSnapshot.val();

                if (goingList && goingList.includes(query)) {
                    displayResult(`Day: In ${day}\nVan/Going List: ${query}`, true);
                    resultsFound = true;
                }

                if (cancellationList) {
                    const lines = cancellationList.split('\n');
                    for (const line of lines) {
                        if (line.includes(query)) {
                            displayResult(`Day: ${day}\nCancellation: ${line}`, false);
                            resultsFound = true;
                        }
                    }
                }

                // Update the last updated timestamp after displaying the results
                const lastUpdatedGoingLabel = document.getElementById(`lastUpdatedGoing${day}`);
                const lastUpdatedCancellationLabel = document.getElementById(`lastUpdatedCancellation${day}`);

                database.ref(`going/${day}`).on("value", snapshot => {
                    const goingData = snapshot.val() || {};
                    lastUpdatedGoingLabel.textContent = `Last Updated: ${formatTimeSince(goingData.timestamp)}`;
                });

                database.ref(`cancellation/${day}`).on("value", snapshot => {
                    const cancellationData = snapshot.val() || {};
                    lastUpdatedCancellationLabel.textContent = `Last Updated: ${formatTimeSince(cancellationData.timestamp)}`;
                });

            }).catch(error => {
                console.error("Error fetching data:", error);
            })
        );
    }

 // Wait for all fetch operations to complete
    await Promise.all(fetchPromises);

    // Hide loading indicator
    loadingIndicator.style.display = "none";

    // Display error message if no results were found
    if (!resultsFound) {
        displayResult("Contact Ameer if postcode not found.");
    }
}

// Handle form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById("searchQuery").value;

    // Check if the searchQuery is empty
    if (!searchQuery.trim()) {
        if (!emptyQueryMessageDisplayed) {
            displayResult("Please enter a postcode to search.");
            emptyQueryMessageDisplayed = true;
        }
        return;
    }

    // Reset the flag when a new search query is submitted
    emptyQueryMessageDisplayed = false;

    // Clear the search results container
    searchResultsContainer.innerHTML = "";

    // Search and display results
    await searchAndDisplayResults(searchQuery);
});

// Function to paste text from clipboard and trigger search
function pasteTextFromClipboard() {
    navigator.clipboard.readText()
        .then(pastedText => {
            document.getElementById("searchQuery").value = pastedText;
            searchForm.dispatchEvent(new Event("submit")); // Trigger form submission
        })
        .catch(error => {
            console.error("Error pasting text:", error);
        });
}




// Helper function to get the next day
function getNextDay(currentDay) {
   const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
   const currentIndex = days.indexOf(currentDay);
   const nextIndex = (currentIndex + 1) % 7;
   return days[nextIndex];
}


// Helper function to get the next day