// Device database with wattage information
const deviceDatabase = [
    { name: 'Ceiling Fan', watts: 80 },
    { name: 'Exhaust Fan', watts: 40 },
    { name: 'Fridge (Upto 500L)', watts: 335 },
    { name: 'Laptop', watts: 45 },
    { name: 'LED Bulb', watts: 5 },
    { name: 'LED Tubelight', watts: 18 },
    { name: 'LED TV', watts: 65 },
    { name: 'Phone Charger', watts: 40 },
    { name: 'Set Top Box', watts: 50 },
    { name: 'WiFi Router', watts: 20 },
    { name: 'Air Conditioner (1 Ton)', watts: 1500 },
    { name: 'Washing Machine', watts: 2000 },
    { name: 'Microwave Oven', watts: 1000 },
    { name: 'Water Heater', watts: 2000 },
    { name: 'Desktop Computer', watts: 200 },
    { name: 'Printer', watts: 100 },
    { name: 'Iron', watts: 1000 },
    { name: 'Mixer Grinder', watts: 500 },
    { name: 'Electric Kettle', watts: 1500 },
    { name: 'Geyser', watts: 2000 }
];

// Selected devices array
let selectedDevices = [];

// Property type presets
const propertyPresets = {
    
  "1bhk": [
    { name: "Ceiling Fan", watts: 80, quantity: 2 },
    { name: "LED Bulb", watts: 9, quantity: 5 },
    { name: "LED Tubelight", watts: 18, quantity: 2 },
    { name: "LED TV", watts: 65, quantity: 1 },
    { name: "WiFi Router", watts: 20, quantity: 1 },
    { name: "Laptop", watts: 45, quantity: 1 },
    { name: "Phone Charger", watts: 10, quantity: 2 },
    { name: "Fridge (200L)", watts: 200, quantity: 1 }
  ],

    "2bhk": [
    { name: "Ceiling Fan", watts: 80, quantity: 4 },
    { name: "LED Bulb", watts: 9, quantity: 8 },
    { name: "LED Tubelight", watts: 18, quantity: 3 },
    { name: "LED TV", watts: 65, quantity: 2 },
    { name: "WiFi Router", watts: 20, quantity: 1 },
    { name: "Laptop", watts: 45, quantity: 2 },
    { name: "Phone Charger", watts: 10, quantity: 4 },
    { name: "Fridge (300L)", watts: 250, quantity: 1 },
    { name: "Room Cooler (BLDC)", watts: 120, quantity: 1 },
    { name: "CCTV Camera", watts: 100, quantity: 1 },
    { name: "CFL", watts: 15, quantity: 1 }
  ],
    "3bhk": [
    { name: "Ceiling Fan", watts: 80, quantity: 5 },
    { name: "LED Bulb", watts: 9, quantity: 12 },
    { name: "LED Tubelight", watts: 18, quantity: 5 },
    { name: "LED TV", watts: 65, quantity: 3 },
    { name: "WiFi Router", watts: 20, quantity: 1 },
    { name: "Laptop", watts: 45, quantity: 3 },
    { name: "Phone Charger", watts: 10, quantity: 6 },
    { name: "Fridge (500L)", watts: 335, quantity: 1 },
    { name: "Air Conditioner (1 Ton 5★)", watts: 1200, quantity: 1 },
    { name: "Room Cooler (BLDC)", watts: 120, quantity: 1 },
    { name: "CCTV Camera", watts: 100, quantity: 2 },
    { name: "CFL", watts: 15, quantity: 2 }
  ],
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    populateDeviceSelect();
    setupEventListeners();
});

// Initialize calculator
function initializeCalculator() {
    // Set default devices from example
    selectedDevices = [
        { name: 'Ceiling Fan', watts: 80, quantity: 2 },
        { name: 'Exhaust Fan', watts: 40, quantity: 1 },
        { name: 'Fridge (Upto 500L)', watts: 335, quantity: 1 },
        { name: 'Laptop', watts: 45, quantity: 2 },
        { name: 'LED Bulb', watts: 5, quantity: 3 },
        { name: 'LED Tubelight', watts: 18, quantity: 1 },
        { name: 'LED TV', watts: 65, quantity: 1 },
        { name: 'Phone Charger', watts: 40, quantity: 2 },
        { name: 'Set Top Box', watts: 50, quantity: 1 },
        { name: 'WiFi Router', watts: 20, quantity: 1 }
    ];
    renderDevices();
    updateTotalWatts();
}

// Populate device select dropdown
function populateDeviceSelect() {
    const select = document.getElementById('device-name-select');
    deviceDatabase.forEach(device => {
        const option = document.createElement('option');
        option.value = device.name;
        option.textContent = `${device.name} (${device.watts} Watts)`;
        select.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Property type buttons
    document.querySelectorAll('.property-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.property-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const propertyType = this.dataset.type;
            if (propertyPresets[propertyType]) {
                selectedDevices = JSON.parse(JSON.stringify(propertyPresets[propertyType]));
                renderDevices();
                updateTotalWatts();
            }
        });
    });

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const tab = this.dataset.tab;
            document.getElementById('devices-tab').style.display = tab === 'devices' ? 'block' : 'none';
            document.getElementById('rooms-tab').style.display = tab === 'rooms' ? 'block' : 'none';
        });
    });

    // Consumption slider
    const slider = document.getElementById('consumption-slider');
    slider.addEventListener('input', function() {
        document.getElementById('slider-value').textContent = this.value + '%';
    });

    // Add device button
    document.getElementById('add-device-btn').addEventListener('click', function() {
        document.getElementById('device-modal').style.display = 'block';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('device-modal');
        if (event.target === modal) {
            closeDeviceModal();
        }
    });
}

// Render devices list
function renderDevices() {
    const devicesList = document.getElementById('devices-list');
    devicesList.innerHTML = '';

    selectedDevices.forEach((device, index) => {
        const deviceItem = document.createElement('div');
        deviceItem.className = 'device-item';
        deviceItem.innerHTML = `
            <div class="device-info">
                <div class="device-name">${device.name}</div>
            </div>
            <div class="device-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${device.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <div class="device-total">${device.watts * device.quantity} Watts</div>
            </div>
        `;
        devicesList.appendChild(deviceItem);
    });
}

// Update total watts
function updateTotalWatts() {
    const total = selectedDevices.reduce((sum, device) => sum + (device.watts * device.quantity), 0);
    document.getElementById('total-watts').textContent = total + ' Watts';
}

// Change quantity
function changeQuantity(index, delta) {
    const newQuantity = selectedDevices[index].quantity + delta;
    if (newQuantity >= 1) {
        selectedDevices[index].quantity = newQuantity;
        renderDevices();
        updateTotalWatts();
    }
}

// Update quantity from input
function updateQuantity(index, value) {
    const quantity = parseInt(value);
    if (quantity >= 1) {
        selectedDevices[index].quantity = quantity;
        renderDevices();
        updateTotalWatts();
    }
}

// Remove device
function removeDevice(index) {
    selectedDevices.splice(index, 1);
    renderDevices();
    updateTotalWatts();
}

// Add device to list
function addDeviceToList() {
    const deviceName = document.getElementById('device-name-select').value;
    const quantity = parseInt(document.getElementById('device-quantity').value) || 1;

    if (!deviceName) {
        alert('Please select a device');
        return;
    }

    const device = deviceDatabase.find(d => d.name === deviceName);
    if (device) {
        // Check if device already exists
        const existingIndex = selectedDevices.findIndex(d => d.name === deviceName);
        if (existingIndex >= 0) {
            selectedDevices[existingIndex].quantity += quantity;
        } else {
            selectedDevices.push({
                name: device.name,
                watts: device.watts,
                quantity: quantity
            });
        }
        renderDevices();
        updateTotalWatts();
        closeDeviceModal();
    }
}

// Close device modal
function closeDeviceModal() {
    document.getElementById('device-modal').style.display = 'none';
    document.getElementById('device-name-select').value = '';
    document.getElementById('device-quantity').value = 1;
}

// Change backup hours
function changeHours(delta) {
    const hoursInput = document.getElementById('backup-hours');
    const currentValue = parseInt(hoursInput.value) || 4;
    const newValue = Math.max(1, Math.min(24, currentValue + delta));
    hoursInput.value = newValue;
}

// Calculate recommendations
// Process backup hours and average consumption
function processBackupAndConsumption() {
    const backupHours = parseInt(document.getElementById('backup-hours').value) || 4;
    const consumptionPercent = parseInt(document.getElementById('consumption-slider').value) || 50;
    return { backupHours, consumptionPercent };
}

function calculateRecommendations() {
    const totalWatts = selectedDevices.reduce((sum, device) => sum + (device.watts * device.quantity), 0);
    const { backupHours, consumptionPercent } = processBackupAndConsumption();
    // Calculate actual consumption
    const actualWatts = (totalWatts * consumptionPercent) / 100;
    // Calculate battery capacity needed (in Ah)
    // Assuming 12V battery system
    const batteryVoltage = 12;
    const batteryCapacityAh = Math.ceil((actualWatts * backupHours) / (batteryVoltage * 0.8)); // 0.8 for efficiency
    // Calculate inverter capacity (with 20% buffer)
    const inverterCapacityVA = Math.ceil(actualWatts * 1.2);
    // Generate recommendations
    const recommendations = [
        {
            title: 'Recommended Inverter',
            capacity: `${inverterCapacityVA} VA / ${Math.ceil(inverterCapacityVA * 0.8)} W`,
            description: `Based on your load of ${Math.round(actualWatts)}W, we recommend a ${inverterCapacityVA} VA inverter for optimal performance.`
        },
        {
            title: 'Recommended Battery',
            capacity: `${batteryCapacityAh} Ah`,
            description: `For ${backupHours} hours of backup with ${consumptionPercent}% average consumption, you'll need a ${batteryCapacityAh} Ah battery.`
        },
        {
            title: 'Total Load',
            capacity: `${Math.round(actualWatts)}W`,
            description: `Your total power consumption is ${Math.round(actualWatts)}W with ${consumptionPercent}% average usage.`
        }
    ];
    displayRecommendations(recommendations);
}

// Display recommendations
function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    const cardsDiv = document.getElementById('recommendation-cards');
    
    cardsDiv.innerHTML = '';
    
    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <h4>${rec.title}</h4>
            <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color); margin: 15px 0;">${rec.capacity}</p>
            <p>${rec.description}</p>
        `;
        cardsDiv.appendChild(card);
    });
    
    recommendationsDiv.style.display = 'block';
    recommendationsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Toggle FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Scroll to calculator
function scrollToCalculator() {
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
}

