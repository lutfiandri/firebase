// create element and render cafes
const cafeList = document.querySelector("#cafe-list");
const renderCafe = (doc) => {
    // cafeList.innerHTML = "";
    const list = `
        <li data-id="${doc.id}">
            <span>${doc.data().name}</span>
            <span>${doc.data().city}</span>
            <div class="cross">x</div>
        </li>
    `;
    cafeList.innerHTML += list;

    // delete data
    const cross = cafeList.querySelectorAll(".cross");
    cross.forEach((x) => {
        x.addEventListener("click", (e) => {
            const id = e.target.parentElement.getAttribute("data-id");
            db.collection("cafes").doc(id).delete();
            // bisa ditambah then catch
        });
    });
};

// get data
// db.collection("cafes")
//     .get()
//     .then((snapshot) => {
//         snapshot.forEach((doc) => {
//             renderCafe(doc);
//             // console.log(doc.data(), doc.id);
//         });
//     });
// get data (without refresh)
db.collection("cafes")
    .where("city", "==", "Mars")
    .orderBy("name", "asc")
    .limit(10)
    .onSnapshot((snapshot) => {
        cafeList.innerHTML = "";
        snapshot.forEach((doc) => {
            // console.log(doc.data());
            renderCafe(doc);
        });
    });

// add data
const form = document.querySelector("#add-cafe-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = form.name.value;
    let city = form.city.value;
    // console.log(name, city);
    if (name !== "" && city !== "") {
        db.collection("cafes").add({
            name: name,
            city: city,
        });
        // bisa ditambah then catch
        form.name.value = "";
        form.city.value = "";
    }
    // console.log("add clicked");
});
