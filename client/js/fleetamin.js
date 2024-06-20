// client/admin/admin.js

document.addEventListener('DOMContentLoaded', () => {
    fetchFleetQuotations();
});

function fetchFleetQuotations() {
    fetch('http://localhost:3000/api/fleetQuotations')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('fleet-quotations-table').querySelector('tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(quotation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${quotation.email}</td>
                    <td>${quotation.phoneNumber}</td>
                    <td>${quotation.companyName}</td>
                    <td>${quotation.type}</td>
                    <td>${quotation.vehicles}</td>
                    <td>${quotation.features}</td>
                    <td>${quotation.status}</td>
                    <td>
                        ${getActionButton(quotation)}
                        <button type="button" class="btn btn-danger" onclick="deleteFleetQuotation('${quotation._id}')">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching quotations:', error));
}

function getActionButton(quotation) {
    if (quotation.status === 'responded') {
        return `<button type="button" class="btn btn-outline-success">Success</button>`;
    } else {
        return `
            <button type="button" class="btn btn-light" onclick="updateFleetStatus('${quotation._id}', 'responded')">Mark as Responded</button>
        `;
    }
}

function updateFleetStatus(id, status) {
    fetch(`http://localhost:3000/api/fleetQuotations/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Status updated successfully:', data);
        fetchFleetQuotations(); // Refresh the list
    })
    .catch(error => console.error('Error updating status:', error));
}

function deleteFleetQuotation(id) {
    fetch(`http://localhost:3000/api/fleetQuotations/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Quotation deleted successfully:', data);
        fetchFleetQuotations(); // Refresh the list
    })
    .catch(error => console.error('Error deleting quotation:', error));
}
