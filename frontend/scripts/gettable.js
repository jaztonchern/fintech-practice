const form = document.getElementById("form");
const startdateEl = document.getElementById("startdate");
const enddateEl = document.getElementById("enddate");
const filterCategory = document.getElementById("filterCategory");
const table = document.getElementById("myTable");

form.addEventListener("submit", getDataFromApi);
document
    .getElementById("sortDate")
    .addEventListener("click", () => sortTableByColumn(0));
document
    .getElementById("sortAmount")
    .addEventListener("click", () => sortTableByColumn(1));
filterCategory.addEventListener("change", (event) =>
    filterTableByCategory(event.target.value)
);

function getDataFromApi(event) {
    event.preventDefault();

    const settings = {
        url: `http://127.0.0.1:3000/transactions/get-all`,
        method: "GET",
        timeout: 0,
        headers: { Accept: "application/json" },
    };

    $.ajax(settings)
        .done((response) => {
            buildTable(response);
            populateFilterCategories(response);
        })
        .fail((jqXHR, textStatus) =>
            console.error(`Request failed: ${textStatus}`)
        );
}

function buildTable(data) {
    let rows = "";
    data.forEach((item) => {
        rows += `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.amount}</td>
                    <td>${item.category}</td>
                    <td>${item.description}</td>
                    <td>${item.account}</td>
                </tr>
              `;
    });
    table.innerHTML = rows;
}

function populateFilterCategories(data) {
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    filterCategory.innerHTML = '<option value="all">All</option>';
    uniqueCategories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        filterCategory.appendChild(option);
    });
}

function sortTableByColumn(columnIndex) {
    const rows = Array.from(table.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a
            .querySelector(`td:nth-child(${columnIndex + 1})`)
            .textContent.trim();
        const bColText = b
            .querySelector(`td:nth-child(${columnIndex + 1})`)
            .textContent.trim();

        // Check if the data in the column are numbers
        if (!isNaN(aColText) && !isNaN(bColText)) {
            return parseFloat(aColText) - parseFloat(bColText);
        }
        // Check if the data in the column are dates
        else if (Date.parse(aColText) && Date.parse(bColText)) {
            return new Date(aColText) - new Date(bColText);
        }
        // Otherwise sort lexicographically
        else {
            return aColText.localeCompare(bColText);
        }
    });

    table.innerHTML = "";
    table.append(...sortedRows);
}

function filterTableByCategory(category) {
    const rows = Array.from(table.querySelectorAll("tr"));

    if (category === "all") {
        for (const row of rows) {
            row.style.display = "";
        }
        return;
    }

    const filteredRows = rows.filter((row) => {
        const categoryCell = row
            .querySelector("td:nth-child(3)")
            .textContent.trim();
        return category === "" || categoryCell === category;
    });

    for (const row of rows) {
        row.style.display = "none";
    }

    for (const row of filteredRows) {
        row.style.display = "";
    }
}
