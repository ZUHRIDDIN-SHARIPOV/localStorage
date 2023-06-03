const form = document.querySelector(".hero__form");
const nameInput = document.querySelector(".hero__name-input");
const priceInput = document.querySelector(".hero__price-input");
const itemId = document.querySelector(".itemId");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itemId.value) {
    inputData.name = nameInput.value;
    inputData.price = priceInput.value;
  } else {
    inputData = {
      name: nameInput.value,
      price: priceInput.value,
    };
    itemId.value = `id ${Date.now()}`;
  }

  localStorage.setItem(itemId.value, JSON.stringify(inputData));
  render();
  nameInput.value = "";
  priceInput.value = "";
  itemId.value = "";
});

const formList = document.querySelector(".hero__form-list");

const render = () => {
  formList.innerHTML = "";
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const element = JSON.parse(localStorage.getItem(key));
      const li = document.createElement("li");
      li.innerHTML = `Name: ${element.name}, Price: ${element.price} $`;
      formList.append(li);
      li.onclick = () => {
        li.innerHTML = `<s> Name: ${element.name}, Price: ${element.price} $ </s>`;
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editBtn");
        editButton.addEventListener("click", () => {
          nameInput.value = element.name;
          priceInput.value = element.price;
          itemId.value = key;
        });
        li.append(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteBtn");
        deleteButton.addEventListener("click", () => {
          localStorage.removeItem(key);
          totalPrice.textContent = `Total Price: 0 $`;
          render();
        });
        li.append(deleteButton);
      };
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("editBtn");
      editButton.addEventListener("click", () => {
        nameInput.value = element.name;
        priceInput.value = element.price;
        itemId.value = key;
      });
      li.append(editButton);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("deleteBtn");
      deleteButton.addEventListener("click", () => {
        localStorage.removeItem(key);
        totalPrice.textContent = `Total Price: 0 $`;
        render();
      });
      li.append(deleteButton);
      total += Number(element.price);
      const totalPrice = document.querySelector(".text");
      const arrowF = (value, text) => {
        text.textContent = `Total Price: ${value} $`;
      };
      arrowF(total, totalPrice);
    }
  }
};
