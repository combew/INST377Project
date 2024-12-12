async function createFeedback() {
    console.log('Creating Feedback')
    await fetch('https://inst-377-project-zeta.vercel.app/add', {
        method: 'POST',
        body: JSON.stringify({
            name: `${document.getElementById('name').value}`,
            feedback: `${document.getElementById('feedback').value}`
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }) .then((res) => res.json());

    alert("Thank you for your feedback!")
}

let isTableMade = false
let tableTitleElement = null
let feedbackTableElement = null

async function getFeedback() {
    // console.log("Getting Feedback")

    var response = await fetch("https://inst-377-project-zeta.vercel.app/feedback")
    var resJson = await response.json();

    // Identify Section 3
    const div3Element = document.getElementById("section3")

    if (isTableMade === true) {
        // console.log('isTableMade is true')
        tableTitleElement.remove();
        feedbackTableElement.remove();
        isTableMade = false;
    } else {
        // console.log('isTableMade is false')

        // Create the title for the tible
        tableTitleElement = document.createElement('h2')
        tableTitleElement.innerHTML = 'Look at our tremendous reviews!'

        // Add that title to section 3
        div3Element.appendChild(tableTitleElement)

        // Create a table and a row for the headers
        feedbackTableElement = document.createElement("table")
        const headerRowElement = document.createElement('tr')

        // Create the cell for name and append it to the header row
        const nameHeaderCellElement = document.createElement('th')
        nameHeaderCellElement.innerHTML = 'Name'
        headerRowElement.appendChild(nameHeaderCellElement)

        // Create the cell for feedback and append it to the header row
        const feedbackHeaderCellElement = document.createElement('th')
        feedbackHeaderCellElement.innerHTML = 'Feedback'
        headerRowElement.appendChild(feedbackHeaderCellElement)

        // Append the header row to the table
        feedbackTableElement.appendChild(headerRowElement)

        // For each row in resJson
        resJson.forEach(row => {

            // Create a new row in the table
            const newRow = document.createElement("tr")

            // Create a new cell and put the value of row.name in it
            const nameCell = document.createElement('td')
            nameCell.innerHTML = row.name
            
            // ^ Same for a feedback cell
            const feedbackCell = document.createElement('td')
            feedbackCell.innerHTML = row.feedback

            // Append those cells to the row, and append the row to the table
            newRow.appendChild(nameCell)
            newRow.appendChild(feedbackCell)
            feedbackTableElement.appendChild(newRow)
        });

        // Append the table to section 3
        div3Element.appendChild(feedbackTableElement)

        isTableMade = true
    }
}

let searchVideoElement = null
function displaySearching() {
    const searchFeatureDiv = document.getElementById("search-feature")

    if (searchVideoElement) {
        searchVideoElement.remove()
        searchVideoElement = null
    } else {
        searchVideoElement = document.createElement("video")
        searchVideoElement.src = "https://www.w3schools.com/html/mov_bbb.mp4"
        searchVideoElement.setAttribute("autoplay", true)
        searchFeatureDiv.appendChild(searchVideoElement)
    }
}

let hourlyVideoElement = null
function displayHourly() {
    const searchFeatureDiv = document.getElementById("hourly-feature")

    if (hourlyVideoElement) {
        hourlyVideoElement.remove()
        hourlyVideoElement = null
    } else {
        hourlyVideoElement = document.createElement("video")
        hourlyVideoElement.src = "https://www.w3schools.com/html/mov_bbb.mp4"
        hourlyVideoElement.setAttribute("autoplay", true)
        searchFeatureDiv.appendChild(hourlyVideoElement)
    }
}

let detailedVideoElement = null
function displayDetailed() {
    const searchFeatureDiv = document.getElementById("detailed-feature")

    if (detailedVideoElement) {
        detailedVideoElement.remove()
        detailedVideoElement = null
    } else {
        detailedVideoElement = document.createElement("video")
        detailedVideoElement.src = "https://www.w3schools.com/html/mov_bbb.mp4"
        detailedVideoElement.setAttribute("autoplay", true)
        searchFeatureDiv.appendChild(detailedVideoElement)
    }
}