let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    setupAddToCart();
    updateCart();

    // MAKE PAYMENT → open delivery popup
    document.getElementById("checkoutBtn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // show popup
        document.getElementById("detailsPopup").style.display = "flex";

        // reset popup view each time
        document.getElementById("qrTitle").innerText = "Delivery Details 📦";
        document.getElementById("deliveryForm").style.display = "block";
        document.getElementById("qrArea").style.display = "none";
    });

    // REMOVE ITEM FROM CART
    document.getElementById("orderList").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            saveCart();
            updateCart();
        }
    });

    // LOGIN
    document.getElementById("loginBtn").addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("pwd").value.trim();
        if (!username || !password) {
            alert("Please enter username & password");
            return;
        }
        isLoggedin = true;
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("loginMsg").style.display = "block";
    });

    // DONE after payment → clear cart
    document.getElementById("donePaymentBtn").addEventListener("click", () => {
        cart = [];        // clear cart array
        saveCart();       // clear localStorage
        updateCart();     // update UI
        closeDetails();   // hide popup
        alert("Thank you for shopping with Ana's Blossom House! 🌷");
    });
});


// ADD TO CART
function setupAddToCart() {
    document.querySelectorAll(".addToCart").forEach((btn) => {
        btn.addEventListener("click", () => {
            cart.push({
                name: btn.dataset.name,
                price: Number(btn.dataset.price),
            });

            saveCart();
            updateCart();
        });
    });
}


// UPDATE CART UI
function updateCart() {
    const cartCountEl = document.getElementById("cartCount");
    const listEl = document.getElementById("orderList");
    const totalEl = document.getElementById("totalPrice");

    document.getElementById("discountMsg").innerText = "";

    cartCountEl.innerText = cart.length;
    listEl.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        listEl.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${item.name} - ₹${item.price}
        <button class="btn btn-danger btn-sm" data-index="${index}">
          Remove
        </button>
      </li>
    `;
    });

    if (total > 5000) {
        total = total - (0.2 * total);
        document.getElementById("discountMsg").innerText =
            "20% discount applied 🎉";

    }

    totalEl.innerText = total;
}


// LOCAL STORAGE
function saveCart() {
    localStorage.setItem("cartData", JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem("cartData");
    if (saved) cart = JSON.parse(saved);
}


// CLOSE DELIVERY POPUP
function closeDetails() {
    document.getElementById("detailsPopup").style.display = "none";
}


// PROCEED TO PAY (DELIVERY → PAYMENT STEP)
function openQR() {
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill all delivery details");
        return;
    }

    // TEMP STORE (later → send to backend)
    localStorage.setItem(
        "userDetails",
        JSON.stringify({ name, phone, address, cart })
    );

    // switch to QR view
    document.getElementById("qrTitle").innerText = "Scan to Pay 💳";
    document.getElementById("deliveryForm").style.display = "none";
    document.getElementById("qrArea").style.display = "block";
}
