// SAFE FORM HANDLING (FIX: prevents null errors)
let form = document.getElementById("visitorForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // FIX: consistent ID generation
        let id = "VP" + Date.now();

        // FIX: correct element references
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let purpose = document.getElementById("purpose").value;
        let host = document.getElementById("host").value;
        let date = document.getElementById("datetime").value;

        // SHOW PASS
        document.getElementById("pass").classList.remove("hidden");

        document.getElementById("passId").innerText = id;
        document.getElementById("passName").innerText = name;
        document.getElementById("passPhone").innerText = phone;
        document.getElementById("passPurpose").innerText = purpose;
        document.getElementById("passHost").innerText = host;
        document.getElementById("passDate").innerText = date;

        // FIX: QR CODE CLEAR BEFORE GENERATING
        let qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: id,
            width: 100,
            height: 100
        });

        // SUCCESS MESSAGE
        showSuccess();

        // FIX: SAFE LOCAL STORAGE (NO OVERWRITE)
        let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

        visitors.push({
            id, name, phone, email, purpose, host, date
        });

        localStorage.setItem("visitors", JSON.stringify(visitors));
    });
}


// SUCCESS ANIMATION
function showSuccess() {
    let s = document.getElementById("success");
    s.classList.remove("hidden");

    setTimeout(() => {
        s.classList.add("hidden");
    }, 1500);
}


// PRINT ONLY PASS
function printPass() {
    window.print(); // CSS handles limiting area
}