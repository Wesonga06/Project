document.addEventListener("DOMContentLoaded", function () {
    const inventoryForm = document.getElementById("inventoryForm");
    const inventoryList = document.getElementById("inventoryList");

    inventoryForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const name = document.getElementById("itemName").value;
        const quantity = document.getElementById("itemQuantity").value;
        const price = document.getElementById("itemPrice").value;

        if (!name || !quantity || !price) {
            alert("Please enter all fields");
            return;
        }

        const response = await fetch("/add-item", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, quantity, price })
        });

        const data = await response.json();
        if (data.message === "Item added") {
            displayItem(name, quantity, price);
            inventoryForm.reset();
        }
    });

    function displayItem(name, quantity, price) {
        const li = document.createElement("li");
        li.innerHTML = <strong>${name}</strong> - $;{quantity} pcs - $$;{price};
        inventoryList.appendChild(li);
    }

    async function loadItems() {
        const response = await fetch("/items");
        const items = await response.json();
        inventoryList.innerHTML = "";
        items.forEach(item => displayItem(item.name, item.quantity, item.price));
    }

    loadItems();
});